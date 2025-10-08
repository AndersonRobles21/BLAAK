// src/pages/administrador.ts

class Administrador {
    nombre: string;
    empleados: { cargo: string; nombre: string }[];
    tareas: { descripcion: string; estado: string; asignadaA?: string | null }[];

    constructor(nombre: string) {
        this.nombre = nombre;
        this.empleados = [];
        this.tareas = [];
    }
    // Empleados
    registrarEmpleado(nombre: string, cargo: string) {
        this.empleados.push({ nombre, cargo });
        console.log(`Administrador registró a ${nombre} como ${cargo}`);
    }

    obtenerEmpleados() {
        return this.empleados.map(e => ({ ...e }));
    }

    verCargos() {
        console.log("Lista de empleados por cargo:");
        this.empleados.forEach(emp => {
            console.log(`- ${emp.cargo}: ${emp.nombre}`);
        });
    }

    // Tareas
    crearTarea(descripcion: string) {
        this.tareas.push({ descripcion, estado: "pendiente", asignadaA: null });
        console.log(`Nueva tarea creada: ${descripcion}`);
    }

    obtenerTareas() {
        return this.tareas.map(t => ({ ...t }));
    }

    enviarTareaAJefe(index: number, nombreJefe?: string) {
        if (index < 0 || index >= this.tareas.length) return false;
        const tarea = this.tareas[index];
        tarea.estado = "enviada";
        tarea.asignadaA = nombreJefe || "Jefe de área";
        console.log(`Tarea enviada al jefe: ${tarea.descripcion}`);
        return true;
    }

    finalizarTarea(index: number) {
        if (index < 0 || index >= this.tareas.length) return false;
        this.tareas[index].estado = "finalizada";
        console.log(`Tarea finalizada: ${this.tareas[index].descripcion}`);
        return true;
    }
}

export { Administrador };
    

// === Lógica de UI movida desde el HTML (poblar lista de empleados, select de jefes y gestión de tareas)
document.addEventListener('DOMContentLoaded', () => {
    const lista = document.getElementById('lista-empleados') as HTMLUListElement | null;
    const select = document.getElementById('select-empleado') as HTMLSelectElement | null;
    const btnAgregar = document.getElementById('btn-agregar') as HTMLButtonElement | null;
    const inputTarea = document.getElementById('input-tarea') as HTMLInputElement | null;
    const listaTareas = document.getElementById('lista-tareas') as HTMLUListElement | null;

    function obtenerUsuarios(): any[] {
        try {
            return JSON.parse(localStorage.getItem('usuarios') || '[]');
        } catch (e) {
            console.error('Error parseando usuarios desde localStorage', e);
            return [];
        }
    }

    function obtenerTareas(): any[] {
        try {
            return JSON.parse(localStorage.getItem('tareas') || '[]');
        } catch (e) {
            console.error('Error parseando tareas desde localStorage', e);
            return [];
        }
    }

    function guardarTareas(tareas: any[]): void {
        localStorage.setItem('tareas', JSON.stringify(tareas));
    }

    function poblarLista(): void {
        const usuarios = obtenerUsuarios();
        if (!lista) return;
        if (usuarios.length === 0) {
            lista.innerHTML = '<li>No hay empleados registrados.</li>';
            return;
        }
        lista.innerHTML = '';
        usuarios.forEach(u => {
            const li = document.createElement('li');
            li.textContent = `${u.nombre} (ID: ${u.idEmpleado || '—'}, Cargo: ${u.cargo || '—'})`;
            lista.appendChild(li);
        });
    }

    function poblarSelectJefes(): void {
        const usuarios = obtenerUsuarios();
        if (!select) return;
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Seleccionar empleado';
        select.innerHTML = '';
        select.appendChild(defaultOption);

        const jefes = usuarios.filter(u => u.cargo === 'JFA');
        if (jefes.length === 0) {
            const opt = document.createElement('option');
            opt.value = '';
            opt.textContent = 'No hay jefes de área registrados';
            select.appendChild(opt);
            return;
        }

        jefes.forEach(j => {
            const opt = document.createElement('option');
            opt.value = j.idEmpleado || j.email || j.nombre;
            opt.textContent = `${j.nombre} (${j.idEmpleado || j.email || ''})`;
            select.appendChild(opt);
        });
    }

    function poblarTareas(): void {
        const tareas = obtenerTareas();
        if (!listaTareas) return;
        if (tareas.length === 0) {
            listaTareas.innerHTML = '<li>No hay tareas creadas.</li>';
            return;
        }
        listaTareas.innerHTML = '';
        tareas.forEach((t, idx) => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${t.descripcion}</strong> — Estado: ${t.estado} — Asignada a: ${t.asignadaA || 'Sin asignar'}`;
            const btnFinalizar = document.createElement('button');
            btnFinalizar.textContent = 'Finalizar';
            btnFinalizar.style.marginLeft = '10px';
            btnFinalizar.addEventListener('click', () => {
                const tareas = obtenerTareas();
                if (tareas[idx]) {
                    tareas[idx].estado = 'finalizada';
                    guardarTareas(tareas);
                    poblarTareas();
                }
            });
            li.appendChild(btnFinalizar);
            listaTareas.appendChild(li);
        });
    }

    if (btnAgregar) {
        btnAgregar.addEventListener('click', () => {
            const descripcion = (inputTarea && inputTarea.value || '').toString().trim();
            const selected = (select && select.value) || '';

            if (!descripcion) {
                alert('Ingrese la descripción de la tarea.');
                return;
            }
            if (!selected) {
                alert('Seleccione un jefe de área para asignar la tarea.');
                return;
            }

            const usuarios = obtenerUsuarios();
            const jefe = usuarios.find(u => (u.idEmpleado === selected) || (u.email === selected) || (u.nombre === selected));
            const asignadaA = jefe ? jefe.nombre : selected;
            const jefeId = jefe ? jefe.idEmpleado : selected;

            const tareas = obtenerTareas();
            const nueva = {
                descripcion,
                estado: 'pendiente',
                asignadaA,
                jefeId,
                createdAt: Date.now()
            };
            tareas.push(nueva);
            guardarTareas(tareas);
            poblarTareas();
            if (inputTarea) inputTarea.value = '';
            if (select) select.value = '';
        });
    }

    // Inicializar vistas
    poblarLista();
    poblarSelectJefes();
    poblarTareas();

    window.addEventListener('storage', (e) => {
        if (e.key === 'usuarios') {
            poblarLista();
            poblarSelectJefes();
        }
        if (e.key === 'tareas') {
            poblarTareas();
        }
    });
});


