import * as cheerio from "cheerio";
import eventRepository from "../repositories/event.repository";

async function getEvents() {
  const html = await eventRepository.fetchEventList();
  const $ = cheerio.load(html);

  const events = $(".tbody .tr")
    .map((_, el) => {
      const anchor = $(el).find("a");
      const title = anchor.find(".subject .txt").text().trim();
      const period = anchor.find(".date").text().trim();
      const link = anchor.attr("href") ?? "";
      const img = anchor.find(".thumb img").attr("src");
      const imgUrl = img?.startsWith("//") ? "https:" + img : img ?? "";

      return { title, period, link, imgUrl };
    })
    .get();

  return events;
}

export default {
  getEvents,
};
