// script.js

const conditions = {
    flu: {
        symptoms: {
            fever: 3,
            cough: 2,
            sore_throat: 2,
            muscle_aches: 2,
            fatigue: 2,
            runny_nose: 1,
            headache: 2,
        },
    },
    cold: {
        symptoms: {
            cough: 2,
            runny_nose: 3,
            sore_throat: 2,
            headache: 1,
            fatigue: 1,
        },
    },
    allergies: {
        symptoms: {
            runny_nose: 3,
            itchy_eyes: 3,
            sneezing: 2,
            cough: 1,
        },
    },
    covid: {
        symptoms: {
            fever: 3,
            cough: 3,
            fatigue: 2,
            loss_of_taste: 3,
            difficulty_breathing: 3,
        },
    },
};

document.getElementById('symptomForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const selectedSymptoms = Array.from(document.querySelectorAll('input[name="symptoms"]:checked')).map(checkbox => checkbox.value);
    
    const diagnosisScores = {};

    // Calculate scores for each condition based on selected symptoms
    for (const condition in conditions) {
        let totalScore = 0;
        for (const symptom of selectedSymptoms) {
            if (conditions[condition].symptoms[symptom]) {
                totalScore += conditions[condition].symptoms[symptom];
            }
        }
        diagnosisScores[condition] = totalScore;
    }

    // Determine the highest scoring condition
    let highestScore = 0;
    let likelyCondition = null;

    for (const condition in diagnosisScores) {
        if (diagnosisScores[condition] > highestScore) {
            highestScore = diagnosisScores[condition];
            likelyCondition = condition;
        }
    }

    // Provide feedback based on the highest scoring condition
    let resultText;
    if (highestScore === 0) {
        resultText = "No significant symptoms detected. Please monitor your health.";
    } else {
        resultText = `Based on your symptoms, you might have: ${likelyCondition.charAt(0).toUpperCase() + likelyCondition.slice(1)}.`;
    }

    // Display the result
    document.getElementById('result').innerText = resultText;
});