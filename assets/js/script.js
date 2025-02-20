document.getElementById('current-year').textContent = new Date().getFullYear();

document.addEventListener('DOMContentLoaded', function() {
  const carousels = document.querySelectorAll('.carousel');

  carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const items = Array.from(track.children);
    const nextButton = carousel.querySelector('.carousel-control.next');
    const prevButton = carousel.querySelector('.carousel-control.prev');
    const itemsPerPage = carousel.classList.contains('items-1') ? 1 : 
                       carousel.classList.contains('items-2') ? 2 : 3;
    let currentPage = 0;
    let autoSlideInterval;
    let itemWidth = 0;
    let gap = 0;

    // Initialize carousel
    const initCarousel = () => {
      gap = parseInt(getComputedStyle(track).gap) || 0;
      const containerPadding = parseInt(getComputedStyle(carousel).paddingLeft) - 60;
      const availableWidth = carousel.offsetWidth - containerPadding;
      itemWidth = (availableWidth - (itemsPerPage - 1) * gap) / itemsPerPage;
      
      // items.forEach(item => {
      //   item.style.minWidth = `${itemWidth}px`;
      // });
    };

    // Create indicators
    const numIndicators = Math.ceil(items.length / itemsPerPage);
    const indicatorsContainer = carousel.querySelector('.carousel-indicators');
    indicatorsContainer.innerHTML = '';
    for (let i = 0; i < numIndicators; i++) {
      const indicator = document.createElement('div');
      indicator.classList.add('carousel-indicator');
      if (i === 0) indicator.classList.add('active');
      indicatorsContainer.appendChild(indicator);
    }
    const indicators = Array.from(indicatorsContainer.children);

    const updateIndicators = () => {
      indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === currentPage);
      });
    };

    const moveToPage = (pageIndex) => {
      const totalPages = Math.ceil(items.length / itemsPerPage);
      currentPage = (pageIndex + totalPages) % totalPages;
      
      const offset = currentPage * (itemWidth + gap) * itemsPerPage;
      track.style.transform = `translateX(-${offset}px)`;
      updateIndicators();
    };

    const startAutoSlide = () => {
      clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(() => {
        const nextPage = (currentPage + 1) % Math.ceil(items.length / itemsPerPage);
        moveToPage(nextPage);
      }, 10000);
    };

    // Event listeners
    nextButton.addEventListener('click', () => {
      moveToPage(currentPage + 1);
      startAutoSlide();
    });

    prevButton.addEventListener('click', () => {
      moveToPage(currentPage - 1);
      startAutoSlide();
    });

    indicators.forEach((indicator, i) => {
      indicator.addEventListener('click', () => moveToPage(i));
    });

    // Initialize and handle resize
    initCarousel();
    startAutoSlide();
    
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        initCarousel();
        moveToPage(currentPage);
      }, 250);
    });
  });

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');

document.querySelector('main').addEventListener('click', function (event) {
  if (event.target.tagName === 'IMG' && event.target.classList.contains('lightbox-enabled')) {
    lightbox.style.display = 'block';
    lightboxImg.src = event.target.src;
    lightboxCaption.textContent = event.target.alt;

    // Trigger the zoom-in effect after a short delay
    setTimeout(() => {
      lightboxImg.classList.add('zoom-in');
    }, 10); // Small delay to ensure the lightbox is rendered
  }
});

lightboxClose.addEventListener('click', function () {
  lightbox.style.display = 'none';
  lightboxImg.classList.remove('zoom-in'); // Reset zoom effect
});

lightbox.addEventListener('click', function (event) {
  if (event.target === lightbox) {
    lightbox.style.display = 'none';
    lightboxImg.classList.remove('zoom-in'); // Reset zoom effect
  }
});
});

// Select the hamburger button and the nav links
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav__links');

// Toggle the menu when the hamburger button is clicked
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');
});

// Close the menu when a link is clicked (optional)
navLinks.addEventListener('click', () => {
  navLinks.classList.remove('active');
  hamburger.classList.remove('active');
});