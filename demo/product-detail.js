document.addEventListener('DOMContentLoaded', function() {
    // Gallery functionality
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Update main image
            mainImage.src = this.src;
            
            // Update active thumbnail
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));

            // Add active class to clicked button and corresponding panel
            this.classList.add('active');
            document.getElementById(this.dataset.tab).classList.add('active');
        });
    });

    // Modal functionality
    const inquiryBtn = document.querySelector('.inquiry-btn');
    const inquiryModal = document.getElementById('inquiryModal');
    const closeModal = document.querySelector('.close-modal');
    const inquiryForm = document.getElementById('inquiryForm');

    inquiryBtn.addEventListener('click', function() {
        inquiryModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    closeModal.addEventListener('click', function() {
        inquiryModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', function(e) {
        if (e.target === inquiryModal) {
            inquiryModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Form submission
    inquiryForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your form submission logic here
        console.log('Form submitted');
        
        // Show success message
        alert('Thank you for your inquiry. We will contact you soon!');
        
        // Close modal
        inquiryModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Image zoom functionality (optional)
    let isZoomed = false;
    mainImage.addEventListener('click', function() {
        if (!isZoomed) {
            this.style.transform = 'scale(1.5)';
            this.style.cursor = 'zoom-out';
        } else {
            this.style.transform = 'scale(1)';
            this.style.cursor = 'zoom-in';
        }
        isZoomed = !isZoomed;
    });
}); 