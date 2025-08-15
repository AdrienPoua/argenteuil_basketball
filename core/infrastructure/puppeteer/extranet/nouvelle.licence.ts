import { Page } from 'puppeteer'
import { ErrorHandler } from '@/core/shared/error/ErrorHandler'
import {
  checkBox,
  closeBrowser,
  fillField,
  fillSelect,
  goToLoginPage,
  initializeBrowser,
  login,
  navigateToForm,
  waitForElement,
} from '../utils'

// Interface for the inscription data needed by this script
interface InscriptionData {
  firstName: string
  lastName: string
  email: string
  dateOfBirth: Date
  gender: string
  surclassement: boolean
}

// === FONCTION PRINCIPALE EXPORT ===

export default async function fillNouvelleLicence(inscription: InscriptionData): Promise<void> {
  try {
    // 1. Initialisation
    const { page } = await initializeBrowser()

    // 1.1. Login
    await goToLoginPage(page)
    await login(page)
    await navigateToForm(page)
    await fillFormData(inscription, page)

    // 4. Soumission
    // await submitForm(page)

    // 5. Fermeture
    //await closeBrowser(browser)

    console.log('🎉 Script terminé avec succès !')
  } catch (error) {
    const normalizedError = ErrorHandler.normalize(error)
    ErrorHandler.log(normalizedError)
    throw new Error(ErrorHandler.userMessage(error))
  } finally {
    // 5. Nettoyage
  }
}

// === SCRIPT PRINCIPAL ===

async function fillFormData(inscription: InscriptionData, page: Page): Promise<void> {
  if (!page) throw new Error('Page not initialized')
  if (
    !inscription.lastName ||
    !inscription.firstName ||
    !inscription.email ||
    !inscription.gender ||
    !inscription.dateOfBirth
  ) {
    throw new Error('Données invalides')
  }

  // Attendre que le formulaire soit chargé
  await waitForElement(page, '#formPreinscription')

  //  Voici les champs du formulaire

  // Remplir les champs obligatoires
  const dateFormatted = inscription.dateOfBirth.toLocaleDateString('fr-FR')
  await fillField(page, '#nom', inscription.lastName, 'Nom')
  await fillField(page, '#prenom', inscription.firstName, 'Prénom')
  await fillField(page, '#mail', inscription.email, 'Email')
  await fillField(page, '#dateNaissanceTd', dateFormatted, 'Date de naissance')
  await fillSelect(page, 'sexe', inscription.gender)

  // Surclassement si nécessaire
  if (inscription.surclassement) {
    await checkBox(page, '#surclassementCheck', 'Surclassement')
  }

  console.log('✅ Formulaire rempli')
}

// === EXPORTS INDIVIDUELS POUR USAGE AVANCÉ ===

export { initializeBrowser, navigateToForm, fillFormData, closeBrowser }
