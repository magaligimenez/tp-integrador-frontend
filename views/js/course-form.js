//capturar el formulario
const form = document.getElementById('courseForm');

//función para enviar el formulario al backend
form.addEventListener('submit', async (e) => {
    e.preventDefault(); //prevenir que se recargue la página al enviar el formulario

    //obtener los datos del formulario
    const formData = new FormData(form);
    const courseData = {};
    formData.forEach((value, key) => {
        courseData[key] = value;
    });

    //enviar los datos al backend
    try {
        const response = await fetch('http://localhost:3000/api/cursos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(courseData), //enviar los datos en formato JSON
        });

        if (response.ok) {
            alert('Curso registrado exitosamente');
            form.reset(); //limpiar el formulario después de enviar
        } else {
            alert('Error al registrar el curso');
        }
    } catch (error) {
        console.error('Error al enviar el formulario:', error);
        alert('Hubo un error al intentar registrar el curso');
    }
});