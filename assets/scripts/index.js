var selected = 'Projects';
var darkModeActive = false;
const root = document.documentElement;
var startWidth
var startHeight

window.onload = function() {
    startWidth = window.innerWidth;
    startHeight = window.innerHeight;
}

function select(id) {
    
    // Return if already selected
    if (id === selected) {
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

window.onresize = function() {

    // TODO: Set a minimum value to prevent text from becoming too small

    var newWidth = window.innerWidth;
    var newHeight = window.innerHeight;

    var widthRatio = Math.sqrt(newWidth / startWidth);
    var heightRatio = Math.sqrt(newHeight / startHeight);

    root.style.setProperty('--width-ratio', widthRatio);
    root.style.setProperty('--height-ratio', heightRatio);
}

function scrollPercent(selector) {
    el = document.querySelector(selector);
    var scroll = document.body.scrollTop - el.getBoundingClientRect().top + window.innerHeight / 2; // TODO: fix this
    var height = el.scrollHeight;
    return Math.min(Math.max(scroll / height * 100, 0), 100);
}

window.onscroll = function() {
    var scroll = document.body.scrollTop || root.scrollTop;
    var height = root.scrollHeight - root.clientHeight;
    var scrolled = scroll / height * 100;
    // document.querySelector('.progress-bar').style.width = scrolled + '%';

    // root.style.setProperty('--width-0', scrolled + '%');
    // or use sheet.insertRule() or sheet.addRule()

    root.style.setProperty('--width-0', scrollPercent('#experience') + '%');
    root.style.setProperty('--width-1', scrollPercent('#projects') + '%');
    //root.style.setProperty('--width-2', scrollPercent('#coursework'));
    //root.style.setProperty('--width-3', scrollPercent('#resume'));

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
