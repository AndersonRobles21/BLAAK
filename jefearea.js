// Lista de empleados simulada
const empleados = [
    { nombre: "Carlos Pérez", cargo: "Operario", area: "Producción", tarea: "", cumple: false },
    { nombre: "Ana Gómez", cargo: "Auxiliar", area: "Producción", tarea: "", cumple: false },
    { nombre: "Luis Martínez", cargo: "Operario", area: "Producción", tarea: "", cumple: true }
];

const tabla = document.querySelector("#tablaEmpleados tbody");
const listaTareas = document.getElementById("listaTareas");
const repartirBtn = document.getElementById("repartirBtn");

// Mostrar empleados en tabla
function mostrarEmpleados() {
    tabla.innerHTML = "";
    empleados.forEach((emp, index) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${emp.nombre}</td>
            <td>${emp.cargo}</td>
            <td>${emp.area}</td>
            <td>${emp.cumple ? "✅ Cumplió" : "❌ Pendiente"}</td>
            <td><button onclick="verInformacion(${index})">Ver Información</button></td>
        `;
        tabla.appendChild(fila);
    });
}

// Mostrar información del empleado
function verInformacion(i) {
    const emp = empleados[i];
    alert(
        `👤 Información del empleado:\n\n` +
        `Nombre: ${emp.nombre}\n` +
        `Cargo: ${emp.cargo}\n` +
        `Área: ${emp.area}\n` +
        `Tarea: ${emp.tarea || "Sin asignar"}\n` +
        `Estado: ${emp.cumple ? "Cumplió ✅" : "Pendiente ❌"}`
    );
}

// Repartir misión del administrador
repartirBtn.addEventListener("click", () => {
    const mision = document.getElementById("misionAdmin").value.trim();
    if (!mision) {
        alert("⚠️ Escribe la misión enviada por el administrador.");
        return;
    }

    empleados.forEach(emp => emp.tarea = mision);
    alert("✅ Misión repartida correctamente a todos los empleados del área.");
    verificarTareas();
    mostrarEmpleados();
});

// Verificar cumplimiento de tareas
function verificarTareas() {
    listaTareas.innerHTML = "";
    empleados.forEach(emp => {
        const li = document.createElement("li");
        li.textContent = `${emp.nombre} → ${emp.tarea || "Sin tarea"} (${emp.cumple ? "Cumplió ✅" : "Pendiente ❌"})`;
        listaTareas.appendChild(li);
    });
}

// Inicializar
mostrarEmpleados();
verificarTareas();
