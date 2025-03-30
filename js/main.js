// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Start button click handler
    document.getElementById('start-btn').addEventListener('click', function() {
        // Store user session
        sessionStorage.setItem('simulationStarted', 'true');
        sessionStorage.setItem('currentScenario', 'market-assessment');
        
        // Redirect to first scenario
        window.location.href = 'scenarios/market-assessment.html';
    });
    
    // Check if returning user
    if (sessionStorage.getItem('simulationStarted') === 'true') {
        const currentScenario = sessionStorage.getItem('currentScenario');
        if (currentScenario && currentScenario !== 'index') {
            // Show a "Continue" button
            const startBtn = document.getElementById('start-btn');
            startBtn.insertAdjacentHTML('afterend', 
                `<button id="continue-btn" class="btn btn-secondary" style="margin-left: 10px;">Continue Simulation</button>`);
            
            document.getElementById('continue-btn').addEventListener('click', function() {
                window.location.href = `scenarios/${currentScenario}.html`;
            });
        }
    }
});
