document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
const activityCardsContainer = document.getElementById('activityCards');
const periodButtons = document.querySelectorAll('.period-btn');

// Set weekly as default active period
const defaultPeriod = 'weekly';

// Load data
fetch('data.json')
.then(response => response.json())
.then(data => {
    // Set weekly button as active initially
    periodButtons.forEach(btn => {
    if (btn.dataset.period === defaultPeriod) {
        btn.classList.add('active');
        btn.setAttribute('aria-current', 'true');
    }
    });
    
    // Initial render with weekly data
    renderActivityCards(data, defaultPeriod);
    
    // Add event listeners to period buttons
    periodButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Update active state
        periodButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-current', 'false');
        });
        this.classList.add('active');
        this.setAttribute('aria-current', 'true');
        
        // Render cards with selected period
        renderActivityCards(data, this.dataset.period);
    });
    });
})
.catch(error => console.error('Error loading data:', error));

// Function to render activity cards
function renderActivityCards(data, period) {
activityCardsContainer.innerHTML = '';

data.forEach(activity => {
    const card = document.createElement('article');
    card.className = `activity-card ${activity.title.toLowerCase().replace(' ', '-')}`;
    card.setAttribute('aria-labelledby', `card-${activity.title.toLowerCase().replace(' ', '-')}-heading`);
    
    const currentHours = activity.timeframes[period].current;
    const previousHours = activity.timeframes[period].previous;
    
    card.innerHTML = `
    <div class="card-content">
        <div class="card-header">
        <h3 id="card-${activity.title.toLowerCase().replace(' ', '-')}-heading" class="activity-title">${activity.title}</h3>
        <button class="menu-btn" aria-label="More options for ${activity.title}">...</button>
        </div>
        <div class="time-data">
        <div class="current-hours">${currentHours}hrs</div>
        <div class="previous-hours">Last ${getPreviousText(period)} - ${previousHours}hrs</div>
        </div>
    </div>
    `;
    
    activityCardsContainer.appendChild(card);
});
}

// Helper function to get previous period text
function getPreviousText(period) {
switch(period) {
    case 'daily': return 'Day';
    case 'weekly': return 'Week';
    case 'monthly': return 'Month';
    default: return 'Period';
}
}
});