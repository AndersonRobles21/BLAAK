// ==========================
// JEFE DE ÁREA — LÓGICA
// ==========================

interface Empleado {
  idEmpleado: string;
  nombre: string;
  cargo: string;
  email: string;
}

interface Tarea {
  descripcion: string;
  asignadaA: string;
  estado: string;
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOM cargado correctamente");

  const btnMostrar = document.getElementById("btnMostrarEmpleados") as HTMLButtonElement;
  const btnRepartir = document.getElementById("btnRepartir") as HTMLButtonElement;
  const btnVerificar = document.getElementById("btnVerificar") as HTMLButtonElement;
  const inputEmpleadoId = document.getElementById("inputEmpleadoId") as HTMLInputElement;

  const contenedorEmpleados = document.getElementById("empleadosContainer") as HTMLDivElement;
  const contenedorTareas = document.getElementById("tareasContainer") as HTMLDivElement;

  // --- Obtener empleados del localStorage ---
  function obtenerEmpleados(): Empleado[] {
    const data = localStorage.getItem("usuarios");
    return data ? JSON.parse(data) : [];
  }

  // --- Mostrar empleados ---
  function mostrarEmpleados(): void {
    console.log("🔹 Clic en Mostrar empleados");
    const empleados = obtenerEmpleados();
    contenedorEmpleados.innerHTML = "";

    if (empleados.length === 0) {
      contenedorEmpleados.innerHTML = "<p>No hay empleados registrados.</p>";
      return;
    }

    const lista = document.createElement("ul");
    empleados.forEach(emp => {
      const item = document.createElement("li");
      item.textContent = `${emp.cargo}: ${emp.nombre}`;
      lista.appendChild(item);
    });
    contenedorEmpleados.appendChild(lista);
  }

  // --- Repartir misión ---
  function repartirMision(): void {
    console.log("📋 Clic en Repartir misión");
    const tareasGuardadas = localStorage.getItem("tareas");
    const tareas: Tarea[] = tareasGuardadas ? JSON.parse(tareasGuardadas) : [];

    const nuevaTarea: Tarea = {
      descripcion: "Supervisar empleado PPP",
      asignadaA: "Laura",
      estado: "enviada",
    };

    tareas.push(nuevaTarea);
    localStorage.setItem("tareas", JSON.stringify(tareas));

    alert("✅ Misión asignada correctamente.");
  }

  // --- Verificar tarea ---
  function verificarTarea(): void {
    console.log("🔍 Clic en Verificar tarea");
    const idBuscado = inputEmpleadoId.value.trim();
    if (!idBuscado) {
      alert("Por favor, ingrese un ID.");
      return;
    }

    const tareasGuardadas = localStorage.getItem("tareas");
    const tareas: Tarea[] = tareasGuardadas ? JSON.parse(tareasGuardadas) : [];

    const tareasEmpleado = tareas.filter(t => t.asignadaA.toLowerCase().includes(idBuscado.toLowerCase()));

    contenedorTareas.innerHTML = "";

    if (tareasEmpleado.length === 0) {
      contenedorTareas.innerHTML = `<p>No hay tareas asignadas al empleado con ID: <b>${idBuscado}</b></p>`;
      return;
    }

    const lista = document.createElement("ul");
    tareasEmpleado.forEach(t => {
      const item = document.createElement("li");
      item.textContent = `${t.descripcion} — Estado: ${t.estado}`;
      lista.appendChild(item);
    });
    contenedorTareas.appendChild(lista);
  }

  // --- Eventos ---
  btnMostrar?.addEventListener("click", mostrarEmpleados);
  btnRepartir?.addEventListener("click", repartirMision);
  btnVerificar?.addEventListener("click", verificarTarea);
});
