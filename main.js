const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");
const darkModeToggle = document.getElementById("dark-mode-toggle");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute(
    "class",
    isOpen ? "ri-close-line" : "ri-menu-3-line"
  );
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-3-line");
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".header__image img", {
  duration: 1000,
});
ScrollReveal().reveal(".header__content h1", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".header__content .section__description", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".header__btn", {
  ...scrollRevealOption,
  delay: 1500,
});
ScrollReveal().reveal(".header__content .socials", {
  ...scrollRevealOption,
  delay: 2000,
});

ScrollReveal().reveal(".popular__card", {
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal(".discover__card img", {
  ...scrollRevealOption,
  origin: "left",
});
ScrollReveal().reveal(".discover__card:nth-child(2) img", {
  ...scrollRevealOption,
  origin: "right",
});
ScrollReveal().reveal(".discover__card__content h4", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".discover__card__content .section__description", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".discover__card__content h3", {
  ...scrollRevealOption,
  delay: 1500,
});
ScrollReveal().reveal(".discover__card__btn", {
  ...scrollRevealOption,
  delay: 2000,
});

ScrollReveal().reveal(".banner__content .section__header", {
  ...scrollRevealOption,
});
ScrollReveal().reveal(".banner__content .section__description", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".banner__card", {
  ...scrollRevealOption,
  delay: 1000,
  interval: 500,
});

ScrollReveal().reveal(".subscribe__content .section__header", {
  ...scrollRevealOption,
});
ScrollReveal().reveal(".subscribe__content .section__description", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".subscribe__content form", {
  ...scrollRevealOption,
  delay: 1000,
});

// Check local storage for dark mode preference
if (localStorage.getItem("darkMode") === "enabled") {
  document.body.classList.add("dark-mode");
  darkModeToggle.textContent = "☀️";
}

darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("darkMode", "enabled");
    darkModeToggle.textContent = "☀️";
  } else {
    localStorage.setItem("darkMode", "disabled");
    darkModeToggle.textContent = "🌙";
  }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

const backToTopBtn = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

let cart = [];

function toggleCart() {
    document.getElementById("cart-popup").classList.toggle("show");
}

function addToCart(name, price) {
    let existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCart();
}

function updateCart() {
    let cartList = document.getElementById("cart-items");
    let totalPrice = document.getElementById("total-price");

    cartList.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        let li = document.createElement("li");
        li.textContent = `${item.name} (x${item.quantity}) - $${item.price * item.quantity}`;
        
        let removeBtn = document.createElement("button");
        removeBtn.textContent =  "Remove";
        removeBtn.onclick = () => removeFromCart(index);

        li.appendChild(removeBtn);
        cartList.appendChild(li);
        
        total += item.price * item.quantity;
    });

    totalPrice.textContent = total;
}

function removeFromCart(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }
    updateCart();
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    alert(`Total amount: $${totalAmount}. Proceeding to checkout...`);
    
    cart = [];  // Clear cart after checkout
    updateCart();
}
function toggleCart() {
  document.getElementById("cart-popup").classList.toggle("show");
  document.getElementById("cart-overlay").classList.toggle("show");
}

let isLoginMode = true; // Toggle between Login & Signup

function toggleAuthPopup() {
  document.getElementById("auth-popup").classList.toggle("show");
  document.getElementById("auth-overlay").classList.toggle("show");
}

// Toggle Login <-> Signup
function toggleAuthMode() {
  let isLoginMode = document.getElementById("auth-title").textContent === "Login";
  document.getElementById("auth-title").textContent = isLoginMode ? "Sign Up" : "Login";
  document.querySelector("button").textContent = isLoginMode ? "Sign Up" : "Login";
  document.getElementById("auth-switch").innerHTML = isLoginMode
      ? "Already have an account? <a href='#' onclick='toggleAuthMode()'>Login</a>"
      : "Don't have an account? <a href='#' onclick='toggleAuthMode()'>Sign Up</a>";
}


// Authentication Logic
function authenticate() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (!username || !password) {
        alert("Please enter both username and password.");
        return;
    }

    if (isLoginMode) {
        // LOGIN
        let storedUser = JSON.parse(localStorage.getItem("user"));

        if (storedUser && storedUser.username === username && storedUser.password === password) {
            alert("Login successful!");
            localStorage.setItem("loggedInUser", username);
            updateUI();
        } else {
            alert("Invalid credentials!");
        }
    } else {
        // SIGNUP
        let newUser = { username, password };
        localStorage.setItem("user", JSON.stringify(newUser));
        alert("Account created! Please login.");
        toggleAuthMode(); // Switch to login mode
    }
}

// Update UI on Login
function updateUI() {
    let loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
        document.querySelector(".login-icon").style.display = "none";
        document.getElementById("logout-btn").style.display = "block";
        toggleAuthPopup(); // Close auth popup
    }
}

// Logout Function
function logout() {
    localStorage.removeItem("loggedInUser");
    document.querySelector(".login-icon").style.display = "inline";
    document.getElementById("logout-btn").style.display = "none";
}

// Check if user is already logged in
window.onload = updateUI;

function addToCart(name, price) {
  let existingItem = cart.find(item => item.name === name);
  if (existingItem) {
      existingItem.quantity++;
  } else {
      cart.push({ name, price, quantity: 1 });
  }
  updateCart();

  // Show an alert after adding an item to the cart
  alert(`${name} added to cart!`);
}

