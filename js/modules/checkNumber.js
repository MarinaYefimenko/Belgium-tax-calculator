function checkNumber() {
    const allInputs = document.querySelectorAll('.input__value'),
        result = document.querySelector('#result'),
        warning = document.querySelector('.warning');

    // Check Number
    function checkNumber(input) {
        input.addEventListener('input', function () {
            if (this.value.match(/\D/g)) {
                this.style.border = '1px solid red';
                warning.classList.add('active');
                result.value = '';
            } else {
                this.style.border = '1px solid #71a710';
                warning.classList.remove('active');
            }
        })
    }
    allInputs.forEach(input => {
        checkNumber(input);
    })
}

module.exports = checkNumber;