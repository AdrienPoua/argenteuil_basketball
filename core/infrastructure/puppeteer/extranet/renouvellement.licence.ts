import { Page } from 'puppeteer'
import { ErrorHandler } from '@/core/shared/error/ErrorHandler'
import { goToLoginPage, initializeBrowser, login, navigateToForm, clickOnSearchBtn } from '../utils'

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
    await clickOnSearchBtn(page)
    await fillSearchField(page, inscription.lastName, inscription.firstName)

    console.log('🎉 Script terminé avec succès !')
  } catch (error) {
    const normalizedError = ErrorHandler.normalize(error)
    ErrorHandler.log(normalizedError)
    throw new Error(ErrorHandler.userMessage(error))
  } finally {
    // 5. Nettoyage
  }
}

async function fillSearchField(page: Page, lastName: string, firstName: string): Promise<void> {
  // Inputs selectors
  const lastNameField = '#rechercheLicenceModaleFormNom'
  const firstNameField = '#rechercheLicenceModaleFormPrenom'
  const searchBtn = '#rechercherModale'
  const resultsTable = '#tableauResultatsLicence'
  // Empty function
  async function emptyInput() {
    await page.keyboard.down('Control')
    await page.keyboard.press('KeyA')
    await page.keyboard.up('Control')
    await page.keyboard.press('Backspace')
  }
  // Empty table variable
  // Wait for them
  await page.waitForSelector(lastNameField, { visible: true })
  await page.waitForSelector(firstNameField, { visible: true })
  // Empty the inputs and fill them
  await page.click(lastNameField, { clickCount: 3 })
  await emptyInput()
  await page.type(lastNameField, lastName)

  await page.click(firstNameField, { clickCount: 3 })
  await emptyInput()
  await page.type(firstNameField, firstName)
  await page.click(searchBtn)
  await page.waitForSelector(resultsTable, { visible: true })
}
