import { Info } from 'lucide-react'
import { InscriptionForm } from '@/components/forms/inscription-form'
import { DialogDescription, DialogHeader } from '@/components/ui/dialog'

type PropsType = {
  setOpen: (open: boolean) => void
}

export function InscriptionTab({ setOpen }: PropsType) {
  return (
    <div>
      <DialogHeader className="mb-3">
        <div className="flex flex-col items-start gap-2">
          <div className="primary/20 flex w-full items-start gap-3 rounded-md border border-yellow-500 p-4">
            <DialogDescription className="text-sm leading-relaxed text-yellow-500">
              <span className="font-bold">Si vous souhaitez payer en ligne uniquement</span>
              <br />
              <span className="font-bold text-red-500">
                Si vous avez un code PASS&apos;SPORT (14-17 ans), payez uniquement en présentiel.
              </span>
            </DialogDescription>
          </div>
        </div>
      </DialogHeader>
      <InscriptionForm setOpen={setOpen} />
    </div>
  )
}
