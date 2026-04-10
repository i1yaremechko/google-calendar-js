import { createNumbersArray } from '../common/createNumbersArray.js';
import { getItem } from '../common/storage.js';
import { generateWeekRange } from '../common/time.utils.js';
import { renderEvents } from '../events/renderer.js';


const generateDay = () => {
  const hours = createNumbersArray(0, 23);

  return hours.map(hour => {
    return `<div class="calendar__time-slot" data-time="${hour}"></div>`;
  }).join('');
};

export const renderCurrentTimeLine = () => {
  const oldLine = document.querySelector('.current-time-line');
  if (oldLine) oldLine.remove();

  const currentDate = new Date();
  const currentDayElem = document.querySelector(`.calendar__day[data-day="${currentDate.getDate()}"]`);
  if (!currentDayElem) return;

  const presentTime = document.createElement('div');
  presentTime.classList.add('current-time-line');
  const clockHeight = currentDate.getHours() * 60 + currentDate.getMinutes();
  presentTime.style.top = `${clockHeight}px`;

  currentDayElem.append(presentTime);
};

export const renderWeek = () => {
  const weekContainer = document.querySelector('.calendar__week');
  const displayedWeekStart = getItem('displayedWeekStart');
  const weekDates = generateWeekRange(displayedWeekStart);

  const weekMarkup = weekDates.map(date => {
    return `
      <div class="calendar__day" data-day="${date.getDate()}">
        ${generateDay()} 
      </div>
    `;
  }).join('');

  weekContainer.innerHTML = weekMarkup;
  renderEvents();
  renderCurrentTimeLine();
};

setInterval(renderCurrentTimeLine, 60000);

export const initCalendarSync = () => {
  window.addEventListener('storage', (event) => {
    if (event.key === 'calendar_events' || event.key === 'calendar_settings') {
      renderEvents(); 
    }
  });
};
