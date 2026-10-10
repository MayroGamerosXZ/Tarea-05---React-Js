/**
 * ============================================================================
 * PROYECTO: Sistema de Taller Mecánico "Command Center"
 * ARCHIVO PRINCIPAL: App.jsx
 * DESCRIPCIÓN: Contenedor principal de la Single Page Application (SPA).
 * Gestiona el estado global (Vehículos, Inventario, Notificaciones) y 
 * distribuye la información a los subcomponentes (Vistas) a través de Props.
 * ============================================================================
 */

import React, { useState, useEffect } from 'react';
import { Settings, Home, Wrench, Calendar, CarFront, FileText, Bell, Search, Menu, Plus, X, ArrowUpRight, ArrowDownRight, Package, Cpu, Receipt, CheckCircle, Trash2 } from 'lucide-react';

export default function App() {
  // --------------------------------------------------------------------------
  // 1. ESTADO DE NAVEGACIÓN Y UI GENERAL
  // --------------------------------------------------------------------------
  const [activeTab, setActiveTab] = useState('dashboard'); // Controla la vista actual
  const [isSidebarExpanded, setSidebarExpanded] = useState(true); // Colapsa/Expande el menú lateral
  const [searchQuery, setSearchQuery] = useState(''); // Estado global para búsquedas

  // --------------------------------------------------------------------------
  // 2. ESTADO DEL SISTEMA DE NOTIFICACIONES
  // --------------------------------------------------------------------------
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Sistema iniciado correctamente.', type: 'info', read: false }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  /**
   * Añade una nueva notificación al principio de la lista.
   * @param {string} text - Mensaje a mostrar
   * @param {string} type - 'info', 'warning' o 'success'
   */
  const addNotification = (text, type = 'info') => {
    setNotifications(prev => [{ id: Date.now(), text, type, read: false }, ...prev]);
  };

  /**
   * Marca todas las notificaciones como leídas al abrir el panel
   */
  const markNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Calcula cuántas notificaciones no han sido vistas para el indicador rojo (campana)
  const unreadCount = notifications.filter(n => !n.read).length;

  // --------------------------------------------------------------------------
  // 3. ESTADO GLOBAL DE DATOS (Simulación de Base de Datos)
  // --------------------------------------------------------------------------
  
  // Base de datos de vehículos ingresados al taller
  const [vehicles, setVehicles] = useState([
    { id: 'ORD-001', plate: 'ABC-123', model: 'Toyota Hilux 2021', owner: 'Carlos Mendoza', status: 'development' },
    { id: 'ORD-002', plate: 'XYZ-987', model: 'Nissan Sentra 2018', owner: 'María López', status: 'development' },
    { id: 'ORD-003', plate: 'JKL-456', model: 'Honda Civic 2022', owner: 'Roberto Gómez', status: 'planned' },
  ]);

  // Base de datos del catálogo de inventario (Repuestos)
  const [inventory, setInventory] = useState([
    { id: 'INV-1', name: 'Aceite Sintético 5W-30', stock: 24, minStock: 10, price: 45.00 },
    { id: 'INV-2', name: 'Bujías NGK Iridium', stock: 25, minStock: 20, price: 12.50 },
    { id: 'INV-3', name: 'Filtro de Aire', stock: 15, minStock: 10, price: 18.00 },
  ]);

  /**
   * Modifica el stock de un producto específico. Se usa tanto en el módulo de Inventario 
   * como en la facturación automática (Módulo de Órdenes).
   * @param {string} id - ID del producto (Ej. INV-1)
   * @param {number} delta - Cantidad a sumar (positivo) o restar (negativo)
   * @param {string} actionName - Razón del movimiento para el registro
   * @param {boolean} skipNotification - Evita saturar la campana si se hacen cobros masivos
   */
  const handleStockMovement = (id, delta, actionName, skipNotification = false) => {
    setInventory(prev => prev.map(i => {
      if (i.id === id) {
        // Aseguramos que el stock nunca sea menor a 0
        const newStock = Math.max(0, i.stock + delta);
        
        if (!skipNotification) {
          // Si el stock cae por debajo del mínimo de seguridad, dispara alerta
          if (newStock <= i.minStock && i.stock > i.minStock) {
            addNotification(`¡Alerta! Producto bajo en stock: ${i.name} (Quedan ${newStock})`, 'warning');
          } else {
            addNotification(`Movimiento de inventario (${actionName}): ${i.name}. Nuevo stock: ${newStock}`, 'info');
          }
        }
        return { ...i, stock: newStock };
      }
      return i; // Retorna el item sin modificar si no coincide el ID
    }));
  };

  // ==========================================================================
  // RENDERIZADO PRINCIPAL (SHELL DE LA APLICACIÓN)
  // ==========================================================================
  return (
    <div className="min-h-screen bg-workspace text-on-workspace flex overflow-hidden font-sans">
      
      {/* 
        Menú Lateral (Sidebar)
        Maneja la navegación entre los distintos módulos funcionales.
      */}
      <aside 
        className={`bg-shell/70 backdrop-blur-md border-r border-white/10 flex flex-col transition-all duration-300 relative z-20 ${
          isSidebarExpanded ? 'w-[256px]' : 'w-[64px]'
        }`}
      >
        <div className="h-[64px] flex items-center justify-between px-4 border-b border-white/10">
          <div className="flex items-center overflow-hidden">
            <Cpu className="text-primary mr-2 min-w-[24px]" size={24} />
            {isSidebarExpanded && <span className="text-on-shell font-bold text-lg tracking-tight whitespace-nowrap">Command Center</span>}
          </div>
          <button onClick={() => setSidebarExpanded(!isSidebarExpanded)} className="text-white/70 hover:text-white ml-2 shrink-0">
            <Menu size={20} />
          </button>
        </div>

        <nav className="flex-1 py-4 px-2 space-y-1">
          {/* Enlaces de navegación simulada (SPA) */}
          <NavItem icon={<Home />} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} expanded={isSidebarExpanded} />
          <NavItem icon={<CarFront />} label="Vehículos" active={activeTab === 'vehiculos'} onClick={() => setActiveTab('vehiculos')} expanded={isSidebarExpanded} />
          <NavItem icon={<Calendar />} label="Órdenes y Cobro" active={activeTab === 'ordenes'} onClick={() => setActiveTab('ordenes')} expanded={isSidebarExpanded} />
          <NavItem icon={<Wrench />} label="Inventario" active={activeTab === 'inventario'} onClick={() => setActiveTab('inventario')} expanded={isSidebarExpanded} />
        </nav>
      </aside>

      {/* Área Principal de Contenido */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Cabecera Superior (Header) */}
        <header className="h-[64px] bg-shell/70 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-6 z-10 relative">
          
          {/* Buscador Universal */}
          <div className="flex items-center bg-white/10 rounded-sm px-3 py-1.5 w-64 border border-white/5 focus-within:border-primary transition-colors">
            <Search size={16} className="text-white/50 mr-2" />
            <input 
              type="text" 
              placeholder="Buscar universal..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm text-on-shell outline-none w-full placeholder-white/50"
            />
          </div>

          <div className="flex items-center space-x-6">
            
            {/* Componente de Campana de Notificaciones */}
            <div className="relative">
              <button 
                onClick={() => { setShowNotifications(!showNotifications); markNotificationsRead(); }}
                className="text-white/70 hover:text-white relative outline-none flex items-center"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center font-bold text-white border border-shell/70">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Panel Desplegable de Notificaciones */}
              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 bg-surface-elevated rounded-md shadow-dialog border border-outline overflow-hidden z-50">
                  <div className="bg-surface p-3 border-b border-outline flex justify-between items-center">
                    <h3 className="font-bold text-on-surface text-sm">Notificaciones</h3>
                    <button onClick={() => setShowNotifications(false)}><X size={16} className="text-on-surface-muted" /></button>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-sm text-on-surface-muted">No hay notificaciones.</div>
                    ) : (
                      notifications.map(notif => (
                        <div key={notif.id} className={`p-3 text-sm border-b border-outline/50 flex items-start ${notif.type === 'warning' ? 'bg-red-50/50' : notif.type === 'success' ? 'bg-green-50/50' : ''}`}>
                          <div className={`w-2 h-2 mt-1.5 rounded-full mr-3 shrink-0 ${notif.type === 'warning' ? 'bg-red-500' : notif.type === 'success' ? 'bg-green-500' : 'bg-primary'}`}></div>
                          <p className="text-on-surface leading-tight">{notif.text}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Avatar Usuario */}
            <div className="w-8 h-8 rounded-full bg-primary-strong flex items-center justify-center text-white text-sm font-bold shadow-subtle">
              AD
            </div>
          </div>
        </header>

        {/* 
          Controlador de Vistas (Workspace Document)
          Dependiendo de 'activeTab', inyecta el componente correspondiente.
          Pasa las propiedades (props) necesarias a cada vista para que manipulen el estado global.
        */}
        <main className="flex-1 overflow-auto p-8 relative">
          <div className="max-w-[1400px] mx-auto pb-20">
            {activeTab === 'dashboard' && <DashboardView vehicles={vehicles} />}
            {activeTab === 'vehiculos' && <VehiclesView vehicles={vehicles} setVehicles={setVehicles} searchQuery={searchQuery} addNotification={addNotification} />}
            {activeTab === 'ordenes' && <OrdersView vehicles={vehicles} setVehicles={setVehicles} inventory={inventory} handleStockMovement={handleStockMovement} searchQuery={searchQuery} addNotification={addNotification} />}
            {activeTab === 'inventario' && <InventoryView inventory={inventory} setInventory={setInventory} handleStockMovement={handleStockMovement} searchQuery={searchQuery} addNotification={addNotification} />}
          </div>
        </main>
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENTES SECUNDARIOS (VISTAS Y UI)
// ============================================================================

/**
 * Componente Botón de Navegación del menú lateral
 */
function NavItem({ icon, label, active, onClick, expanded }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center px-3 py-2 rounded-md transition-colors text-sm ${
        active 
          ? 'bg-primary text-on-primary font-medium' 
          : 'text-white/70 hover:bg-white/5 hover:text-white'
      }`}
      title={!expanded ? label : ''}
    >
      <span className="mr-3 shrink-0">{icon}</span>
      {expanded && <span className="whitespace-nowrap">{label}</span>}
    </button>
  );
}

/**
 * MÓDULO 1: Dashboard
 * Muestra el resumen operativo usando métodos de array (filter, length) sobre los datos globales.
 */
function DashboardView({ vehicles }) {
  const inRepair = vehicles.filter(v => v.status === 'development').length;
  const ready = vehicles.filter(v => v.status === 'production').length;
  const dispatched = vehicles.filter(v => v.status === 'dispatched').length;

  return (
    <div className="space-y-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-on-workspace mb-1 tracking-tight">Dashboard General</h1>
        <p className="text-on-surface-muted text-sm">Resumen operativo del taller en tiempo real.</p>
      </header>

      {/* Tarjetas de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard title="Total Vehículos" value={vehicles.length} />
        <MetricCard title="En Reparación" value={inRepair} highlight={inRepair > 0} />
        <MetricCard title="Listos (Por Cobrar)" value={ready} />
        <MetricCard title="Despachados" value={dispatched} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface rounded-lg p-6 border border-outline shadow-subtle">
          <h3 className="font-bold mb-4 text-on-surface">Flujo Operativo (Simulación)</h3>
          <div className="h-48 flex items-end justify-between space-x-2 pt-4">
            {/* Generación de barras simuladas para el gráfico */}
            {[40, 70, 45, Math.min(vehicles.length * 15, 100), 60, 30, 80].map((h, i) => (
              <div key={i} className="w-full bg-primary/60 hover:bg-primary transition-colors rounded-t-xs" style={{ height: `${h}%` }}></div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-on-surface-muted uppercase tracking-wider font-semibold">
            <span>Lun</span><span>Mar</span><span>Mie</span><span>Jue</span><span>Vie</span><span>Sab</span><span>Dom</span>
          </div>
        </div>

        <div className="bg-surface rounded-lg p-6 border border-outline shadow-subtle">
          <h3 className="font-bold mb-4 text-on-surface">Información de Sistema</h3>
          <div className="space-y-4">
            <ActivityItem text={`Último registro de vehículo: ${vehicles[vehicles.length - 1]?.model || 'N/A'}`} time="Reciente" />
            <ActivityItem text="Módulo de notificaciones en línea." time="Actualizado" />
            <ActivityItem text="El sistema de facturación está operativo." time="En vivo" />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Componente UI: Tarjeta genérica de métrica
 */
function MetricCard({ title, value, highlight }) {
  return (
    <div className={`bg-surface rounded-lg p-5 border shadow-subtle flex flex-col ${highlight ? 'border-primary/50 bg-primary/5' : 'border-outline'}`}>
      <span className="text-xs uppercase tracking-wider font-semibold text-on-surface-muted mb-2">{title}</span>
      <div className="flex items-baseline justify-between">
        <span className="text-3xl font-bold text-on-surface">{value}</span>
      </div>
    </div>
  );
}

/**
 * Componente UI: Item genérico de actividad
 */
function ActivityItem({ text, time, isAlert }) {
  return (
    <div className="flex items-start">
      <div className={`w-2 h-2 mt-1.5 rounded-full mr-3 shrink-0 ${isAlert ? 'bg-red-500' : 'bg-primary'}`}></div>
      <div>
        <p className="text-sm text-on-surface leading-tight mb-1">{text}</p>
        <span className="text-xs text-on-surface-muted font-medium">{time}</span>
      </div>
    </div>
  );
}

/**
 * MÓDULO 2: Vehículos
 * Muestra listado general y gestiona el registro de ingresos.
 */
function VehiclesView({ vehicles, setVehicles, searchQuery, addNotification }) {
  const [showModal, setShowModal] = useState(false); // Estado para abrir ventana modal
  const [formData, setFormData] = useState({ plate: '', model: '', owner: '' }); // Estado del formulario

  // Lógica de filtrado en vivo basado en la búsqueda
  const filteredVehicles = vehicles.filter(v => 
    v.plate.toLowerCase().includes(searchQuery.toLowerCase()) || 
    v.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.owner.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /**
   * Procesa el formulario y guarda un nuevo vehículo
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.plate || !formData.model) return;
    
    // Simula la creación de un nuevo ID auto-incremental
    const newId = `ORD-00${vehicles.length + 1}`;
    
    // Actualiza el estado global de vehículos
    setVehicles([...vehicles, { id: newId, ...formData, status: 'planned' }]);
    
    // Dispara alerta global de éxito
    addNotification(`Vehículo creado exitosamente: ${formData.plate} - ${formData.model}`, 'success');

    // Resetea formulario y cierra modal
    setShowModal(false);
    setFormData({ plate: '', model: '', owner: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end mb-6">
        <header>
          <h1 className="text-3xl font-bold text-on-workspace mb-1 tracking-tight">Vehículos Activos</h1>
          <p className="text-on-surface-muted text-sm">Gestión de unidades (Filtrado por: {searchQuery || 'Todos'})</p>
        </header>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-primary hover:bg-primary-strong text-white px-4 py-2 rounded-sm text-sm font-medium transition-colors shadow-subtle flex items-center"
        >
          <Plus size={16} className="mr-2" /> Registrar Ingreso
        </button>
      </div>

      {/* Tabla de Vehículos */}
      <div className="bg-surface rounded-lg border border-outline shadow-subtle overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-primary/5 border-b border-outline">
              <th className="py-3 px-4 text-xs font-semibold uppercase text-primary-strong">Orden</th>
              <th className="py-3 px-4 text-xs font-semibold uppercase text-primary-strong">Placa</th>
              <th className="py-3 px-4 text-xs font-semibold uppercase text-primary-strong">Vehículo</th>
              <th className="py-3 px-4 text-xs font-semibold uppercase text-primary-strong">Cliente</th>
              <th className="py-3 px-4 text-xs font-semibold uppercase text-primary-strong text-right">Estado Operativo</th>
            </tr>
          </thead>
          <tbody>
            {filteredVehicles.map((v, i) => (
              <tr key={i} className="border-b border-outline/50 hover:bg-white/50 transition-colors">
                <td className="py-3 px-4 text-sm font-medium text-on-surface">{v.id}</td>
                <td className="py-3 px-4 text-sm font-mono text-on-surface-muted">{v.plate}</td>
                <td className="py-3 px-4 text-sm text-on-surface">{v.model}</td>
                <td className="py-3 px-4 text-sm text-on-surface-muted">{v.owner}</td>
                <td className="py-3 px-4 text-right"><StatusBadge status={v.status} /></td>
              </tr>
            ))}
            {/* Mensaje de fallback si la búsqueda no arroja resultados */}
            {filteredVehicles.length === 0 && (
              <tr><td colSpan="5" className="py-8 text-center text-on-surface-muted">No hay resultados para "{searchQuery}"</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal: Agregar Vehículo */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-surface-elevated p-6 rounded-lg shadow-dialog w-[400px]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Nuevo Ingreso</h2>
              <button onClick={() => setShowModal(false)}><X size={20} className="text-on-surface-muted" /></button>
            </div>
            {/* Formulario controlado por React (value + onChange) */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-on-surface-muted mb-1">PLACA</label>
                <input type="text" className="w-full border border-outline rounded-sm p-2 text-sm" value={formData.plate} onChange={e => setFormData({...formData, plate: e.target.value})} required placeholder="Ej: XYZ-123" />
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-muted mb-1">MODELO</label>
                <input type="text" className="w-full border border-outline rounded-sm p-2 text-sm" value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})} required placeholder="Ej: Honda Civic 2020" />
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-muted mb-1">CLIENTE</label>
                <input type="text" className="w-full border border-outline rounded-sm p-2 text-sm" value={formData.owner} onChange={e => setFormData({...formData, owner: e.target.value})} required placeholder="Nombre del propietario" />
              </div>
              <button type="submit" className="w-full bg-primary hover:bg-primary-strong text-white py-2 rounded-sm font-medium mt-4">Guardar Vehículo</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * MÓDULO 3: Órdenes de Trabajo y Cobro
 * Gestiona el estatus del vehículo y contiene la lógica matemática de facturación e inventario interconectado.
 */
function OrdersView({ vehicles, setVehicles, inventory, handleStockMovement, searchQuery, addNotification }) {
  // Estado local para abrir el modal de facturación
  const [checkoutVehicle, setCheckoutVehicle] = useState(null);
  
  // --------------------------------------------------------------------------
  // Lógica del Formulario Dinámico de Facturación
  // --------------------------------------------------------------------------
  const [laborCost, setLaborCost] = useState(120); // Mano de obra
  const [scannerCost, setScannerCost] = useState(45); // Diagnóstico
  const [selectedParts, setSelectedParts] = useState([]); // Arreglo de repuestos seleccionados para cobrar
  const [partToAdd, setPartToAdd] = useState(''); // ID del repuesto seleccionado en el dropdown
  const [partQty, setPartQty] = useState(1); // Cantidad solicitada

  const filteredVehicles = vehicles.filter(v => v.id.toLowerCase().includes(searchQuery.toLowerCase()) || v.model.toLowerCase().includes(searchQuery.toLowerCase()));

  /**
   * Cambia el estatus visual y operativo del vehículo (Ej. de 'En Reparación' a 'Listo')
   */
  const changeStatus = (id, newStatus) => {
    setVehicles(vehicles.map(v => v.id === id ? { ...v, status: newStatus } : v));
    const vehicle = vehicles.find(v => v.id === id);
    if(vehicle) {
      addNotification(`Orden ${id} cambió a estado: ${newStatus}`, 'info');
    }
  };

  /**
   * Inicia el proceso de cobro, reseteando la calculadora virtual.
   */
  const handleCheckoutClick = (vehicle) => {
    // Si no estaba "Listo" (production), se fuerza el cambio para iniciar cobro
    if (vehicle.status !== 'production') {
      changeStatus(vehicle.id, 'production');
    }
    // Reseteo limpio de la calculadora
    setLaborCost(120);
    setScannerCost(45);
    setSelectedParts([]);
    setPartToAdd('');
    setPartQty(1);
    
    // Abre la ventana pasándole los datos del auto actual
    setCheckoutVehicle({ ...vehicle, status: 'production' });
  };

  /**
   * Añade una refacción desde el inventario al carrito de cobro, validando disponibilidad.
   */
  const handleAddPart = () => {
    if(!partToAdd) return;
    const invItem = inventory.find(i => i.id === partToAdd);
    if(!invItem) return; // Validación de seguridad

    // Valida que el stock general no sea menor a lo solicitado
    if(invItem.stock < partQty) {
       addNotification(`Stock insuficiente para ${invItem.name}. (Disponible: ${invItem.stock})`, 'warning');
       return;
    }

    // Comprueba si el item ya estaba agregado a la cuenta
    const existingPart = selectedParts.find(p => p.id === partToAdd);
    if (existingPart) {
      // Valida de nuevo si la suma de lo que ya estaba + lo nuevo no supera el inventario físico
      if (existingPart.qty + Number(partQty) > invItem.stock) {
        addNotification(`Supera el stock actual de ${invItem.name}`, 'warning');
        return;
      }
      setSelectedParts(selectedParts.map(p => p.id === partToAdd ? {...p, qty: p.qty + Number(partQty)} : p));
    } else {
      setSelectedParts([...selectedParts, { id: invItem.id, name: invItem.name, price: invItem.price, qty: Number(partQty) }]);
    }
    
    setPartToAdd('');
    setPartQty(1);
  };

  const handleRemovePart = (id) => {
    setSelectedParts(selectedParts.filter(p => p.id !== id));
  }

  // --------------------------------------------------------------------------
  // Variables Reactivas (Calculan totales matemáticamente antes de renderizar)
  // --------------------------------------------------------------------------
  const partsTotal = selectedParts.reduce((sum, p) => sum + (p.price * p.qty), 0);
  const subtotal = Number(laborCost) + Number(scannerCost) + partsTotal;
  const iva = subtotal * 0.16;
  const totalAmount = subtotal + iva;

  /**
   * Concluye el servicio: descuenta inventario global y marca la unidad como despachada.
   */
  const confirmPayment = (id) => {
    // 1. Iterar sobre las piezas de la cuenta y descontarlas mediante la función del padre
    selectedParts.forEach(part => {
      handleStockMovement(part.id, -part.qty, `Facturado en ${id}`, true);
    });

    // 2. Modificar estatus del vehículo a despachado permanentemente
    setVehicles(vehicles.map(v => v.id === id ? { ...v, status: 'dispatched' } : v));
    
    // 3. Notificación de éxito y cierre
    addNotification(`¡Cobro realizado con éxito! Vehículo ${id} despachado. Total: $${totalAmount.toFixed(2)}`, 'success');
    setCheckoutVehicle(null);
  };

  return (
    <div className="space-y-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-on-workspace mb-1 tracking-tight">Órdenes de Trabajo y Cobro</h1>
        <p className="text-on-surface-muted text-sm">Gestiona el progreso, liquidación interactiva y despacho.</p>
      </header>

      {/* Grid de Órdenes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVehicles.map(v => (
          <div key={v.id} className="bg-surface border border-outline rounded-lg p-5 shadow-subtle flex flex-col relative overflow-hidden">
            
            {/* Overlay visual cuando la unidad ya se despachó y pagó */}
            {v.status === 'dispatched' && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center z-10">
                <div className="bg-emerald-100 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full font-bold flex items-center shadow-sm">
                  <CheckCircle size={16} className="mr-2" /> Vehículo Despachado
                </div>
              </div>
            )}

            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs font-mono text-on-surface-muted">{v.id}</span>
                <h3 className="font-bold text-on-surface mt-1">{v.model}</h3>
              </div>
              <StatusBadge status={v.status} />
            </div>
            
            <div className="mt-auto space-y-2 pt-4 border-t border-outline/50 relative z-0">
              <p className="text-xs text-on-surface-muted mb-2">Progreso:</p>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => changeStatus(v.id, 'planned')} className={`text-xs px-2 py-1 rounded-sm border ${v.status === 'planned' ? 'bg-status-planned-bg border-status-planned-fg text-status-planned-fg font-bold' : 'border-outline hover:bg-white/50 text-on-surface'}`}>Planificado</button>
                <button onClick={() => changeStatus(v.id, 'development')} className={`text-xs px-2 py-1 rounded-sm border ${v.status === 'development' ? 'bg-status-development-bg border-status-development-fg text-status-development-fg font-bold' : 'border-outline hover:bg-white/50 text-on-surface'}`}>En Reparación</button>
                
                {/* Botón que despliega la calculadora interactiva */}
                <button 
                  onClick={() => handleCheckoutClick(v)} 
                  className={`text-xs px-2 py-1 rounded-sm border flex items-center ${v.status === 'production' ? 'bg-status-production-bg border-status-production-fg text-status-production-fg font-bold' : 'border-outline hover:bg-primary/10 text-on-surface hover:text-primary-strong hover:border-primary/50'}`}
                >
                  <Receipt size={12} className="mr-1" /> Listo / Cobrar
                </button>
              </div>
            </div>
          </div>
        ))}
        {filteredVehicles.length === 0 && <p className="text-on-surface-muted">No se encontraron órdenes.</p>}
      </div>

      {/* 
        =======================================================================
        MODAL DINÁMICO DE FACTURACIÓN Y DESCUENTO
        =======================================================================
      */}
      {checkoutVehicle && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-surface-elevated rounded-lg shadow-dialog w-full max-w-2xl flex flex-col max-h-[90vh]">
            
            {/* Encabezado */}
            <div className="bg-surface p-5 border-b border-outline flex justify-between items-center shrink-0">
              <div>
                <h2 className="text-xl font-bold text-on-surface flex items-center">
                  <Receipt className="mr-2 text-primary" size={24} />
                  Facturación y Despacho
                </h2>
                <p className="text-xs text-on-surface-muted mt-1">Orden: {checkoutVehicle.id} | {checkoutVehicle.model} ({checkoutVehicle.plate})</p>
              </div>
              <button onClick={() => setCheckoutVehicle(null)}><X size={20} className="text-on-surface-muted hover:text-on-surface" /></button>
            </div>
            
            {/* Contenido (Scrollable) */}
            <div className="p-6 bg-white overflow-y-auto flex-1">
              
              {/* Entradas editables para Cargos Fijos */}
              <div className="mb-6 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-on-surface-muted mb-1">MANO DE OBRA ($)</label>
                  <input type="number" min="0" className="w-full border border-outline rounded-sm p-2 text-sm font-mono" value={laborCost} onChange={e => setLaborCost(e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface-muted mb-1">USO DE ESCÁNER/DIAGNÓSTICO ($)</label>
                  <input type="number" min="0" className="w-full border border-outline rounded-sm p-2 text-sm font-mono" value={scannerCost} onChange={e => setScannerCost(e.target.value)} />
                </div>
              </div>

              {/* Selector e inyector de repuestos ligados al Inventario Real */}
              <div className="mb-6 border border-outline rounded-md p-4 bg-surface">
                <h3 className="font-bold text-sm text-on-surface mb-3 uppercase tracking-wide">Inyectar Repuestos de Inventario</h3>
                <div className="flex items-end space-x-2">
                  <div className="flex-1">
                    <label className="block text-xs text-on-surface-muted mb-1">Seleccionar Producto</label>
                    <select className="w-full border border-outline rounded-sm p-2 text-sm bg-white" value={partToAdd} onChange={e => setPartToAdd(e.target.value)}>
                      <option value="">-- Elige un repuesto --</option>
                      {/* Solo muestra elementos del stock con existencias (> 0) */}
                      {inventory.filter(i => i.stock > 0).map(i => (
                        <option key={i.id} value={i.id}>{i.name} - ${i.price.toFixed(2)} (Stock: {i.stock})</option>
                      ))}
                    </select>
                  </div>
                  <div className="w-24">
                    <label className="block text-xs text-on-surface-muted mb-1">Cant.</label>
                    <input type="number" min="1" className="w-full border border-outline rounded-sm p-2 text-sm bg-white text-center" value={partQty} onChange={e => setPartQty(e.target.value)} />
                  </div>
                  <button onClick={handleAddPart} className="bg-primary hover:bg-primary-strong text-white px-4 py-2 rounded-sm text-sm font-medium transition-colors">
                    Añadir
                  </button>
                </div>
              </div>

              {/* Tabla de detalle dinámico */}
              <div className="mb-6">
                <h3 className="font-bold text-sm text-on-surface mb-3 uppercase tracking-wide">Detalle de Repuestos Aplicados</h3>
                {selectedParts.length === 0 ? (
                  <p className="text-sm text-on-surface-muted italic text-center p-4 border border-dashed border-outline rounded-sm">Sin repuestos adicionales.</p>
                ) : (
                  <div className="border border-outline rounded-sm overflow-hidden">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-surface border-b border-outline text-xs text-on-surface-muted uppercase">
                        <tr>
                          <th className="px-3 py-2">Artículo</th>
                          <th className="px-3 py-2 text-center">Cant.</th>
                          <th className="px-3 py-2 text-right">Costo Unit.</th>
                          <th className="px-3 py-2 text-right">Subtotal</th>
                          <th className="px-3 py-2 text-center"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedParts.map((p, idx) => (
                          <tr key={idx} className="border-b border-outline/50 last:border-0">
                            <td className="px-3 py-2">{p.name}</td>
                            <td className="px-3 py-2 text-center">{p.qty}</td>
                            <td className="px-3 py-2 text-right font-mono">${p.price.toFixed(2)}</td>
                            <td className="px-3 py-2 text-right font-mono">${(p.price * p.qty).toFixed(2)}</td>
                            <td className="px-3 py-2 text-center">
                              <button onClick={() => handleRemovePart(p.id)} className="text-red-500 hover:text-red-700">
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Cálculos Finales Generados Matemáticamente */}
              <div className="bg-surface p-4 rounded-md space-y-2 border border-outline">
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-muted font-bold">Subtotal Servicios + Repuestos</span>
                  <span className="font-mono">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-muted font-bold">IVA (16%)</span>
                  <span className="font-mono">${iva.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg border-t border-outline pt-3 mt-3">
                  <span className="font-bold text-on-surface">TOTAL A COBRAR</span>
                  <span className="font-mono font-bold text-primary-strong">${totalAmount.toFixed(2)}</span>
                </div>
              </div>

            </div>

            {/* Acciones Finales (El botón verde dispara todo el ecosistema de cambios) */}
            <div className="bg-surface p-4 border-t border-outline flex justify-end space-x-3 shrink-0">
              <button onClick={() => setCheckoutVehicle(null)} className="px-4 py-2 border border-outline rounded-sm text-sm font-medium hover:bg-gray-50 text-gray-600">
                Cancelar
              </button>
              <button onClick={() => confirmPayment(checkoutVehicle.id)} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-sm text-sm font-medium shadow-subtle flex items-center">
                <CheckCircle size={16} className="mr-2" /> Procesar Pago y Despachar
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

/**
 * MÓDULO 4: Inventario
 * Realiza altas de productos y gestiona las salidas o ingresos manuales de existencias.
 */
function InventoryView({ inventory, setInventory, handleStockMovement, searchQuery, addNotification }) {
  const [showModal, setShowModal] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', stock: 0, minStock: 10, price: 0 });

  const filtered = inventory.filter(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()));

  /**
   * Crea un producto nuevo y lo anexa al estado del Catálogo Global
   */
  const handleCreateProduct = (e) => {
    e.preventDefault();
    if(!newItem.name) return;
    const newId = `INV-${inventory.length + 1}`;
    setInventory([...inventory, { id: newId, ...newItem }]);
    addNotification(`Producto creado: ${newItem.name} (Stock: ${newItem.stock})`, 'info');
    setShowModal(false);
    setNewItem({ name: '', stock: 0, minStock: 10, price: 0 }); // Limpia formulario
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end mb-6">
        <header>
          <h1 className="text-3xl font-bold text-on-workspace mb-1 tracking-tight">Inventario de Repuestos</h1>
          <p className="text-on-surface-muted text-sm">Control de stock y suministros.</p>
        </header>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-primary hover:bg-primary-strong text-white px-4 py-2 rounded-sm text-sm font-medium transition-colors shadow-subtle flex items-center"
        >
          <Package className="mr-2" size={16} /> Agregar Producto
        </button>
      </div>

      <div className="bg-surface rounded-lg border border-outline shadow-subtle overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-primary/5 border-b border-outline">
              <th className="py-3 px-4 text-xs font-semibold uppercase text-primary-strong">SKU</th>
              <th className="py-3 px-4 text-xs font-semibold uppercase text-primary-strong">Artículo</th>
              <th className="py-3 px-4 text-xs font-semibold uppercase text-primary-strong text-right">Precio Unitario</th>
              <th className="py-3 px-4 text-xs font-semibold uppercase text-primary-strong text-center">Stock Actual</th>
              <th className="py-3 px-4 text-xs font-semibold uppercase text-primary-strong text-center">Acciones de Inventario</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, i) => (
              <tr key={i} className="border-b border-outline/50 hover:bg-white/50 transition-colors">
                <td className="py-3 px-4 text-sm font-mono text-on-surface-muted">{item.id}</td>
                <td className="py-3 px-4 text-sm font-medium text-on-surface">
                  {item.name}
                  {/* Pastilla Visual de Alerta Renderizada si el Stock cruza su límite */}
                  {item.stock <= item.minStock && <span className="ml-2 text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full uppercase font-bold border border-red-200">Bajo Stock</span>}
                </td>
                <td className="py-3 px-4 text-sm text-right font-mono">${Number(item.price).toFixed(2)}</td>
                <td className="py-3 px-4 text-sm text-center font-bold text-on-surface">{item.stock}</td>
                <td className="py-3 px-4 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    {/* Botones de acción manual que invocan a la función central del estado global (App) */}
                    <button 
                      onClick={() => handleStockMovement(item.id, 1, 'Compra')} 
                      className="bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 px-2 py-1 rounded-sm text-xs font-bold flex items-center shadow-sm"
                      title="Registrar Compra / Ingreso"
                    >
                      <ArrowUpRight size={14} className="mr-1" /> Compra
                    </button>
                    <button 
                      onClick={() => handleStockMovement(item.id, -1, 'Merma/Salida')} 
                      className="bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 px-2 py-1 rounded-sm text-xs font-bold flex items-center shadow-sm"
                      title="Registrar Merma / Salida"
                    >
                      <ArrowDownRight size={14} className="mr-1" /> Salida
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan="5" className="py-8 text-center text-on-surface-muted">No hay repuestos encontrados.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Agregar Producto */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-surface-elevated p-6 rounded-lg shadow-dialog w-[400px]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Agregar Producto</h2>
              <button onClick={() => setShowModal(false)}><X size={20} className="text-on-surface-muted" /></button>
            </div>
            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-on-surface-muted mb-1">NOMBRE DEL ARTÍCULO</label>
                <input type="text" className="w-full border border-outline rounded-sm p-2 text-sm" value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} required placeholder="Ej: Llantas Michelin" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-on-surface-muted mb-1">STOCK INICIAL</label>
                  <input type="number" min="0" className="w-full border border-outline rounded-sm p-2 text-sm" value={newItem.stock} onChange={e => setNewItem({...newItem, stock: Number(e.target.value)})} required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface-muted mb-1">STOCK MÍNIMO</label>
                  <input type="number" min="0" className="w-full border border-outline rounded-sm p-2 text-sm" value={newItem.minStock} onChange={e => setNewItem({...newItem, minStock: Number(e.target.value)})} required />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-muted mb-1">PRECIO ($)</label>
                <input type="number" step="0.01" min="0" className="w-full border border-outline rounded-sm p-2 text-sm" value={newItem.price} onChange={e => setNewItem({...newItem, price: Number(e.target.value)})} required />
              </div>
              <button type="submit" className="w-full bg-primary hover:bg-primary-strong text-white py-2 rounded-sm font-medium mt-4 shadow-subtle">Guardar Producto</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Componente Visual Secundario: Renderiza un distintivo visual (Badge)
 * dependiendo de la cadena de estado del vehículo (Status)
 */
function StatusBadge({ status }) {
  const styles = {
    mock: 'bg-status-mock-bg text-status-mock-fg',
    planned: 'bg-status-planned-bg text-status-planned-fg border border-status-planned-fg/20',
    development: 'bg-status-development-bg text-status-development-fg border border-status-development-fg/20',
    integrated: 'bg-status-integrated-bg text-status-integrated-fg border border-status-integrated-fg/20',
    production: 'bg-status-production-bg text-status-production-fg border border-status-production-fg/20',
    dispatched: 'bg-emerald-100 text-emerald-800 border border-emerald-200'
  };
  
  const labels = {
    mock: 'Demo',
    planned: 'Planificado',
    development: 'En Reparación',
    integrated: 'Revisión QA',
    production: 'Listo (Entregable)',
    dispatched: 'Despachado (Pagado)'
  };

  return (
    <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wide ${styles[status] || styles.mock}`}>
      {labels[status] || labels.mock}
    </span>
  );
}
