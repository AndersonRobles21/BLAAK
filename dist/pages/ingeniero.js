import { getNuevoEmpleadoForm } from "../forms/nuevoEmpleadoForm.js";
document.addEventListener("DOMContentLoaded", () => {
    const contenido = document.getElementById("contenido");
    contenido.innerHTML = `
    <h1>👷 Bienvenido Ingeniero</h1>
    <p>Usa las opciones para gestionar personal.</p>
    <div>
      <button id="btnContratar">Contratar nuevo empleado</button>
      <button id="btnDespedir">Despedir empleado</button>
      <button id="btnInforme">Ver informe</button>
    </div>
    <div id="resultado" style="margin-top:15px;"></div>
  `;
    const btnContratar = document.getElementById("btnContratar");
    const btnDespedir = document.getElementById("btnDespedir");
    const btnInforme = document.getElementById("btnInforme");
    const resultado = document.getElementById("resultado");
    // Contratar nuevo empleado
    btnContratar.addEventListener("click", () => {
        resultado.innerHTML = getNuevoEmpleadoForm();
        const form = document.getElementById("formNuevoEmpleado");
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const nombre = String(formData.get("nombre")).trim();
            const email = String(formData.get("email")).trim();
            const cedula = String(formData.get("cedula")).trim();
            const anioIngreso = String(formData.get("anioIngreso")).trim();
            const cargo = String(formData.get("cargo"));
            const password = String(formData.get("password"));
            // Generar el ID como en opciones.ts
            const nombreLimpio = nombre.split(" ")[0].toUpperCase();
            const ultimosCedula = cedula.slice(-4);
            const idEmpleado = `${anioIngreso}-${cargo}-${nombreLimpio}-${ultimosCedula}`;
            const usuarios = obtenerUsuarios();
            if (usuarios.find((u) => u.idEmpleado === idEmpleado)) {
                resultado.innerHTML += `<p style=\"color:red\">Error: ya existe un empleado con ese ID.</p>`;
                return;
            }
            const nuevoUsuario = {
                idEmpleado,
                nombre,
                email,
                cargo,
                password,
            };
            guardarUsuario(nuevoUsuario);
            resultado.innerHTML = `
        <p>🎉 Usuario <b>${nombre}</b> registrado con éxito. ID: <b>${idEmpleado}</b></p>
        <div id=\"listaNuevosUsuarios\"></div>
      `;
            mostrarNuevosUsuarios();
        });
    });
    // Mostrar lista de nuevos usuarios
    function mostrarNuevosUsuarios() {
        const usuarios = obtenerUsuarios();
        const listaDiv = document.getElementById("listaNuevosUsuarios");
        if (!listaDiv)
            return;
        if (usuarios.length === 0) {
            listaDiv.innerHTML = '<p>No hay usuarios registrados.</p>';
            return;
        }
        let html = '<h3>Usuarios registrados recientemente:</h3><ul>';
        usuarios.slice(-5).reverse().forEach(u => {
            html += `<li><b>${u.nombre}</b> (ID: <span style=\"color:blue\">${u.idEmpleado}</span>, Cargo: ${u.cargo})</li>`;
        });
        html += '</ul>';
        listaDiv.innerHTML = html;
    }
    // Despedir empleado
    btnDespedir.addEventListener("click", () => {
        resultado.innerHTML = `
      <h2>Despedir empleado</h2>
      <form id=\"formDespedir\">
        <label for=\"idDespedir\">ID de empleado a despedir:</label><br>
        <input id=\"idDespedir\" name=\"idDespedir\" required><br><br>
        <button type=\"submit\">Despedir</button>
      </form>
      <div id=\"despedirResultado\" style=\"margin-top:10px;\"></div>
    `;
        const form = document.getElementById("formDespedir");
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const id = document.getElementById("idDespedir").value;
            const ok = eliminarUsuarioPorId(id);
            const r = document.getElementById("despedirResultado");
            if (ok) {
                r.innerHTML = `<p style=\"color:green\">Empleado con ID <b>${id}</b> despedido y datos eliminados.</p>`;
            }
            else {
                r.innerHTML = `<p style=\"color:red\">No se encontró empleado con ID <b>${id}</b>.</p>`;
            }
        });
    });
    // Informe
    btnInforme.addEventListener("click", () => {
        resultado.innerHTML = generarInforme();
    });
    function obtenerUsuarios() {
        return JSON.parse(localStorage.getItem("usuarios") || "[]");
    }
    function guardarUsuarios(usuarios) {
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }
    function guardarUsuario(usuario) {
        const usuarios = obtenerUsuarios();
        usuarios.push(usuario);
        guardarUsuarios(usuarios);
    }
    function eliminarUsuarioPorId(id) {
        let usuarios = obtenerUsuarios();
        const originalLen = usuarios.length;
        usuarios = usuarios.filter((u) => u.idEmpleado !== id);
        guardarUsuarios(usuarios);
        return usuarios.length !== originalLen;
    }
    function generarInforme() {
        const usuarios = obtenerUsuarios();
        const conteo = {};
        usuarios.forEach((u) => {
            conteo[u.cargo] = (conteo[u.cargo] || 0) + 1;
        });
        let html = `<h2>Informe de personal</h2>`;
        html += `<p>Total empleados registrados: <b>${usuarios.length}</b></p>`;
        html += `<ul>`;
        for (const cargo in conteo) {
            html += `<li>${cargo}: <b>${conteo[cargo]}</b></li>`;
        }
        html += `</ul>`;
        if (usuarios.length > 0) {
            html += `<table border="1" cellpadding="6" cellspacing="0">
      <thead><tr><th>ID</th><th>Nombre</th><th>Cargo</th><th>Correo</th></tr></thead><tbody>`;
            usuarios.forEach((u) => {
                html += `<tr>
        <td>${u.idEmpleado}</td>
        <td>${u.nombre}</td>
        <td>${u.cargo}</td>
        <td>${u.email}</td>
      </tr>`;
            });
            html += `</tbody></table>`;
        }
        else {
            html += `<p>No hay empleados registrados.</p>`;
        }
        return html;
    }
    document.addEventListener("DOMContentLoaded", () => {
        const contenido = document.getElementById("contenido");
        contenido.innerHTML = `
    <h1>👷 Bienvenido Ingeniero</h1>
    <p>Usa las opciones para gestionar personal.</p>
    <div>
      <button id="btnContratar">Contratar nuevo empleado</button>
      <button id="btnRegistrarExistente">Registrar (ya empleado)</button>
      <button id="btnDespedir">Despedir un empleado</button>
      <button id="btnInforme">Ver informe</button>
    </div>
    <div id="resultado" style="margin-top:15px;"></div>
  `;
        const btnContratar = document.getElementById("btnContratar");
        const btnRegistrarExistente = document.getElementById("btnRegistrarExistente");
        const btnDespedir = document.getElementById("btnDespedir");
        const btnInforme = document.getElementById("btnInforme");
        const resultado = document.getElementById("resultado");
        // Contratar nuevo empleado
        btnContratar.addEventListener("click", () => {
            resultado.innerHTML = getNuevoEmpleadoForm();
            const form = document.getElementById("formNuevoEmpleado");
            form.addEventListener("submit", (e) => {
                e.preventDefault();
                const formData = new FormData(form);
                const nombre = String(formData.get("nombre")).trim();
                const email = String(formData.get("email")).trim();
                const cedula = String(formData.get("cedula")).trim();
                const anioIngreso = String(formData.get("anioIngreso")).trim();
                const cargo = String(formData.get("cargo"));
                const password = String(formData.get("password"));
                // Generar el ID como en opciones.ts
                const nombreLimpio = nombre.split(" ")[0].toUpperCase();
                const ultimosCedula = cedula.slice(-4);
                const idEmpleado = `${anioIngreso}-${cargo}-${nombreLimpio}-${ultimosCedula}`;
                const usuarios = obtenerUsuarios();
                if (usuarios.find((u) => u.idEmpleado === idEmpleado)) {
                    resultado.innerHTML += `<p style="color:red">Error: ya existe un empleado con ese ID.</p>`;
                    return;
                }
                const nuevoUsuario = {
                    idEmpleado,
                    nombre,
                    email,
                    cargo,
                    password,
                };
                guardarUsuario(nuevoUsuario);
                resultado.innerHTML = `
        <p>🎉 Usuario <b>${nombre}</b> registrado con éxito. ID: <b>${idEmpleado}</b></p>
        <div id="listaNuevosUsuarios"></div>
      `;
                mostrarNuevosUsuarios();
            });
        });
        // Mostrar lista de nuevos usuarios (fuera del callback)
        function mostrarNuevosUsuarios() {
            const usuarios = obtenerUsuarios();
            const listaDiv = document.getElementById("listaNuevosUsuarios");
            if (!listaDiv)
                return;
            if (usuarios.length === 0) {
                listaDiv.innerHTML = '<p>No hay usuarios registrados.</p>';
                return;
            }
            let html = '<h3>Usuarios registrados recientemente:</h3><ul>';
            usuarios.slice(-5).reverse().forEach(u => {
                html += `<li><b>${u.nombre}</b> (ID: <span style=\"color:blue\">${u.idEmpleado}</span>, Cargo: ${u.cargo})</li>`;
            });
            html += '</ul>';
            listaDiv.innerHTML = html;
        }
    });
    // Registrar existente
    // Despedir empleado
    btnDespedir.addEventListener("click", () => {
        resultado.innerHTML = `
      <h2>Despedir empleado</h2>
      <form id="formDespedir">
        <label for="idDespedir">ID de empleado a despedir:</label><br>
        <input id="idDespedir" name="idDespedir" required><br><br>
        <button type="submit">Despedir</button>
      </form>
      <div id="despedirResultado" style="margin-top:10px;"></div>
    `;
        const form = document.getElementById("formDespedir");
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const id = document.getElementById("idDespedir").value;
            const ok = eliminarUsuarioPorId(id);
            const r = document.getElementById("despedirResultado");
            if (ok) {
                r.innerHTML = `<p style="color:green">Empleado con ID <b>${id}</b> despedido y datos eliminados.</p>`;
            }
            else {
                r.innerHTML = `<p style="color:red">No se encontró empleado con ID <b>${id}</b>.</p>`;
            }
        });
    });
    // Informe
    btnInforme.addEventListener("click", () => {
        resultado.innerHTML = generarInforme();
    });
});
