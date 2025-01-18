let search = document.querySelector('.search-box');
let navbar = document.querySelector('.navbar');
let menuIcon = document.querySelector('#menu-icon');
let searchIcon = document.querySelector('#search-icon');
let header = document.querySelector('header');
let cartCount = document.getElementById('cart-count');
let cart = JSON.parse(localStorage.getItem('cart')) || []; // Get cart from localStorage

// Update cart count on page load
updateCartCount();

// Toggle Search
if (searchIcon) {
    searchIcon.onclick = () => {
        search.classList.toggle('active');
        navbar.classList.remove('active');
    };
}

// Toggle Navbar
if (menuIcon) {
    menuIcon.onclick = () => {
        navbar.classList.toggle('active');
        search.classList.remove('active');
    };
}

// Scroll handling
window.onscroll = () => {
    navbar.classList.remove('active');
    search.classList.remove('active');
    document.getElementById('cart-details')?.classList.remove('show'); // Hide cart on scroll
    header.classList.toggle('shadow', window.scrollY > 0);
};

// Add product to cart
function addToCart(product) {
    cart.push(product);
    updateCartCount();
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update cart item count
function updateCartCount() {
    cartCount.innerText = cart.length;
}

// Show cart details
function showCart() {
    let cartDetails = document.getElementById('cart-details');
    cartDetails.innerHTML = "";
    if (cart.length === 0) {
        cartDetails.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        cart.forEach(product => {
            let productElement = document.createElement('div');
            productElement.classList.add('cart-item');
            productElement.innerHTML = `<h4>${product.name}</h4><p>Price: $${product.price}</p>`;
            cartDetails.appendChild(productElement);
        });
    }
    cartDetails.classList.toggle('show');
}

// Add event listener to "Add to Cart" buttons
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', (event) => {
        let product = {
            name: event.target.dataset.productName,
            price: event.target.dataset.productPrice
        };
        addToCart(product);
    });
});

// Cart icon click event to show/hide cart
document.getElementById('cart-icon').addEventListener('click', showCart);

window.addEventListener('scroll', function () {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((element) => {
       const position = element.getBoundingClientRect();
       if (position.top < window.innerHeight) {
          element.classList.add('visible');
       }
    });
 });
//log in
 document.querySelector('form').addEventListener('submit', function(event) {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
 
    if (username === '' || password === '') {
       event.preventDefault();  // يمنع إرسال النموذج إذا كانت الحقول فارغة
       alert('Please fill in both fields.');
    }
 });

 let currentIndex = 0; // حفظ الفهرس الحالي للصورة

const sliderContainer = document.querySelector('.slider-container');
const images = document.querySelectorAll('.slider-container img');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

// التمرير إلى الصورة السابقة
prevButton.addEventListener('click', () => {
   if (currentIndex > 0) {
      currentIndex--;
   } else {
      currentIndex = images.length - 1; // العودة إلى الصورة الأخيرة
   }
   updateSlider();
});

// التمرير إلى الصورة التالية
nextButton.addEventListener('click', () => {
   if (currentIndex < images.length - 1) {
      currentIndex++;
   } else {
      currentIndex = 0; // العودة إلى الصورة الأولى
   }
   updateSlider();
});

// تحديث موقع السلايدر بناءً على الفهرس الحالي
function updateSlider() {
   const offset = -currentIndex * 100; // تحريك السلايدر بناءً على الفهرس
   sliderContainer.style.transform = `translateX(${offset}%)`;
}

 