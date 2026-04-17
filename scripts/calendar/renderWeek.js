import { getItem, STORAGE_KEY_DISPLAYED_WEEK_START } from '../common/storage.js';
import { generateWeekRange } from '../common/time.utils.js';
import { renderEvents } from '../events/eventRenderer.js';
import { renderCurrentTimeLine } from './currentTimeLine.js';
import { generateDayMarkup } from './day.js';

export const renderWeek = async () => {
  const weekContainer = document.querySelector('.calendar__week');
  const displayedWeekStart = getItem(STORAGE_KEY_DISPLAYED_WEEK_START);
  const weekDates = generateWeekRange(displayedWeekStart);

  weekContainer.innerHTML = weekDates
    .map(date => generateDayMarkup(date))
    .join('');

  renderEvents();
  renderCurrentTimeLine();
};
