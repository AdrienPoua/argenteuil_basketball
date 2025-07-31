// emails/ContactEmail.tsx
import club from '../../../shared/config/club'
type ContactEmailProps = {
  name: string
  email: string
  message: string
  timestamp?: Date
}

export const ContactEmail = ({
  name,
  email,
  message,
  timestamp = new Date(),
}: ContactEmailProps) => {
  const styles = {
    container: {
      maxWidth: '600px',
      margin: '0 auto',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      backgroundColor: '#ffffff',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
    },
    header: {
      backgroundColor: '#096533', // sage-500
      color: '#ffffff',
      padding: '24px',
      textAlign: 'center' as const,
    },
    headerTitle: {
      margin: '0',
      fontSize: '24px',
      fontWeight: '600',
      letterSpacing: '-0.025em',
    },
    headerSubtitle: {
      margin: '8px 0 0 0',
      fontSize: '14px',
      opacity: '0.9',
      fontWeight: '400',
    },
    content: {
      padding: '32px 24px',
      backgroundColor: '#ffffff',
    },
    section: {
      marginBottom: '24px',
      padding: '16px',
      backgroundColor: '#f9fafb',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
    },
    label: {
      display: 'block',
      fontSize: '12px',
      fontWeight: '600',
      color: '#096533',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em',
      marginBottom: '8px',
    },
    value: {
      fontSize: '16px',
      color: '#111827',
      lineHeight: '1.5',
      margin: '0',
    },
    messageBox: {
      backgroundColor: '#ffffff',
      border: '2px solid #e5e7eb',
      borderRadius: '8px',
      padding: '20px',
      fontSize: '16px',
      color: '#096533',
      lineHeight: '1.6',
      whiteSpace: 'pre-line' as const,
      fontFamily: '"Segoe UI", system-ui, sans-serif',
    },
    metadata: {
      backgroundColor: '#f3f4f6',
      padding: '20px 24px',
      borderTop: '1px solid #e5e7eb',
    },
    metaText: {
      fontSize: '12px',
      color: '#096533',
      margin: '0',
      textAlign: 'center' as const,
    },
    badge: {
      display: 'inline-block',
      backgroundColor: '#096533', // green-500
      color: '#ffffff',
      fontSize: '12px',
      fontWeight: '600',
      padding: '4px 12px',
      borderRadius: '20px',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em',
      marginBottom: '16px',
    },
    divider: {
      height: '1px',
      backgroundColor: '#e5e7eb',
      border: 'none',
      margin: '24px 0',
    },
    contactInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '14px',
      color: '#096533',
    },
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>📧 Nouveau message de contact</h1>
        <p style={styles.headerSubtitle}>
          {club.name} • {formatDate(timestamp)}
        </p>
      </div>

      {/* Content */}
      <div style={styles.content}>
        <div style={styles.badge}>Nouveau Contact</div>

        {/* Sender Info */}
        <div style={styles.section}>
          <span style={styles.label}>👤 Expéditeur</span>
          <p style={styles.value}>
            <strong>{name}</strong>
          </p>
          <div style={styles.contactInfo}>
            <span>📧</span>
            <a href={`mailto:${email}`} style={{ color: '#2563eb', textDecoration: 'none' }}>
              {email}
            </a>
          </div>
        </div>

        {/* Message */}
        <div style={styles.section}>
          <span style={styles.label}>💬 Message</span>
          <div style={styles.messageBox}>{message}</div>
        </div>

        <hr style={styles.divider} />

        {/* Quick Actions */}
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <a
            href={`mailto:${email}?subject=Re: ${'Réponse à votre message sur ' + club.domain}`}
            style={{
              display: 'inline-block',
              backgroundColor: '#096533',
              color: '#ffffff',
              padding: '12px 24px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '14px',
              marginRight: '12px',
            }}
          >
            📨 Répondre par Email
          </a>
        </div>
      </div>

      {/* Footer */}
      <div style={styles.metadata}>
        <p style={styles.metaText}>
          📍 Ce message a été envoyé via le formulaire de contact de <strong>{club.domain}</strong>
        </p>
        <p style={styles.metaText}>🕒 Reçu le {formatDate(timestamp)}</p>
      </div>
    </div>
  )
}
