const extranetUsername = process.env.FFBB_SERVER_USERNAME
const extranetPassword = process.env.FFBB_SERVER_PASSWORD

if (!extranetUsername || !extranetPassword) {
  throw new Error('EXTRANET_USERNAME or EXTRANET_PASSWORD is not set')
}

import { Match, MatchGateway } from '../../domain/gateways/matchs'
import club from '../../shared/config/club'

export class ExtranetClient implements MatchGateway {
  private static client: ExtranetClient | null = null
  private readonly BASE_URL = 'https://ffbbserver3.ffbb.com/ffbbserver3/api/'
  private readonly username: string = extranetUsername ?? ''
  private readonly password: string = extranetPassword ?? ''
  private tokenExpiresAt: number | null = null
  private token: string | null = null
  private matchs: Match[] | null = null
  private poulesIds: number[] | null = null
  private competitions:
    | {
        id: number
        label: string
        poules: {
          id: number
          nom: string
        }[]
      }[]
    | null = null
  private clubs: { id: string; libelle: string; code: string }[] | null = null
  private adherents: Adherent[] | null = null

  async getToken() {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'text/plain',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: this.username,
        password: this.password,
      }),
      next: {
        revalidate: 0,
      },
    }

    try {
      if (!this.token || !this.tokenExpiresAt || Date.now() > this.tokenExpiresAt) {
        const url = new URL('authentication.ws', this.BASE_URL)
        const response = await fetch(url, options)
        if (!response.ok) {
          throw new Error(`Status ${response.status}: ${response.statusText}`)
        }
        const token = await response.text()
        this.token = token
        this.tokenExpiresAt = Date.now() + 10 * 60 * 1000 // expire dans 10 minutes
      }

      return this.token
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  private async fetchWithToken<T>(request: Request): Promise<T> {
    const token = await this.getToken()

    const newRequest = new Request(request, {
      headers: {
        ...Object.fromEntries(request.headers.entries()),
        Authorization: `Bearer ${token}`,
      },
    })

    const response = await fetch(newRequest)

    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`)
    }

    if (response.headers.get('Content-Type')?.includes('application/json')) {
      return response.json() as Promise<T>
    }

    throw new Error('Invalid content type')
  }

  private createURL(endpoint: string, params?: Record<string, string>): URL {
    const url = new URL(endpoint, this.BASE_URL)
    if (params) {
      Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value))
    }
    return url
  }

  async getPoulesIds(): Promise<number[]> {
    if (this.poulesIds) {
      return this.poulesIds
    }
    const url = this.createURL('competition/getEngagementsParOrganisme.ws', {
      idOrganisme: club.clubId.toString(),
    })
    try {
      const data = await this.fetchWithToken<Engagement[]>(new Request(url))
      this.poulesIds = data.map((data) => data.idPoule)
      return this.poulesIds
    } catch (error) {
      console.error('Erreur dans getPoulesIds in extranet client:', error)
      throw new Error('Erreur dans getPoulesIds in extranet client')
    }
  }

  async getCompetitions() {
    if (this.competitions) {
      return this.competitions
    }
    const url = this.createURL('competition/getCompetitionParOrganisme.ws', {
      codeOrganisme: club.codeOrganisme,
    })
    try {
      const data = await this.fetchWithToken<Competition[]>(new Request(url))
      this.competitions = data.map((compet) => ({
        id: compet.id,
        label: compet.code,
        poules: compet.poules,
      }))
      return this.competitions
    } catch (error) {
      console.error('Erreur dans getCompetitions in extranet client:', error)
      throw new Error('Erreur dans getCompetitions in extranet client')
    }
  }

  async getClubs() {
    if (this.clubs) {
      return this.clubs
    }
    try {
      const competitions = await this.getCompetitions()
      const ids = competitions.map((competition) => competition.id)
      const fetchClubsPromises = ids.map(async (id) => {
        const url = this.createURL('competition/getClassementEquipes.ws', {
          idCompetition: id.toString(),
        })
        try {
          const data = await this.fetchWithToken<CompetitionWithClassements[]>(new Request(url))
          const organisme = data
            .map((competition) =>
              competition.classements.map(({ organisme }) => ({
                id: organisme.id.toString(),
                libelle: organisme.libelle,
                code: organisme.code,
              })),
            )
            .flat()
            .filter((organisme) => organisme.code && organisme.id && organisme.libelle)

          return organisme
        } catch (error) {
          console.error(`Error fetching organismes: ${id}`, error)
          throw error
        }
      })
      const clubs = await Promise.all(fetchClubsPromises)

      const uniqueClubs = Array.from(new Map(clubs.flat().map((club) => [club.id, club])).values())
      this.clubs = uniqueClubs
      return this.clubs
    } catch (error) {
      console.error('Erreur dans getClubs in extranet client:', error)
      throw new Error('Erreur dans getClubs in extranet client')
    }
  }

  async getMatchs(): Promise<Match[]> {
    if (this.matchs) {
      return this.matchs
    }
    try {
      const poulesIds = await this.getPoulesIds()
      const fetchMatchs = poulesIds.map(async (poule) => {
        try {
          const url = this.createURL('competition/getRencontresParPoule.ws', {
            idPoule: poule.toString(),
          })
          const data = await this.fetchWithToken<Match[]>(new Request(url))
          return data
        } catch (error) {
          console.error(`Error fetching matchs: ${poule}`, error)
          throw error
        }
      })
      const matchs = (await Promise.all(fetchMatchs))
        .flat()
        .filter(
          (match) =>
            match.idOrganismeEquipe1 === club.clubId || match.idOrganismeEquipe2 === club.clubId,
        )

      this.matchs = matchs
      return this.matchs
    } catch (error) {
      console.error('Erreur lors de la récupération des matchs:', error)
      throw new Error('Erreur lors de la récupération des matchs')
    }
  }

  async getAdherents(): Promise<Adherent[]> {
    if (this.adherents) {
      return this.adherents
    }

    const url = this.createURL('licence/getSimple.ws', {
      idOrganisme: club.clubId.toString(),
    })
    const adherents = await this.fetchWithToken<Adherent[]>(new Request(url))
    const qualifiedAdherent = adherents.filter((adherent) => adherent.dateQualification !== null)
    this.adherents = qualifiedAdherent
    return qualifiedAdherent
  }

  static getClient(): ExtranetClient {
    this.client ??= new ExtranetClient()
    return this.client
  }
}

interface Engagement {
  idEngagement: number
  idOrganisme: number
  idOrganismeCtc: number | null
  nomEquipe: string | null
  typeEntenteCtc: string | null
  idLicenceCorrespondantEquipe: number
  nomCorrespondantEquipe: string
  adresseCorrespondantEquipe: string
  complementAdresseCorrespondantEquipe: string
  communeCorrespondantEquipe: string
  telephoneFixeCorrespondantEquipe: string
  telephoneTravailCorrespondantEquipe: string
  telephonePortableCorrespondantEquipe: string
  emailCorrespondantEquipe: string
  clubPro: boolean
  idCompetition: number
  idPoule: number
  numeroEquipe: string
  niveau: {
    id: number
    code: string
    libelle: string
  } | null
}

interface Competition {
  id: number
  idCompetitionPere: number | null
  nom: string
  sexe: 'M' | 'F' | 'X' // Masculin, Féminin ou Mixte
  categorie: {
    id: number
    code: string
    libelle: string
  }
  code: string
  fils: Competition[] // Liste de compétitions filles si applicable
  saison: {
    id: number
    code: string
    libelle: string
    debut: string // Format "JJ/MM/AAAA"
    fin: string // Format "JJ/MM/AAAA"
    actif: 'true' | 'false'
  }
  typeCompetition: string // Exemple : "DIV" ou "PLAT"
  liveStat: boolean
  creationEnCours: boolean
  publicationInternet: string // Exemple : "AFF"
  emarqueV2: boolean
  classification: unknown
  organisme: {
    id: number
    libelle: string
    code: string
  }
  creation: string | null // Date ou null
  modification: string | null // Date ou null
  etat: unknown
  poules: {
    id: number
    nom: string
  }[]
}

interface CompetitionWithClassements extends Competition {
  classements: {
    organisme: {
      id: number
      libelle: string
      code: string
    }
    matchJoues: number
    points: number
    position: number
    gagnes: number
    perdus: number
    nuls: number
    pointsInitiaux: number | null
    penalitesArbitrage: number
    penalitesEntraineur: number
    penalitesDiverses: number
    nombreForfaits: number
    nombreDefauts: number
    paniersMarques: number
    paniersEncaisses: number
    quotient: number
    difference: number
    horsClassement: boolean
  }[]
}

type TypePratique = {
  id: number
  code: string
  libelle: string
  type: string
  certificat: boolean
  elicence: boolean
}

type TypePratiqueSportive = {
  id: number
  code: string
  libelle: string
} | null

export type Adherent = {
  id: number
  numeroLicence: string
  nom: string
  prenom: string
  sexe: 'M' | 'F'
  dateNaissance: string
  email: string
  codeOrganisme: string
  idOrganisme: number
  nomOrganisme: string
  typeLicence: string
  dateQualification: string | null
  categorie: string
  idOrganismeLicenceT: number | null
  idOrganismeLicenceAs: number | null
  nbNonRenouvellementLicencie: number
  historique: unknown // Si tu veux le typer, donne-moi un exemple
  typePratique: TypePratique[]
  typePratiqueSportive: TypePratiqueSportive
}
