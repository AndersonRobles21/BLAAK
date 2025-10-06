// Estado del administrador
const admin = {
  nombre: "Laura",
  empleados: [],
  tareas: [],
}

const listaEmpleados = document.getElementById("lista-empleados")
const listaTareas = document.getElementById("lista-tareas")
const inputTarea = document.getElementById("input-tarea")
const btnAgregar = document.getElementById("btn-agregar")
const selectEmpleado = document.getElementById("select-empleado")

function guardarTareasEnStorage(tareas) {
  localStorage.setItem("tareas", JSON.stringify(tareas))
}

function cargarTareasDeStorage() {
  const tareas = JSON.parse(localStorage.getItem("tareas") || "[]")
  return tareas
}

const tareasGuardadas = cargarTareasDeStorage()
admin.tareas = tareasGuardadas

const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios") || "[]")

function etiquetaCargo(codigo) {
  switch ((codigo || "").toString().toUpperCase()) {
    case "ADM":
      return "Administrador"
    case "JFA":
      return "Jefe de área"
    case "ING":
      return "Ingeniero"
    case "EMP":
      return "Empleado normal"
    default:
      return codigo || "Empleado"
  }
}

function poblarSelectEmpleados(usuarios) {
  selectEmpleado.innerHTML = '<option value="">Seleccionar empleado</option>'

  usuarios.forEach((u) => {
    const cargoCode = (u.cargo || "").toString().toUpperCase()
    if (cargoCode === "EMP" || cargoCode === "ING" || cargoCode === "JFA") {
      const opt = document.createElement("option")
      opt.value = u.idEmpleado
      opt.textContent = `${u.nombre} - ${etiquetaCargo(u.cargo)}`
      opt.dataset.nombre = u.nombre
      selectEmpleado.appendChild(opt)
    }
  })
}

if (usuariosGuardados.length > 0) {
  usuariosGuardados.forEach((u) => {
    const nombre = u.nombre || u.nombreCompleto || "Empleado " + (u.idEmpleado || "")
    const cargo = etiquetaCargo(u.cargo || u.rol || "EMP")
    admin.empleados.push({ nombre, cargo })
  })
  poblarSelectEmpleados(usuariosGuardados)
} else {
  admin.empleados.push({ nombre: "Ana", cargo: "Clasificador" })
  admin.empleados.push({ nombre: "Luis", cargo: "Surtidor" })
  admin.empleados.push({ nombre: "Marta", cargo: "Empacador" })
}

function mostrarEmpleados() {
  listaEmpleados.innerHTML = ""
  admin.empleados.forEach((emp) => {
    const li = document.createElement("li")
    li.textContent = `${emp.cargo}: ${emp.nombre}`
    listaEmpleados.appendChild(li)
  })
}

function mostrarTareas() {
  listaTareas.innerHTML = ""
  admin.tareas.forEach((tarea, index) => {
    const li = document.createElement("li")
    const asignada = tarea.asignadaA ? ` - Asignada a: ${tarea.nombreEmpleado || tarea.asignadaA}` : ""
    li.innerHTML = `
      ${tarea.descripcion} ${asignada}
      <span class="${tarea.estado}">(${tarea.estado})</span>
      <button onclick="finalizar(${index})">✅ Finalizar</button>
    `
    listaTareas.appendChild(li)
  })
}

btnAgregar.addEventListener("click", () => {
  const descripcion = inputTarea.value.trim()
  const empleadoId = selectEmpleado.value

  if (descripcion === "") {
    alert("Por favor ingrese una descripción de la tarea")
    return
  }

  if (empleadoId === "") {
    alert("Por favor seleccione un empleado")
    return
  }

  const selectedOption = selectEmpleado.options[selectEmpleado.selectedIndex]
  const nombreEmpleado = selectedOption.dataset.nombre

  const nuevaTarea = {
    id: Date.now(),
    descripcion: descripcion,
    asignadaA: empleadoId,
    nombreEmpleado: nombreEmpleado,
    estado: "Pendiente",
    fechaAsignacion: new Date().toISOString(),
  }

  admin.tareas.push(nuevaTarea)
  guardarTareasEnStorage(admin.tareas)

  inputTarea.value = ""
  selectEmpleado.value = ""
  mostrarTareas()
})

window.finalizar = (index) => {
  admin.tareas[index].estado = "Completada"
  guardarTareasEnStorage(admin.tareas)
  mostrarTareas()
}

mostrarEmpleados()
mostrarTareas()

