export const renderCurrentTimeLine = () => {
  const oldLine = document.querySelector('.current-time-line');
  if (oldLine) oldLine.remove();

  const currentDate = new Date();
  const currentDayElem = document.querySelector(
    `.calendar__day[data-day="${currentDate.getDate()}"]`
  );
  
  if (!currentDayElem) return;

  const presentTime = document.createElement('div');
  presentTime.classList.add('current-time-line');
  const clockHeight = currentDate.getHours() * 60 + currentDate.getMinutes();
  presentTime.style.top = `${clockHeight}px`;

  currentDayElem.append(presentTime);
};

export const initCurrentTimeLine = () => {
  renderCurrentTimeLine();
  setInterval(renderCurrentTimeLine, 60000);
};
