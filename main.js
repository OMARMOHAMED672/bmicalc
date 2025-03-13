// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    
    // Get DOM elements using IDs for more reliable selection
    const maleButton = document.getElementById('male-btn');
    const femaleButton = document.getElementById('female-btn');
    const formContainer = document.getElementById('bmi-form-container');
    
    let selectedGender = null;
    
    console.log('Male button:', maleButton);
    console.log('Female button:', femaleButton);
    
    // Add event listeners to gender buttons
    maleButton.addEventListener('click', function() {
        console.log('Male button clicked');
        selectedGender = 'male';
        maleButton.classList.add('bg-blue-500', 'text-white');
        femaleButton.classList.remove('bg-pink-500', 'text-white');
        createBmiForm();
    });
    
    femaleButton.addEventListener('click', function() {
        console.log('Female button clicked');
        selectedGender = 'female';
        femaleButton.classList.add('bg-pink-500', 'text-white');
        maleButton.classList.remove('bg-blue-500', 'text-white');
        createBmiForm();
    });
    
    // Function to create BMI form
    function createBmiForm() {
        console.log('Creating BMI form');
        // Clear previous form if exists
        formContainer.innerHTML = '';
        
        // Create form HTML
        formContainer.innerHTML = `
            <div class="p-6 bg-white rounded-lg shadow-lg">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="height">
                        Height (cm)
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="height" type="number" placeholder="Height in cm">
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="weight">
                        Weight (kg)
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="weight" type="number" placeholder="Weight in kg">
                </div>
                <div class="flex items-center justify-center">
                    <button id="calculate-btn" class="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Calculate BMI
                    </button>
                </div>
                <div id="result" class="mt-6 text-center hidden">
                    <h2 class="text-2xl font-bold text-gray-800">Your BMI: <span id="bmi-value">0</span></h2>
                    <p class="text-lg mt-2">Category: <span id="bmi-category" class="font-semibold"></span></p>
                    <p id="bmi-message" class="mt-2 text-gray-600"></p>
                </div>
            </div>
        `;
        
        // Add event listener to calculate button
        document.getElementById('calculate-btn').addEventListener('click', calculateBMI);
    }
    
    // Function to calculate BMI
    function calculateBMI() {
        console.log('Calculating BMI');
        const height = parseFloat(document.getElementById('height').value);
        const weight = parseFloat(document.getElementById('weight').value);
        const resultDiv = document.getElementById('result');
        const bmiValue = document.getElementById('bmi-value');
        const bmiCategory = document.getElementById('bmi-category');
        const bmiMessage = document.getElementById('bmi-message');
        
        console.log('Height:', height, 'Weight:', weight);
        
        // Validate inputs
        if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
            alert('Please enter valid height and weight values');
            return;
        }
        
        // Calculate BMI: weight (kg) / (height (m))²
        const heightInMeters = height / 100;
        const bmi = weight / (heightInMeters * heightInMeters);
        const roundedBMI = bmi.toFixed(1);
        
        console.log('Calculated BMI:', roundedBMI);
        
        // Display result
        resultDiv.classList.remove('hidden');
        bmiValue.textContent = roundedBMI;
        
        // Determine BMI category
        let category, message;
        
        if (bmi < 18.5) {
            category = 'Underweight';
            message = 'You are underweight. Consider consulting with a healthcare professional about a balanced diet to gain weight healthily.';
            bmiCategory.className = 'font-semibold text-blue-500';
        } else if (bmi < 25) {
            category = 'Normal weight';
            message = 'You have a healthy weight. Maintain a balanced diet and regular exercise.';
            bmiCategory.className = 'font-semibold text-green-500';
        } else if (bmi < 30) {
            category = 'Overweight';
            message = 'You are overweight. Consider a balanced diet and regular exercise to reach a healthier weight.';
            bmiCategory.className = 'font-semibold text-yellow-500';
        } else {
            category = 'Obese';
            message = 'You are in the obese category. It is recommended to consult with a healthcare professional for guidance.';
            bmiCategory.className = 'font-semibold text-red-500';
        }
        
        bmiCategory.textContent = category;
        bmiMessage.textContent = message;
        
        // Add gender-specific advice if gender was selected
        if (selectedGender) {
            const genderAdvice = selectedGender === 'male' 
                ? 'Men typically have higher muscle mass which can affect BMI readings.'
                : 'Women typically have higher body fat percentage than men with the same BMI.';
            
            bmiMessage.textContent += ' ' + genderAdvice;
        }
    }
});