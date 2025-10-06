function getYaEmpleadoForm() {
  return `
    <h2>Formulario - Ya eres empleado</h2>
    <form id="formYaEmpleado">
      <label for="idEmpleado">ID de Empleado:</label><br>
      <input type="text" id="idEmpleado" name="idEmpleado" required><br><br>

      <label for="password">Contraseña:</label><br>
      <input type="password" id="password" name="password" required><br><br>

      <button type="submit">Ingresar</button>
    </form>
  `
}

function getNuevoEmpleadoForm() {
  return `
    <h2>Formulario - Nuevo empleado</h2>
    <form id="formNuevoEmpleado">
      <label for="nombre">Nombre completo:</label><br>
      <input type="text" id="nombre" name="nombre" required><br><br>

      <label for="email">Correo electrónico:</label><br>
      <input type="email" id="email" name="email" required><br><br>

      <label for="cedula">Cédula:</label><br>
      <input type="text" id="cedula" name="cedula" required><br><br>

      <label for="anioIngreso">Año de ingreso:</label><br>
      <input type="number" id="anioIngreso" name="anioIngreso" min="1900" max="2100" required><br><br>

      <label for="cargo">Cargo:</label><br>
      <select id="cargo" name="cargo" required>
        <option value="">-- Selecciona --</option>
        <option value="ING">Ingeniero</option>
        <option value="ADM">Administrador</option>
        <option value="JFA">Jefe de área</option>
        <option value="EMP">Empleado normal</option>
      </select><br><br>

      <div id="subcargoContainer" style="display:none;">
        <label for="subcargo">Tipo de empleado:</label><br>
        <select id="subcargo" name="subcargo">
          <option value="">-- Selecciona --</option>
          <option value="Zunchador">Zunchador</option>
          <option value="Empacador">Empacador</option>
          <option value="Surtidor">Surtidor</option>
        </select><br><br>
      </div>

      <label for="password">Contraseña:</label><br>
      <input type="password" id="password" name="password" required><br><br>

      <label for="confirmPassword">Confirmar contraseña:</label><br>
      <input type="password" id="confirmPassword" name="confirmPassword" required><br><br>

      <button type="submit">Registrar</button>
    </form>
  `
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("[v0] DOM loaded, initializing opciones.js")

  const yaEmpleadoBtn = document.getElementById("yaEmpleado")
  const nuevoEmpleadoBtn = document.getElementById("nuevoEmpleado")
  const resultado = document.getElementById("resultado")

  console.log("[v0] Buttons found:", {
    yaEmpleadoBtn: !!yaEmpleadoBtn,
    nuevoEmpleadoBtn: !!nuevoEmpleadoBtn,
    resultado: !!resultado,
  })

  function guardarUsuario(usuario) {
    console.log("[v0] Saving user to localStorage:", usuario)
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]")
    console.log("[v0] Existing users:", usuarios)
    usuarios.push(usuario)
    localStorage.setItem("usuarios", JSON.stringify(usuarios))
    console.log("[v0] User saved successfully")
  }

  // --- Ya empleado (login) ---
  yaEmpleadoBtn?.addEventListener("click", () => {
    console.log("[v0] Ya empleado button clicked")
    if (!resultado) return
    resultado.innerHTML = getYaEmpleadoForm()
    console.log("[v0] Form inserted into resultado div")

    const form = document.getElementById("formYaEmpleado")
    console.log("[v0] Form found:", !!form)

    form?.addEventListener("submit", (e) => {
      console.log("[v0] Form submitted")
      e.preventDefault()
      const idEmpleado = (document.getElementById("idEmpleado") || { value: "" }).value.trim()
      const password = (document.getElementById("password") || { value: "" }).value

      console.log("[v0] Login attempt:", { idEmpleado, password: "***" })

      const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]")
      console.log("[v0] Users in localStorage:", usuarios)

      const usuarioEncontrado = usuarios.find((u) => u.idEmpleado === idEmpleado && u.password === password)
      console.log("[v0] User found:", !!usuarioEncontrado)

      const mensajeDiv = document.createElement("div")
      mensajeDiv.style.marginTop = "15px"

      if (usuarioEncontrado) {
        // Guardar sesión actual
        localStorage.setItem("usuarioActual", JSON.stringify(usuarioEncontrado))
        console.log("[v0] Current user saved to localStorage")
        mensajeDiv.innerHTML = `✅ Bienvenido de nuevo, <b>${usuarioEncontrado.nombre}</b>`

        // Redirigir según el cargo final
        const cargo = usuarioEncontrado.cargo
        console.log("[v0] Redirecting based on cargo:", cargo)

        if (cargo === "ING") {
          window.location.href = "pages/ingeniero.html"
        } else if (cargo === "ADM") {
          window.location.href = "pages/administrador.html"
        } else if (cargo === "JFA") {
          window.location.href = "pages/jefeArea.html"
        } else if (cargo === "Zunchador" || cargo === "Empacador" || cargo === "Surtidor") {
          window.location.href = "pages/empleadoNormal.html"
        } else {
          mensajeDiv.innerHTML += "<br/>⚠️ Cargo desconocido."
        }
      } else {
        mensajeDiv.innerHTML = `❌ Usuario no encontrado.`
      }

      resultado.appendChild(mensajeDiv)
    })
  })

  // --- Nuevo empleado (registro) ---
  nuevoEmpleadoBtn?.addEventListener("click", () => {
    console.log("[v0] Nuevo empleado button clicked")
    if (!resultado) return
    resultado.innerHTML = getNuevoEmpleadoForm()
    console.log("[v0] Form inserted into resultado div")

    const cargoSelect = document.getElementById("cargo")
    const subcargoContainer = document.getElementById("subcargoContainer")
    const subcargoSelect = document.getElementById("subcargo")

    console.log("[v0] Form elements found:", {
      cargoSelect: !!cargoSelect,
      subcargoContainer: !!subcargoContainer,
      subcargoSelect: !!subcargoSelect,
    })

    // Mostrar/ocultar subcargo según selección
    cargoSelect?.addEventListener("change", () => {
      console.log("[v0] Cargo changed to:", cargoSelect.value)
      if (cargoSelect.value === "EMP") {
        if (subcargoContainer) subcargoContainer.style.display = "block"
      } else {
        if (subcargoContainer) subcargoContainer.style.display = "none"
      }
    })

    const form = document.getElementById("formNuevoEmpleado")
    console.log("[v0] Form found:", !!form)

    form?.addEventListener("submit", (e) => {
      console.log("[v0] Registration form submitted")
      e.preventDefault()

      const nombre = (document.getElementById("nombre") || { value: "" }).value.trim()
      const email = (document.getElementById("email") || { value: "" }).value.trim()
      const cedula = (document.getElementById("cedula") || { value: "" }).value.trim()
      const anioIngreso = (document.getElementById("anioIngreso") || { value: "" }).value.trim()
      const cargo = (cargoSelect && cargoSelect.value) || ""
      const password = (document.getElementById("password") || { value: "" }).value
      const confirmPassword = (document.getElementById("confirmPassword") || { value: "" }).value

      console.log("[v0] Form data:", { nombre, email, cedula, anioIngreso, cargo })

      // Determinar cargo final
      let cargoFinal = cargo
      if (cargo === "EMP") {
        const sub = (subcargoSelect && subcargoSelect.value) || ""
        if (!sub) {
          alert("⚠️ Debes seleccionar el tipo de empleado (Zunchador, Empacador o Surtidor).")
          return
        }
        cargoFinal = sub
      }

      console.log("[v0] Final cargo:", cargoFinal)

      if (!nombre || !cedula || !anioIngreso || !cargoFinal || !password) {
        alert("⚠️ Por favor completa todos los campos.")
        return
      }

      if (password !== confirmPassword) {
        alert("❌ Las contraseñas no coinciden.")
        return
      }

      const nombreLimpio = nombre.split(" ")[0].toUpperCase()
      const ultimosCedula = cedula.slice(-4)
      const cargoId = cargoFinal.replace(/\s+/g, "")

      const idEmpleado = `${anioIngreso}-${cargoId}-${nombreLimpio}-${ultimosCedula}`
      console.log("[v0] Generated ID:", idEmpleado)

      const nuevoUsuario = {
        idEmpleado,
        nombre,
        email,
        cedula,
        anioIngreso,
        cargo: cargoFinal,
        password,
      }

      guardarUsuario(nuevoUsuario)

      const mensajeDiv = document.createElement("div")
      mensajeDiv.style.marginTop = "15px"
      mensajeDiv.innerHTML = `
        🎉 Usuario <b>${nombre}</b> registrado con éxito.<br>
        Tu ID es: <b style="color:blue">${idEmpleado}</b>
      `
      resultado.appendChild(mensajeDiv)
    })
  })
})

