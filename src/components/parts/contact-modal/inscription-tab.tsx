import { InscriptionForm } from '@/components/forms/inscription-form'
import { DialogDescription, DialogHeader } from '@/components/ui/dialog'

type PropsType = {
  setOpen: (open: boolean) => void
}

export function InscriptionTab({ setOpen }: Readonly<PropsType>) {
  return (
    <div>
      <DialogHeader className="mb-3">
        <div className="flex flex-col items-start gap-2">
          <div className="primary/20 flex w-full items-start gap-3 rounded-md border border-yellow-500 p-4">
            <DialogDescription className="size-full text-sm leading-relaxed text-yellow-500">
              <span className="flex flex-col items-center text-center font-bold">
                Si vous souhaitez vous inscrire et payer en ligne.
                <br />
                <span className="text-sm font-bold text-red-500">
                  Pour les <span className="underline underline-offset-4">14-17 ans</span>: attendez
                  de recevoir votre code pass&apos;Sport <br /> avant de remplir le formulaire.
                </span>
              </span>
            </DialogDescription>
          </div>
        </div>
      </DialogHeader>
      <InscriptionForm setOpen={setOpen} />
    </div>
  )
}
