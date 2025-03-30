document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const welcomeScreen = document.getElementById('welcomeScreen');
    const simulatorScreen = document.getElementById('simulatorScreen');
    const moduleScreen = document.getElementById('moduleScreen');
    const startBtn = document.getElementById('startBtn');
    const nextBtn = document.getElementById('nextBtn');
    const backBtn = document.getElementById('backBtn');
    const backToConfigBtn = document.getElementById('backToConfigBtn');
    const blackSwanToggle = document.getElementById('blackSwanToggle');
    const blackSwanFrequency = document.getElementById('blackSwanFrequency');
    const difficultySlider = document.getElementById('difficulty');
    const difficultyValue = document.getElementById('difficultyValue');
    const frequencySlider = document.getElementById('frequency');
    const frequencyValue = document.getElementById('frequencyValue');
    const aiHelpBtns = document.querySelectorAll('.ai-help-btn');
    const aiHelpModal = document.getElementById('aiHelpModal');
    const closeModal = document.querySelector('.close-modal');
    const modalTitle = document.getElementById('modalTitle');
    const aiResponse = document.getElementById('aiResponse');
    const followupQuestion = document.getElementById('followupQuestion');
    const askFollowupBtn = document.getElementById('askFollowupBtn');
    const kpiModuleBtn = document.querySelector('#kpiModule .module-btn');
    const riskModuleBtn = document.querySelector('#riskModule .module-btn');

    // Current AI context
    let currentTerm = '';
    let conversationHistory = [];

    // Event Listeners
    startBtn.addEventListener('click', startSimulation);
    nextBtn.addEventListener('click', showModuleSelection);
    backBtn.addEventListener('click', goBackToWelcome);
    backToConfigBtn.addEventListener('click', goBackToConfig);
    blackSwanToggle.addEventListener('change', toggleBlackSwanFrequency);
    difficultySlider.addEventListener('input', updateDifficultyValue);
    frequencySlider.addEventListener('input', updateFrequencyValue);
    aiHelpBtns.forEach(btn => btn.addEventListener('click', showAIHelp));
    closeModal.addEventListener('click', closeAIHelp);
    askFollowupBtn.addEventListener('click', askFollowupQuestion);
    kpiModuleBtn.addEventListener('click', startKPISimulation);
    riskModuleBtn.addEventListener('click', startRiskSimulation);

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === aiHelpModal) {
            closeAIHelp();
        }
    });

    // Update slider values initially
    updateDifficultyValue();
    updateFrequencyValue();

    // Functions
    function startSimulation() {
        welcomeScreen.style.display = 'none';
        simulatorScreen.style.display = 'block';
    }

    function showModuleSelection() {
        simulatorScreen.style.display = 'none';
        moduleScreen.style.display = 'block';
    }

    function goBackToWelcome() {
        simulatorScreen.style.display = 'none';
        welcomeScreen.style.display = 'block';
    }

    function goBackToConfig() {
        moduleScreen.style.display = 'none';
        simulatorScreen.style.display = 'block';
    }

    function toggleBlackSwanFrequency() {
        blackSwanFrequency.style.display = blackSwanToggle.checked ? 'block' : 'none';
    }

    function updateDifficultyValue() {
        difficultyValue.textContent = difficultySlider.value;
    }

    function updateFrequencyValue() {
        frequencyValue.textContent = frequencySlider.value + '%';
    }

    function showAIHelp(event) {
        currentTerm = event.target.dataset.term;
        conversationHistory = [];
        
        // Set modal title based on term
        modalTitle.textContent = getTermName(currentTerm) + ' - AI Assistant';
        
        // Show loading state
        aiResponse.innerHTML = '<p>Loading AI response...</p>';
        
        // Show modal
        aiHelpModal.style.display = 'block';
        
        // Get initial AI response
        getAIResponse(currentTerm, '');
    }

    function closeAIHelp() {
        aiHelpModal.style.display = 'none';
        followupQuestion.value = '';
    }

    function askFollowupQuestion() {
        const question = followupQuestion.value.trim();
        if (question) {
            // Add user question to conversation
            conversationHistory.push({ role: 'user', content: question });
            
            // Show loading state
            aiResponse.innerHTML += `<div class="user-question"><strong>You:</strong> ${question}</div><p>AI is thinking...</p>`;
            followupQuestion.value = '';
            
            // Scroll to bottom
            aiResponse.scrollTop = aiResponse.scrollHeight;
            
            // Get AI response
            getAIResponse(currentTerm, question);
        }
    }

    function getAIResponse(term, question) {
        // In a real implementation, this would call an actual AI API
        // For this demo, we'll use simulated responses
        
        const responses = {
            marketSize: {
                initial: "Market size refers to the total number of potential customers or the total revenue potential for your product or service. Choosing the right market size is crucial - too small and you may limit growth, too large and you may face intense competition. Small markets (<1M) are easier to penetrate but have limited upside. Medium markets (1M-100M) offer good balance. Large markets (>100M) have high potential but require significant resources.",
                followups: {
                    "How do I estimate market size?": "To estimate market size: 1) Define your target customer, 2) Research industry reports, 3) Analyze competitors' performance, 4) Consider total addressable market (TAM), serviceable available market (SAM), and serviceable obtainable market (SOM).",
                    "What's better for a startup?": "For most startups, a medium market is ideal - large enough for growth but not so large that you can't compete. However, if you have a niche product, a small focused market might be better."
                }
            },
            fundingStatus: {
                initial: "Funding status indicates how your business is financed. Self-financing (bootstrapping) means using personal funds or revenue, giving you full control but potentially slower growth. Secured funding means you've raised money from investors, allowing faster scaling but with expectations for returns. Each approach has trade-offs in terms of control, risk, and growth potential.",
                followups: {
                    "When should I seek investors?": "Consider seeking investors when: 1) You've validated your product with early customers, 2) You need capital to scale quickly, 3) You're in a competitive market where speed matters, 4) You're ready to give up some control for growth.",
                    "How much should I self-fund?": "A good rule is to self-fund until you've proven your concept (MVP, some traction). This gives you more negotiating power with investors later."
                }
            },
            // Similar response structures for other terms...
            teamSize: {
                initial: "Team size affects your company's capabilities, culture, and overhead. Small teams (1-5) are agile with low costs but limited bandwidth. Medium teams (5-20) can handle more complexity while maintaining cohesion. Large teams (>20) enable specialization but require more management. Start small and grow as needed, being careful not to scale too quickly.",
                followups: {}
            },
            pricingStrategy: {
                initial: "Your pricing strategy impacts positioning and profitability. Cost-based pricing ensures margins but may ignore value. Market-based pricing matches competitors but can lead to price wars. Penetration pricing (low initial prices) helps gain share but may devalue your product. Premium pricing requires strong differentiation but yields higher margins. The best approach depends on your product, market, and goals.",
                followups: {}
            },
            difficulty: {
                initial: "Industry difficulty reflects competitive intensity and barriers to success. Low difficulty (0.1-0.3) means easier entry but potentially lower rewards. Medium (0.4-0.7) offers balanced competition. High (0.8-1.0) indicates tough competition but potentially greater rewards for winners. Choose strategies that match your difficulty level - differentiation in tough markets, execution in moderate ones.",
                followups: {}
            },
            blackSwan: {
                initial: "Black Swan events are unpredictable, high-impact occurrences that can dramatically affect your business (economic crashes, pandemics, etc.). The frequency setting determines how often these might occur in simulation. While you can't predict them, you can build resilience through: 1) Cash reserves, 2) Flexible operations, 3) Diverse revenue streams, 4) Scenario planning.",
                followups: {}
            }
        };

        // Simulate API delay
        setTimeout(() => {
            let responseText = '';
            
            if (!question) {
                // Initial response
                responseText = `<div class="ai-message"><strong>AI:</strong> ${responses[term].initial}</div>`;
            } else {
                // Follow-up response - check if we have a specific answer
                const specificAnswer = responses[term].followups[question];
                if (specificAnswer) {
                    responseText = `<div class="ai-message"><strong>AI:</strong> ${specificAnswer}</div>`;
                } else {
                    responseText = `<div class="ai-message"><strong>AI:</strong> I understand you're asking about ${question}. While I don't have a specific answer prepared, generally for ${getTermName(term)}, it's important to consider your specific business context and goals when making decisions in this area.</div>`;
                }
            }
            
            // Remove "Loading" and add response
            aiResponse.innerHTML = aiResponse.innerHTML.replace('<p>Loading AI response...</p>
