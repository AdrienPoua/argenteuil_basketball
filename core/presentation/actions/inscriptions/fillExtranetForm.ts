'use server'

import { TypeInscription } from '@/core/domain/entities/inscription.entity'
import fillNouvelleLicence from '@/core/infrastructure/puppeteer/extranet/nouvelle.licence'
import fillRenouvellement from '@/core/infrastructure/puppeteer/extranet/renouvellement.licence'
import { ErrorHandler } from '@/core/shared/error/ErrorHandler'
import { updateInscription } from './updateInscription'

// Interface for the serializable data needed by the Puppeteer script
interface ExtranetFormData {
  id: string
  firstName: string
  lastName: string
  email: string
  dateOfBirth: string // Pass as ISO string for serialization
  gender: string
  surclassement: boolean
  typeInscription: TypeInscription
  passSport: string
}

export async function fillExtranetFormAction(
  formData: ExtranetFormData,
): Promise<{ success: boolean; error?: string }> {
  try {
    // Convert the plain object to the format expected by the Puppeteer script
    const payload = {
      id: formData.id,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      dateOfBirth: new Date(formData.dateOfBirth),
      gender: formData.gender,
      surclassement: formData.surclassement,
      typeInscription: formData.typeInscription,
      passSport: formData.passSport,
    }

    if (formData.typeInscription === 'NOUVELLE_LICENCE') {
      const success = await fillNouvelleLicence(payload)
      if (success) {
        await updateInscription(formData.id, {
          status: 'TRAITEE',
        })
      }
    } else {
      await fillRenouvellement(payload)
    }

    return { success: true }
  } catch (error) {
    const normalizedError = ErrorHandler.normalize(error)
    ErrorHandler.log(normalizedError)
    return {
      success: false,
      error: ErrorHandler.userMessage(error) || 'Erreur lors du remplissage du formulaire Extranet',
    }
  }
}
