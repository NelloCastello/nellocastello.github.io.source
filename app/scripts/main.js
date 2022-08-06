let nav = document.querySelector('.nav');
let menu = document.querySelector('.menu');

window.addEventListener('scroll', function() {
    if (this.scrollY > 1) {
        nav.classList.add('--fixed');
    } else {
        nav.classList.remove('--fixed');
    }
});

function openMenu() {
    menu.classList.add('--opened');
}

function closeMenu() {
    menu.classList.remove('--opened');
}