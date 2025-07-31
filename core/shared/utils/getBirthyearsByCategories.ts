import { Tarif } from "@/core/domain/entities/tarif.entity"
import { getSaison } from "@/core/shared/utils/getSaison"

export const getBirthyearsByCategories = (tarifs: Tarif[]): number[]=> {
  const currentSeason = getSaison()
  const yearOfCurrentSeason = currentSeason.split("-")[0]
  if (!yearOfCurrentSeason) {
    throw new Error("Format de saison invalide")
  }
  const currentSeasonYear = parseInt(yearOfCurrentSeason)

  return tarifs.flatMap((tarif) => {
    const result = []
    if(tarif.max_age - tarif.min_age > 3) {
      result.push(currentSeasonYear - tarif.min_age)
    } else {
      for (let age = tarif.min_age; age <= tarif.max_age; age++) {
        result.push(currentSeasonYear - age )
      }
    }

    return result
  })

}