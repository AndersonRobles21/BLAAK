// src/pages/administrador.ts
class Administrador {
    constructor(nombre) {
        this.nombre = nombre;
        this.empleados = [];
        this.tareas = [];
    }
    // Empleados
    registrarEmpleado(nombre, cargo) {
        this.empleados.push({ nombre, cargo });
        console.log(`Administrador registró a ${nombre} como ${cargo}`);
    }
    obtenerEmpleados() {
        return this.empleados.map(e => (Object.assign({}, e)));
    }
    verCargos() {
        console.log("Lista de empleados por cargo:");
        this.empleados.forEach(emp => {
            console.log(`- ${emp.cargo}: ${emp.nombre}`);
        });
    }
    // Tareas
    crearTarea(descripcion) {
        this.tareas.push({ descripcion, estado: "pendiente", asignadaA: null });
        console.log(`Nueva tarea creada: ${descripcion}`);
    }
    obtenerTareas() {
        return this.tareas.map(t => (Object.assign({}, t)));
    }
    enviarTareaAJefe(index, nombreJefe) {
        if (index < 0 || index >= this.tareas.length)
            return false;
        const tarea = this.tareas[index];
        tarea.estado = "enviada";
        tarea.asignadaA = nombreJefe || "Jefe de área";
        console.log(`Tarea enviada al jefe: ${tarea.descripcion}`);
        return true;
    }
    finalizarTarea(index) {
        if (index < 0 || index >= this.tareas.length)
            return false;
        this.tareas[index].estado = "finalizada";
        console.log(`Tarea finalizada: ${this.tareas[index].descripcion}`);
        return true;
    }
}
export { Administrador };
