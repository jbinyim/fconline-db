import got from "got";
import * as cheerio from "cheerio";

async function fetchEventList(page: number) {
  const html: string = await got(
    `https://fconline.nexon.com/news/events/ListPart?n4PageNo=${page}`
  ).then((r) => r.body);
  const $ = cheerio.load(html);

  const events = $(".tbody .tr")
    .map((_, el) => {
      const anchor = $(el).find("a");
      const title = anchor.find(".subject .txt").text().trim();
      const period = anchor.find(".date").text().trim();
      const link = anchor.attr("href") ?? "";
      const img = anchor.find(".thumb img").attr("src");
      const imgUrl = img?.startsWith("//") ? "https:" + img : img ?? "";
      const state = anchor.find(".state").text().trim();

      return { title, period, link, imgUrl, state };
    })
    .get();

  return events;
}

export default {
  fetchEventList,
};
