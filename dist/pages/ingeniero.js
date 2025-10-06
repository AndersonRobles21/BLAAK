function getNuevoEmpleadoForm() {
  return `
    <h2>Formulario - Nuevo empleado</h2>
    <form id="formNuevoEmpleado">
      <div>
        <label for="nombre" style="color: #e8e8e8; display: block; margin-bottom: 8px;">Nombre completo:</label>
        <input type="text" id="nombre" name="nombre" placeholder="Ej: Nombre" required>
      </div>

      <div>
        <label for="email" style="color: #e8e8e8; display: block; margin-bottom: 8px;">Correo electrónico:</label>
        <input type="email" id="email" name="email" placeholder="ejemplo@correo.com" required>
      </div>

      <div>
        <label for="cedula" style="color: #e8e8e8; display: block; margin-bottom: 8px;">Cédula:</label>
        <input type="text" id="cedula" name="cedula" placeholder="1234567890" required>
      </div>

      <div>
        <label for="anioIngreso" style="color: #e8e8e8; display: block; margin-bottom: 8px;">Año de ingreso:</label>
        <input type="number" id="anioIngreso" name="anioIngreso" min="1900" max="2100" placeholder="2025" required>
      </div>

      <div>
        <label for="cargo" style="color: #e8e8e8; display: block; margin-bottom: 8px;">Cargo:</label>
        <select id="cargo" name="cargo" required>
          <option value="">-- Selecciona un cargo --</option>
          <option value="ING">Ingeniero</option>
          <option value="ADM">Administrador</option>
          <option value="JFA">Jefe de área</option>
          <option value="EMP">Empleado normal</option>
        </select>
      </div>

      <div id="subcargoContainer" style="display:none;">
        <label for="subcargo" style="color: #e8e8e8; display: block; margin-bottom: 8px;">Tipo de empleado:</label>
        <select id="subcargo" name="subcargo">
          <option value="">-- Selecciona un tipo --</option>
          <option value="Zunchador">Zunchador</option>
          <option value="Empacador">Empacador</option>
          <option value="Surtidor">Surtidor</option>
        </select>
      </div>

      <div>
        <label for="password" style="color: #e8e8e8; display: block; margin-bottom: 8px;">Contraseña:</label>
        <input type="password" id="password" name="password" placeholder="Mínimo 6 caracteres" required>
      </div>

      <div>
        <label for="confirmPassword" style="color: #e8e8e8; display: block; margin-bottom: 8px;">Confirmar contraseña:</label>
        <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Repite la contraseña" required>
      </div>

      <button type="submit" class="btn btn-primary" style="margin-top: 8px;">Registrar empleado</button>
    </form>
  `
}

function obtenerUsuarios() {
  return JSON.parse(localStorage.getItem("usuarios") || "[]")
}

function guardarUsuarios(usuarios) {
  localStorage.setItem("usuarios", JSON.stringify(usuarios))
}

function guardarUsuario(usuario) {
  const usuarios = obtenerUsuarios()
  usuarios.push(usuario)
  guardarUsuarios(usuarios)
}

function eliminarUsuarioPorId(id) {
  let usuarios = obtenerUsuarios()
  const originalLen = usuarios.length
  usuarios = usuarios.filter((u) => u.idEmpleado !== id)
  guardarUsuarios(usuarios)
  return usuarios.length !== originalLen
}

function generarInforme() {
  const usuarios = obtenerUsuarios()

  const conteos = {
    JFA: usuarios.filter((u) => u.cargo === "JFA").length,
    ADM: usuarios.filter((u) => u.cargo === "ADM").length,
    ING: usuarios.filter((u) => u.cargo === "ING").length,
    EMP: usuarios.filter((u) => u.cargo === "EMP").length,
  }

  let html = `
    <div class="section">
      <h2>Informe de personal</h2>
      <p style="color: #e8e8e8; margin-bottom: 10px;">Total de empleados registrados: <span style="color: #00d9ff; font-weight: 600; font-size: 1.2rem;">${usuarios.length}</span></p>
      <ul style="color: #e8e8e8; list-style: none; padding-left: 0; margin-bottom: 30px;">
        <li style="margin: 5px 0;">Jefe de área: <span style="color: #00d9ff; font-weight: 600;">${conteos.JFA}</span></li>
        <li style="margin: 5px 0;">Administrador: <span style="color: #00d9ff; font-weight: 600;">${conteos.ADM}</span></li>
        <li style="margin: 5px 0;">Ingeniero: <span style="color: #00d9ff; font-weight: 600;">${conteos.ING}</span></li>
        <li style="margin: 5px 0;">Empleado: <span style="color: #00d9ff; font-weight: 600;">${conteos.EMP}</span></li>
      </ul>
  `

  if (usuarios.length > 0) {
    html += `<div class="employee-list">`
    usuarios.forEach((u) => {
      const roleLabel =
        {
          ADM: "Administrador",
          ING: "Ingeniero",
          JFA: "Jefe de área",
          EMP: "Empleado",
        }[u.cargo] || u.cargo

      html += `
        <div class="employee-item">
          <div class="employee-info">
            <div class="employee-name">${u.nombre}</div>
            <div class="employee-id">${u.idEmpleado}</div>
            <div class="employee-id">${u.email}</div>
            <span class="employee-role">${roleLabel}</span>
          </div>
        </div>
      `
    })
    html += `</div>`
  } else {
    html += `<p style="color: #b0b0b0; padding: 20px; text-align: center;">No hay empleados registrados.</p>`
  }

  html += `</div>`
  return html
}

function mostrarNuevosUsuarios() {
  const usuarios = obtenerUsuarios()
  const listaDiv = document.getElementById("listaNuevosUsuarios")
  if (!listaDiv) return

  if (usuarios.length === 0) {
    listaDiv.innerHTML = "<p>No hay usuarios registrados.</p>"
    return
  }

  let html = "<h3>Usuarios registrados recientemente:</h3><ul>"
  usuarios
    .slice(-5)
    .reverse()
    .forEach((u) => {
      html += `<li><b>${u.nombre}</b> (ID: <span style="color:blue">${u.idEmpleado}</span>, Cargo: ${u.cargo})</li>`
    })
  html += "</ul>"
  listaDiv.innerHTML = html
}

document.addEventListener("DOMContentLoaded", () => {
  const contenido = document.getElementById("contenido")
  contenido.innerHTML = `
    <div class="container">
      <h1>Bienvenido Ingeniero</h1>
      <div class="section">
        <h2>Panel de Control</h2>
        <p style="color: #b0b0b0; margin-bottom: 20px;">Usa las opciones para gestionar personal.</p>
        <div class="btn-group">
          <button id="btnContratar" class="btn btn-primary">Contratar nuevo empleado</button>
          <button id="btnDespedir" class="btn btn-primary">Despedir un empleado</button>
          <button id="btnInforme" class="btn btn-primary">Ver informe</button>
        </div>
      </div>
      <div id="resultado"></div>
      <div class="back-button-container">
        <a href="../index.html" class="btn-back">← Volver al inicio</a>
      </div>
    </div>
  `

  const btnContratar = document.getElementById("btnContratar")
  const btnDespedir = document.getElementById("btnDespedir")
  const btnInforme = document.getElementById("btnInforme")
  const resultado = document.getElementById("resultado")

  // Contratar nuevo empleado
  btnContratar.addEventListener("click", () => {
    resultado.innerHTML = `
      <div class="section">
        ${getNuevoEmpleadoForm()}
      </div>
    `
    const form = document.getElementById("formNuevoEmpleado")

    const cargoSelect = document.getElementById("cargo")
    const subcargoContainer = document.getElementById("subcargoContainer")

    cargoSelect.addEventListener("change", () => {
      if (cargoSelect.value === "EMP") {
        subcargoContainer.style.display = "block"
      } else {
        subcargoContainer.style.display = "none"
      }
    })

    form.addEventListener("submit", (e) => {
      e.preventDefault()
      const formData = new FormData(form)
      const nombre = String(formData.get("nombre")).trim()
      const email = String(formData.get("email")).trim()
      const cedula = String(formData.get("cedula")).trim()
      const anioIngreso = String(formData.get("anioIngreso")).trim()
      const cargo = String(formData.get("cargo"))
      const password = String(formData.get("password"))
      const confirmPassword = String(formData.get("confirmPassword"))

      if (password !== confirmPassword) {
        resultado.innerHTML += `<div class="section"><p style="color:#60a5fa; font-weight: 600;">Error: Las contraseñas no coinciden.</p></div>`
        return
      }

      const nombreLimpio = nombre.split(" ")[0].toUpperCase()
      const ultimosCedula = cedula.slice(-10)
      const idEmpleado = `${anioIngreso}-${cargo}-${nombreLimpio}-${ultimosCedula}`

      const usuarios = obtenerUsuarios()
      if (usuarios.find((u) => u.idEmpleado === idEmpleado)) {
        resultado.innerHTML += `<div class="section"><p style="color:#60a5fa; font-weight: 600;">Error: ya existe un empleado con ese ID.</p></div>`
        return
      }

      const nuevoUsuario = {
        idEmpleado,
        nombre,
        email,
        cargo,
        password,
      }

      guardarUsuario(nuevoUsuario)
      resultado.innerHTML = `
        <div class="section">
          <h2 style="color: #00d9ff;">Usuario registrado con éxito</h2>
          <p style="color: #e8e8e8; margin: 15px 0;"><b>${nombre}</b> ha sido registrado correctamente.</p>
          <p style="color: #b0b0b0;">ID asignado: <span style="color: #00d9ff; font-weight: 600;">${idEmpleado}</span></p>
          <div id="listaNuevosUsuarios" style="margin-top: 20px;"></div>
        </div>
      `
      mostrarNuevosUsuarios()
    })
  })

  // Despedir empleado
  btnDespedir.addEventListener("click", () => {
    resultado.innerHTML = `
      <div class="section">
        <h2>Despedir empleado</h2>
        <form id="formDespedir">
          <label for="idDespedir" style="color: #e8e8e8; display: block; margin-bottom: 8px;">ID de empleado a despedir:</label>
          <input type="text" id="idDespedir" name="idDespedir" required>
          <button type="submit" class="btn btn-danger" style="margin-top: 16px;">Despedir empleado</button>
        </form>
        <div id="despedirResultado" style="margin-top:20px;"></div>
      </div>
    `

    const form = document.getElementById("formDespedir")
    form.addEventListener("submit", (e) => {
      e.preventDefault()
      const id = document.getElementById("idDespedir").value.trim()
      const ok = eliminarUsuarioPorId(id)
      const r = document.getElementById("despedirResultado")

      if (ok) {
        r.innerHTML = `<p style="color:#00d9ff; font-weight: 600; padding: 15px; background: rgba(0, 217, 255, 0.1); border-radius: 8px; border-left: 4px solid #00d9ff;">Empleado con ID <b>${id}</b> despedido y datos eliminados correctamente.</p>`
      } else {
        r.innerHTML = `<p style="color:#60a5fa; font-weight: 600; padding: 15px; background: rgba(96, 165, 250, 0.1); border-radius: 8px; border-left: 4px solid #60a5fa;">No se encontró empleado con ID <b>${id}</b>.</p>`
      }
    })
  })

  // Informe
  btnInforme.addEventListener("click", () => {
    resultado.innerHTML = generarInforme()
  })
})
