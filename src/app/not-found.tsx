import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-orange-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl aspect-[2/1] bg-orange-500 rounded-lg border-4 border-white relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-48 h-48 rounded-full border-4 border-white" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h1 className="text-6xl font-bold text-orange-600 mb-4">404</h1>
            <p className="text-2xl text-orange-800 mb-6">
              Hors des limites !
            </p>
            <p className="text-lg text-orange-700 mb-6">
              Cette page est aussi introuvable qu&apos;un ballon perdu dans les gradins.
            </p>
            <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white">
              <Link href="/" className="flex items-center justify-center">
                <ArrowLeft className="mr-2" />
                Retour au terrain
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

