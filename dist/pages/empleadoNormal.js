const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual") || "{}")

if (!usuarioActual.idEmpleado) {
  alert("No hay sesión activa. Redirigiendo al login...")
  window.location.href = "../yaEmpleado.html"
}

const btnVerInfo = document.getElementById("btnVerInfo")
const btnVerTareas = document.getElementById("btnVerTareas")
const resultado = document.getElementById("resultado")

// Ver información del empleado
btnVerInfo.addEventListener("click", () => {
  resultado.innerHTML = `
    <h2>👤 Mi Información</h2>
    <p><strong>Nombre:</strong> ${usuarioActual.nombre}</p>
    <p><strong>Cargo:</strong> ${usuarioActual.cargo}</p>
    <p><strong>Email:</strong> ${usuarioActual.email}</p>
    <p><strong>ID:</strong> ${usuarioActual.idEmpleado}</p>
  `
})

// Ver tareas asignadas
btnVerTareas.addEventListener("click", () => {
  const tareas = JSON.parse(localStorage.getItem("tareas") || "[]")
  const misTareas = tareas.filter((t) => t.asignadaA === usuarioActual.idEmpleado)

  if (misTareas.length === 0) {
    resultado.innerHTML = '<p class="info-message">✅ No tienes tareas asignadas aún.</p>'
    return
  }

  let html = "<h2>📋 Mis Tareas</h2>"
  misTareas.forEach((tarea, index) => {
    const estadoClass = tarea.estado === "completada" ? "success" : tarea.estado === "en progreso" ? "warning" : "info"

    html += `
      <div class="task-item">
        <div class="task-info">
          <strong>${tarea.descripcion}</strong>
          <span class="badge badge-${estadoClass}">${tarea.estado}</span>
        </div>
        ${
          tarea.estado !== "completada"
            ? `
          <button class="btn btn-primary" onclick="cambiarEstadoTarea(${index}, '${tarea.estado}')">
            ${tarea.estado === "pendiente" ? "▶️ Iniciar" : "✅ Completar"}
          </button>
        `
            : ""
        }
      </div>
    `
  })

  resultado.innerHTML = html
})

window.cambiarEstadoTarea = (index, estadoActual) => {
  const tareas = JSON.parse(localStorage.getItem("tareas") || "[]")
  const misTareas = tareas.filter((t) => t.asignadaA === usuarioActual.idEmpleado)
  const tarea = misTareas[index]

  const tareaIndex = tareas.findIndex((t) => t.descripcion === tarea.descripcion && t.asignadaA === tarea.asignadaA)

  if (tareaIndex !== -1) {
    if (estadoActual === "pendiente") {
      tareas[tareaIndex].estado = "en progreso"
    } else if (estadoActual === "en progreso") {
      tareas[tareaIndex].estado = "completada"
    }

    localStorage.setItem("tareas", JSON.stringify(tareas))
    btnVerTareas.click()
  }
}
