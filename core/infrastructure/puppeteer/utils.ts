import puppeteer, { Browser, HTTPResponse, Page } from 'puppeteer'
import { ErrorHandler } from '@/core/shared/error/ErrorHandler'

let browser: Browser | null = null
let page: Page | null = null

export async function initializeBrowser(): Promise<{ browser: Browser; page: Page }> {
  console.log('🚀 Initialisation du navigateur...')
  browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: { width: 1280, height: 720 },
  })

  page = await browser.newPage()
  await page.setDefaultTimeout(30000)
  console.log('✅ Navigateur initialisé')
  return { browser, page }
}

export async function goToLoginPage(page: Page): Promise<void> {
  try {
    if (!page) throw new Error('Browser not initialized')
    const url = 'https://extranet.ffbb.com/fbi/connexion.fbi'
    await page.goto(url, {
      waitUntil: 'networkidle2',
    })
  } catch (error) {
    const normalizedError = ErrorHandler.normalize(error)
    ErrorHandler.log(normalizedError)
    throw new Error(ErrorHandler.userMessage(error))
  }
}

export async function login(page: Page): Promise<void> {
  try {
    // Le champ email, mot de passe et le boutton de connexion
    const emailField = await page.$('#materialLoginFormEmail')
    const passwordField = await page.$('#materialLoginFormPassword')
    const loginButton = await page.$("button[type='submit']")

    if (!emailField || !passwordField || !loginButton) {
      throw new Error('Champs email, mot de passe ou bouton de connexion non trouvés')
    }

    const email = process.env.EXTRANET_USERNAME
    const password = process.env.EXTRANET_PASSWORD

    if (!email || !password) {
      throw new Error('Email ou mot de passe non trouvés')
    }

    await emailField.type(email)
    await passwordField.type(password)
    await loginButton.click()

    await page.waitForNavigation({ waitUntil: 'networkidle2' })
  } catch (error) {
    const normalizedError = ErrorHandler.normalize(error)
    ErrorHandler.log(normalizedError)
    throw new Error(ErrorHandler.userMessage(error))
  }
}

export async function navigateToForm(page: Page): Promise<HTTPResponse | null> {
  const url = 'https://extranet.ffbb.com/fbi/afficherPreinscription.fbi?id=0'
  if (!page) throw new Error('Browser not initialized')

  console.log(`📍 Navigation vers: ${url}`)
  const response = await page.goto(url, {
    waitUntil: 'networkidle2',
  })
  return response
}

export async function closeBrowser(browser: Browser): Promise<void> {
  if (browser) {
    await browser.close()
    console.log('🔒 Navigateur fermé')
  }
}
export async function waitForElement(page: Page, selector: string): Promise<void> {
  await page.waitForSelector(selector, {
    visible: true,
  })
}

export async function fillField(
  page: Page,
  selector: string,
  value: string | undefined,
  fieldName: string,
): Promise<void> {
  if (!value) return

  try {
    await waitForElement(page, selector)
    await page.focus(selector)
    await page.evaluate((sel) => {
      const element = document.querySelector(sel) as HTMLInputElement
      if (element) element.value = ''
    }, selector)
    await page.type(selector, value)
    console.log(`  ✓ ${fieldName}: ${value}`)
  } catch (error) {
    console.warn(`  ⚠️ Impossible de remplir ${fieldName} (${selector}):`, error)
  }
}

export async function clickOnSearchBtn(page: Page): Promise<void> {
  await waitForElement(page, '.search-button-modal')
  const searchBtn = await page.$('.search-button-modal')
  if (!searchBtn) throw new Error('Bouton de recherche non trouvé')
  await searchBtn.click()
}

export async function fillSelect(page: Page, selectId: string, optionText: string, timeout = 5000) {
  try {
    // 1. Attendre que le bouton soit disponible
    const buttonSelector = `button[data-id="${selectId}"]`
    await page.waitForSelector(buttonSelector, { timeout })

    // 2. Ouvrir le dropdown
    await page.click(buttonSelector)

    // 3. Attendre que le menu soit ouvert
    await page.waitForSelector('.dropdown-menu.show', { timeout: 2000 })

    // 4. Cliquer sur l'option
    await page.evaluate((text) => {
      const spans = document.querySelectorAll('.dropdown-menu.show span.text')
      for (const span of spans) {
        if (span.textContent?.trim() === text) {
          span.parentElement?.click()
          return
        }
      }
      throw new Error(`Option "${text}" non trouvée`)
    }, optionText)

    console.log(`✅ Select "${selectId}" rempli avec "${optionText}"`)
  } catch (error) {
    const normalizedError = ErrorHandler.normalize(error)
    ErrorHandler.log(normalizedError)
    throw new Error(ErrorHandler.userMessage(error))
  }
}
export async function checkBox(page: Page, selector: string, fieldName: string): Promise<void> {
  try {
    await waitForElement(page, selector)
    await page.click(selector)
    console.log(`  ✓ ${fieldName}: coché`)
  } catch (error) {
    console.warn(`  ⚠️ Impossible de cocher ${fieldName} (${selector}):`, error)
  }
}

export async function selectOption(
  page: Page,
  selector: string,
  value: string | undefined,
  fieldName: string,
): Promise<void> {
  if (!value) return

  try {
    await waitForElement(page, selector)
    await page.select(selector, value)
    console.log(`  ✓ ${fieldName}: ${value}`)
  } catch (error) {
    console.warn(`  ⚠️ Impossible de sélectionner ${fieldName} (${selector}):`, error)
  }
}

export async function takeScreenshot(page: Page, filename: string): Promise<void> {
  const path = `${filename}-${Date.now()}.png`
  await page.screenshot({ path: path as `${string}.png`, fullPage: true })
  console.log(`📸 Screenshot: ${path}`)
}
