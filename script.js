console.log('Loading agenda.json...');
fetch('/agenda.json')
  .then(response => {
    console.log(response)
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  })
  .then(data => {


    renderItems(data);


    agendaItems = data;
    })
    .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    });


const now = new Date();
const agendaContainer = document.getElementById('agenda-container');
const MAX_ITEMS = 5;


function renderItems(items) {
  // wait half a second

  items.forEach(item => {

    // only render if item date is in the future

    if (new Date(item.date) < now) return;

    const d = new Date(item.date);

    const formattedDate = d.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const formattedTime = d.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    });

    const relativeTime = getRelativeTime(d);


    agendaContainer.insertAdjacentHTML('beforeend', `
      <div class="agenda-item">
        <h3>${formattedDate} <span class="agenda-relative">(${relativeTime})</span></h3>
        <div class="agenda-sub-group"><p class="agenda-time">${formattedTime}</p><p>at </p><p class="agenda-location">${item.room}</p></div>
        <p class="agenda-sub-text">Open chess meeting</p>
        <p class="agenda-description">Drop in for a casual game of chess with fellow students. All skill levels are welcome!</p>
      </div>
    `);
  });
}


// Add "Show all" button if needed
if (upcomingItems.length > MAX_ITEMS) {
  const button = document.createElement('button');
  button.textContent = 'Show all';
  button.className = 'agenda-show-all';

  button.addEventListener('click', () => {
    renderItems(upcomingItems.slice(MAX_ITEMS));
    button.remove(); // hide button after clicking
  });

  agendaContainer.after(button);
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

  if (diffDays < 7) {
    return `in ${diffDays} day${diffDays !== 1 ? 's' : ''}`;
  }

  return `in ${diffWeeks} week${diffWeeks !== 1 ? 's' : ''}`;
}
