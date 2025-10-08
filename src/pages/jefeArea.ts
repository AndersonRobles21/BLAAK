document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOM cargado correctamente");
  const btnMostrar = document.getElementById("btnMostrarEmpleados");
  const btnRepartir = document.getElementById("btnRepartir");
  const btnVerificar = document.getElementById("btnVerificar");
  const selectEmpleado = document.getElementById("selectEmpleado") as HTMLSelectElement | null;
  const inputEmpleadoId = document.getElementById("inputEmpleadoId") as HTMLInputElement;
  const contenedorEmpleados = document.getElementById("empleadosContainer");
  const contenedorTareas = document.getElementById("tareasContainer");

  //  Obtener lista de empleados guardados
  function obtenerEmpleados() {
    const data = localStorage.getItem("usuarios");
    return data ? JSON.parse(data) : [];
  }

  //  Mostrar empleados registrados
  function mostrarEmpleados() {
    console.log("🔹 Clic en Mostrar empleados");
    const empleados = obtenerEmpleados();
    contenedorEmpleados!.innerHTML = "";
    if (empleados.length === 0) {
      contenedorEmpleados!.innerHTML = "<p>No hay empleados registrados.</p>";
      return;
    }
    const lista = document.createElement("ul");
    empleados.forEach((emp: any) => {
      const item = document.createElement("li");
      item.textContent = `${emp.cargo}: ${emp.nombre} (ID: ${emp.idEmpleado ?? "sin ID"})`;
      lista.appendChild(item);
    });
    contenedorEmpleados!.appendChild(lista);
  }

  // Poblar select de empleados (para asignaciones)
  function poblarSelectEmpleados() {
    if (!selectEmpleado) return;
    const empleados = obtenerEmpleados();
    // limpiar y dejar la opción por defecto
    selectEmpleado.innerHTML = '';
    const defaultOpt = document.createElement('option');
    defaultOpt.value = '';
    defaultOpt.textContent = 'Seleccionar empleado';
    selectEmpleado.appendChild(defaultOpt);

    empleados.forEach((emp: any) => {
      const opt = document.createElement('option');
      opt.value = emp.idEmpleado || emp.email || emp.nombre;
      opt.textContent = `${emp.nombre} (${emp.cargo || ''})`;
      selectEmpleado.appendChild(opt);
    });
  }

  //  Repartir misión
  function repartirMision() {
    console.log("📋 Clic en Repartir misión");
    const tareasGuardadas = localStorage.getItem("tareas");
    const tareas = tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
    // Validar selección
    if (!selectEmpleado) {
      alert('Selector de empleados no encontrado.');
      return;
    }
    const seleccionado = selectEmpleado.value;
    if (!seleccionado) {
      alert('Seleccione un empleado para asignar la tarea.');
      return;
    }

    // Obtener descripción desde el input
    const inputDescripcion = document.getElementById('inputTareaDescripcion') as HTMLInputElement | null;
    const descripcion = (inputDescripcion && inputDescripcion.value.trim()) ? inputDescripcion.value.trim() : 'Tarea general asignada';

    // Buscar empleado por id/email/nombre
    const empleados = obtenerEmpleados();
    const empleado = empleados.find((e: any) => (e.idEmpleado === seleccionado) || (e.email === seleccionado) || (e.nombre === seleccionado));
    const nombreAsignado = empleado ? empleado.nombre : seleccionado;

    // Crear la tarea incluyendo el identificador asignado (asignadaId)
    const nuevaTarea = {
      descripcion,
      asignadaA: nombreAsignado,
      asignadaId: seleccionado,
      estado: "Pendiente"
    };

    tareas.push(nuevaTarea);
    localStorage.setItem("tareas", JSON.stringify(tareas));
    // Limpiar descripción para UX
    if (inputDescripcion) inputDescripcion.value = '';
    alert("✅ Misión asignada correctamente.");
  }

  //  Verificar tareas de un empleado
  function verificarTarea() {
    console.log("🔍 Clic en Verificar tarea");
    const idBuscado = inputEmpleadoId.value.trim();
    if (!idBuscado) {
      alert("Por favor, ingrese un ID o nombre de empleado.");
      return;
    }

    const tareasGuardadas = localStorage.getItem("tareas");
    const tareas = tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
    // Buscar tareas por asignadaId (coincidencia exacta), nombre asignado (contains) o descripción (contains)
    const q = idBuscado.toString().toLowerCase();
    const tareasEmpleado = tareas.filter((t: any) => {
      const asignadaId = (t.asignadaId || '').toString().toLowerCase();
      const asignada = (t.asignadaA || '').toString().toLowerCase();
      const descripcion = (t.descripcion || '').toString().toLowerCase();
      return asignadaId === q || asignada.includes(q) || descripcion.includes(q);
    });

    contenedorTareas!.innerHTML = "";
    if (tareasEmpleado.length === 0) {
      contenedorTareas!.innerHTML = `<p>No hay tareas asignadas al empleado: <b>${idBuscado}</b></p>`;
      return;
    }

    // Contadores de estados
    const completadas = tareasEmpleado.filter((t: any) => t.estado === "Completada").length;
    const pendientes = tareasEmpleado.filter((t: any) => t.estado === "Pendiente").length;

    // Mostrar lista detallada (ahora incluyendo jefeId para facilitar verificación)
    let html = `<h3>📋 Tareas de ${idBuscado}</h3><ul>`;
    tareasEmpleado.forEach((t: any) => {
      const jefeId = t.jefeId || '—';
      const asignada = t.asignadaA || '—';
      html += `<li><strong>${t.descripcion}</strong> — Estado: <b>${t.estado}</b> — Asignada a: <b>${asignada}</b> (ID: <code>${jefeId}</code>)</li>`;
    });
    html += `</ul>`;

    // Mostrar resumen
    html += `
      <p>✅ Completadas: <b>${completadas}</b></p>
      <p>⏳ Pendientes: <b>${pendientes}</b></p>
    `;

    contenedorTareas!.innerHTML = html;
  }

  btnMostrar?.addEventListener("click", mostrarEmpleados);
  btnRepartir?.addEventListener("click", repartirMision);
  btnVerificar?.addEventListener("click", verificarTarea);
  // Inicializar select de empleados
  poblarSelectEmpleados();
});
