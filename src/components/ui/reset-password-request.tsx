import { ResetPasswordRequestForm } from '@/components/forms/reset-password-request-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function ResetPasswordRequest() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Réinitialiser votre mot de passe</CardTitle>
        <CardDescription>
          Entrez votre adresse email pour recevoir un lien de réinitialisation de mot de passe.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResetPasswordRequestForm />
      </CardContent>
    </Card>
  )
}
