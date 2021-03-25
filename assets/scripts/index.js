var selected = 'Experience';
const root = document.documentElement;
var initialWidth;
var initialHeight;
var startWidth;
var startHeight;
var mediumBreakpoint = 1440;
var smallBreakpoint = 768;
var maxWidthRatio = 1;
var minWidthRatio = Math.sqrt(0.85);
var slider = document.querySelector('.dark-mode-slider');

function select(id) {
    
    // Return if already selected
    if (id == selected) {
        return;
    }

    // update underlined element
    document.querySelector('#' + selected).classList.remove('selected');
    document.querySelector('#' + id).classList.add('selected');

    // update selected element
    selected = id;
}

function updateBeforeColor() {
    if (slider.getAttribute('data-theme') == 'Light Theme' && root.scrollTop > window.innerHeight * 0.04 + 35) {
        root.style.setProperty('--theme-text-color', '#003262');
    } else {
        root.style.setProperty('--theme-text-color', 'white');
    }
}

function toggleDarkMode() {
    root.classList.toggle("dark-theme");

    document.querySelector('.dark-mode-thumb').classList.toggle("dark-theme");
    document.querySelector('.dark-mode-thumb i').classList.toggle('fa-sun');
    document.querySelector('.dark-mode-thumb i').classList.toggle('fa-moon');

    if (slider.getAttribute('data-theme') == 'Light Theme') {
        slider.setAttribute('data-theme', 'Dark Theme');
        slider.setAttribute('data-before-color', 'white');
    } else {
        slider.setAttribute('data-theme', 'Light Theme');
    }

    updateBeforeColor();

    // This was causing problems with the animations replaying or stopping in the middle
    //$('body').hide().show(0);

    console.log('Toggled dark mode');
}

function trim(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function scrollPercent(selector) {
    el = document.querySelector(selector);
    var height = el.scrollHeight;
    var scroll = document.body.scrollTop - el.getBoundingClientRect().top + window.innerHeight / 2;
    return trim(scroll / height * 100, 0, 100);
}

function updateCurrentSection() {
    root.style.setProperty('--width-0', scrollPercent('#experience') + '%');
    root.style.setProperty('--width-1', scrollPercent('#projects') + '%');
    root.style.setProperty('--width-2', scrollPercent('#coursework') + '%');
    root.style.setProperty('--width-3', scrollPercent('#resume') + '%');

    if (document.querySelector('#resume').getBoundingClientRect().bottom + document.querySelector('footer').getBoundingClientRect().height <= window.innerHeight + 100) {
        select('Resume');
    } else if (parseFloat(root.style.getPropertyValue('--width-3')) > 0) {
        select('Resume');
    } else if (parseFloat(root.style.getPropertyValue('--width-2')) > 0) {
        select('Coursework');
    } else if (parseFloat(root.style.getPropertyValue('--width-1')) > 0) {
        select('Projects');
    } else {
        select('Experience');
    }
}

window.onload = function() {
    initialWidth = window.innerWidth;
    initialHeight = window.innerHeight;
    startWidth = window.innerWidth;
    startHeight = window.innerHeight;

    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    if (prefersDarkScheme.matches) {
        toggleDarkMode();
    }

    updateCurrentSection();
}

window.onresize = function() {

    var newWidth = window.innerWidth;
    var newHeight = window.innerHeight;

    var startBigMed = startWidth > mediumBreakpoint;
    var startSmallMed = startWidth <= mediumBreakpoint;
    var startBigSmall = startWidth > smallBreakpoint;
    var startSmallSmall = startWidth <= smallBreakpoint;
    var newBigMed = newWidth >= mediumBreakpoint;
    var newSmallMed = newWidth < mediumBreakpoint;
    var newBigSmall = newWidth >= smallBreakpoint;
    var newSmallSmall = newWidth < smallBreakpoint;

    if (startBigMed && newSmallMed) {
        startWidth = mediumBreakpoint;
    } else if (startSmallMed && newBigMed) {
        startWidth = initialWidth;
    } else if (startBigSmall && newSmallSmall) {
        startWidth = smallBreakpoint;
    } else if (startSmallSmall && newBigSmall) {
        startWidth = mediumBreakpoint;
    }

    startHeight = initialHeight * startWidth / initialWidth;

    var widthRatio = trim(Math.sqrt(newWidth / startWidth), minWidthRatio, maxWidthRatio);
    var heightRatio = trim(Math.sqrt(newHeight / startHeight), minWidthRatio, maxWidthRatio);

    root.style.setProperty('--width-ratio', widthRatio);
    root.style.setProperty('--height-ratio', heightRatio);

    updateCurrentSection();
}

window.onscroll = function() {
    updateCurrentSection();
    updateBeforeColor();
}
