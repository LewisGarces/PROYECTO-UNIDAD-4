function confirmarEdicion() {
    Swal.fire({
        title: '¿Estás seguro de editar el usuario?',
        text: "¡Serás redirigido a la sesión de edición de usuario!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#8B0000',
        cancelButtonColor: '#00008B',
        confirmButtonText: 'Sí, editar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Redirigiendo...',
                text: 'Serás redirigido a la sesión de edición de usuario.',
                icon: 'info',
                showConfirmButton: false,
                timer: 2000
            }).then(() => {
                window.location.href = 'editar';  // Redirige a la página de editar usuario
            });
        }
    });
}