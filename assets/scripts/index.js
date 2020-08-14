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
        root.style.setProperty('--main-text-color', 'white');
        root.style.setProperty('--main-background-gradient', 'linear-gradient(30deg, #003262, #004893)');
        root.style.setProperty('--alt-background-color', '#d7cb84');
        root.style.setProperty('--alt-text-color', '#003262');
        root.style.setProperty('--alt-text-color-rgb', '0, 50, 98');
        root.style.setProperty('--box-shadow', '0 5px 15px black');
        darkModeActive = false;

        // Change dark mode button to light mode

        
        return console.log("Switched to light mode");
    } else {
        // Change to dark mode
        root.style.setProperty('--main-background-color', 'black');
        root.style.setProperty('--main-text-color', 'white');
        root.style.setProperty('--main-background-gradient', 'black');
        root.style.setProperty('--alt-background-color', 'black');
        root.style.setProperty('--alt-text-color', 'white');
        root.style.setProperty('--alt-text-color-rgb', '255, 255, 255');
        root.style.setProperty('--box-shadow', '0 0 5px white');
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
