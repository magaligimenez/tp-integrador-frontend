let currentPage = 1;
const usersPerPage = 5; //num de users por pag
let totalUsers = 0;
let allUsers = [];

//funcion para cargar detalles de curso y users
function loadCourseDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id');

    if (courseId) {
        fetch(`http://localhost:3000/api/cursos/usuarios/${courseId}`)
            .then(response => response.json())
            .then(data => {
                allUsers = data.course.usuarios;
                totalUsers = allUsers.length;

                //mostrar detalles de curso y los usuarios
                const courseDetailsContainer = document.getElementById('course-details');
                courseDetailsContainer.innerHTML = `
                    <h2>${data.course.nombre}</h2>
                    <p>${data.course.descripcion}</p>
                    <h3>Usuarios asignados:</h3>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Teléfono</th>
                            </tr>
                        </thead>
                        <tbody id="user-list">
                            <!-- lista de users -->
                        </tbody>
                    </table>
                    <div id="pagination"></div>
                `;

                //llamo a la funcion para mostrar usuarios x pagina
                showUsersForPage(currentPage);

                //llamo a la funcion para mostrar la paginacion
                displayPagination();
            })
            .catch(error => {
                console.error('Error al obtener los detalles del curso:', error);
            });
    } else {
        console.log('No se encontró el ID del curso.');
    }
} 

//mostrar los usuarios para cada pagina
function showUsersForPage(page) {
    const startIndex = (page - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    const usersForPage = allUsers.slice(startIndex, endIndex);

    const userList = document.getElementById('user-list');
    userList.innerHTML = '';

    if (usersForPage.length > 0) {
        usersForPage.forEach(user => {
            const userRow = document.createElement('tr');
            userRow.innerHTML = `
                <td>${user.nombre}</td>
                <td>${user.email}</td>
                <td>${user.telefono}</td>
            `;
            userList.appendChild(userRow);
        });
    } else {
        const noUsersRow = document.createElement('tr');
        noUsersRow.innerHTML = `<td colspan="3" class="no-users-message">No hay usuarios asignados</td>`;
        userList.appendChild(noUsersRow);
    }
}

//mostrar paginación
function displayPagination() {
    const totalPages = Math.ceil(totalUsers / usersPerPage);
    const paginationContainer = document.getElementById('pagination');

    let paginationHTML = `
        <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
    `;


    if (currentPage > 1) {
        paginationHTML += `<li class="page-item">
            <a class="page-link" href="#" onclick="changePage(${currentPage - 1})">Anterior</a>
        </li>`;
    }


    //que las pag tengan numero
    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `
            <li class="page-item ${i === currentPage ? 'active' : ''}">
                <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
            </li>
        `;
    }


    if (currentPage < totalPages) {
        paginationHTML += `<li class="page-item">
            <a class="page-link" href="#" onclick="changePage(${currentPage + 1})">Siguiente</a>
        </li>`;
    }

    paginationHTML += `</ul></nav>`;
    paginationContainer.innerHTML = paginationHTML;
}

//cambiar la página
function changePage(page) {
    if (page < 1 || page > Math.ceil(totalUsers / usersPerPage)) return;
    currentPage = page;
    showUsersForPage(currentPage);
    displayPagination();
}

loadCourseDetails();