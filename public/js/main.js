const consulta = () => {
    let data = new FormData();
    data.append("metodo", "obtener_datos");
    fetch("./app/controller/Productos.php", {
        method: "POST",
        body: data
    }).then(respuesta => respuesta.json())
    .then(respuesta => {
        let contenido = ``;
        let i = 1;
        respuesta.map(producto => {
            contenido += `
                <tr>
                    <th>${i++}</th>
                    <td>${producto['producto']}</td>
                    <td>${producto['precio']}</td>
                    <td>${producto['unidades']}</td>
                    <td>
                        <button type="button" class="btn btn-warning" onclick="precargar(${producto['id_producto']})"><i class="fa-solid fa-pen-to-square"></i></button>
                        <button type="button" class="btn btn-danger" onclick="eliminar(${producto['id_producto']})"><i class="fa-solid fa-trash-can"></i></button>
                    </td>
                </tr>
            `;
        });
        $("#contenido_producto").html(contenido);
        $('#myTable').DataTable();
    });
}

const precargar = (id) => {
    let data = new FormData();
    data.append("id_producto", id);
    data.append("metodo", "precargar_datos");
    fetch("./app/controller/Productos.php", {
        method: "POST",
        body: data
    }).then(respuesta => respuesta.json())
    .then(respuesta => {   
        $("#edit_producto").val(respuesta['producto']);
        $("#edit_precio").val(respuesta['precio']);
        $("#edit_unidades").val(respuesta['unidades']);
        $("#id_prodcuto_act").val(respuesta['id_producto']);
        $("#editarModal").modal('show');
    });
}

consulta();

const actualizar = () => {
    let producto = $("#edit_producto").val();
    let precio = $("#edit_precio").val();
    let unidades = $("#edit_unidades").val();

    // Validar que "producto" solo tenga letras
    if (!/^[a-zA-Z\s]+$/.test(producto)) {
        Swal.fire({
            icon: 'error',
            title: 'Error en el producto',
            text: 'El nombre del producto solo puede contener letras.',
        });
        return; // Detener la ejecución si el producto no es válido
    }

    // Validar que "precio" solo tenga números
    if (!/^\d+(\.\d{1,2})?$/.test(precio)) {
        Swal.fire({
            icon: 'error',
            title: 'Error en el precio',
            text: 'El precio solo puede contener números y como máximo dos decimales.',
        });
        return; // Detener la ejecución si el precio no es válido
    }

    // Validar que "unidades" solo tenga números
    if (!/^\d+$/.test(unidades)) {
        Swal.fire({
            icon: 'error',
            title: 'Error en unidades',
            text: 'La cantidad de unidades solo puede contener números.',
        });
        return; // Detener la ejecución si las unidades no son válidas
    }

    let data = new FormData();
    data.append("id_producto", $("#id_prodcuto_act").val());
    data.append("producto", producto);
    data.append("precio", precio);
    data.append("unidades", unidades);
    data.append("metodo", "actualizar_datos");

    fetch("./app/controller/Productos.php", {
        method: "POST",
        body: data
    }).then(respuesta => respuesta.json())
    .then(respuesta => { 
        if (respuesta[0] == 1) {
            Swal.fire({
                icon: 'success',
                title: 'Datos actualizados correctamente',
                text: respuesta[1],
            });
            consulta();
            $("#editarModal").modal('hide');
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: respuesta[1],
            });
        }
    });
}

$('#btn_actualizar').on('click', () => {
    actualizar();
});


const agregar = () => {
    // Obtener los valores de los campos
    let producto = $("#producto").val();
    let precio = $("#precio").val();
    let unidades = $("#unidades").val();

    // Validar que "producto" solo tenga letras
    if (!/^[a-zA-Z\s]+$/.test(producto)) {
        Swal.fire({
            icon: 'error',
            title: 'Error en el producto',
            text: 'El nombre del producto solo puede contener letras.',
        });
        return; // Detener la ejecución si el producto no es válido
    }

    // Validar que "precio" solo tenga números
    if (!/^\d+(\.\d{1,2})?$/.test(precio)) {
        Swal.fire({
            icon: 'error',
            title: 'Error en el precio',
            text: 'El precio solo puede contener números y como máximo dos decimales.',
        });
        return; // Detener la ejecución si el precio no es válido
    }

    // Validar que "unidades" solo tenga números
    if (!/^\d+$/.test(unidades)) {
        Swal.fire({
            icon: 'error',
            title: 'Error en unidades',
            text: 'La cantidad de unidades solo puede contener números.',
        });
        return; // Detener la ejecución si las unidades no son válidas
    }

    // Confirmar si el usuario quiere agregar el producto
    Swal.fire({
        title: '¿Estás seguro de agregar este producto?',
        text: "Verifica que la información sea correcta.",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, agregar producto',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            let data = new FormData();
            data.append("producto", producto);
            data.append("precio", precio);
            data.append("unidades", unidades);
            data.append("metodo", "insertar_datos");

            fetch("./app/controller/Productos.php", {
                method: "POST",
                body: data
            }).then(respuesta => respuesta.json())
            .then(respuesta => {
                Swal.fire({
                    icon: respuesta[0] == 1 ? 'success' : 'error',
                    title: respuesta[0] == 1 ? 'Producto agregado exitosamente' : 'Error',
                    text: respuesta[1],
                }).then(() => {
                    if (respuesta[0] == 1) {
                        consulta();
                        $("#agregarModal").modal('hide');
                    }
                });
            });
        }
    });
}




const eliminar = (id) => {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡Este producto será eliminado!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            let data = new FormData();
            data.append("id_producto", id);
            data.append("metodo", "eliminar_datos");
            fetch("./app/controller/Productos.php", {
                method: "POST",
                body: data
            }).then(respuesta => respuesta.json())
            .then(respuesta => { 
                if (respuesta[0] == 1) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Producto eliminado exitosamente',
                        text: respuesta[1],
                    });
                    consulta();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: respuesta[0],
                    });
                }
            });
        }
    });
}

$('#btn_actualizar').on('click', () => {
    actualizar();
});

$('#btn_agregar').on('click', () => {
    agregar();
});
