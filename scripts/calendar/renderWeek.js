import { getItem } from '../common/storage.js';
import { generateWeekRange } from '../common/time.utils.js';
import { renderEvents } from '../events/eventRenderer.js';
import { renderCurrentTimeLine } from './currentTimeLine.js';
import { generateDayMarkup } from './day.js';

export const renderWeek = async () => {
  const weekContainer = document.querySelector('.calendar__week');
  const displayedWeekStart = getItem('displayedWeekStart');
  const weekDates = generateWeekRange(displayedWeekStart);

  weekContainer.innerHTML = weekDates
    .map(date => generateDayMarkup(date))
    .join('');

  await renderEvents();
  renderCurrentTimeLine();
};
