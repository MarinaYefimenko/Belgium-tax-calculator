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