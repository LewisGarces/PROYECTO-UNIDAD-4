const mensaje_error = (msj) => {
    Swal.fire({
        title: "Error!",
        text: msj,
        icon: "warning",
        confirmButtonText: "Aceptar",
    });
};

const mensaje_exito = (msj) => {
    Swal.fire({
        title: "Correcto!",
        text: msj,
        icon: "success",
        confirmButtonText: "Aceptar",
    });
};

// Función para iniciar sesión
const iniciar_sesion = () => {
    let usuario = $("#usuario").val().trim();
    let password = $("#password").val().trim();

    // Expresión regular para validar el correo electrónico
    const regex_email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    // Validar si los campos están vacíos
    if (!usuario || !password) {
        mensaje_error("Por favor, completa todos los campos.");
        return;
    }

    // Validar que el usuario sea un correo electrónico válido
    if (!regex_email.test(usuario)) {
        mensaje_error("Por favor, ingresa un correo electrónico válido.");
        return;
    }

    // Confirmación para iniciar sesión
    Swal.fire({
        title: "¿Estás seguro?",
        text: "¿Deseas iniciar sesión?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, iniciar",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            let data = new FormData();
            data.append("usuario", usuario);
            data.append("password", password);
            data.append("metodo", "iniciar_sesion");
            fetch("./app/controller/Login.php", {
                method: "POST",
                body: data,
            })
                .then((respuesta) => respuesta.json())
                .then((respuesta) => {
                    if (respuesta[0] == 1) {
                        Swal.fire({
                            title: "Correcto!",
                            text: "Redirigiendo al Mi tienda...",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 2000,
                        });
                        setTimeout(() => {
                            window.location = "inicio"; // Redirige al inicio
                        }, 2000);
                    } else {
                        mensaje_error(respuesta[1]);
                    }
                });
        }
    });
};

// Confirmación para redirigir al registro
$("#btn_registrar").on("click", (e) => {
    e.preventDefault();
    Swal.fire({
        title: "¿Estás seguro?",
        text: "¿Deseas registrar un nuevo usuario?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, registrar",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Redirigiendo...",
                text: "Te estamos llevando a la página de registro.",
                icon: "info",
                showConfirmButton: false,
                timer: 2000,
            });
            setTimeout(() => {
                window.location = "registro"; // Redirige a la página de registro
            }, 2000);
        }
    });
});

// Evento para botón de iniciar sesión
$("#btn_iniciar").on("click", () => {
    iniciar_sesion();
});
