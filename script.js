const splash = document.getElementById('splash');
const mainContent = document.getElementById('main-content');
const productList = document.getElementById('product-list');
const loadMoreBtn = document.getElementById('load-more');
const profileAvatar = document.getElementById('profile-avatar');

let products = [];
let currentIndex = 0;
const itemsPerPage = 6;

window.onload = async () => {
  profileAvatar.style.display = 'none';
  mainContent.style.display = 'none';

  try {
    const response = await fetch('https://fakestoreapi.com/products');
    products = await response.json();
  } catch (err) {
    console.error('Failed to fetch products:', err);
  }

  setTimeout(() => {
    splash.style.transition = 'opacity 0.8s ease';
    splash.style.opacity = 0;
    setTimeout(() => {
      splash.style.display = 'none';
      mainContent.style.display = 'block';
      profileAvatar.style.display = 'block';
      loadProducts();
    }, 800);
  }, 3000);

  loadMoreBtn.addEventListener('click', loadProducts);
};

function loadProducts() {
  const nextItems = products.slice(currentIndex, currentIndex + itemsPerPage);
  nextItems.forEach(p => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <img src="${p.image}" alt="${p.title}" />
      <h4>${p.title}</h4>
      <p>$${p.price.toFixed(2)}</p>
      <p>${p.category}</p>
    `;
    productList.appendChild(div);
  });

  currentIndex += itemsPerPage;

  if (currentIndex >= products.length) {
    loadMoreBtn.style.display = 'none';
  }
}
