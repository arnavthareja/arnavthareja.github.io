// TODO: vey slow right now. fix it
// Maybe implement updateCurrentSection lock while scrolling to section, currently when clicked it updates back to current then to desired, should update straight to desired
// Might have to change HTML onclicks to event handlers here with a lock that is activate before scrolling and deactivated afterwards

var selected = 'Experience';
var darkModeActive = false;
const root = document.documentElement;
var initialWidth;
var initialHeight;
var startWidth;
var startHeight;
var mediumBreakpoint = 1440;
var smallBreakpoint = 768;
var maxWidthRatio = 1;
var minWidthRatio = 0.85;

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

function toggleDarkMode() {

    if (darkModeActive) {
        // Change to light mode
        root.style.setProperty('--main-background-color', '#003262');
        root.style.setProperty('--main-background-color-dark', '#001631');
        root.style.setProperty('--main-text-color-rgb', '255, 255, 255');
        root.style.setProperty('--main-background-gradient', 'linear-gradient(30deg, #003262, #004893)');
        root.style.setProperty('--alt-background-color', '#d7cb84');
        root.style.setProperty('--alt-text-color-rgb', '0, 50, 98');
        root.style.setProperty('--box-shadow', '0 5px 15px black');
        darkModeActive = false;

        // Change dark mode button to light mode

        
        return console.log("Switched to light mode");
    } else {
        // Change to dark mode
        root.style.setProperty('--main-background-color', 'black');
        root.style.setProperty('--main-background-color-dark', 'black');
        root.style.setProperty('--main-text-color-rgb', '255, 255, 255');
        root.style.setProperty('--main-background-gradient', 'black');
        root.style.setProperty('--alt-background-color', '#202020');
        root.style.setProperty('--alt-text-color-rgb', '255, 255, 255');
        root.style.setProperty('--box-shadow', '0 0 2px white');
        darkModeActive = true;

        // Change dark mode button to dark mode

        
        return console.log("Switched to dark mode");
    }
}

function trim(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function scrollPercent(selector) {
    el = document.querySelector(selector);
    var height = el.scrollHeight;
    var scroll = document.body.scrollTop - el.getBoundingClientRect().top + window.innerHeight / 2; // TODO: fix this
    //scroll += window.innerHeight * scroll / height;
    return trim(scroll / height * 100, 0, 100);
}

function updateCurrentSection() {
    root.style.setProperty('--width-0', scrollPercent('#experience') + '%');
    root.style.setProperty('--width-1', scrollPercent('#projects') + '%');
    root.style.setProperty('--width-2', scrollPercent('#coursework') + '%');
    root.style.setProperty('--width-3', scrollPercent('#resume') + '%');

    if (parseFloat(root.style.getPropertyValue('--width-3')) > 0) {
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
    /*
    var scroll = document.body.scrollTop || root.scrollTop;
    var height = root.scrollHeight - root.clientHeight;
    var scrolled = scroll / height * 100;
    document.querySelector('.progress-bar').style.width = scrolled + '%';
    */

    updateCurrentSection();
}
