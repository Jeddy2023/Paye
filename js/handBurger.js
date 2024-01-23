const nav = document.querySelector('.main-nav')
const handburgerMenu = document.querySelector('#handburger-menu')
const container = document.querySelector('.main-content nav')
const Body = document.querySelector('.dashboard-container')


handburgerMenu.addEventListener('click', () => {
    container.classList.add('fade')
    nav.classList.toggle('show')
    Body.style.overflow = 'hidden'
    if (!nav.classList.contains('show')) {
        container.classList.remove('fade')
        Body.style.overflow = 'visible'
    }

})
navbarList.forEach(list => {
    list.addEventListener('click', () => {
        nav.classList.remove('show')
        container.classList.remove('fade')
        Body.style.overflow = 'visible'
    })
})
container.addEventListener('click', (e) => {
    nav.classList.remove('show')
    container.classList.remove('fade')
    Body.style.overflow = 'visible'
})

