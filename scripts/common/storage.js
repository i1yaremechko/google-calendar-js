let storage = {
  eventIdToDelete: null,
  displayedWeekStart: null,
  events: [],
};

export const setItem = (key, value) => {
  storage[key] = value;
};

export const getItem = (key) => {
  return storage[key];
};

//example
const eventExample = {
  id: 0.7520027086457333,
  title: 'Title',
  description: 'Some description',
  start: new Date('2020-03-17T01:10:00.000Z'),
  end: new Date('2020-03-17T04:30:00.000Z'),
};
