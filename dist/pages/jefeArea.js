"use strict";
document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ DOM cargado correctamente");
    const btnMostrar = document.getElementById("btnMostrarEmpleados");
    const btnRepartir = document.getElementById("btnRepartir");
    const btnVerificar = document.getElementById("btnVerificar");
    const inputEmpleadoId = document.getElementById("inputEmpleadoId");
    const contenedorEmpleados = document.getElementById("empleadosContainer");
    const contenedorTareas = document.getElementById("tareasContainer");
    // 📌 Obtener lista de empleados guardados
    function obtenerEmpleados() {
        const data = localStorage.getItem("usuarios");
        return data ? JSON.parse(data) : [];
    }
    // 👥 Mostrar empleados registrados
    function mostrarEmpleados() {
        console.log("🔹 Clic en Mostrar empleados");
        const empleados = obtenerEmpleados();
        contenedorEmpleados.innerHTML = "";
        if (empleados.length === 0) {
            contenedorEmpleados.innerHTML = "<p>No hay empleados registrados.</p>";
            return;
        }
        const lista = document.createElement("ul");
        empleados.forEach((emp) => {
            var _a;
            const item = document.createElement("li");
            item.textContent = `${emp.cargo}: ${emp.nombre} (ID: ${(_a = emp.idEmpleado) !== null && _a !== void 0 ? _a : "sin ID"})`;
            lista.appendChild(item);
        });
        contenedorEmpleados.appendChild(lista);
    }
    // 📋 Repartir misión
    function repartirMision() {
        console.log("📋 Clic en Repartir misión");
        const tareasGuardadas = localStorage.getItem("tareas");
        const tareas = tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
        // 🔹 Aquí asignas la tarea al empleado que quieras
        const nuevaTarea = {
            descripcion: "Tarea general asignada",
            asignadaA: "Laura", // Cambia por el nombre del empleado
            estado: "Pendiente"
        };
        tareas.push(nuevaTarea);
        localStorage.setItem("tareas", JSON.stringify(tareas));
        alert("✅ Misión asignada correctamente.");
    }
    // 🔍 Verificar tareas de un empleado
    function verificarTarea() {
        console.log("🔍 Clic en Verificar tarea");
        const idBuscado = inputEmpleadoId.value.trim();
        if (!idBuscado) {
            alert("Por favor, ingrese un ID o nombre de empleado.");
            return;
        }
        const tareasGuardadas = localStorage.getItem("tareas");
        const tareas = tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
        // 🔹 Buscar por nombre o ID
        const tareasEmpleado = tareas.filter((t) => t.asignadaA.toLowerCase().includes(idBuscado.toLowerCase()));
        contenedorTareas.innerHTML = "";
        if (tareasEmpleado.length === 0) {
            contenedorTareas.innerHTML = `<p>No hay tareas asignadas al empleado: <b>${idBuscado}</b></p>`;
            return;
        }
        // Contadores de estados
        const completadas = tareasEmpleado.filter((t) => t.estado === "Completada").length;
        const pendientes = tareasEmpleado.filter((t) => t.estado === "Pendiente").length;
        // Mostrar lista detallada
        let html = `<h3>📋 Tareas de ${idBuscado}</h3><ul>`;
        tareasEmpleado.forEach((t) => {
            html += `<li>${t.descripcion} — Estado: <b>${t.estado}</b></li>`;
        });
        html += `</ul>`;
        // Mostrar resumen
        html += `
      <p>✅ Completadas: <b>${completadas}</b></p>
      <p>⏳ Pendientes: <b>${pendientes}</b></p>
    `;
        contenedorTareas.innerHTML = html;
    }
    btnMostrar === null || btnMostrar === void 0 ? void 0 : btnMostrar.addEventListener("click", mostrarEmpleados);
    btnRepartir === null || btnRepartir === void 0 ? void 0 : btnRepartir.addEventListener("click", repartirMision);
    btnVerificar === null || btnVerificar === void 0 ? void 0 : btnVerificar.addEventListener("click", verificarTarea);
});
