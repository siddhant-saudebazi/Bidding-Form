const assignments = [];
let timerDuration = 5 * 60; // 5 minutes in seconds

// Load shops dynamically
function loadShops() {
    const shopList = document.getElementById('shop-list');
    shopList.innerHTML = ''; // Clear existing shops
    const shops = JSON.parse(localStorage.getItem('shops')) || ["Shop 1", "Shop 2", "Shop 3"];

    shops.forEach(shop => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `<button class="btn btn-primary assign-btn" data-shop="${shop}">Assign ${shop}</button>`;
        shopList.appendChild(li);
    });

    // Re-attach event listeners for new buttons
    document.querySelectorAll('.assign-btn').forEach(button => {
        button.addEventListener('click', handleShopAssignment);
    });
}

// Handle shop assignment
function handleShopAssignment() {
    const email = document.getElementById('email').value;

    if (!email) {
        alert('Please enter your Email ID before assigning a shop.');
        return;
    }

    const shopName = this.dataset.shop;
    const timestamp = new Date().toISOString();

    // Disable the button
    this.disabled = true;

    // Add to assignments array
    assignments.push({ email, shopName, timestamp });

    alert(`${shopName} assigned to ${email}`);
}

// Timer Logic
function startTimer() {
    const timerElement = document.getElementById('timer');

    const timerInterval = setInterval(() => {
        if (timerDuration <= 0) {
            clearInterval(timerInterval);
            disableForm();
            timerElement.textContent = 'Time Over!';
            return;
        }

        const minutes = Math.floor(timerDuration / 60);
        const seconds = timerDuration % 60;
        timerElement.textContent = `Time Left: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        timerDuration--;
    }, 1000);
}

// Disable Form After Timer
function disableForm() {
    document.querySelectorAll('.assign-btn').forEach(button => {
        button.disabled = true;
    });

    document.getElementById('email').disabled = true;
    document.getElementById('export-btn').disabled = true;

    alert('Time is up! No more responses are allowed.');
}

// Export to CSV
document.getElementById('export-btn').addEventListener('click', function () {
    if (assignments.length === 0) {
        alert('No data to export.');
        return;
    }

    let csvContent = 'Email,Shop Name,Timestamp\n';
    assignments.forEach(row => {
        csvContent += `${row.email},${row.shopName},${row.timestamp}\n`;
    });

    // Create a downloadable link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'assignments.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// Initialize shop list and start timer
document.addEventListener('DOMContentLoaded', () => {
    loadShops();
    startTimer();
});
