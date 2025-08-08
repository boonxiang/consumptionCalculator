function calculateEnergyComparison() {
    const nowImport = parseFloat(document.getElementById('importValueInputNow').value);
    const nowExport = parseFloat(document.getElementById('exportValueInputNow').value);
    const nowSolar = parseFloat(document.getElementById('solarGenInputNow').value);

    const lastImport = parseFloat(document.getElementById('importValueInputLast').value);
    const lastExport = parseFloat(document.getElementById('exportValueInputLast').value);
    const lastSolar = parseFloat(document.getElementById('solarGenInputLast').value);

    const errorNow = document.getElementById('monthlyYieldErrorNow');
    const errorLast = document.getElementById('monthlyYieldErrorLast');
    const outputNow = document.getElementById('monthlyYieldOutputNow');
    const outputLast = document.getElementById('monthlyYieldOutputLast');
    const comparisonResult = document.getElementById('comparisonResult');

    // Reset all messages and styling
    errorNow.textContent = '';
    errorLast.textContent = '';
    outputNow.textContent = '';
    outputLast.textContent = '';
    comparisonResult.textContent = '';
    comparisonResult.innerHTML = '';

    // Validate input values
    if ([nowImport, nowExport, nowSolar].some(val => isNaN(val) || val < 0)) {
        errorNow.textContent = "Please enter valid numbers for This Month.";
        return;
    }

    if ([lastImport, lastExport, lastSolar].some(val => isNaN(val) || val < 0)) {
        errorLast.textContent = "Please enter valid numbers for Last Month.";
        return;
    }

    // Calculate consumption
    const consumptionNow = nowImport + nowSolar - nowExport;
    const consumptionLast = lastImport + lastSolar - lastExport;
    const diffConsumption = consumptionNow - consumptionLast;
    const diffSolar = nowSolar - lastSolar;

    // Output consumption values
    outputNow.innerHTML = `<strong>Energy Consumption:</strong> ${consumptionNow.toFixed(2)} kWh`;
    outputLast.innerHTML = `<strong>Energy Consumption:</strong> ${consumptionLast.toFixed(2)} kWh`;

    // Highlighting logic
    const highlight1 = diffSolar < -100;
    const highlight2 = !highlight1 && diffConsumption > 100;
    const highlight3 = !highlight1 && !highlight2;

    // Styles
    const highlightStyle = "background-color: #ffe6e6; padding: 10px; border-radius: 6px; margin-bottom: 10px;";
    const normalStyle = "padding: 10px; border-radius: 6px; margin-bottom: 10px;";
    const neutralStyle = "background-color: #e6ffe6; padding: 10px; border-radius: 6px; margin-bottom: 10px;";

    // Build comparison result
    comparisonResult.innerHTML = `
        <h3>Comparison Result</h3>
        <p><strong>Solar Generation Difference:</strong> ${diffSolar.toFixed(2)} kWh</p>
        <p><strong>Energy Consumption Difference:</strong> ${diffConsumption.toFixed(2)} kWh</p>

        <div id="situation1" style="${highlight1 ? highlightStyle : normalStyle}">
            <li><strong>Low Solar Generation:</strong> If your solar generation is lower than last month, it means you had to rely more on TNB energy, which increases your bill.</li>
            <li>You may refer to this <a href="https://boonxiang.github.io/performanceCalculator-v2/" target="_blank">Solar Performance Calculator</a> for more information.</li>
        </div>
        <br>
        <div id="situation2" style="${highlight2 ? highlightStyle : normalStyle}">
            <li><strong>Higher Consumption:</strong> If your solar generation is similar but your energy consumption is higher than last month, your bill increased due to using more electricity.</li>
        </div>
        <br>
        <div id="situation3" style="${highlight3 ? neutralStyle : normalStyle}">
            <li><strong>Similar Usage:</strong> If both your solar generation and energy consumption are similar, then the higher TNB bill is likely caused by the <strong>new TNB tariff</strong>. You can check the <em>“How to Read TNB Bill”</em> section for more details.</li>
        </div>
    `;
}


