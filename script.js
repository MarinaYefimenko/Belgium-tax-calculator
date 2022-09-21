const slider = document.querySelector("#slider-salary"),
      salary = document.querySelector("#salary");

salary.innerHTML = slider.value; 

slider.addEventListener('input', function() {
    salary.innerHTML = this.value;
});

