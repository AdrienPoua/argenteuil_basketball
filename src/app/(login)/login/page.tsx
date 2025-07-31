import Image from 'next/image'
import Form from '@/components/forms/login.form'
import { Card, CardContent } from '@/components/ui/card'

export default function Index() {
  return (
    <div className="space-y-4">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Bienvenue</h1>
                <p className="text-balance text-muted-foreground">Connectez-vous à votre compte</p>
              </div>
              <Form />
            </div>
          </div>
          <div className="relative hidden bg-muted md:block">
            <Image
              src="/images/logo.png"
              alt="Image"
              width={1000}
              height={1000}
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
