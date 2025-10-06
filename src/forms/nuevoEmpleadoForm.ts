export function getNuevoEmpleadoForm(): string {
  return `
    <h2>Formulario - Nuevo empleado</h2>
    <form id="formNuevoEmpleado">
      <label for="nombre">Nombre completo:</label><br>
      <input type="text" id="nombre" name="nombre" required><br><br>

      <label for="email">Correo electrónico:</label><br>
      <input type="email" id="email" name="email" required><br><br>

      <label for="cedula">Cédula:</label><br>
      <input type="text" id="cedula" name="cedula" required><br><br>

      <label for="anioIngreso">Año de ingreso:</label><br>
      <input type="number" id="anioIngreso" name="anioIngreso" min="1900" max="2100" required><br><br>

      <label for="cargo">Cargo:</label><br>
      <select id="cargo" name="cargo" required>
        <option value="">-- Selecciona --</option>
        <option value="ING">Ingeniero</option>
        <option value="ADM">Administrador</option>
        <option value="JFA">Jefe de área</option>
        <option value="EMP">Empleado normal</option>
      </select><br><br>

      <!-- Subcargo (oculto por defecto) -->
      <div id="subcargoContainer" style="display:none;">
        <label for="subcargo">Tipo de empleado:</label><br>
        <select id="subcargo" name="subcargo">
          <option value="">-- Selecciona --</option>
          <option value="Zunchador">Zunchador</option>
          <option value="Empacador">Empacador</option>
          <option value="Surtidor">Surtidor</option>
        </select><br><br>
      </div>

      <label for="password">Contraseña:</label><br>
      <input type="password" id="password" name="password" required><br><br>

      <label for="confirmPassword">Confirmar contraseña:</label><br>
      <input type="password" id="confirmPassword" name="confirmPassword" required><br><br>

      <button type="submit">Registrar</button>
    </form>
  `;
}
