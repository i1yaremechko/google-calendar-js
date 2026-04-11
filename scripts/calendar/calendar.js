import { renderEvents } from '../events/eventRenderer.js';
import { renderCurrentMonth } from '../header/navigation.js';
import { renderHeader } from './header.js';
import { renderWeek } from './renderWeek.js';

export const renderCalendar = async () => {
  renderHeader();
  await renderWeek();
  renderCurrentMonth();
};

export const initCalendarSync = () => {
  setInterval(renderEvents, 10000);
};
