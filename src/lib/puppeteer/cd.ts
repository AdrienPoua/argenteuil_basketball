"use server";
import puppeteer, { Page, ElementHandle } from "puppeteer";
import { DBClubType } from "@/utils/types";

const cd95 = "https://resultats.ffbb.com/organisation/listeorganismes/846.html";

// Fonction pour lancer le navigateur
const launchBrowser = async () => {
  return puppeteer.launch({ headless: true });
};

// Fonction pour récupérer les liens des clubs
export const getLinks = async (): Promise<string[]> => {
  const browser = await launchBrowser();
  const page = await browser.newPage();
  try {
    await page.goto(cd95, { waitUntil: "networkidle2" });
    const links = await page.$$eval(".liste tr td > a", (anchors) => anchors.map((anchor) => anchor.href));
    if (links.length === 0) throw new Error("No links found");
    return links;
  } catch (error) {
    console.error("Error fetching links:", error);
    throw error;
  } finally {
    await browser.close();
  }
};

// Fonction pour aller à l'iframe de direction
const goToIframeDirection = async (page: Page) => {
  const iframe = await page.$("#idIframeDirection");
  const iframeUrl = await iframe?.evaluate((el) => el.getAttribute("src"));
  if (iframeUrl) {
    const absoluteIframeUrl = new URL(iframeUrl, page.url()).href;
    await page.goto(absoluteIframeUrl, { waitUntil: "load" });
  }
};

// Fonction pour extraire les données d'un tableau
const extractData = async (table: ElementHandle) => {
  await table.waitForSelector(".p120 .bolder");

  const roleElement = await table.$(".p120 .bolder");
  const memberElement = await table.$("tr:nth-child(2)");
  const emailElement = await table.$("a[href^='mailto:']");
  const numberElement = await table.$("tr:nth-last-child(2)");
  console.log("🚀 ~ extractData ~ numberElement:", numberElement);

  const number = (await numberElement?.evaluate((el) => el.textContent?.trim()))?.split(":")[1]?.trim() ?? "/";
  console.log("🚀 ~ extractData ~ number:", number);
  const role = (await roleElement?.evaluate((el) => el.textContent?.trim())) ?? "/";
  const member = (await memberElement?.evaluate((el) => el.textContent?.trim())) ?? "/";
  const email = (await emailElement?.evaluate((el) => el.textContent?.trim())) ?? "@";
  return { member, email, role, number };
};

// Fonction pour récupérer le nom du club
const getClubName = async (page: Page) => {
  const clubElement = await page.$("#idTdOrganisme tbody tr:first-child");
  const clubName = await clubElement?.evaluate((el) => el.textContent?.trim());
  return clubName ?? null;
};

const getTables = async (page: Page): Promise<ElementHandle<HTMLElement>[]> => {
  const tables = await page.$$(".cadre table");
  if (!tables) throw new Error("No tables found");
  return tables;
};
// Fonction principale pour scraper un lien spécifique
export const scrap = async (link: string): Promise<DBClubType | null> => {
  const browser = await launchBrowser();
  const page = await browser.newPage();
  try {
    await page.goto(link, { waitUntil: "load" });
    const name = await getClubName(page);
    if (!name) return null;
    await goToIframeDirection(page);
    const tables = await getTables(page);
    const members = [];
    for (const table of tables) {
      const data = await extractData(table);
      members.push(data);
    }
    return { name, members };
  } catch (error) {
    console.error("Error scraping link:", error);
    throw error;
  } finally {
    await page.close();
    await browser.close();
  }
};
