let storage = {
  selectedEventId: null,
  displayedWeekStart: null,
};

export const setItem = (key, value) => {
  if (key === 'displayedWeekStart') {
    localStorage.setItem('displayedWeekStart', JSON.stringify(value));
  } else {
    storage[key] = value;
  }
};

export const getItem = (key) => {
  if (key === 'displayedWeekStart') {
    const value = localStorage.getItem('displayedWeekStart');
    if (!value) return null;
    
    const parsedValue = JSON.parse(value);
    return new Date(parsedValue); 
  }
  return storage[key];
};