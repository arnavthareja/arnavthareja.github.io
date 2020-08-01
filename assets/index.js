var selected = 'Projects';
var darkModeActive = false;

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

    // Update portfolio section title
    document.querySelector('#portfolio-title').innerHTML = selected;
}

function toggleDarkMode() {

    const root = document.documentElement;

    if (darkModeActive) {
        // Change to light mode
        root.style.setProperty('--main-background-color', '#003262');
        root.style.setProperty('--main-text-color', 'white');
        root.style.setProperty('--main-background-gradient', 'linear-gradient(30deg, #003262, #004893)');
        root.style.setProperty('--alt-background-color', '#d7cb84');
        root.style.setProperty('--alt-text-color', '#003262');
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
        root.style.setProperty('--box-shadow', '0 0 5px white');
        darkModeActive = true;

        // Change dark mode button to dark mode

        
        return console.log("Switched to dark mode");
    }
}
