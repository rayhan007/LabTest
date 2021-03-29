const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");

hamburger.addEventListener('click', () => {
    //Animate Links
    navLinks.classList.toggle("open");
    links.forEach(link => {
        link.classList.toggle("fade");
    });

    //Hamburger Animation
    hamburger.classList.toggle("toggle");
});

/*upload photo*/
/*$(document).ready(function () {
    $('input[type="file"]').imageuploadify();
})*/
/******* date-picker ********/
$(document).ready(function () {

    $('.input-daterange').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true
    });

});

/******* time-picker ********/
$('#timepicker-one').wickedpicker();

$('#timepicker-two').wickedpicker();

/****** drag&Drop ********/
   /**/