document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm")
  const mensajeDiv = document.getElementById("mensaje")

  if (!form) {
    return
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault()

    const nombre = document.getElementById("nombre").value.trim()
    const email = document.getElementById("email").value.trim()
    const cedula = document.getElementById("cedula").value.trim()
    const anioIngreso = document.getElementById("anioIngreso").value
    const cargo = document.getElementById("cargo").value
    const password = document.getElementById("newPassword").value
    const confirmPassword = document.getElementById("confirmPassword").value

    if (password !== confirmPassword) {
      mostrarMensaje("Las contraseñas no coinciden", "error")
      return
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]")

    const usuarioExiste = usuarios.some((u) => u.cedula === cedula || u.email === email)
    if (usuarioExiste) {
      mostrarMensaje("Ya existe un usuario con esa cédula o email", "error")
      return
    }

    const nombreParaId = nombre.split(" ")[0].toUpperCase()
    const idEmpleado = `${anioIngreso}-${cargo}-${nombreParaId}-${cedula}`

    const nuevoUsuario = {
      idEmpleado,
      nombre,
      email,
      cedula,
      anioIngreso,
      cargo,
      password,
    }

    usuarios.push(nuevoUsuario)
    localStorage.setItem("usuarios", JSON.stringify(usuarios))

    mostrarMensaje(`¡Registro exitoso! Tu ID es: ${idEmpleado}`, "success")

    form.reset()

    setTimeout(() => {
      window.location.href = "yaEmpleado.html"
    }, 3000)
  })

  function mostrarMensaje(texto, tipo) {
    mensajeDiv.textContent = texto
    mensajeDiv.className = tipo === "error" ? "mensaje-error" : "mensaje-exito"
    mensajeDiv.style.display = "block"
  }
})
