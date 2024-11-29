//cargar navbar
const navbarContainer = document.getElementById('navbar-container');
fetch('navbar.html')
    .then(response => response.text())
    .then(data => {
        navbarContainer.innerHTML = data;
        //pag actual activa
        const links = navbarContainer.querySelectorAll('.nav-link');
        links.forEach(link => {
            if (link.href === window.location.href) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    })
    .catch(error => console.error('Error al cargar el navbar:', error));