let currentPage = 1; //página inicial de la paginacion

const coursesContainer = document.getElementById('courses-container');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');
const pageIndicator = document.getElementById('pageIndicator');

//función para obtener los cursos de la API
async function fetchCourses() {
    try {
        const response = await fetch(`http://localhost:3000/cursos?page=${currentPage}`);
        const data = await response.json();
        console.log('Cursos:', data);

        //actualizar el DOM con los cursos
        coursesContainer.innerHTML = ''; //limpiar el contenedor de cursos

        data.cursos.forEach(curso => {
            const courseCard = document.createElement('div');
            courseCard.classList.add('col-md-3'); 
            courseCard.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${curso.nombre}</h5>
                        <p class="card-text">${curso.descripcion}</p>
                        <a href="/views/courses-details.html?id=${curso.id}" class="btn btn-primary btn-view-details">Ver más</a>
                    </div>
                </div>
            `;
            coursesContainer.appendChild(courseCard);
        });

        //actualizar el indicador de la página
        pageIndicator.textContent = `Página ${data.currentPage} de ${data.totalPages}`;

        //Habilitar/Deshabilitar botones de paginación
        prevPageBtn.disabled = data.currentPage === 1;
        nextPageBtn.disabled = data.currentPage === data.totalPages;
    } catch (error) {
        console.error('Error al obtener cursos:', error);
    }
}

//funcion para cambiar de página
prevPageBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchCourses();
    }
});

nextPageBtn.addEventListener('click', () => {
    currentPage++;
    fetchCourses();
});

// inicializar la carga de cursos
fetchCourses();
