import { getYaEmpleadoForm } from "../forms/yaEmpleadoForm"
import { getNuevoEmpleadoForm } from "../forms/nuevoEmpleadoForm"

document.addEventListener("DOMContentLoaded", () => {
  const yaEmpleadoBtn = document.getElementById("yaEmpleado") as HTMLButtonElement | null
  const nuevoEmpleadoBtn = document.getElementById("nuevoEmpleado") as HTMLButtonElement | null
  const resultado = document.getElementById("resultado") as HTMLDivElement | null

  function guardarUsuario(usuario: any) {
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]")
    usuarios.push(usuario)
    localStorage.setItem("usuarios", JSON.stringify(usuarios))
  }

  // --- Ya empleado (login) ---
  yaEmpleadoBtn?.addEventListener("click", () => {
    if (!resultado) return
    resultado.innerHTML = getYaEmpleadoForm()

    const form = document.getElementById("formYaEmpleado") as HTMLFormElement | null
    form?.addEventListener("submit", (e) => {
      e.preventDefault()
      const idEmpleado = ((document.getElementById("idEmpleado") as HTMLInputElement) || { value: "" }).value.trim()
      const password = ((document.getElementById("password") as HTMLInputElement) || { value: "" }).value

      const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]")
      const usuarioEncontrado = usuarios.find((u: any) => u.idEmpleado === idEmpleado && u.password === password)

      const mensajeDiv = document.createElement("div")
      mensajeDiv.style.marginTop = "15px"

      if (usuarioEncontrado) {
        // Guardar sesión actual
        localStorage.setItem("usuarioActual", JSON.stringify(usuarioEncontrado))
        mensajeDiv.innerHTML = `✅ Bienvenido de nuevo, <b>${usuarioEncontrado.nombre}</b>`

        // Redirigir según el cargo final (Zunchador, Empacador, Surtidor o roles administrativos)
        const cargo = usuarioEncontrado.cargo
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
    if (!resultado) return
    resultado.innerHTML = getNuevoEmpleadoForm()

    // IMPORTANT: después de insertar innerHTML hay que enlazar los listeners desde aquí
    const cargoSelect = document.getElementById("cargo") as HTMLSelectElement | null
    const subcargoContainer = document.getElementById("subcargoContainer") as HTMLDivElement | null
    const subcargoSelect = document.getElementById("subcargo") as HTMLSelectElement | null

    // Mostrar/ocultar subcargo según selección
    cargoSelect?.addEventListener("change", () => {
      if (cargoSelect.value === "EMP") {
        if (subcargoContainer) subcargoContainer.style.display = "block"
      } else {
        if (subcargoContainer) subcargoContainer.style.display = "none"
      }
    })

    const form = document.getElementById("formNuevoEmpleado") as HTMLFormElement | null
    form?.addEventListener("submit", (e) => {
      e.preventDefault()

      const nombre = ((document.getElementById("nombre") as HTMLInputElement) || { value: "" }).value.trim()
      const email = ((document.getElementById("email") as HTMLInputElement) || { value: "" }).value.trim()
      const cedula = ((document.getElementById("cedula") as HTMLInputElement) || { value: "" }).value.trim()
      const anioIngreso = ((document.getElementById("anioIngreso") as HTMLInputElement) || { value: "" }).value.trim()
      const cargo = (cargoSelect && cargoSelect.value) || ""
      const password = ((document.getElementById("password") as HTMLInputElement) || { value: "" }).value
      const confirmPassword = ((document.getElementById("confirmPassword") as HTMLInputElement) || { value: "" }).value

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
      // sanitizar cargoFinal (sin espacios)
      const cargoId = cargoFinal.replace(/\s+/g, "")

      const idEmpleado = `${anioIngreso}-${cargoId}-${nombreLimpio}-${ultimosCedula}`

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
