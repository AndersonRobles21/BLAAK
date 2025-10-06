"use strict";
// Handler para el formulario de login de empleados existentes
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    const mensajeDiv = document.getElementById("mensaje");
    if (!form) {
        console.error("[v0] Login form not found");
        return;
    }
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        // Obtener valores del formulario
        const idEmpleado = document.getElementById("idEmpleado").value.trim();
        const password = document.getElementById("password").value;
        console.log("[v0] Attempting login with ID:", idEmpleado);
        // Obtener usuarios del localStorage
        const usuariosJSON = localStorage.getItem("usuarios");
        if (!usuariosJSON) {
            mostrarMensaje("No hay usuarios registrados. Por favor, regístrate primero.", "error");
            return;
        }
        const usuarios = JSON.parse(usuariosJSON);
        console.log("[v0] Found users in localStorage:", usuarios.length);
        // Buscar usuario por ID y contraseña
        const usuario = usuarios.find((u) => u.idEmpleado === idEmpleado && u.password === password);
        if (!usuario) {
            mostrarMensaje("ID de empleado o contraseña incorrectos", "error");
            return;
        }
        console.log("[v0] Login successful for user:", usuario.nombre);
        // Guardar sesión del usuario actual
        localStorage.setItem("usuarioActual", JSON.stringify(usuario));
        // Redirigir según el cargo
        const redirectMap = {
            ING: "pages/ingeniero.html",
            ADM: "pages/administrador.html",
            JFA: "pages/jefeArea.html",
            EMP: "pages/empleadoNormal.html",
        };
        const redirectUrl = redirectMap[usuario.cargo];
        if (redirectUrl) {
            mostrarMensaje("¡Inicio de sesión exitoso! Redirigiendo...", "success");
            setTimeout(() => {
                window.location.href = redirectUrl;
            }, 1000);
        }
        else {
            mostrarMensaje("Error: Cargo no reconocido", "error");
        }
    });
    function mostrarMensaje(texto, tipo) {
        if (!mensajeDiv)
            return;
        mensajeDiv.innerHTML = texto;
        mensajeDiv.className = `mensaje ${tipo}`;
        mensajeDiv.style.display = "block";
    }
});
