const storageKey = 'calendar_events';
const settingsKey = 'calendar_settings';

let storage = {
  eventIdToDelete: null,
  displayedWeekStart: null,
};

export const setItem = (key, value) => {
  if (key === 'events') {
    localStorage.setItem(storageKey, JSON.stringify(value));
  } else if (key === 'eventColor') {
    localStorage.setItem(settingsKey, JSON.stringify({ eventColor: value }));
  } else {
    storage[key] = value;
  }
};

export const getItem = (key) => {
  if (key === 'events') {
    return JSON.parse(localStorage.getItem(storageKey)) || [];
  }
  if (key === 'eventColor') {
    const settings = JSON.parse(localStorage.getItem(settingsKey));
    return settings ? settings.eventColor : '#2196f3';
  }
  return storage[key];
};

window.addEventListener('storage', (event) => {
  if (event.key === storageKey) {
    window.dispatchEvent(new CustomEvent('eventsUpdated'));
  }
});
