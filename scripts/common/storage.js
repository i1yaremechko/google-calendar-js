const storageKey = 'calendar_events';

let storage = {
  eventIdToDelete: null,
  displayedWeekStart: null,
};

export const setItem = (key, value) => {
  if (key === 'events') {
    localStorage.setItem(storageKey, JSON.stringify(value));
  } else {
    storage[key] = value;
  }
};

export const getItem = (key) => {
  if (key === 'events') {
    return JSON.parse(localStorage.getItem(storageKey)) || [];
  }
  return storage[key];
};

window.addEventListener('storage', (event) => {
  if (event.key === storageKey) {
    window.dispatchEvent(new CustomEvent('eventsUpdated'));
  }
});
