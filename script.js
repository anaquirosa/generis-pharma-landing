///////////////////// ANIMACIONES

window.addEventListener('load', () => {
    animarHero();
    animarInfo();
    initFormulario();
});

function animarHero() {
    const formularioHero = document.querySelector('.formulario');
    const pretitulo = document.querySelector('.pretitulo');
    const titulo = document.querySelector('.hero h1');

    setTimeout(() => {
        if (formularioHero) formularioHero.classList.add('visible');
        if (pretitulo) pretitulo.classList.add('visible');
        if (titulo) titulo.classList.add('visible');
    }, 300);
}

function animarInfo() {
    const infoItems = document.querySelectorAll('.info-item');

    infoItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.5s ease ${0.6 + index * 0.2}s, transform 0.5s ease ${0.6 + index * 0.2}s`;
    });

    setTimeout(() => {
        infoItems.forEach(item => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        });
    }, 300);
}

///////////////////// FORMULARIO

function initFormulario() {
    const formulario = document.getElementById('formulario-registro');
    if (!formulario) return;

    formulario.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = formulario.querySelector('[name="nombre"]');
        const email = formulario.querySelector('[name="email"]');
        const especialidad = formulario.querySelector('[name="especialidad"]');
        const terminos = formulario.querySelector('[name="terminos"]');
        const successMessage = document.getElementById('success-message');

        document.querySelectorAll('.error-texto').forEach(el => el.remove());
        document.querySelectorAll('.input.error').forEach(el => el.classList.remove('error'));

        let valido = true;

        // Validaciones 

        if (nombre.value.trim() === '') {
            mostrarError(nombre, 'El nombre es obligatorio');
            valido = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email.value.trim() === '') {
            mostrarError(email, 'El email es obligatorio');
            valido = false;
        } else if (!emailRegex.test(email.value)) {
            mostrarError(email, 'El formato del email no es válido');
            valido = false;
        }

        if (especialidad.value.trim() === '') {
            mostrarError(especialidad, 'La especialidad es obligatoria');
            valido = false;
        }

        if (!terminos.checked) {
            mostrarError(terminos, 'Debes aceptar los términos');
            valido = false;
        }

        // Mostrar mensaje de éxito si todo está bien
        if (valido) {
            formulario.querySelector('.campos').style.display = 'none';
            formulario.querySelector('.terminos').style.display = 'none';
            formulario.querySelector('#registro').style.display = 'none';

            if (successMessage) {
                successMessage.classList.add('visible');
            }
        }
    });
}

function mostrarError(campo, mensaje) {
    campo.classList.add('error');

    const error = document.createElement('p');
    error.classList.add('error-texto');
    error.textContent = mensaje;

    if (campo.type === 'checkbox') {
        const terminos = document.querySelector('.terminos');
        terminos.insertAdjacentElement('afterend', error);
    } else {
        campo.parentElement.appendChild(error);
    }
}