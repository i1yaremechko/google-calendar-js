import { getItem, setItem } from '../common/storage.js';
import { renderEvents } from '../events/events.js';

const settingsBtn = document.querySelector('.settings-btn');
const settingsModal = document.querySelector('.settings-modal');
const colorPicker = document.querySelector('#colorPicker');
const closeSettingsBtn = document.querySelector('.close-settings-btn');

export const initSettings = () => {
  settingsBtn.addEventListener('click', () => {
    colorPicker.value = getItem('eventColor');
    settingsModal.classList.remove('hidden');
  });

  colorPicker.addEventListener('input', (event) => {
    const newColor = event.target.value;
    setItem('eventColor', newColor);
    renderEvents();
  });

  closeSettingsBtn.addEventListener('click', () => {
    settingsModal.classList.add('hidden');
  });
};