/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calcTax.js":
/*!*******************************!*\
  !*** ./js/modules/calcTax.js ***!
  \*******************************/
/***/ ((module) => {

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

/***/ }),

/***/ "./js/modules/checkNumber.js":
/*!***********************************!*\
  !*** ./js/modules/checkNumber.js ***!
  \***********************************/
/***/ ((module) => {

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

/***/ }),

/***/ "./js/modules/setBtnsToLists.js":
/*!**************************************!*\
  !*** ./js/modules/setBtnsToLists.js ***!
  \**************************************/
/***/ ((module) => {

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

/***/ }),

/***/ "./js/modules/setInputToCheckbox.js":
/*!******************************************!*\
  !*** ./js/modules/setInputToCheckbox.js ***!
  \******************************************/
/***/ ((module) => {

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

/***/ }),

/***/ "./js/modules/setInputToSlider.js":
/*!****************************************!*\
  !*** ./js/modules/setInputToSlider.js ***!
  \****************************************/
/***/ ((module) => {

function setInputToSlider() {
    const slider = document.querySelector("#slider-salary"),
        salary = document.querySelector("#salary");

    salary.value = slider.value;

    slider.addEventListener('input', function () {
        salary.value = this.value;
    });

    salary.addEventListener('input', function () {
        slider.value = this.value;
    });
}

module.exports = setInputToSlider;

/***/ }),

/***/ "./js/modules/showMore.js":
/*!********************************!*\
  !*** ./js/modules/showMore.js ***!
  \********************************/
/***/ ((module) => {

function showMore() {
    const notes = document.querySelectorAll('.note'),
        btnsMore = document.querySelectorAll('.btn-more'),
        noteContents = document.querySelectorAll('.note__content');

    function showNote() {
        notes.forEach((note) => {
            note.addEventListener('click', (e) => {
                btnsMore.forEach((btn, i) => {
                    if (e.target === btn) {
                        notes[i].classList.toggle('active');
                    }
                });
            });
        })
    }
    showNote();
}

module.exports = showMore;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
window.addEventListener('DOMContentLoaded', () => {
    const calcTax = __webpack_require__(/*! ./modules/calcTax */ "./js/modules/calcTax.js"),
          checkNumber = __webpack_require__(/*! ./modules/checkNumber */ "./js/modules/checkNumber.js"),
          setBtnsToLists = __webpack_require__(/*! ./modules/setBtnsToLists */ "./js/modules/setBtnsToLists.js"),
          setInputToCheckbox = __webpack_require__(/*! ./modules/setInputToCheckbox */ "./js/modules/setInputToCheckbox.js"),
          setInputToSlider = __webpack_require__(/*! ./modules/setInputToSlider */ "./js/modules/setInputToSlider.js"),
          showMore = __webpack_require__(/*! ./modules/showMore */ "./js/modules/showMore.js");

    showMore();
    calcTax();
    checkNumber();
    setBtnsToLists();
    setInputToCheckbox();
    setInputToSlider();

})
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map