// Sample event and attendee data used to populate the dashboard.
const events = [
  { id: 1, name: 'Future Music Festival', type: 'Music', date: '2026-10-18', start: '14:00', end: '22:30', venue: 'Riverside Park', city: 'Austin, TX', price: 89, sold: 1240, total: 1800, image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=900&q=80', description: 'A full day of live performances, local food, and great company along the river.' },
  { id: 2, name: 'Tech Innovators Conference', type: 'Technology', date: '2026-10-24', start: '09:00', end: '17:00', venue: 'Austin Convention Center', city: 'Austin, TX', price: 249, sold: 684, total: 900, image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=80', description: 'Meet the people building what comes next. A day of practical talks and thoughtful conversations.' },
  { id: 3, name: 'Creative Design Workshop', type: 'Workshop', date: '2026-11-02', start: '10:00', end: '15:30', venue: 'Eastside Studio', city: 'Austin, TX', price: 65, sold: 42, total: 60, image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80', description: 'A hands-on design workshop covering visual storytelling, feedback, and creative collaboration.' },
  { id: 4, name: 'Business Leadership Summit', type: 'Business', date: '2026-11-12', start: '08:30', end: '16:00', venue: 'The Driskill Hotel', city: 'Austin, TX', price: 325, sold: 318, total: 500, image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=80', description: 'A focused summit for leaders sharing honest lessons on building strong, resilient teams.' },
  { id: 5, name: 'Startup Networking Night', type: 'Networking', date: '2026-11-20', start: '18:00', end: '21:00', venue: 'Capital Factory', city: 'Austin, TX', price: 25, sold: 96, total: 150, image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=80', description: 'An easygoing evening to meet founders, makers, and the people supporting Austin startups.' },
  { id: 6, name: 'Digital Marketing Masterclass', type: 'Marketing', date: '2026-12-05', start: '09:30', end: '13:00', venue: 'Springdale General', city: 'Austin, TX', price: 110, sold: 76, total: 120, image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80', description: 'Get practical ideas for useful content, smarter campaigns, and measuring what matters.' }
];

const attendees = [
  { id: 1, name: 'Olivia Chen', email: 'olivia.chen@email.com', eventId: 1, ticket: 'VIP', price: 179, registered: 'Sep 18, 2026', status: 'Checked In' },
  { id: 2, name: 'Marcus Johnson', email: 'marcus.j@email.com', eventId: 2, ticket: 'Regular', price: 249, registered: 'Sep 17, 2026', status: 'Pending' },
  { id: 3, name: 'Sofia Martinez', email: 'sofia.m@email.com', eventId: 3, ticket: 'Early Bird', price: 49, registered: 'Sep 16, 2026', status: 'Checked In' },
  { id: 4, name: 'Ethan Williams', email: 'ethan.w@email.com', eventId: 1, ticket: 'Regular', price: 89, registered: 'Sep 15, 2026', status: 'Pending' },
  { id: 5, name: 'Ava Patel', email: 'ava.patel@email.com', eventId: 4, ticket: 'VIP', price: 425, registered: 'Sep 14, 2026', status: 'Checked In' },
  { id: 6, name: 'Noah Thompson', email: 'noah.t@email.com', eventId: 5, ticket: 'Early Bird', price: 18, registered: 'Sep 13, 2026', status: 'Pending' },
  { id: 7, name: 'Isabella Rivera', email: 'isabella.r@email.com', eventId: 2, ticket: 'Regular', price: 249, registered: 'Sep 12, 2026', status: 'Checked In' },
  { id: 8, name: 'Liam Brooks', email: 'liam.brooks@email.com', eventId: 6, ticket: 'VIP', price: 165, registered: 'Sep 11, 2026', status: 'Pending' },
  { id: 9, name: 'Mia Thompson', email: 'mia.thompson@email.com', eventId: 3, ticket: 'Regular', price: 65, registered: 'Sep 10, 2026', status: 'Checked In' },
  { id: 10, name: 'James Wilson', email: 'james.w@email.com', eventId: 4, ticket: 'Early Bird', price: 275, registered: 'Sep 9, 2026', status: 'Pending' },
  { id: 11, name: 'Charlotte Kim', email: 'charlotte.k@email.com', eventId: 5, ticket: 'Regular', price: 25, registered: 'Sep 8, 2026', status: 'Pending' },
  { id: 12, name: 'Benjamin Carter', email: 'ben.carter@email.com', eventId: 6, ticket: 'Early Bird', price: 85, registered: 'Sep 7, 2026', status: 'Checked In' }
];

let currentStep = 1;
let selectedImageUrl = '';
let toastTimer;
const initialCheckedInCount = attendees.filter(attendee => attendee.status === 'Checked In').length;

const eventGrid = document.getElementById('event-grid');
const attendeeBody = document.getElementById('attendee-table-body');

function formatDate(dateText) {
  const date = new Date(`${dateText}T12:00:00`);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatTime(timeText) {
  const [hour, minute] = timeText.split(':').map(Number);
  const date = new Date();
  date.setHours(hour, minute);
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => {
    const characters = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    return characters[character];
  });
}

function getEvent(eventId) {
  return events.find(event => event.id === Number(eventId));
}

function renderEvents() {
  const selectedType = document.getElementById('event-filter').value;
  const visibleEvents = events.filter(event => selectedType === 'all' || event.type === selectedType);

  eventGrid.innerHTML = visibleEvents.map(event => {
    const percent = Math.min(100, Math.round(event.sold / event.total * 100));
    return `
      <article class="event-card">
        <div class="event-cover"><img src="${escapeHtml(event.image)}" alt="${escapeHtml(event.name)}"><span class="event-type">${escapeHtml(event.type)}</span></div>
        <div class="event-body">
          <h3>${escapeHtml(event.name)}</h3>
          <p class="event-detail-line"><span>▦</span><span>${formatDate(event.date)} · ${formatTime(event.start)}</span></p>
          <p class="event-detail-line"><span>⌖</span><span>${escapeHtml(event.venue)}, ${escapeHtml(event.city)}</span></p>
          <div class="event-ticket-row"><span>Tickets sold</span><strong>${event.sold.toLocaleString()} / ${event.total.toLocaleString()}</strong></div>
          <div class="progress-label"><span>Sales progress</span><span>${percent}%</span></div>
          <div class="progress-track" role="progressbar" aria-label="${event.name} tickets sold" aria-valuenow="${percent}" aria-valuemin="0" aria-valuemax="100"><span style="width:${percent}%"></span></div>
          <div class="event-footer"><span class="event-price">From $${event.price.toFixed(2)}</span><button class="view-event" data-event-id="${event.id}" type="button">View Details</button></div>
        </div>
      </article>`;
  }).join('') || '<p class="empty-message">No events match this filter.</p>';

  document.querySelectorAll('.view-event').forEach(button => {
    button.addEventListener('click', () => showEventDetails(Number(button.dataset.eventId)));
  });
  renderSalesOverview();
}

function renderSalesOverview() {
  document.getElementById('sales-overview').innerHTML = events.slice(0, 4).map(event => {
    const percent = Math.min(100, Math.round(event.sold / event.total * 100));
    return `<div class="sales-item"><span class="sales-item-name">${event.name}</span><div class="progress-track"><span style="width:${percent}%"></span></div><span class="sales-percent">${percent}%</span></div>`;
  }).join('');
}

function showEventDetails(eventId) {
  const event = getEvent(eventId);
  if (!event) return;
  const percent = Math.min(100, Math.round(event.sold / event.total * 100));
  document.getElementById('modal-content').innerHTML = `
    <img class="modal-event-image" src="${escapeHtml(event.image)}" alt="${escapeHtml(event.name)}">
    <span class="modal-type">${escapeHtml(event.type)}</span>
    <h2 id="modal-title">${escapeHtml(event.name)}</h2>
    <p class="modal-description">${escapeHtml(event.description)}</p>
    <div class="modal-details">
      <div><span>Date</span><strong>${formatDate(event.date)}</strong></div>
      <div><span>Time</span><strong>${formatTime(event.start)} – ${formatTime(event.end)}</strong></div>
      <div><span>Venue</span><strong>${escapeHtml(event.venue)}</strong></div>
      <div><span>City</span><strong>${escapeHtml(event.city)}</strong></div>
      <div><span>Ticket price</span><strong>From $${event.price.toFixed(2)}</strong></div>
      <div><span>Tickets sold</span><strong>${event.sold.toLocaleString()} of ${event.total.toLocaleString()}</strong></div>
    </div>
    <div class="modal-sales"><div class="progress-label"><span>Ticket sales</span><span>${percent}%</span></div><div class="progress-track"><span style="width:${percent}%"></span></div></div>`;
  const modal = document.getElementById('event-modal');
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.querySelector('.modal-close').focus();
}

function renderAttendees() {
  const search = document.getElementById('attendee-search').value.trim().toLowerCase();
  const eventId = document.getElementById('attendee-event-filter').value;
  const ticketType = document.getElementById('ticket-filter').value;
  const checkinStatus = document.getElementById('status-filter').value;

  const filteredAttendees = attendees.filter(attendee => {
    const event = getEvent(attendee.eventId);
    const matchesSearch = `${attendee.name} ${attendee.email}`.toLowerCase().includes(search);
    const matchesEvent = eventId === 'all' || attendee.eventId === Number(eventId);
    const matchesTicket = ticketType === 'all' || attendee.ticket === ticketType;
    const matchesStatus = checkinStatus === 'all' || attendee.status === checkinStatus;
    return matchesSearch && matchesEvent && matchesTicket && matchesStatus;
  });

  attendeeBody.innerHTML = filteredAttendees.map(attendee => {
    const event = getEvent(attendee.eventId);
    const initials = attendee.name.split(' ').map(part => part[0]).join('');
    const isCheckedIn = attendee.status === 'Checked In';
    return `<tr>
      <td><div class="attendee-person"><span class="attendee-initials">${initials}</span>${attendee.name}</div></td>
      <td>${event ? event.name : '—'}</td><td>${attendee.ticket}</td><td>$${attendee.price.toFixed(2)}</td><td>${attendee.registered}</td>
      <td><span class="status-badge ${isCheckedIn ? 'checked' : 'pending'}">${attendee.status}</span></td>
      <td><button class="checkin-button ${isCheckedIn ? 'undo' : ''}" data-attendee-id="${attendee.id}" type="button">${isCheckedIn ? 'Undo check-in' : 'Check In'}</button></td>
    </tr>`;
  }).join('') || '<tr><td colspan="7">No attendees found. Try changing your search or filters.</td></tr>';

  attendeeBody.querySelectorAll('.checkin-button').forEach(button => {
    button.addEventListener('click', () => toggleCheckIn(Number(button.dataset.attendeeId)));
  });
  document.getElementById('attendee-count').textContent = `Showing ${filteredAttendees.length} of ${attendees.length} attendees`;
  updateCheckinStats();
}

function toggleCheckIn(attendeeId) {
  const attendee = attendees.find(item => item.id === attendeeId);
  if (!attendee) return;
  attendee.status = attendee.status === 'Pending' ? 'Checked In' : 'Pending';
  renderAttendees();
}

function updateCheckinStats() {
  const checkedIn = attendees.filter(attendee => attendee.status === 'Checked In').length;
  const rate = attendees.length ? Math.round(checkedIn / attendees.length * 100) : 0;
  const totalCheckins = 1920 + checkedIn - initialCheckedInCount;
  document.getElementById('checkin-total').textContent = totalCheckins.toLocaleString();
  document.getElementById('checkin-rate').textContent = `${rate}%`;
  document.getElementById('checkin-rate-bar').style.width = `${rate}%`;
  document.getElementById('registered-count').textContent = attendees.length.toLocaleString();
  const today = new Date();
  const upcomingEvents = events.filter(event => {
    const eventDate = new Date(`${event.date}T00:00:00`);
    const daysUntilEvent = (eventDate - today) / 86400000;
    return daysUntilEvent >= 0 && daysUntilEvent <= 30;
  }).length;
  document.getElementById('upcoming-count').textContent = `${upcomingEvents} events`;
}

function populateEventFilter() {
  const select = document.getElementById('attendee-event-filter');
  select.innerHTML = '<option value="all">All events</option>' + events.map(event =>
    `<option value="${event.id}">${escapeHtml(event.name)}</option>`
  ).join('');
}

// Move through the event form and check required fields before continuing.
function validateCurrentStep() {
  const currentPanel = document.querySelector(`.form-step[data-step="${currentStep}"]`);
  let isValid = true;
  currentPanel.querySelectorAll('.field').forEach(field => {
    field.classList.remove('invalid');
    const input = field.querySelector('input, select, textarea');
    const error = field.querySelector('.field-error');
    let message = '';

    if (input.required && !input.value.trim()) {
      message = 'This field is required.';
    } else if (input.name === 'name' && input.value.trim().length < 3) {
      message = 'Event name must be at least 3 characters.';
    } else if (input.name === 'date' && input.value) {
      const chosenDate = new Date(`${input.value}T00:00:00`);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (chosenDate < today) message = 'Choose a date that is today or later.';
    } else if (input.name === 'price' && input.value !== '' && Number(input.value) < 0) {
      message = 'Ticket price cannot be negative.';
    } else if (input.name === 'totalTickets' && input.value !== '' && Number(input.value) <= 0) {
      message = 'Total tickets must be greater than 0.';
    }

    if (message) {
      field.classList.add('invalid');
      error.textContent = message;
      isValid = false;
    } else {
      error.textContent = '';
    }
  });
  return isValid;
}

function showStep(stepNumber) {
  currentStep = stepNumber;
  document.querySelectorAll('.form-step').forEach(panel => {
    panel.classList.toggle('active', Number(panel.dataset.step) === currentStep);
  });
  document.querySelectorAll('.step[data-step-indicator]').forEach(step => {
    const number = Number(step.dataset.stepIndicator);
    step.classList.toggle('active', number === currentStep);
    step.classList.toggle('complete', number < currentStep);
  });
  document.getElementById('step-count').textContent = `Step ${currentStep} of 4`;
  document.getElementById('previous-step').disabled = currentStep === 1;
  document.getElementById('next-step').hidden = currentStep === 4;
  document.getElementById('submit-event').hidden = currentStep !== 4;
  document.getElementById('form-general-error').textContent = '';
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

function handleNewEvent(event) {
  event.preventDefault();
  document.getElementById('form-message').textContent = '';
  document.getElementById('form-general-error').textContent = '';
  if (!validateCurrentStep()) return;

  const form = event.currentTarget;
  const formData = new FormData(form);
  const totalTickets = Number(formData.get('totalTickets'));
  const newEvent = {
    id: Date.now(),
    name: formData.get('name').trim(),
    type: formData.get('type'),
    date: formData.get('date'),
    start: formData.get('startTime'),
    end: formData.get('endTime'),
    venue: formData.get('venue').trim(),
    city: formData.get('city').trim(),
    price: Number(formData.get('price')),
    sold: 0,
    total: totalTickets,
    image: selectedImageUrl || 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=80',
    description: formData.get('description').trim()
  };

  if (!newEvent.name || !newEvent.date || !newEvent.venue || !newEvent.city ||
      !Number.isFinite(newEvent.price) || newEvent.price < 0 ||
      !Number.isInteger(totalTickets) || totalTickets <= 0) {
    document.getElementById('form-general-error').textContent = 'Please review your event details and ticket values.';
    return;
  }

  events.unshift(newEvent);
  document.getElementById('active-event-total').textContent = String(Number(document.getElementById('active-event-total').textContent) + 1);
  form.reset();
  selectedImageUrl = '';
  const preview = document.getElementById('image-preview');
  preview.removeAttribute('src');
  preview.classList.remove('visible');
  showStep(1);
  populateEventFilter();
  renderEvents();
  document.getElementById('form-message').textContent = 'Your event has been created successfully.';
  showToast(`${newEvent.name} was added to Upcoming Events.`);
}

function exportAttendees() {
  const rows = [['Attendee Name', 'Email', 'Event', 'Ticket Type', 'Ticket Price', 'Registration Date', 'Check-in Status']];
  attendees.forEach(attendee => {
    const event = getEvent(attendee.eventId);
    rows.push([attendee.name, attendee.email, event ? event.name : '', attendee.ticket, `$${attendee.price.toFixed(2)}`, attendee.registered, attendee.status]);
  });
  const csv = rows.map(row => row.map(value => `"${String(value).replace(/"/g, '""')}"`).join(',')).join('\r\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const downloadUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = 'gather-attendees.csv';
  link.click();
  setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
  showToast('Attendee list exported as CSV.');
}

function setTheme(isDark) {
  document.body.classList.toggle('dark-mode', isDark);
  localStorage.setItem('gather-theme', isDark ? 'dark' : 'light');
  document.getElementById('theme-icon').textContent = isDark ? '☀' : '☾';
  document.getElementById('theme-label').textContent = isDark ? 'Light mode' : 'Dark mode';
}

function updateFooterTime() {
  document.getElementById('last-updated').textContent = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  document.getElementById('today-label').textContent = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).toUpperCase();
}

const formDate = document.getElementById('form-date');
const localToday = new Date();
formDate.min = `${localToday.getFullYear()}-${String(localToday.getMonth() + 1).padStart(2, '0')}-${String(localToday.getDate()).padStart(2, '0')}`;

document.getElementById('event-filter').addEventListener('change', renderEvents);
['attendee-search', 'attendee-event-filter', 'ticket-filter', 'status-filter'].forEach(id => {
  document.getElementById(id).addEventListener(id === 'attendee-search' ? 'input' : 'change', renderAttendees);
});

document.getElementById('global-search').addEventListener('input', event => {
  const value = event.target.value.trim();
  document.getElementById('attendee-search').value = value;
  renderAttendees();
  const matchedEvent = events.find(item => item.name.toLowerCase().includes(value.toLowerCase()));
  document.getElementById('event-filter').value = matchedEvent ? matchedEvent.type : 'all';
  renderEvents();
});

document.getElementById('previous-step').addEventListener('click', () => {
  if (currentStep > 1) showStep(currentStep - 1);
});
document.getElementById('next-step').addEventListener('click', () => {
  if (validateCurrentStep() && currentStep < 4) showStep(currentStep + 1);
});
document.getElementById('event-form').addEventListener('submit', handleNewEvent);

document.getElementById('cover-photo').addEventListener('change', event => {
  const file = event.target.files[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    document.getElementById('form-general-error').textContent = 'Please choose an image file.';
    event.target.value = '';
    return;
  }
  if (selectedImageUrl) URL.revokeObjectURL(selectedImageUrl);
  selectedImageUrl = URL.createObjectURL(file);
  const preview = document.getElementById('image-preview');
  preview.src = selectedImageUrl;
  preview.classList.add('visible');
  document.getElementById('form-general-error').textContent = '';
});

document.getElementById('export-button').addEventListener('click', exportAttendees);
document.getElementById('theme-toggle').addEventListener('click', () => {
  setTheme(!document.body.classList.contains('dark-mode'));
});
setTheme(localStorage.getItem('gather-theme') === 'dark');

document.getElementById('notification-button').addEventListener('click', event => {
  const badge = event.currentTarget.querySelector('i');
  if (badge) badge.remove();
  event.currentTarget.setAttribute('aria-label', 'Notifications, all caught up');
  showToast('You’re all caught up on notifications.');
});
document.querySelector('.profile-more').addEventListener('click', () => {
  showToast('Signed in as Ahmed Organizer · Event Organizer.');
});

const eventModal = document.getElementById('event-modal');
function closeEventModal() {
  eventModal.classList.remove('open');
  eventModal.setAttribute('aria-hidden', 'true');
}
document.querySelector('.modal-close').addEventListener('click', closeEventModal);
document.querySelector('.modal-backdrop').addEventListener('click', closeEventModal);
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeEventModal();
});

const sidebar = document.getElementById('sidebar');
const sidebarBackdrop = document.getElementById('sidebar-backdrop');
const menuToggle = document.getElementById('menu-toggle');
function closeMobileMenu() {
  sidebar.classList.remove('mobile-open');
  sidebarBackdrop.classList.remove('visible');
  menuToggle.setAttribute('aria-expanded', 'false');
}
menuToggle.addEventListener('click', () => {
  const isOpen = sidebar.classList.toggle('mobile-open');
  sidebarBackdrop.classList.toggle('visible', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
sidebarBackdrop.addEventListener('click', closeMobileMenu);
document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', closeMobileMenu));

populateEventFilter();
renderEvents();
renderAttendees();
showStep(1);
updateFooterTime();
setInterval(updateFooterTime, 60000);
