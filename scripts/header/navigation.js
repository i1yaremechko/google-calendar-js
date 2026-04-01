import { renderWeek } from '../calendar/calendar.js';
import { renderHeader } from '../calendar/header.js';
import shmoment from '../common/shmoment.js';
import { getItem, setItem } from '../common/storage.js';
import { getDisplayedMonth, getStartOfWeek } from '../common/time.utils.js';


const navElem = document.querySelector('.navigation');
const displayedMonthElem = document.querySelector(
  '.navigation__displayed-month'
);

function renderCurrentMonth() {
  const displayedWeekStart = getItem('displayedWeekStart');

  const currentMonthText = getDisplayedMonth(displayedWeekStart);

  displayedMonthElem.textContent = currentMonthText;
}

const onChangeWeek = (event) => {
  const button = event.target.closest('button');

  if (!button) return;

  const direction = button.dataset.direction;

  const displayedWeekStart = getItem('displayedWeekStart');
  let newStartDate;

  if (direction === 'next') {
    newStartDate = shmoment(displayedWeekStart).add('days', 7).result();
  } else if (direction === 'prev') {
    newStartDate = shmoment(displayedWeekStart).subtract('days', 7).result();
  } else if (direction === 'today') {
    newStartDate = getStartOfWeek(new Date());
  }

  setItem('displayedWeekStart', newStartDate);

  renderHeader();
  renderWeek();
  renderCurrentMonth();
};

export const initNavigation = () => {
  renderCurrentMonth();
  navElem.addEventListener('click', onChangeWeek);
};
