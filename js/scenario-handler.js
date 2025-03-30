// Scenario progression logic
document.addEventListener('DOMContentLoaded', function() {
    // Check if user has made selections in previous scenarios
    const checkPreviousSelections = () => {
        // This function would verify that all required previous selections are made
        // For now, just return true
        return true;
    };
    
    if (!checkPreviousSelections()) {
        // Redirect to first scenario if user tries to skip ahead
        window.location.href = 'market-assessment.html';
    }
    
    // Add event listener to all next buttons
    const nextButtons = document.querySelectorAll('.navigation .btn-primary');
    nextButtons.forEach(button => {
        if (button.id === 'next-btn') {
            button.addEventListener('click', function(e) {
                if (this.disabled) {
                    e.preventDefault();
                    alert('Please make a selection before proceeding.');
                }
            });
        }
    });
});
