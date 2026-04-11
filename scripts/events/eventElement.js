export const createEventElement = (event) => {
  const start = new Date(event.start);
  const end = new Date(event.end);

  const eventElem = document.createElement('div');
  eventElem.classList.add('event');
  eventElem.dataset.eventId = event.id;
  
  eventElem.style.backgroundColor = event.color || '#71a1e0';

  const durationInMinutes = (end.getTime() - start.getTime()) / (1000 * 60);
  eventElem.style.height = `${durationInMinutes}px`;
  eventElem.style.top = `${start.getHours() * 60 + start.getMinutes()}px`;

  const startHours = start.getHours().toString().padStart(2, '0');
  const startMinutes = start.getMinutes().toString().padStart(2, '0');
  const endHours = end.getHours().toString().padStart(2, '0');
  const endMinutes = end.getMinutes().toString().padStart(2, '0');

  eventElem.innerHTML = `
    <div class="event__title">${event.title}</div>
    <div class="event__time">${startHours}:${startMinutes} - ${endHours}:${endMinutes}</div>
    <div class="event__description">${event.description || ''}</div>
  `;

  return eventElem;
};
