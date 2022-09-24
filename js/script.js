window.addEventListener('DOMContentLoaded', () => {
    const calcTax = require('./modules/calcTax'),
          checkNumber = require('./modules/checkNumber'),
          setBtnsToLists = require('./modules/setBtnsToLists'),
          setInputToCheckbox = require('./modules/setInputToCheckbox'),
          setInputToSlider = require('./modules/setInputToSlider'),
          showMore = require('./modules/showMore');

    showMore();
    calcTax();
    checkNumber();
    setBtnsToLists();
    setInputToCheckbox();
    setInputToSlider();

})