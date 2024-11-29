//capturar el formulario
const form = document.getElementById('userForm');

//función para enviar el formulario al backend
form.addEventListener('submit', async (e) => {
    e.preventDefault(); //prevenir que se recargue la página al enviar el formulario

    //obtener los datos del formulario
    const formData = new FormData(form);
    const userData = {};
    formData.forEach((value, key) => {
        userData[key] = value;
    });

    //enviar los datos al backend
    try {
        const response = await fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData), //enviar los datos en formato JSON
        });

        if (response.ok) {
            alert('Usuario registrado exitosamente');
            form.reset(); //limpiar el formulario después de enviar
        } else {
            alert('Error al registrar el usuario');
        }
    } catch (error) {
        console.error('Error al enviar el formulario:', error);
        alert('Hubo un error al intentar registrar el usuario');
    }
});