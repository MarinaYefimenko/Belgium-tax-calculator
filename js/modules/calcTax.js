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
        let baseSum = 9050;

        // Disabled relatives
        switch (children.selectedOptions[0].value) {
            case '0':
                break;
            case '1':
                baseSum += 1690;
                break;
            case '2':
                baseSum += 4340;
                break;
            case '3':
                baseSum += 9730;
                break;
            case '4':
                baseSum += 15740;
                break;
        }

        baseSum += +after65.selectedOptions[0].value * 5060;
        baseSum += +under65.selectedOptions[0].value * 1690;

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
        if (income >= 13540) {
            income -= 13540;
            incomeTax += 13540 * 0.25;
        } else {
            incomeTax += income * 0.25;
            return incomeTax;
        }
        if (income >= (23900 - 13540)) {
            income -= (23900 - 13540);
            incomeTax += (23900 - 13540) * 0.4;
        } else {
            incomeTax += income * 0.4;
            return incomeTax;
        }
        if (income >= (41360 - 23900)) {
            income -= (41360 - 23900);
            incomeTax += (41360 - 23900) * 0.45;
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