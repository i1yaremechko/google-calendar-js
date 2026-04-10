import { renderCurrentMonth } from '../header/navigation.js';
import { renderHeader } from './header.js';
import { renderWeek } from './renderWeek.js';

export const renderCalendar = () => {
  renderHeader();
  renderWeek();
  renderCurrentMonth();
};

export const initCalendarSync = () => {
  window.addEventListener('storage', (event) => {
    if (event.key === 'events') {
      renderEvents(); 
    }
  });
};
