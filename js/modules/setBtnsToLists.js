function setBtnsToLists() {
    const btnYES = document.querySelector('.dependents__yes'),
        btnNO = document.querySelector('.dependents__no'),
        counts = document.querySelectorAll('select');

    function activateCounts() {
        btnYES.addEventListener('click', () => {
            btnNO.classList.remove('answer__active__no');
            btnYES.classList.add('answer__active__yes');
            counts.forEach((count) => {
                count.removeAttribute('disabled');
            })
        })
    }

    function deactivateCounts() {
        btnNO.addEventListener('click', () => {
            btnYES.classList.remove('answer__active__yes');
            btnNO.classList.add('answer__active__no');
            counts.forEach((count) => {
                count.value = '';
                count.setAttribute('disabled', 'disabled');
            })
        })
    }

    activateCounts();
    deactivateCounts();
}

module.exports = setBtnsToLists;