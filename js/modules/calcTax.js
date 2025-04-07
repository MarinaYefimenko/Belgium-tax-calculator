function calcTax() {
    const salary = document.querySelector('#salary'),
        realestate = document.querySelector('#realestate'),
        pension = document.querySelector('#pension'),
        securities = document.querySelector('#securities'),
        children = document.querySelector('#children'),
        under65 = document.querySelector('#disabled__under65'),
        after65 = document.querySelector('#disabled__after65'),
        charity = document.querySelector('#charity'),
        energy = document.querySelector('#energy'),
        btnCalc = document.querySelector('.calculate'),
        result = document.querySelector('#result'),
        warning = document.querySelector('.warning');
        
        //constants: year 2024
            //https://fin.belgium.be/en/private-individuals/tax-return/income/tax-rates
        let baseSum = 10570,
            point25 = 15820,
            point40 = 27920,
            point45 = 48320,
            //https://fin.belgium.be/nl/particulieren/belastingaangifte/persoonlijke-situatie/personen-ten-laste/kinderen
            kids1 = 1920,
            kids2 = 4950,
            kids3 = 11090,
            kids4 = 17940,
            //https://fin.belgium.be/nl/particulieren/belastingaangifte/persoonlijke-situatie-gezinssituatie/personen-ten-laste/andere#--8-trigger-0
            ageOver65 = 5770,
            ageUnder65 = 1920;
            //https://fin.belgium.be/nl/particulieren/belastingvoordelen/giften
    
    // Incomes
    function calcAddTax() {
        let addTax = 0;

        addTax += +(+realestate.value * 12 * 0.21).toFixed(2);
        addTax += +(+pension.value * 12 * 0.16).toFixed(2);
        addTax += +(+securities.value * 12 * 0.3).toFixed(2);

        return addTax;
    }

    // Base Sum
    function calcBaseSum() {
        let baseSum = baseSum;

        // Disabled relatives
        switch (children.selectedOptions[0].value) {
            case '0':
                break;
            case '1':
                baseSum += kids1;
                break;
            case '2':
                baseSum += kids2;
                break;
            case '3':
                baseSum += kids3;
                break;
            case '4':
                baseSum += kids4;
                break;
        }

        baseSum += +after65.selectedOptions[0].value * ageOver65;
        baseSum += +under65.selectedOptions[0].value * ageUnder65;

        // Additionaly to BaseSum
        if (+charity.value >= 40) {
            baseSum += +(+charity.value * 0.45).toFixed(2);
        }

        if (+energy.value >= 3420 / 0.3) {
            baseSum += 3420;
        } else {
            baseSum += +(+energy.value * 0.3).toFixed(2);
        }

        return baseSum;
    }

    // Salary
    function calcIncomeTax() {
        let incomeTax = 0;
        let income = +salary.value * 12 - calcBaseSum();

        if (income <= 0) {
            return 0;
        }
        if (income >= point25) {
            income -= point25;
            incomeTax += point25 * 0.25;
        } else {
            incomeTax += income * 0.25;
            return incomeTax;
        }
        if (income >= (point40 - point25)) {
            income -= (point40 - point25);
            incomeTax += (point40 - point25) * 0.4;
        } else {
            incomeTax += income * 0.4;
            return incomeTax;
        }
        if (income >= (point45 - point40)) {
            income -= (point45 - point40);
            incomeTax += (point45 - point40) * 0.45;
        } else {
            incomeTax += income * 0.45;
            return incomeTax;
        }
        incomeTax += income * 0.5;
        return incomeTax;
    }

    // Year Tax
    function calcYearTax() {
        let yearTax = calcIncomeTax() + calcAddTax();
        result.value = yearTax.toFixed(2);
    }

    btnCalc.addEventListener('click', () => {
        if (salary.value.match(/\D/g) ||
            realestate.value.match(/\D/g) ||
            pension.value.match(/\D/g) ||
            securities.value.match(/\D/g) ||
            charity.value.match(/\D/g) ||
            energy.value.match(/\D/g)) {
            warning.classList.add('active');
            result.value = '';
        } else {
            calcYearTax();
        }
    })
}

module.exports = calcTax;