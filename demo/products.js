// Products Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Debug log
    console.log('Products page loaded');

    // Get all product cards
    const productCards = document.querySelectorAll('.product-card');

    // Add hover effects
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            console.log('Card hover:', this.querySelector('h3').textContent);
        });

        // Add click handler for view details
        const detailsButton = card.querySelector('.view-details');
        if (detailsButton) {
            detailsButton.addEventListener('click', function(e) {
                // Add loading state
                this.style.opacity = '0.8';
                this.innerHTML = 'Loading... <i class="fas fa-spinner fa-spin"></i>';
                
                // Remove loading state after navigation
                setTimeout(() => {
                    this.style.opacity = '1';
                    this.innerHTML = 'View Details <i class="fas fa-arrow-right"></i>';
                }, 500);
            });
        }
    });

    // Lazy load images
    const images = document.querySelectorAll('.product-image img');
    const imageOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px 50px 0px'
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                }
                observer.unobserve(img);
            }
        });
    }, imageOptions);

    images.forEach(img => {
        if (img.dataset.src) {
            imageObserver.observe(img);
        }
    });

    // Filter functionality (if needed later)
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.dataset.filter;
                console.log('Filter selected:', filter);
                
                // Remove active class from all buttons
                filterButtons.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Filter products (to be implemented)
                filterProducts(filter);
            });
        });
    }
});

// Function to filter products (placeholder)
function filterProducts(filter) {
    const products = document.querySelectorAll('.product-card');
    products.forEach(product => {
        if (filter === 'all') {
            product.style.display = 'block';
        } else {
            if (product.dataset.category === filter) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        }
    });
} 