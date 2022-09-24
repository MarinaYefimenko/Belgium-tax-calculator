function setInputToCheckbox() {
    const realestateCheckbox = document.querySelector("#realestate-checkbox"),
        realestate = document.querySelector("#realestate"),
        pensionCheckbox = document.querySelector("#pension-checkbox"),
        pension = document.querySelector("#pension"),
        securitiesCheckbox = document.querySelector("#securities-checkbox"),
        securities = document.querySelector("#securities"),
        charityCheckbox = document.querySelector("#charity-checkbox"),
        charity = document.querySelector("#charity"),
        energyCheckbox = document.querySelector("#energy-checkbox"),
        energy = document.querySelector("#energy");

    function activateInput(checkbox, input) {
        checkbox.addEventListener('change', () => {

            if (checkbox.checked) {
                input.removeAttribute('disabled');
            } else {
                input.value = '';
                input.setAttribute('disabled', 'disabled');
            }
        })
    }
    activateInput(realestateCheckbox, realestate);
    activateInput(pensionCheckbox, pension);
    activateInput(securitiesCheckbox, securities);
    activateInput(charityCheckbox, charity);
    activateInput(energyCheckbox, energy);
}

module.exports = setInputToCheckbox;