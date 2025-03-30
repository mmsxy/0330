// AI evaluation simulation
class AIEvaluator {
    constructor() {
        this.responses = {
            'kpi-setting': {
                'A': {
                    pros: [
                        "Ambitious target with the potential for increased brand awareness and market share",
                        "More advertising could attract new customers and boost repeat sales"
                    ],
                    cons: [
                        "Budget constraints might limit the effectiveness of increased spending",
                        "Market competition could reduce the impact of your marketing efforts",
                        "Focusing too much on short-term growth might affect long-term profitability"
                    ],
                    suggestions: [
                        "Evaluate past marketing ROI to ensure increased spending is justified",
                        "Consider diversifying marketing strategies to balance spend and reach",
                        "Monitor cash flow to avoid overextending resources"
                    ],
                    resources: [
                        {
                            title: "HubSpot Marketing Blog",
                            description: "Offers a wealth of marketing strategies and case studies to help optimize advertising and promotional activities.",
                            url: "https://blog.hubspot.com/marketing"
                        },
                        {
                            title: "Google Ads Guide",
                            description: "Learn how to use Google Ads for precise advertising to maximize effectiveness.",
                            url: "https://ads.google.com/intl/en_US/home/"
                        }
                    ]
                },
                'B': {
                    // Similar structure for option B
                },
                'C': {
                    // Similar structure for option C
                }
            }
            // Add more scenarios as needed
        };
    }
    
    evaluate(scenario, choice) {
        return new Promise((resolve) => {
            // Simulate AI processing delay
            setTimeout(() => {
                if (this.responses[scenario] && this.responses[scenario][choice]) {
                    resolve(this.responses[scenario][choice]);
                } else {
                    resolve({
                        error: "No evaluation available for this scenario and choice combination."
                    });
                }
            }, 1500); // 1.5 second delay to simulate processing
        });
    }
}

// Singleton instance
const aiEvaluator = new AIEvaluator();
