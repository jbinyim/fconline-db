import got from "got";

async function fetchEventList() {
  const html: string = await got(
    "https://fconline.nexon.com/news/events/list"
  ).then((r) => r.body);

  return html;
}

export default {
  fetchEventList,
};
