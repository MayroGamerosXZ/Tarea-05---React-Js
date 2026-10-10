# Command Center - Sistema de Taller Mecánico

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white" alt="NPM" />
</div>

<br>

El **Sistema de Taller Mecánico "Command Center"** es una plataforma web (Single Page Application) desarrollada en React.js que permite gestionar las operaciones de un taller automotriz bajo una interfaz moderna, responsiva y altamente dinámica estilo *Centro de Operaciones de Seguridad*.

---

## Funcionalidad del Sistema

1. **Dashboard General:** Módulo de telemetría que calcula y grafica en tiempo real los vehículos en proceso, despachados y pendientes de cobro.
2. **Gestión de Vehículos:** Permite dar de alta vehículos que ingresan al taller, registrar su propietario y actualizar su estatus operativo a lo largo del proceso.
3. **Inventario Inteligente:** Registro de refacciones con control matemático. Permite ingresos (Compras) y salidas (Mermas). Cuenta con **alertas en tiempo real** si el stock baja del límite de seguridad establecido.
4. **Facturación y Despacho:** Un módulo dinámico avanzado donde se calcula el cobro final. Permite inyectar piezas desde el almacén, sumar mano de obra, calcular IVA y **descontar automáticamente las piezas físicas** del inventario al despachar la unidad.
5. **Notificaciones Reactivas:** Campana de alertas global que captura todos los eventos importantes (vehículos creados, alertas de inventario y pagos recibidos).

---

## Guía de Instalación y Ejecución

Para levantar este proyecto en tu entorno local, asegúrate de tener [Node.js](https://nodejs.org/) instalado y ejecuta los siguientes comandos en tu terminal:

```bash
# 1. Clonar el repositorio
git clone https://github.com/MayroGamerosXZ/Tarea-05---React-Js.git

# 2. Entrar a la carpeta del proyecto
cd Tarea-05---React-Js

# 3. Instalar las dependencias
npm install

# 4. Iniciar el servidor local ultra-rápido (Vite)
npm run dev
```

> **Nota:** La aplicación estará disponible de forma predeterminada en `http://localhost:5173`.

---

## Informe Académico (Aprendizajes de la Tarea)

### 1. ¿Qué aprendí o reforcé?
Reforcé fuertemente el uso del estado global y el paso de propiedades (Props) en **React** utilizando Hooks (`useState`). Comprendí cómo hacer que múltiples componentes (como el catálogo del inventario, la ventana modal de cobro y la campana de notificaciones) se comuniquen de forma perfecta y sincrónica sin tener que recargar el navegador (SPA).

### 2. ¿Qué fue lo más interesante?
El proceso de integrar un diseño de **UI riguroso** (utilizando el esquema "Command Center" con acentos naranjas y fondos *Frosted Glass*) con la **lógica matemática del negocio**. Lograr que la ventana de facturación leyera directamente el stock de los estantes, calculara totales dinámicos con el IVA incluido y mutara el arreglo de productos descontándolos al momento de pagar, fue un reto sumamente satisfactorio.

### 3. ¿Qué no sabía y ahora tengo claro?
Al iniciar el proyecto, no tenía del todo claro cómo construir un ecosistema complejo donde múltiples *inputs* controlados (valores fijos de mano de obra, diagnóstico por escáner, y listas desplegables de inventario) interactuaran al mismo tiempo para formar una "calculadora" dentro de una vista flotante. **Ahora domino la estructura de formularios dinámicos y la manipulación de arreglos en el estado de React.**
