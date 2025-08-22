import eventRepository from "../repositories/event.repository";
import { EventItem } from "../types/event.type";

async function getEvents() {
  let allEvents: EventItem[] = [];

  for (let i = 1; i <= 4; i++) {
    const pageEvents = await eventRepository.fetchEventList(i);
    allEvents = [...allEvents, ...pageEvents];
  }

  const filterEvents = allEvents.filter((evt) => evt.state.includes("진행"));

  const uniqueEvents = Array.from(
    new Map(filterEvents.map((evt) => [evt.link, evt])).values()
  );

  const tatal = uniqueEvents.length;

  return { uniqueEvents, tatal };
}

export default {
  getEvents,
};
