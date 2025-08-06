import express from "express";
import cors from "cors";
import puppeteer from "puppeteer";

const app = express();
const PORT = 3001;

app.use(cors());

app.get("/api/scrape", async (req, res) => {
  const keyword = req.query.keyword as string;

  if (!keyword) {
    return res.status(400).json({ error: "Palavra-chave ausente." });
  }

  const url = `https://www.amazon.com.br/s?k=${encodeURIComponent(keyword)}`;

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0");
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });

        try {
    await page.waitForSelector("[data-component-type='s-search-result']", { timeout: 60000 });
    } catch (e) {
    const pageContent = await page.content();
    console.log("HTML carregado:\n", pageContent.slice(0, 2000));
    throw new Error("O seletor esperado não foi encontrado. Verifique se a página foi bloqueada.");
    }


    const results = await page.$$eval("[data-component-type='s-search-result']", (items) =>
      items.map((item) => {
        const title = item.querySelector("h2 a span")?.textContent?.trim() || "";
        const stars = item.querySelector(".a-icon-alt")?.textContent?.trim() || "";
        const reviews = item.querySelector(".a-size-base")?.textContent?.trim() || "";
        const image = (item.querySelector("img") as HTMLImageElement)?.src || "";

        return { title, stars, reviews, image };
      })
    );

    await browser.close();
    res.json(results);
  } catch (error) {
    console.error("Erro no scraping:", error);
    res.status(500).json({ error: "Erro ao raspar dados da Amazon." });
  }
});

app.listen(PORT, () => {
  console.log(` Servidor rodando em http://localhost:${PORT}`);
});
