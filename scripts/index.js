import { renderCalendar } from './calendar/calendar.js';
import { initCurrentTimeLine } from './calendar/currentTimeLine.js';
import { renderTimescale } from './calendar/timescale.js';
import { setItem } from './common/storage.js';
import { getStartOfWeek } from './common/time.utils.js';
import { initEventForm } from './events/createEvent.js';
import { initEvents } from './events/eventsController.js';
import { initNavigation } from './header/navigation.js';

document.addEventListener('DOMContentLoaded', () => {
  const startOfWeek = getStartOfWeek(new Date());
  setItem('displayedWeekStart', startOfWeek);

  renderTimescale();
  renderCalendar();
  
  initNavigation();
  initEvents();
  initEventForm();
  initCurrentTimeLine();
});
