"use strict";
document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Página de empleado cargada");
    const contenido = document.getElementById("contenido");
    contenido.innerHTML = `
    <h1>👷 Panel del Empleado</h1>
    <p>Consulta tu información y gestiona tus tareas asignadas.</p>
    <div>
      <button id="btnVerInfo">📌 Ver mi información</button>
      <button id="btnVerTareas">📝 Ver mis tareas</button>
    </div>
    <div id="resultado" style="margin-top:15px;"></div>
  `;
    const btnVerInfo = document.getElementById("btnVerInfo");
    const btnVerTareas = document.getElementById("btnVerTareas");
    const resultado = document.getElementById("resultado");
    //  Obtener datos de LocalStorage
    function obtenerTareas() {
        const data = localStorage.getItem("tareas");
        return data ? JSON.parse(data) : [];
    }
    function guardarTareas(tareas) {
        localStorage.setItem("tareas", JSON.stringify(tareas));
    }
    function obtenerUsuarioActual() {
        const usuarioActual = localStorage.getItem("usuarioActual");
        return usuarioActual ? JSON.parse(usuarioActual) : null;
    }
    //  Ver información básica del empleado
    btnVerInfo.addEventListener("click", () => {
        const empleado = obtenerUsuarioActual();
        if (!empleado) {
            resultado.innerHTML = `<p style="color:red">⚠️ No hay sesión activa. Inicie sesión primero.</p>`;
            return;
        }
        resultado.innerHTML = `
      <h2>👤 Mi Información</h2>
      <p><b>Nombre:</b> ${empleado.nombre}</p>
      <p><b>Cargo:</b> ${empleado.cargo}</p>
      <p><b>Email:</b> ${empleado.email}</p>
      <p><b>ID:</b> ${empleado.idEmpleado}</p>
    `;
    });
    // Ver y gestionar tareas asignadas
    btnVerTareas.addEventListener("click", () => {
        const empleado = obtenerUsuarioActual();
        if (!empleado) {
            resultado.innerHTML = `<p style="color:red">⚠️ No hay sesión activa. Inicie sesión primero.</p>`;
            return;
        }
        const tareas = obtenerTareas();
        const tareasEmpleado = tareas.filter((t) => t.asignadaA.toLowerCase() === empleado.nombre.toLowerCase());
        if (tareasEmpleado.length === 0) {
            resultado.innerHTML = `<p>✅ No tienes tareas asignadas aún.</p>`;
        }
        else {
            let html = `<h2>📋 Mis Tareas</h2><ul>`;
            tareasEmpleado.forEach((t, index) => {
                html += `
          <li>
            ${t.descripcion} — Estado: <b>${t.estado}</b>
            <button class="btnCompletar" data-index="${index}">✔ Marcar completada</button>
            <button class="btnPendiente" data-index="${index}">⏳ Marcar pendiente</button>
          </li>
        `;
            });
            html += `</ul>`;
            resultado.innerHTML = html;
            // Eventos para marcar tareas
            document.querySelectorAll(".btnCompletar").forEach(btn => {
                btn.addEventListener("click", (e) => {
                    const idx = e.target.getAttribute("data-index");
                    if (idx !== null) {
                        const tareaGlobalIndex = tareas.findIndex((tg) => tg.asignadaA.toLowerCase() === empleado.nombre.toLowerCase() &&
                            tg.descripcion === tareasEmpleado[+idx].descripcion);
                        tareas[tareaGlobalIndex].estado = "Completada";
                        guardarTareas(tareas);
                        btnVerTareas.click(); // refresca la vista
                    }
                });
            });
            document.querySelectorAll(".btnPendiente").forEach(btn => {
                btn.addEventListener("click", (e) => {
                    const idx = e.target.getAttribute("data-index");
                    if (idx !== null) {
                        const tareaGlobalIndex = tareas.findIndex((tg) => tg.asignadaA.toLowerCase() === empleado.nombre.toLowerCase() &&
                            tg.descripcion === tareasEmpleado[+idx].descripcion);
                        tareas[tareaGlobalIndex].estado = "Pendiente";
                        guardarTareas(tareas);
                        btnVerTareas.click(); // refresca la vista
                    }
                });
            });
        }
    });
});
