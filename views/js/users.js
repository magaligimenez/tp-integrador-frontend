//var de paginacion
let currentPage = 1; //pag inicial

const usersContainer = document.getElementById('users-container');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');
const pageIndicator = document.getElementById('pageIndicator');

//función para obtener los usuarios de la API
async function fetchUsers() {
    try {
        const response = await fetch('http://localhost:3000/users?page=' + currentPage);
        const data = await response.json();
        console.log('Usuarios:', data);

        //actualizar el DOM con los usuarios
        usersContainer.innerHTML = ''; //limpiar el contenedor de usuarios

        data.users.forEach(user => {
        const userCard = document.createElement('div');
        userCard.classList.add('col-md-4');

        userCard.innerHTML = `
            <div class="card">
                <img src="${user.imagen}" class="card-img-top" alt="Imagen de perfil">
                <div class="card-body">
                    <h5 class="card-title">Alumno: ${user.nombre}</h5>
                    <p class="card-text">Email: ${user.email}</p>
                    <p class="card-text">${user.curso ? `Curso asignado: ${user.curso}` : 'Sin curso asignado'}</p>
                    ${user.curso === 'No asignado' ? `
                        <button class="btn btn-primary" onclick="asignarCurso(${user.id})">Asignar curso</button>
                    ` : ''}
                </div>
            </div>
        `;
        usersContainer.appendChild(userCard);
        });

        //actualizar el indicador de la página
        pageIndicator.textContent = `Página ${data.currentPage} de ${data.totalPages}`;

        //Habilitar/Deshabilitar botones de paginación
        prevPageBtn.disabled = data.currentPage === 1;
        nextPageBtn.disabled = data.currentPage === data.totalPages;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
    }
}

//función para cambiar de página
prevPageBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchUsers();
    }
});

nextPageBtn.addEventListener('click', () => {
    currentPage++;
    fetchUsers();
});

//inicializamos la carga de usuarios
fetchUsers();