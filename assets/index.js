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

    // UPdate portfolio section title
    document.querySelector('#portfolio-title').innerHTML = selected;
}

// Translate each card up 5px on hover
// This is the only way to use transform style on .project-card
document.querySelectorAll('.project-card').forEach(function(card) {
    card.addEventListener('mouseover', function() {
        this.style.transform = 'translateY(-5px)';
    });
    card.addEventListener('mouseout', function() {
        this.style.transform = 'translateY(0)';
    });
});
