<?php
    if(!isset($_SESSION['usuario'])){
        header("location:login");
        exit();
    }
?>
<link rel="stylesheet" href="./public/css/diseño.css">
<!-- Barra de Navegación -->
<nav class="navbar navbar-expand-lg navbar-dark" style="background: linear-gradient(90deg, #8B0000, #00008B);">
    <div class="container-fluid">
        <!-- Logo y nombre de la empresa -->
        <a class="navbar-brand mx-auto fw-bold text-white" style="background: linear-gradient(90deg, #8B0000, #00008B); -webkit-background-clip: text; color: transparent; border: 2px solid transparent; padding: 5px 10px; font-size: 1.5rem; letter-spacing: 1px;" href="#">
            Sistema de Inventario CRUD
        </a>
        
        <!-- Botón de navegación en dispositivos pequeños -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        
        <!-- Menú de navegación -->
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                    <a class="nav-link text-white" href="#" style="font-size: 1.1rem;">
                        <i class="fas fa-home" style="font-size: 1.3rem;"></i> Inicio
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-white" href="inventario" style="font-size: 1.1rem;">
                        <i class="fas fa-cogs" style="font-size: 1.3rem;"></i> Inventario
                    </a>
                </li>
                
                <!-- Menú desplegable con el nombre del usuario y cerrar sesión -->
                <li class="nav-item dropdown">
                     <a class="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style="font-size: 1.1rem;">
                         <i class="fas fa-user-circle" style="font-size: 1.3rem;"></i>
                          Mi cuenta
                         </a>
                     <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <li class="dropdown-item">
                     <i class="fas fa-user" style="font-size: 1rem;"></i>
                     <span class="navbar-text text-dark">
                         <?= isset($_SESSION['usuario']) ? $_SESSION['usuario']['nombre'] . ' ' . $_SESSION['usuario']['apellido'] : 'Usuario'; ?>
                            </span>
                            </li>
                          <li><hr class="dropdown-divider"></li>
                          <button class="dropdown-item text-success" id="editarEmpleadoBtn" onclick="confirmarEdicion()">
                            <i class="fas fa-sign-out-alt"></i> Editar Usuario
                            </button>

                            <button class="dropdown-item text-danger" id="btn_cerrar">
                                <i class="fas fa-sign-out-alt"></i> Cerrar sesión
                            </button>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>

<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-12 text-center mt-3">
            <h2>Mi tienda</h2>
            <h3>"Bienvenidos a Mi tienda"</h3>
            <h4>Este apartado encontraras productos de tu selección o agregar productos en inventario</h4>
            <br>
        </div>

        <!-- Productos -->
        <div class="row">
            <!-- Producto 1 -->
            <div class="col-md-4 mb-4 d-flex justify-content-center">
                <div class="card" style="background-color: transparent; border: none;">
                    <img src="https://www.gob.mx/cms/uploads/article/main_image/109979/frutas_y_verduras.jpg" class="card-img-top" alt="Producto 1">
                    <div class="card-body d-flex flex-column align-items-center text-center">
                        <h5 class="card-title">Frutas y Verduras</h5>
                        <p class="card-text">Cantidad: 10</p>
                        <p class="card-text">Precio: $50</p>
                    </div>
                </div>
            </div>

            <!-- Producto 2 -->
            <div class="col-md-4 mb-4 d-flex justify-content-center">
                <div class="card" style="background-color: transparent; border: none;">
                    <img src="https://i.ytimg.com/vi/4zwSK4cBQBs/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBZFMeTIr3WElb3fXMc_T6upPSV5A" class="card-img-top" alt="Producto 2">
                    <div class="card-body d-flex flex-column align-items-center text-center">
                        <h5 class="card-title">Sabritas y Frituras</h5>
                        <p class="card-text">Cantidad: 15</p>
                        <p class="card-text">Precio: $30</p>
                    </div>
                </div>
            </div>

            <!-- Producto 3 -->
            <div class="col-md-4 mb-4 d-flex justify-content-center">
                <div class="card" style="background-color: transparent; border: none;">
                    <img src="https://static.wixstatic.com/media/11f9b4_6427f139a9fe43c4a76c9cb11715ffbd~mv2.png/v1/fill/w_980,h_555,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/11f9b4_6427f139a9fe43c4a76c9cb11715ffbd~mv2.png" class="card-img-top" alt="Producto 3">
                    <div class="card-body d-flex flex-column align-items-center text-center">
                        <h5 class="card-title">Refrescos y bebidas energizantes</h5>
                        <p class="card-text">Cantidad: 20</p>
                        <p class="card-text">Precio: $40</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="./public/js/boton-editar.js"></script>