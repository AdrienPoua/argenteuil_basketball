import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { InscriptionFormUpdate } from "@/components/forms/inscription-form-update"
import { InscriptionEntity } from "@/core/domain/entities/inscription.entity"

type ModificationDialogProps = {
    isDialogOpen: boolean
    actions: {
        openChange: (open: boolean) => void
        success: () => void
    }
    currentInscription: InscriptionEntity
}

export const ModificationDialog = ({ isDialogOpen, actions, currentInscription }: ModificationDialogProps) => {
    return (
      <Dialog open={isDialogOpen} onOpenChange={actions.openChange}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Modifier la pré-inscription</DialogTitle>
            <DialogDescription>Modifiez les informations de cette pré-inscription.</DialogDescription>
          </DialogHeader>
          {currentInscription && (
            <InscriptionFormUpdate currentInscription={currentInscription} actions={actions} />
          )}
        </DialogContent>
      </Dialog>
    )
  }
  