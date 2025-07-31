import { MatchEntity } from '../../../domain/entities/match.entity';
import club from '../../../shared/config/club';

type PropsType = {
  matchs: MatchEntity[];
};

export default function ReservationTemplate({ matchs }: Readonly<PropsType>) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      {/* En-tête */}
      <div style={{ borderBottom: '2px solid #f3f4f6', paddingBottom: '20px', marginBottom: '30px' }}>
        <h1 style={{ textAlign: 'center', color: '#1f2937', fontSize: '24px' }}>
          Récapitulatif des matchs à domicile à venir
        </h1>
      </div>

      {/* Liste des matchs */}
      {matchs.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#6b7280', fontStyle: 'italic' }}>
          Aucun match à venir pour le moment.
        </p>
      ) : (
        matchs.map((match) => (
          <div
            key={match.id}
            style={{
              marginBottom: '25px',
              padding: '15px',
              backgroundColor: '#f9fafb',
              borderRadius: '5px',
              borderLeft: `4px solid ${match.isHomeTeam() ? '#34d399' : '#60a5fa'}`,
            }}
          >
            {/* Date et heure du match */}
            <div style={{ marginBottom: '10px' }}>
              <h2 style={{ margin: '0 0 5px 0', color: '#1f2937', fontSize: '18px' }}>
                {new Date(match.date).toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </h2>
              <div style={{ display: 'flex', color: '#4b5563', fontSize: '14px' }}>
                <span style={{ fontWeight: 'bold' }}>
                  {match.horaire.toString().slice(0, 2)}H{match.horaire.toString().slice(2, 4)}
                </span>
                {match.salle && <span style={{ marginLeft: '10px' }}>• {match.salle}</span>}
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '10px 0' }} />

            {/* Informations du match */}
            <div style={{ marginTop: '10px' }}>
              {match.team && (
                <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '5px' }}>{match.team.name}</div>
              )}
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#1f2937' }}>
                {match.nomEquipe1} - {match.nomEquipe2}
              </div>
            </div>
          </div>
        ))
      )}

      {/* Pied de page */}
      <div style={{ textAlign: 'center', margin: '30px 0 20px' }}>
        <a
          href={`${club.domain}/plannings/matchs`}
          style={{
            fontWeight: 'bold',
            color: '#2563eb',
            textDecoration: 'none',
            padding: '8px 16px',
            border: '1px solid #2563eb',
            borderRadius: '4px',
          }}
        >
          Voir tous les matchs
        </a>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '20px 0' }} />

      <p style={{ textAlign: 'center', fontSize: '12px', color: '#9ca3af' }}>
        © {new Date().getFullYear()} {club.name}. Tous droits réservés.
      </p>
    </div>
  );
}
