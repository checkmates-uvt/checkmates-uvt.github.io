const agendaItems = [
  { date: '2026-01-30T14:45', room: 'AZ17' },
  { date: '2026-02-06T14:45', room: 'DZ10' },
  { date: '2026-02-13T14:45', room: 'DZ10' },
  { date: '2026-02-20T14:45', room: 'DZ10' },
  { date: '2026-02-27T14:45', room: 'DZ10' },
  { date: '2026-03-06T14:45', room: 'DZ7' },
  { date: '2026-03-13T14:45', room: 'DZ10' },
  { date: '2026-03-20T14:45', room: 'DZ7' },
  { date: '2026-03-27T14:45', room: 'DZ10' },
  { date: '2026-04-03T14:45', room: 'DZ10' },
  { date: '2026-04-10T14:45', room: 'DZ8' },
  { date: '2026-04-17T14:45', room: 'DZ8' },
  { date: '2026-04-24T14:45', room: 'DZ8' },
  { date: '2026-05-01T14:45', room: 'DZ8' },
  { date: '2026-05-08T14:45', room: 'DZ6' },
  { date: '2026-05-22T14:45', room: 'AZ17' },
  { date: '2026-05-29T14:45', room: 'DZ8' }
];

const now = new Date();
const agendaContainer = document.getElementById('agenda-container');
const MAX_ITEMS = 5;

// Filter upcoming items once
const upcomingItems = agendaItems.filter(
  item => new Date(item.date) >= now
);

function renderItems(items) {
  // wait half a second

  items.forEach(item => {
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

// Render first 5
setTimeout(() => {}, 500);
renderItems(upcomingItems.slice(0, MAX_ITEMS));

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
