import { getItem, setItem } from '../common/storage.js';

const settingsBtn = document.querySelector('.settings-btn');
const settingsModal = document.querySelector('.settings-modal');
const colorPicker = document.querySelector('#colorPicker');
const closeSettingsBtn = document.querySelector('.close-settings-btn');
const eventFormColorPicker = document.querySelector('.event-form input[name="color"]');

export const initSettings = () => {
  settingsBtn.addEventListener('click', () => {
    colorPicker.value = getItem('eventColor');
    settingsModal.classList.remove('hidden');
  });

  colorPicker.addEventListener('input', (event) => {
    const newColor = event.target.value;
    setItem('eventColor', newColor);
    
    if (eventFormColorPicker) {
      eventFormColorPicker.value = newColor;
    }
  });

  closeSettingsBtn.addEventListener('click', () => {
    settingsModal.classList.add('hidden');
  });
};