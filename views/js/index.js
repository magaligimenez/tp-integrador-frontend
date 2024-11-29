//cargar cursos aleatorios
const randomCoursesContainer = document.getElementById('random-courses');

function cargarCursosAleatorios() {
    fetch('http://localhost:3000/api/cursos/random')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los cursos');
            }
            return response.json();
        })
        .then(cursos => {
            randomCoursesContainer.innerHTML = cursos.map(curso => `
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${curso.nombre}</h5>
                            <p class="card-text">${curso.descripcion}</p>
                        </div>
                    </div>
                </div>
            `).join('');
        })
        .catch(error => {
            console.error('Error al cargar los cursos aleatorios:', error);
            randomCoursesContainer.innerHTML = '<p>Ocurrió un error al cargar los cursos.</p>';
        });
}

cargarCursosAleatorios();