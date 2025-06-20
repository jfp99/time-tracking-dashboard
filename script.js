// DOM Elements
const activityCardsContainer = document.getElementById('activityCards');
const periodButtons = document.querySelectorAll('.period-btn');

// Load data
fetch('data.json')
.then(response => response.json())
.then(data => {
    // Initial render with weekly data
    renderActivityCards(data, 'weekly');

    //Add event listeners to period buttons
    periodButtons.forEach(button => {
        button.addEventListener('click', function() {
            periodButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            renderActivityCards(data, this.dataset.period);
        });
    });
})
.catch(error => console.error('Error loading data:', error));

// Function to render activity cards
function renderActivityCards(data, period) {
    activityCardsContainer.innerHTML = '';

    data.forEach(activity => {
        const card = document.createElement('div');
        card.className = `activity-card ${activity.title.toLowerCase().replace(' ', '-')}`;

        const currentHours = activity.timeframes[period].current;
        const previousHours = activity.timeframes[period].previous;

        card.innerHTML = `
        <div class="card-content">
            <div class="card-header">
                <h2 class="activity-title">${activity.title}</h2>
                <button class=menu-btn>...</button>
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
        case 'daily' : return 'Day';
        case 'weekly' : return 'Week';
        case 'monthly' : return 'Month';
        default: return 'Period';
    }
}