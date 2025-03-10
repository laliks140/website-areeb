document.addEventListener('DOMContentLoaded', function() {
    // Form handling
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Add loading state to button
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        // Simulate form submission (replace with actual form submission)
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
            submitBtn.style.backgroundColor = '#00cc66';
            
            // Reset form
            contactForm.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.backgroundColor = '';
            }, 3000);
        }, 2000);
    });

    // Floating shapes animation
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach(shape => {
        shape.style.top = `${Math.random() * 100}%`;
        shape.style.left = `${Math.random() * 100}%`;
    });
}); 