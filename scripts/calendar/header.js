import { openModal } from '../common/modal.js';
import { getItem } from '../common/storage.js';
import { generateWeekRange } from '../common/time.utils.js';

const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

export const renderHeader = () => {
  const headerContainer = document.querySelector('.calendar__header');
  
  const displayedWeekStart = getItem('displayedWeekStart');
  const weekDates = generateWeekRange(displayedWeekStart);

  const headerMarkup = weekDates.map(date => {
    const dayName = daysOfWeek[date.getDay()];
    
    const dayNumber = date.getDate();
    
    return `
      <div class="calendar__header-day" data-day="${dayNumber}">
        <span class="day-label">${dayName}</span>
        <span class="day-number">${dayNumber}</span>
      </div>
    `;
  }).join('');

  headerContainer.innerHTML = headerMarkup;
};

const createBtn = document.querySelector('.create-event-btn');
createBtn.addEventListener('click', openModal);
