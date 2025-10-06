document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm")
  const mensajeDiv = document.getElementById("mensaje")

  if (!form) {
    return
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault()

    const idEmpleado = document.getElementById("idEmpleado").value.trim()
    const password = document.getElementById("password").value

    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]")

    const usuario = usuarios.find((u) => u.idEmpleado === idEmpleado && u.password === password)

    if (!usuario) {
      mostrarMensaje("ID o contraseña incorrectos", "error")
      return
    }

    localStorage.setItem("usuarioActual", JSON.stringify(usuario))

    const redirectMap = {
      ING: "pages/ingeniero.html",
      ADM: "pages/administrador.html",
      JFA: "pages/jefeArea.html",
      EMP: "pages/empleadoNormal.html",
    }

    const redirectUrl = redirectMap[usuario.cargo]

    if (redirectUrl) {
      window.location.href = redirectUrl
    } else {
      mostrarMensaje("Cargo no reconocido", "error")
    }
  })

  function mostrarMensaje(texto, tipo) {
    mensajeDiv.textContent = texto
    mensajeDiv.className = tipo === "error" ? "mensaje-error" : "mensaje-exito"
    mensajeDiv.style.display = "block"
  }
})
