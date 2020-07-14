var selected = 'Projects';

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
