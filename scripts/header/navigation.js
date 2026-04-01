import { getItem } from '../common/storage.js';
// import { getItem, setItem } from '../common/storage.js';
// import { renderWeek } from '../calendar/calendar.js';
// import { renderHeader } from '../calendar/header.js';
// import { getStartOfWeek, getDisplayedMonth } from '../common/time.utils.js';
import { getDisplayedMonth } from '../common/time.utils.js';


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
  // при переключении недели обновите displayedWeekStart в storage
  // и перерисуйте все необходимые элементы страницы (renderHeader, renderWeek, renderCurrentMonth)
};

export const initNavigation = () => {
  renderCurrentMonth();
  navElem.addEventListener('click', onChangeWeek);
};
