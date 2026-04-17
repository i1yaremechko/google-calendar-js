import { renderCalendar } from '../calendar/calendar.js';
import { openModal } from '../common/modal.js';
import shmoment from '../common/shmoment.js';
import { getItem, setItem, STORAGE_KEY_DISPLAYED_WEEK_START } from '../common/storage.js';
import { getDisplayedMonth, getStartOfWeek } from '../common/time.utils.js';

const navElem = document.querySelector('.navigation');
const displayedMonthElem = document.querySelector('.navigation__displayed-month');
const createBtn = document.querySelector('.create-event-btn');

export const renderCurrentMonth = () => {
  const displayedWeekStart = getItem(STORAGE_KEY_DISPLAYED_WEEK_START);
  const currentMonthText = getDisplayedMonth(displayedWeekStart);
  displayedMonthElem.textContent = currentMonthText;
}

const onChangeWeek = (event) => {
  const button = event.target.closest('button');
  if (!button) return;

  const { direction } = button.dataset.direction;
  const displayedWeekStart = getItem(STORAGE_KEY_DISPLAYED_WEEK_START);
  
  setItem(STORAGE_KEY_DISPLAYED_WEEK_START,
    direction === 'today'
      ? getStartOfWeek(new Date())
      : shmoment(displayedWeekStart) [direction === 'next' ? 'add' : 'substract']
      ('days', 7).result()
  );
  renderCalendar();
};

export const initNavigation = () => {
  renderCurrentMonth();
  
  navElem.addEventListener('click', onChangeWeek);
  
  if (createBtn) {
    createBtn.addEventListener('click', openModal);
  }
};
