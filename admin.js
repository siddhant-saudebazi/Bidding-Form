// Load current shops from localStorage
function loadCurrentShops() {
    const shopList = document.getElementById('current-shop-list');
    shopList.innerHTML = ''; // Clear existing list
    const shops = JSON.parse(localStorage.getItem('shops')) || [];

    shops.forEach((shop, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `${shop} <button class="btn btn-danger btn-sm" data-index="${index}">Remove</button>`;
        shopList.appendChild(li);
    });

    // Attach event listeners to remove buttons
    document.querySelectorAll('.btn-danger').forEach(button => {
        button.addEventListener('click', handleRemoveShop);
    });
}

// Add new shop
document.getElementById('add-shop-btn').addEventListener('click', () => {
    const shopNameInput = document.getElementById('shop-name');
    const shopName = shopNameInput.value.trim();

    if (!shopName) {
        alert('Shop name cannot be empty.');
        return;
    }

    const shops = JSON.parse(localStorage.getItem('shops')) || [];
    shops.push(shopName);
    localStorage.setItem('shops', JSON.stringify(shops));
    shopNameInput.value = '';
    loadCurrentShops();
    alert('Shop added successfully!');
});

// Remove shop
function handleRemoveShop() {
    const index = this.dataset.index;
    const shops = JSON.parse(localStorage.getItem('shops')) || [];
    shops.splice(index, 1);
    localStorage.setItem('shops', JSON.stringify(shops));
    loadCurrentShops();
    alert('Shop removed successfully!');
}

// Initialize shop list on page load
document.addEventListener('DOMContentLoaded', loadCurrentShops);
