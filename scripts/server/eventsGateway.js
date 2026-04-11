const baseUrl = 'https://69d36635336103955f8eed65.mockapi.io/api/v1/events';

const handleResponse = res => {
  if (res.ok) {
    return res.json();
  }
  throw new Error('Internal Server Error');
};

export const getEventsList = () => 
  fetch(baseUrl).then(handleResponse);

export const createEvent = eventData => 
  fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(eventData),
  }).then(handleResponse);

export const updateEvent = (id, eventData) => 
  fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(eventData),
  }).then(handleResponse);

export const deleteEvent = id => 
  fetch(`${baseUrl}/${id}`, { method: 'DELETE' }).then(handleResponse);
