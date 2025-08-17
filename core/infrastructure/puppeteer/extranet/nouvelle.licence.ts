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
  passSport: string
}

// === FONCTION PRINCIPALE EXPORT ===

export default async function fillNouvelleLicence(inscription: InscriptionData): Promise<boolean> {
  try {
    // 1. Initialisation
    const { page, browser } = await initializeBrowser()

    // 1.1. Login
    await goToLoginPage(page)
    await login(page)
    await navigateToForm(page)
    await fillFormData(inscription, page)
    const success = await submitForm(page)
    if (success) {
      await closeBrowser(browser)
      return true
    }
    return false
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
  if (inscription.passSport) {
    const tarif = '190'
    await fillField(page, '#tarif', tarif, 'Pass Sport')
  }
  await fillSelect(page, 'sexe', inscription.gender)

  // Surclassement si nécessaire
  if (inscription.surclassement) {
    await checkBox(page, '#surclassementCheck', 'Surclassement')
  }

  console.log('✅ Formulaire rempli')
}

async function submitForm(page: Page): Promise<boolean> {
  try {
    if (!page) throw new Error('Page not initialized')
    const buttonSelector = '.boutonEnregistrer'
    const buttonAvertissementSelector = '.boutonEnregistrerModal'

    // Cliquer sur le bouton "Enregistrer"
    await waitForElement(page, buttonSelector)
    await page.click(buttonSelector)
    await waitForElement(page, buttonAvertissementSelector)
    await page.click(buttonAvertissementSelector)

    return true
  } catch (error) {
    const normalizedError = ErrorHandler.normalize(error)
    ErrorHandler.log(normalizedError)
    throw new Error(ErrorHandler.userMessage(error))
  }
}
