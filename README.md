#  BLAAK - Sistema de Gestión Inteligente

*BLAAK* es un sistema de gestión inteligente diseñado para optimizar la eficacia y coordinación de los operadores dentro de una empresa.  
En este caso, se implementa en una *empresa de floricultura, facilitando la administración de tareas, empleados y roles mediante una aplicación modular, interactiva y desarrollada con **TypeScript* .

---

##  Descripción del Proyecto

BLAAK busca centralizar la gestión de las operaciones internas de una empresa, mejorando la comunicación entre los distintos niveles jerárquicos y garantizando un flujo de trabajo eficiente.

### Roles Principales

- *Administrador:*  
  - Envía tareas a los jefes de área para su distribución.  
  - Supervisa el progreso de las actividades.  
  - Puede finalizar tareas o reasignarlas.  

- *Jefe de Área:*  
  - Recibe tareas del administrador.  
  - Reparte misiones entre los empleados de su área.  
  - Supervisa el cumplimiento de las labores asignadas.  

- *Empleado:*  
  - Puede visualizar su cargo (hinchador, empacador o surtidor).  
  - Consulta las tareas asignadas y actualiza su estado.  

- *Ingeniero:*  
  - Gestiona la contratación o solicitud de personal.  
  - Visualiza informes detallados de todos los empleados.  

---

##  Características Clave

- Arquitectura modular por capas  
- Aplicación web interactiva y dinámica  
- Sistema de autenticación por roles  
- Principios de diseño *SOLID*  
- Manejo de errores con mensajes personalizados  
- Adaptable a diferentes tipos de empresas  

---

##  Tecnologías Utilizadas

- *Lenguaje:* TypeScript (TSJS)  
- *Arquitectura:* Modulación por capas  
- *Diseño:* Principios SOLID  
- *Interactividad:* Aplicación web dinámica  
- *Gestión de errores:* Validaciones y mensajes personalizados  

---
#  Instalación

Sigue estos pasos para instalar y ejecutar BLAAK en tu entorno local:

```bash
```bash
# Clonar el repositorio
git clone 

# Entrar al directorio del proyecto
cd blaak

# Instalar dependencias
npm install

# Ejecutar el proyecto
npm run dev

# Para correr el programa con
npm run build
esto es para que funcuione en ts
y a lo ultimo funciona con
npm start
En ese orden si se omite en run build no funcionara

```

---
#  Uso del Sistema

1. Inicia sesión o registrate según tu rol ( Ingeniero , Administrador, Jefe de Área o Empleado ).


2. Realiza las acciones correspondientes a tu cargo:

El Ingeniero gestiona y supervisa al personal.

El Administrador asigna tareas.

El Jefe de Área distribuye misiones.

El Empleado consulta y ejecuta sus tareas.


3. Observa los cambios en tiempo real .


---
 Ejemplo de Ejecución

Inicio de sesión

Usuario: 2025-JFA-AMANDA-7894
Contraseña: ********
Bienvenido, Jefe de Área

Asignación de tarea

Administrador -> Jefe de Área: "Preparar flores para exportación"
Jefe de Área -> Empleado (juan perez): "Empacar 100 unidades de rosas rojas"

Visualización del empleado

Empleado: juan perez
Tarea asignada: Empacar 100 unidades de rosas rojas
Estado: En progreso ✅


---


