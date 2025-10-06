export function getYaEmpleadoForm() {
    return `
    <h2>Formulario - Ya eres empleado</h2>
    <form id="formYaEmpleado">
      <label for="idEmpleado">ID de Empleado:</label><br>
      <input type="text" id="idEmpleado" name="idEmpleado" required><br><br>

      <label for="password">Contraseña:</label><br>
      <input type="password" id="password" name="password" required><br><br>

      <button type="submit">Ingresar</button>
    </form>
  `;
}
