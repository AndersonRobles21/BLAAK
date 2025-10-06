"use strict";
// Handler para el formulario de registro de nuevos empleados
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registerForm");
    const mensajeDiv = document.getElementById("mensaje");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        // Obtener valores del formulario
        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim();
        const cedula = document.getElementById("cedula").value.trim();
        const anioIngreso = document.getElementById("anioIngreso").value;
        const cargo = document.getElementById("cargo").value;
        const password = document.getElementById("newPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        // Validar que las contraseñas coincidan
        if (password !== confirmPassword) {
            mostrarMensaje("Las contraseñas no coinciden", "error");
            return;
        }
        // Generar ID del empleado: AÑO-CARGO-NOMBRE-CEDULA
        const nombreCorto = nombre.split(" ")[0].toUpperCase();
        const idEmpleado = `${anioIngreso}-${cargo}-${nombreCorto}-${cedula}`;
        // Obtener usuarios existentes del localStorage
        const usuariosGuardados = localStorage.getItem("usuarios");
        const usuarios = usuariosGuardados ? JSON.parse(usuariosGuardados) : [];
        // Verificar si ya existe un usuario con la misma cédula o email
        const usuarioExistente = usuarios.find((u) => u.cedula === cedula || u.email === email);
        if (usuarioExistente) {
            mostrarMensaje("Ya existe un usuario con esa cédula o email", "error");
            return;
        }
        // Crear nuevo usuario
        const nuevoUsuario = {
            idEmpleado,
            nombre,
            email,
            cedula,
            anioIngreso,
            cargo,
            password,
        };
        // Agregar al array y guardar en localStorage
        usuarios.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        // Mostrar mensaje de éxito con el ID generado
        mostrarMensaje(`¡Registro exitoso! Tu ID de empleado es: <strong>${idEmpleado}</strong><br>Serás redirigido al login en 3 segundos...`, "success");
        // Limpiar formulario
        form.reset();
        // Redirigir después de 3 segundos
        setTimeout(() => {
            window.location.href = "yaEmpleado.html";
        }, 3000);
    });
    function mostrarMensaje(texto, tipo) {
        mensajeDiv.innerHTML = texto;
        mensajeDiv.className = `mensaje ${tipo}`;
        mensajeDiv.style.display = "block";
    }
});
