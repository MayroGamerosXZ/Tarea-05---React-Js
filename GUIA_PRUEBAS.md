# Guía de Uso y Pruebas - Taller Mecánico

Esta guía describe cómo utilizar y probar todos los módulos funcionales del Sistema de Taller Mecánico (Command Center).

## 1. Preparación del Entorno
Antes de ejecutar las pruebas, asegúrate de tener el proyecto corriendo:
```bash
# 1. Instalar dependencias si no lo has hecho
npm install

# 2. Iniciar el servidor local
npm run dev
```
Abre tu navegador en `http://localhost:5173` (o el puerto que te indique Vite).

---

## 2. Ejecución de Pruebas Manuales (Módulo por Módulo)

### Prueba 1: Interfaz y Dashboard
1. Ingresa a la aplicación.
2. Observa el esquema visual **Command Center**: Sidebar oscura tipo "frosted glass", fondo cálido (`#fcfaf7`), e íconos y acentos en naranja técnico (`#fe6e00`).
3. En el **Dashboard**, revisa las 4 tarjetas superiores (Total Vehículos, En Reparación, Listos, Nuevas Citas). Toma nota de los valores.

### Prueba 2: CRUD de Vehículos y Modal
1. Haz clic en la pestaña **Vehículos** en el menú izquierdo.
2. Presiona el botón naranja **Registrar Ingreso** arriba a la derecha.
3. Se abrirá un Modal (cuadro de diálogo flotante). Ingresa:
   - Placa: `AAA-111`
   - Modelo: `Ford Mustang 2023`
   - Cliente: `Juan Pérez`
4. Presiona **Guardar Vehículo**.
5. **Resultado esperado:** El modal se cierra, y el nuevo vehículo aparece al final de la tabla con un ID autogenerado (ej. `ORD-004`) y estado `Planificado` (color gris).

### Prueba 3: Gestión de Órdenes y Cambio de Estados
1. Haz clic en la pestaña **Órdenes** en el menú izquierdo.
2. Busca la tarjeta del vehículo que acabas de crear (`Ford Mustang 2023`).
3. El estado actual debe decir "Planificado".
4. Haz clic en el botón inferior **En Reparación**.
5. **Resultado esperado:** La etiqueta superior derecha cambia automáticamente a color Azul (En Reparación).
6. Vuelve a la pestaña **Dashboard** y **Resultado esperado:** El número en la tarjeta "En Reparación" aumentó en 1.

### Prueba 4: Control de Inventario
1. Haz clic en la pestaña **Inventario** en el menú izquierdo.
2. Busca el artículo **Bujías NGK Iridium**. Su stock inicial es de 5 y mínimo de 20, por lo que debe mostrar una etiqueta roja que dice **BAJO STOCK**.
3. Haz clic en el botón `+` varias veces hasta que el número supere 20.
4. **Resultado esperado:** Al pasar de 20, la advertencia de bajo stock desaparece automáticamente.
5. Haz clic en el botón `-` de cualquier artículo. **Resultado esperado:** El stock disminuye, pero no puede bajar de 0.

### Prueba 5: Buscador Universal
1. Sitúate en cualquier pestaña (ej. Vehículos).
2. En la barra superior oscura, hay un input con una lupa. Escribe el modelo del coche que agregaste (ej. `Mustang`).
3. **Resultado esperado:** La tabla filtra instantáneamente la lista y oculta los demás vehículos. Borra el texto para verlos todos de nuevo.

---

## 3. Guion HTML y API Mock (Archivos Adjuntos)
Para respaldar este testing, hemos incluido dos archivos extra en la raíz del proyecto:
- **`guion-pruebas.html`**: Abre este archivo en cualquier navegador (doble clic) para ver un Checklist interactivo para que el departamento de QA valide la plataforma paso por paso.
- **`swagger.yaml`**: Esquema OpenAPI 3.0 de cómo se estructura la API REST para consultar o mutar los vehículos e inventarios. Útil si en la "Fase 4" se desea implementar el Backend en Express o NestJS.
