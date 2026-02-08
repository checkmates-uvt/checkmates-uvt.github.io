const now = new Date();
const agendaContainer = document.getElementById('agenda-container');

fetch('/agenda.json')
  .then(response => {
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  })
  .then(data => {

    const future_items = data.filter(item => new Date(item.date) > now);

    if (page === 'agenda'){
      renderItems(future_items, limit=100);
    }
    else{
        renderItems(future_items, limit=5);
    }
    console.log(data)
    })
    .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    agendaContainer.innerHTML = '<p>No upcoming events found</p>';
    });


function renderItems(items, limit) {
  // wait half a second

  if (!items || items.length === 0) {
    agendaContainer.innerHTML = '<p>No upcoming events.</p>';
    return;
  }

  items.slice(0, limit).forEach(item => {

    const d = new Date(item.date);


    const formattedDate = `${d.getDate()}-${d.getMonth() + 1}`;

    const formattedTime = d.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    });

    const relativeTime = getRelativeTime(d);


    agendaContainer.insertAdjacentHTML('beforeend', `
      <div class="agenda-item">
        <div class="agenda-header">
          <h3>${item.title}</h3>
          <div class="agenda-relative-time">${relativeTime}</div>
        </div>
        <br>
        <p class="agenda-description">Drop in for a casual game of chess with fellow students. All skill levels are welcome!</p>
        <br>
        <div class="agenda-sub-group">
          <p class="agenda-time agenda-bubble"><img src="/images/clock-solid-full.svg" alt="Location Icon" class="location-icon" />${formattedDate} ${formattedTime} </p>
          <p class="agenda-location agenda-bubble"><img src="/images/location-dot-solid-full.svg" alt="Location Icon" class="location-icon" /> ${item.room}</p>
        </div>
      </div>
    `);
  });
}



function getRelativeTime(targetDate) {
  const now = new Date();
  const diffMs = targetDate - now;

  if (diffMs <= 0) return 'now';

  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);

  if (diffHours < 24) {
    return `in ${diffHours} hour${diffHours !== 1 ? 's' : ''}`;
  }

  if (diffDays < 14) {
    return `in ${diffDays} day${diffDays !== 1 ? 's' : ''}`;
  }

  return `in ${diffWeeks} week${diffWeeks !== 1 ? 's' : ''}`;
}
