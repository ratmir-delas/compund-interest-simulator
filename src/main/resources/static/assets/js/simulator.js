function initializeInvestmentSimulator(translations) {

    // Get the language from the HTML tag
    //var language = document.querySelector('html').getAttribute('lang');

    // Function to update the value of an input field
    const initial_deposit = document.querySelector('#initial_deposit'),
        contribution_amount = document.querySelector('#contribution_amount'),
        investment_timespan = document.querySelector('#investment_timespan'),
        investment_timespan_text = document.querySelector('#investment_timespan_text'),
        estimated_return = document.querySelector('#estimated_return'),
        future_balance = document.querySelector('#future_balance'),
        estimated_inflation = document.querySelector('#estimated_inflation'),
        estimated_tax = document.querySelector('#estimated_tax')
    ;


    ////////////////////////////////////////////// GRAPHIC SECTION ///////////////////////////////////////////////////

    // getChartData() explanation
    /*
    Inputs: It takes user inputs like initial deposit, estimated return, regular contributions, and rates of tax and inflation.

    Data Preparation: It creates datasets for principal amount, cumulative interest, tax, and inflation effects, covering the investment duration.

    Calculations: The function computes the yearly balance, accounting for compounded interest, regular contributions, tax deductions, and inflation.

    Output: It returns an object with time labels (years) and datasets, used to plot a chart illustrating the investment's growth and impacts over time.
    */

    // Returns chart data
    function getChartData() {
        var _initial_deposit = parseFloat(initial_deposit.dataset.value),
            _estimated_return = parseFloat(estimated_return.dataset.value / 100),
            _contribution_amount = parseFloat(contribution_amount.dataset.value),
            _capitalization_frequency = parseInt(document.querySelector('[name="compound_period"]:checked').value),
            _contribution_frequency = parseInt(document.querySelector('[name="contribution_period"]:checked').value),
            _investment_duration = parseInt(investment_timespan.value),
            _current_year = (new Date()).getFullYear(),
            _estimatedInflation = parseFloat(estimated_inflation.dataset.value / 100),
            _estimatedTax = parseFloat(estimated_tax.dataset.value / 100);

        var labels = [];
        for (var y = _current_year; y < _current_year + _investment_duration; y++) {
            labels.push(y);
        }

        var principal_dataset = { label: translations.principalAmount, backgroundColor: 'rgb(0, 123, 255)', data: [] };
        var interest_dataset = { label: translations.interest, backgroundColor: 'rgb(23, 162, 184)', data: [] };
        var tax_dataset = { label: translations.tax, backgroundColor: 'rgb(220, 53, 69)', data: [] };
        var inflation_dataset = { label: translations.inflation, backgroundColor: 'rgb(255, 193, 7)', data: [] };

        var balance = _initial_deposit;
        var cumulativeInterest = 0, cumulativeTax = 0, cumulativeInflation = 0;

        // Annual statistics
        for (var year = _current_year; year < _current_year + _investment_duration; year++) {
            var interest = 0;
            for (var period = 0; period < _capitalization_frequency; period++) {
                if (period % (_capitalization_frequency / _contribution_frequency) === 0) {
                    balance += _contribution_amount;
                }
                interest += balance * _estimated_return / _capitalization_frequency;
            }

            var tax = interest * _estimatedTax;
            var inflation = balance * _estimatedInflation;

            cumulativeInterest += interest;
            cumulativeTax += tax;
            cumulativeInflation += inflation;

            // Update the datasets
            principal_dataset.data.push((balance + cumulativeInterest).toFixed(2));
            interest_dataset.data.push(cumulativeInterest.toFixed(2));
            tax_dataset.data.push(-cumulativeTax.toFixed(2));
            inflation_dataset.data.push(-cumulativeInflation.toFixed(2));
        }

        future_balance.innerHTML = (balance + cumulativeInterest - cumulativeTax - cumulativeInflation).toFixed(2) + '€';

        return {
            labels: labels,
            datasets: [principal_dataset, interest_dataset, tax_dataset, inflation_dataset]
        };
    }


    // Update chart data
    function updateChart() {
        var data = getChartData();

        chart.data.labels = data.labels;
        chart.data.datasets[0].data = data.datasets[0].data;
        chart.data.datasets[1].data = data.datasets[1].data;
        chart.data.datasets[2].data = data.datasets[2].data;
        chart.data.datasets[3].data = data.datasets[3].data;
        chart.update();
    }

    // Configuração do gráfico
    var ctx = document.getElementById('myChart').getContext('2d'),
        chart = new Chart(ctx, {
            type: 'bar',
            data: getChartData(),
            options: {
                legend: {
                    display: false
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function (tooltipItem, data) {
                            return data.datasets[tooltipItem.datasetIndex].label + ': ' + tooltipItem.yLabel + '€';
                        }
                    }
                },
                responsive: true,
                scales: {
                    x: {
                        stacked: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Ano'
                        }
                    },
                    y: {
                        stacked: true,
                        ticks: {
                            callback: function (value) {
                                return value + '€';
                            }
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Saldo'
                        }
                    }
                }
            }
        });

    ////////////////////////////////////////////// FORM BUTTONS SECTION ///////////////////////////////////////////////////

    // Refresh the chart when the inflation or tax rate changes
    function updateValue(element, action) {
        var min = parseFloat(element.getAttribute('min')),
            max = parseFloat(element.getAttribute('max')),
            step = parseFloat(element.getAttribute('step')) || 1,
            oldValue = element.dataset.value || element.defaultValue || 0,
            newValue = parseFloat(element.value.replace(/€/, ''));

        // Verifies if the newValue is a number, if not, reverts to oldValue
        if (isNaN(parseFloat(newValue))) {
            newValue = oldValue;
        } else {
            // Check if the newValue is a number, if not, revert to oldValue
            if (isNaN(newValue)) {
                newValue = oldValue;
            } else {
                if (action === 'add') {
                    newValue += step; // Increment and cap at max
                } else if (action === 'sub') {
                    newValue -= step; // Decrement and cap at min
                }

                if (newValue >= max) {
                    alert(translations.maxValueReached);
                    newValue = Math.max(Math.min(newValue, max), min);
                }
            }

            //newValue = newValue < min ? min : newValue > max ? max : newValue;
        }

        // Prevent newValue from going below the minimum value
        newValue = Math.max(newValue, min);

        // Update element value
        element.dataset.value = newValue;
        element.value = (element.dataset.prepend || '') + newValue + (element.dataset.append || '€');

        updateChart();
    }

    // Initial deposit
    initial_deposit.addEventListener('change', function () {
        updateValue(this);
    });
    initial_deposit.addEventListener('input', function () {
        updateValue(this);
    });

    // Contribution amount
    contribution_amount.addEventListener('change', function () {
        updateValue(this);
    });
    contribution_amount.addEventListener('input', function () {
        updateValue(this);
    });

    // Investment timespan
    investment_timespan.addEventListener('change', function () {
        investment_timespan_text.innerHTML = this.value;
        updateChart();
    });
    investment_timespan.addEventListener('input', function () {
        investment_timespan_text.innerHTML = this.value;
    });

    // Estimated return
    estimated_return.addEventListener('change', function () {
        updateValue(this);
    });
    estimated_return.addEventListener('input', function () {
        updateValue(this);
    });

    // Estimated tax
    estimated_tax.addEventListener('change', function () {
        updateValue(this);
    });
    estimated_tax.addEventListener('input', function () {
        updateValue(this);
    });

    // Estimated inflation
    estimated_inflation.addEventListener('change', function () {
        updateValue(this);
    });
    estimated_inflation.addEventListener('input', function () {
        updateValue(this);
    });



    var radios = document.querySelectorAll('[name="contribution_period"], [name="compound_period"]');
    for (var j = 0; j < radios.length; j++) {
        radios[j].addEventListener('change', updateChart);
    }

    var buttons = document.querySelectorAll('[data-counter]');

    // Add event listeners to increment and decrement buttons
    for (var i = 0; i < buttons.length; i++) {
        var button = buttons[i];

        button.addEventListener('click', function () {
            var field = document.querySelector('[name="' + this.dataset.field + '"]'),
                action = this.dataset.counter;

            if (field) {
                updateValue(field, action);
            }
        });
    }


    // Reset button
    function resetValues() {
        // Redefine cada campo de entrada para o seu valor inicial
        document.getElementById('initial_deposit').value = '5000€';
        document.getElementById('contribution_amount').value = '100€';
        document.getElementById('estimated_return').value = '5.00%';
        document.getElementById('investment_timespan').value = '5';
        document.getElementById('compound_period_monthly').checked = true;
        //investment_timespan_text.innerHTML = '5';

        updateChart(); // Atualiza o gráfico com os valores padrão
    }

    // Adiciona um event listener ao botão de reset
    document.getElementById('button-reset').addEventListener('click', resetValues);



    /// Increment and decrement buttons
    // Variable to store the timer and timeout
    var repeatTimer, startTimer;

    function startIncrementing(field, action) {
        // Function to update the value
        function increment() {
            updateValue(field, action);
        }

        // Define the speed based on the field
        var time;
        if (field.name === "estimated_return") {
            time = 300;
        } else if (field.name === "initial_deposit") {
            time = 100;
        } else {
            time = 200;
        }

        // Clear any existing timer to prevent multiple intervals
        clearInterval(repeatTimer);

        // Start incrementing after a specified delay (500ms)
        startTimer = setTimeout(function() {
            repeatTimer = setInterval(increment, time);
        }, 500); // Delay of 500 milliseconds
    }

    function stopIncrementing() {
        // Clear both the interval and the delayed start timer
        clearInterval(repeatTimer);
        clearTimeout(startTimer);
        repeatTimer = null;
        startTimer = null;
    }

    // Add event listeners to increment and decrement buttons
    buttons.forEach(function(button) {
        button.addEventListener('mousedown', function() {
            var field = document.querySelector('[name="' + this.dataset.field + '"]');
            var action = this.dataset.counter;
            startIncrementing(field, action);
        });

        // Stop incrementing when mouse leaves the button while pressed
        button.addEventListener('mouseleave', stopIncrementing);
    });

    // Listen for mouseup on the entire document
    document.addEventListener('mouseup', stopIncrementing);



    ////////////////////////////////////////////// HISTORY SECTION ///////////////////////////////////////////////////

    // Save calculation to history
    document.getElementById('button-save').addEventListener('click', function() {
        //ask for calculation name
        var calculationName = prompt(translations.enterCalculationName);
        if (calculationName) {
            const duration = document.getElementById('investment_timespan').value;
            const initialDeposit = document.getElementById('initial_deposit').value;
            const contribution = document.getElementById('contribution_amount').value;
            const returnRate = document.getElementById('estimated_return').value;
            const inflationRate = document.getElementById('estimated_inflation').value;
            const taxRate = document.getElementById('estimated_tax').value;
            const futureBalance = document.getElementById('future_balance').textContent;

            // Retrieve the selected values for frequencies
            const contributionFrequency = document.querySelector('[name="contribution_period"]:checked').value;
            const capitalizationFrequency = document.querySelector('[name="compound_period"]:checked').value;

            // Check for duplicate calculations
            if (isDuplicateCalculation(duration, initialDeposit, contribution, returnRate, taxRate, inflationRate, futureBalance)) {
                alert(translations.alreadyExists);
                return;
            }

            const tableBody = document.getElementById('history-content-table-body');
            const newRow = tableBody.insertRow();
            newRow.innerHTML = `
                <td>${duration} ${translations.years}</td>
                <td>${initialDeposit}</td>
                <td class="history-additional-info">${contribution}</td>
                <td class="history-additional-info">${returnRate}</td>
                <td class="history-additional-info">${taxRate}</td>
                <td class="history-additional-info">${inflationRate}</td>
                <td>${futureBalance}</td>
                <td><button class="delete-row-btn" data-lang-key="delete">${translations.delete}</button></td>`;

            newRow.onclick = function() {
                document.getElementById('initial_deposit').value = initialDeposit;
                document.getElementById('contribution_amount').value = contribution;
                document.getElementById('investment_timespan').value = duration;
                document.getElementById('estimated_return').value = estimated_return;
                document.getElementById('estimated_tax').value = estimated_tax;
                document.getElementById('estimated_return').value = returnRate;
                document.getElementById('estimated_inflation').value = estimated_inflation;
                updateChart();
            }

            newRow.querySelector('.delete-row-btn').onclick = function(e) {
                e.stopPropagation();
                tableBody.removeChild(this.parentElement.parentElement);
                updateHistoryVisibility();
            }

            updateHistoryVisibility();
            updateChart();
        } else {
            alert(translations.calculationNameRequired);
        }
    });

    // Função para atualizar a visibilidade da seção de histórico
    function updateHistoryVisibility() {
        var tableBody = document.getElementById('history-content-table-body');
        var historyContainer = document.getElementById('container-history');
        if (tableBody.rows.length > 0) {
            historyContainer.style.display = 'block';
        } else {
            historyContainer.style.display = 'none';
        }
    }
    // Initially hide the history section
    updateHistoryVisibility();



    // Função para exportar o histórico para CSV
    function exportToCSV() {
        // Gather input data
        const inputData = getInputData();

        // Gather chart data using your getChartData function
        const chartData = getChartData();
        let csvContent = "data:text/csv;charset=utf-8," + inputData;
        csvContent += "Year,Principal,Interest\r\n";

        chartData.labels.forEach(function(label, index){
            const principal = chartData.datasets[0].data[index]; // Assuming 0 is principal
            const interest = chartData.datasets[1].data[index];  // Assuming 1 is interest
            csvContent += label + "," + principal + "," + interest + "\r\n";
        });

        // Trigger CSV download
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "compound_interest_data.csv");
        document.body.appendChild(link); // Required for FF

        link.click();
        document.body.removeChild(link);
    }

    // Check if a calculation with these values already exists in the history
    function isDuplicateCalculation(duration, initialDeposit, contribution, returnRate, taxRate, inflationRate, futureBalance) {
        var tableBody = document.getElementById('history-content-table-body');
        for (let i = 0; i < tableBody.rows.length; i++) {
            const row = tableBody.rows[i];
            const rowDuration = row.cells[0].textContent;
            const rowInitialDeposit = row.cells[1].textContent;
            const rowContribution = row.cells[2].textContent;
            const rowReturnRate = row.cells[3].textContent;
            const rowTaxRate = row.cells[4].textContent;
            const rowInflationRate = row.cells[5].textContent;
            const rowFutureBalance = row.cells[6].textContent;

            if (rowDuration === duration && rowInitialDeposit === initialDeposit && rowContribution === contribution && rowReturnRate === returnRate && rowTaxRate === taxRate && rowInflationRate === inflationRate && rowFutureBalance === futureBalance) {
                return true;
            }
        }
        return false;
    }

    // Get input field data
    function getInputData() {
        const initialDeposit = document.getElementById('initial_deposit').value;
        const contribution = document.getElementById('contribution_amount').value;
        const contributionFrequency = document.querySelector('[name="contribution_period"]:checked').value;
        const duration = document.getElementById('investment_timespan').value;
        const returnRate = document.getElementById('estimated_return').value;
        const capitalizationFrequency = document.querySelector('[name="compound_period"]:checked').value;
        const estimatedTax = document.getElementById('estimated_tax').value;
        const estimatedInflation = document.getElementById('estimated_inflation').value;

        var inputData = "Initial Deposit,Contribution,Contribution Frequency,Duration,Return Rate,Capitalization Frequency,Estimated Tax,Estimated Inflation\r\n";
        inputData += initialDeposit + "," + contribution + "," + contributionFrequency + "," + duration + "," + returnRate + "," + capitalizationFrequency + "," + estimatedTax + "," + estimatedInflation + "\r\n";
        return inputData;
    }

    // Add this function to a button's click event
    document.getElementById('btn-export-csv').addEventListener('click', exportToCSV);

}