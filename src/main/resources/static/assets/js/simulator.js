(function () {

    import {translations} from "/internationalisation/pages-translation/simulator.js";

    // Get the language from the HTML tag
    var language = document.querySelector('html').getAttribute('lang');

    // Function to update the value of an input field
    var initial_deposit = document.querySelector('#initial_deposit'),
        contribution_amount = document.querySelector('#contribution_amount'),
        investment_timespan = document.querySelector('#investment_timespan'),
        investment_timespan_text = document.querySelector('#investment_timespan_text'),
        estimated_return = document.querySelector('#estimated_return'),
        future_balance = document.querySelector('#future_balance'),
        estimated_inflation = document.querySelector('#estimated_inflation'),
        estimated_tax = document.querySelector('#estimated_tax')
    ;

    // Refresh the chart when the inflation or tax rate changes
    function updateValue(element, action) {
        var min = parseFloat(element.getAttribute('min')),
            max = parseFloat(element.getAttribute('max')),
            step = parseFloat(element.getAttribute('step')) || 1,
            oldValue = element.dataset.value || element.defaultValue || 0,
            newValue = parseFloat(element.value.replace(/€/, ''));

        // Verifica se o novo valor é um número
        if (isNaN(parseFloat(newValue))) {
            newValue = oldValue;
        } else {
            if (action === 'add') {
                newValue += step;
            } else if (action === 'sub') {
                newValue -= step;
            }

            newValue = newValue < min ? min : newValue > max ? max : newValue;

            // Verificação do valor máximo e acionamento do alerta
            if (newValue >= max && element.id === 'initial_deposit') {
                alert('Você alcançou o valor máximo!');
            }
            if (newValue >= max && element.id === 'contribution_amount') {
                alert('Você alcançou o valor máximo!');
            }
            if (newValue >= max && element.id === 'estimated_return') {
                alert('Você alcançou o valor máximo!');
            }
        }

        element.dataset.value = newValue;
        element.value = (element.dataset.prepend || '') + newValue + (element.dataset.append || '');

        updateChart();
    }

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
            _estimatedTax = parseFloat(estimated_tax.dataset.value / 100)
        ;

        var labels = []
        for (var year = _current_year; year < _current_year + _investment_duration; year++) {
            labels.push(year);
        }

        // Initial deposit
        var principal_dataset = {
            label: 'Montante Principal',
            backgroundColor: 'rgb(0, 123, 255)',
            data: []
        };

        // Interest
        var interest_dataset = {
            label: "Juro",
            backgroundColor: 'rgb(23, 162, 184)',
            data: []
        };

        // Tax
        var tax_dataset = {
            label: "Imposto",
            backgroundColor: 'rgb(220, 53, 69)',
            data: []
        };

        // Inflation
        var inflation_dataset = {
            label: "Inflação",
            backgroundColor: 'rgb(255, 193, 7)',
            data: []
        };

        // Calculate values for each dataset
        for (let i = 1; i <= _investment_duration; i++) {
            let principal = _initial_deposit + (_contribution_amount * _contribution_frequency * i),
                interest = 0,
                balance = principal,
                tax = 0,
                inflation = 0;

            if (_estimated_return) {
                // Compound interest calculation
                const x = Math.pow(1 + _estimated_return / _capitalization_frequency, _capitalization_frequency * i);
                const compound_interest = _initial_deposit * x;
                const contribution_interest = _contribution_amount * (x - 1) / (_estimated_return / _contribution_frequency);

                // Gross interest
                const grossInterest = compound_interest + contribution_interest - principal;
                tax = grossInterest * _estimatedTax; // Calculate tax on interest
                inflation = principal * _estimatedInflation * i; // Calculate inflation on principal

                // Adjust for tax and inflation
                const netInterest = grossInterest - tax;
                var adjustedPrincipal = principal - inflation;
                var adjustedInterest = netInterest;

                balance = adjustedPrincipal + adjustedInterest;
                interest = adjustedInterest;
            }

            future_balance.innerHTML = balance.toFixed(2) + '€';
            principal_dataset.data.push(adjustedPrincipal.toFixed(2));
            interest_dataset.data.push(adjustedInterest.toFixed(2));
            tax_dataset.data.push(-(tax.toFixed(2))); // Add tax data
            inflation_dataset.data.push(-(inflation.toFixed(2))); // Add inflation data
        }

        return {
            labels: labels,
            datasets: [principal_dataset, interest_dataset, tax_dataset, inflation_dataset]
        }
    }

    // Atualiza o gráfico
    function updateChart() {
        var data = getChartData();

        chart.data.labels = data.labels;
        chart.data.datasets[0].data = data.datasets[0].data;
        chart.data.datasets[1].data = data.datasets[1].data;
        chart.update();
    }

    initial_deposit.addEventListener('change', function () {
        updateValue(this);
    });

    contribution_amount.addEventListener('change', function () {
        updateValue(this);
    });

    estimated_return.addEventListener('change', function () {
        updateValue(this);
    });

    investment_timespan.addEventListener('change', function () {
        investment_timespan_text.innerHTML = this.value;
        updateChart();
    });

    investment_timespan.addEventListener('input', function () {
        investment_timespan_text.innerHTML = this.value;
    });

    var radios = document.querySelectorAll('[name="contribution_period"], [name="compound_period"]');
    for (var j = 0; j < radios.length; j++) {
        radios[j].addEventListener('change', updateChart);
    }

    var buttons = document.querySelectorAll('[data-counter]');

    // Adiciona um event listener a cada botão
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

    //////////////////CÓDIGO PERSONALIZADO//////////////////////

    /// Função para redefinir os valores dos campos de entrada para o estado inicial
    function resetValues() {
        // Redefine cada campo de entrada para o seu valor inicial
        document.getElementById('initial_deposit').value = '5000€';
        document.getElementById('contribution_amount').value = '100€';
        document.getElementById('estimated_return').value = '5.00%';
        document.getElementById('investment_timespan').value = '5';
        document.getElementById('compound_period_monthly').checked = true;
        investment_timespan_text.innerHTML = '5';

        updateChart(); // Atualiza o gráfico com os valores padrão
    }

    // Adiciona um event listener ao botão de reset
    document.getElementById('button-reset').addEventListener('click', resetValues);

    /// Incrementar e decrementar os valores dos campos de entrada
    // Variável para armazenar o timer
    var repeatTimer;

    function startIncrementing(field, action) {
        // Função para atualizar o valor
        function increment() {
            updateValue(field, action);
        }

        // Define a velocidade com base no campo
        var time;
        if (field.name === "estimated_return") {
            time = 300; // Velocidade mais lenta para 'estimated_return'
        } else if (field.name === "initial_deposit") {
            time = 50; // Velocidade mais lenta para 'estimated_return'
        } else {
            time = 200; // Velocidade padrão para outros campos
        }

        // Inicia o timer
        //increment();
        repeatTimer = setInterval(increment, time);
    }

    function stopIncrementing() {
        clearInterval(repeatTimer);
    }

    // Adiciona eventos aos botões
    //var buttons = document.querySelectorAll('[data-counter]');
    buttons.forEach(function (button) {
        button.addEventListener('mousedown', function () {
            var field = document.querySelector('[name="' + this.dataset.field + '"]');
            var action = this.dataset.counter;
            startIncrementing(field, action);
        });
        button.addEventListener('touchstart', function () {
            var field = document.querySelector('[name="' + this.dataset.field + '"]');
            var action = this.dataset.counter;
            startIncrementing(field, action);
        });
        button.addEventListener('touchend', function () {
            var field = document.querySelector('[name="' + this.dataset.field + '"]');
            var action = this.dataset.counter;
            stopIncrementing(field, action);
        });


        // Para incrementar tanto no mouseup quanto ao sair do botão
        button.addEventListener('mouseup', stopIncrementing);
        button.addEventListener('mouseleave', stopIncrementing);
    });


    // Save calculation to history
    document.getElementById('button-save').addEventListener('click', function() {
        var duration = document.getElementById('investment_timespan').value;
        var initialDeposit = document.getElementById('initial_deposit').value;
        var contribution = document.getElementById('contribution_amount').value;
        var returnRate = document.getElementById('estimated_return').value;
        var finalBalance = document.getElementById('future_balance').textContent;

        // Check for duplicate calculations
        if (isDuplicateCalculation(duration, initialDeposit, contribution, returnRate)) {
            alert('Um cálculo com estes valores já existe no histórico!');
            return;
        }

        var tableBody = document.getElementById('historico-conteudo-tabela-body');
        var newRow = tableBody.insertRow();
        newRow.innerHTML = `
        <td>${duration}</td>
        <td>${initialDeposit}</td>
        <td>${contribution}</td>
        <td>${returnRate}</td>
        <td>${finalBalance}</td>
        <td><button class="delete-row-btn" data-lang-key="delete">Eliminar</button></td>`;

        newRow.onclick = function() {
            document.getElementById('investment_timespan').value = duration;
            document.getElementById('initial_deposit').value = initialDeposit;
            document.getElementById('contribution_amount').value = contribution;
            document.getElementById('estimated_return').value = returnRate;
            updateChart();
        }

        newRow.querySelector('.delete-row-btn').onclick = function(e) {
            e.stopPropagation();
            tableBody.removeChild(this.parentElement.parentElement);
            updateHistoryVisibility();
        }

        updateHistoryVisibility();
        updateChart();
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
        var inputData = getInputData();

        // Gather chart data using your getChartData function
        var chartData = getChartData();
        var csvContent = "data:text/csv;charset=utf-8," + inputData;
        csvContent += "Year,Principal,Interest\r\n";

        chartData.labels.forEach(function(label, index){
            var principal = chartData.datasets[0].data[index]; // Assuming 0 is principal
            var interest = chartData.datasets[1].data[index];  // Assuming 1 is interest
            csvContent += label + "," + principal + "," + interest + "\r\n";
        });

        // Trigger CSV download
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "compound_interest_data.csv");
        document.body.appendChild(link); // Required for FF

        link.click();
        document.body.removeChild(link);
    }

    // Check if a calculation with these values already exists in the history
    function isDuplicateCalculation(duration, initialDeposit, contribution, returnRate) {
        var tableBody = document.getElementById('historico-conteudo-tabela-body');
        for (var i = 0; i < tableBody.rows.length; i++) {
            var row = tableBody.rows[i];
            if (row.cells[0].innerText === duration &&
                row.cells[1].innerText === initialDeposit &&
                row.cells[2].innerText === contribution &&
                row.cells[3].innerText === returnRate) {
                return true;
            }
        }
        return false;
    }

    // Get input field data
    function getInputData() {
        var initialDeposit = document.getElementById('initial_deposit').value;
        var contribution = document.getElementById('contribution_amount').value;
        var returnRate = document.getElementById('estimated_return').value;
        var duration = document.getElementById('investment_timespan').value;

        return `Initial Deposit,${initialDeposit}\r\nContributions,${contribution}\r\nReturn Rate,${returnRate}\r\nDuration,${duration}\r\n\r\n`;
    }

    // Add this function to a button's click event
    document.getElementById('btn-export-csv').addEventListener('click', exportToCSV);

})();