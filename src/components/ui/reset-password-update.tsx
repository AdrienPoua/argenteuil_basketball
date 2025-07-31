import { Suspense } from 'react'
import { ResetPasswordUpdateForm } from '@/components/forms/reset-password-update-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

function ResetPasswordUpdateFormFallback() {
  return (
    <div className="text-center">
      <p>Chargement du formulaire...</p>
    </div>
  )
}

export function ResetPasswordUpdate() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Définir un nouveau mot de passe</CardTitle>
        <CardDescription>Veuillez choisir un nouveau mot de passe sécurisé.</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<ResetPasswordUpdateFormFallback />}>
          <ResetPasswordUpdateForm />
        </Suspense>
      </CardContent>
    </Card>
  )
}
