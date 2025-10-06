// Handler para el formulario de registro de nuevos empleados
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm") as HTMLFormElement
  const mensajeDiv = document.getElementById("mensaje") as HTMLDivElement

  form.addEventListener("submit", (e) => {
    e.preventDefault()

    // Obtener valores del formulario
    const nombre = (document.getElementById("nombre") as HTMLInputElement).value.trim()
    const email = (document.getElementById("email") as HTMLInputElement).value.trim()
    const cedula = (document.getElementById("cedula") as HTMLInputElement).value.trim()
    const anioIngreso = (document.getElementById("anioIngreso") as HTMLInputElement).value
    const cargo = (document.getElementById("cargo") as HTMLSelectElement).value
    const password = (document.getElementById("newPassword") as HTMLInputElement).value
    const confirmPassword = (document.getElementById("confirmPassword") as HTMLInputElement).value

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      mostrarMensaje("Las contraseñas no coinciden", "error")
      return
    }

    // Generar ID del empleado: AÑO-CARGO-NOMBRE-CEDULA
    const nombreCorto = nombre.split(" ")[0].toUpperCase()
    const idEmpleado = `${anioIngreso}-${cargo}-${nombreCorto}-${cedula}`

    // Obtener usuarios existentes del localStorage
    const usuariosGuardados = localStorage.getItem("usuarios")
    const usuarios = usuariosGuardados ? JSON.parse(usuariosGuardados) : []

    // Verificar si ya existe un usuario con la misma cédula o email
    const usuarioExistente = usuarios.find((u: any) => u.cedula === cedula || u.email === email)

    if (usuarioExistente) {
      mostrarMensaje("Ya existe un usuario con esa cédula o email", "error")
      return
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
    }

    // Agregar al array y guardar en localStorage
    usuarios.push(nuevoUsuario)
    localStorage.setItem("usuarios", JSON.stringify(usuarios))

    // Mostrar mensaje de éxito con el ID generado
    mostrarMensaje(
      `¡Registro exitoso! Tu ID de empleado es: <strong>${idEmpleado}</strong><br>Serás redirigido al login en 3 segundos...`,
      "success",
    )

    // Limpiar formulario
    form.reset()

    // Redirigir después de 3 segundos
    setTimeout(() => {
      window.location.href = "yaEmpleado.html"
    }, 3000)
  })

  function mostrarMensaje(texto: string, tipo: "success" | "error") {
    mensajeDiv.innerHTML = texto
    mensajeDiv.className = `mensaje ${tipo}`
    mensajeDiv.style.display = "block"
  }
})
