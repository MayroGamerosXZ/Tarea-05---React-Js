import React, { useState, useEffect } from 'react';
import { Settings, Home, Wrench, Calendar, CarFront, FileText, Bell, Search, Menu, Plus, X, ArrowUpRight, ArrowDownRight, Package, Cpu } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarExpanded, setSidebarExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Notifications State
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Sistema iniciado correctamente.', type: 'info', read: false }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  const addNotification = (text, type = 'info') => {
    setNotifications(prev => [{ id: Date.now(), text, type, read: false }, ...prev]);
  };

  const markNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // Global State (Mock Database)
  const [vehicles, setVehicles] = useState([
    { id: 'ORD-001', plate: 'ABC-123', model: 'Toyota Hilux 2021', owner: 'Carlos Mendoza', status: 'production' },
    { id: 'ORD-002', plate: 'XYZ-987', model: 'Nissan Sentra 2018', owner: 'María López', status: 'development' },
    { id: 'ORD-003', plate: 'JKL-456', model: 'Honda Civic 2022', owner: 'Roberto Gómez', status: 'planned' },
  ]);

  const [inventory, setInventory] = useState([
    { id: 'INV-1', name: 'Aceite Sintético 5W-30', stock: 24, minStock: 10, price: 45.00 },
    { id: 'INV-2', name: 'Bujías NGK Iridium', stock: 25, minStock: 20, price: 12.50 },
    { id: 'INV-3', name: 'Filtro de Aire', stock: 15, minStock: 10, price: 18.00 },
  ]);

  return (
    <div className="min-h-screen bg-workspace text-on-workspace flex overflow-hidden font-sans">
      
      {/* Shell Sidebar */}
      <aside 
        className={`bg-shell/70 backdrop-blur-md border-r border-white/10 flex flex-col transition-all duration-300 relative z-20 ${
          isSidebarExpanded ? 'w-[256px]' : 'w-[64px]'
        }`}
      >
        <div className="h-[64px] flex items-center justify-between px-4 border-b border-white/10">
          <div className="flex items-center">
            <Cpu className="text-primary mr-2" size={24} />
            {isSidebarExpanded && <span className="text-on-shell font-bold text-lg tracking-tight">Command Center</span>}
          </div>
          <button onClick={() => setSidebarExpanded(!isSidebarExpanded)} className="text-white/70 hover:text-white ml-2">
            <Menu size={20} />
          </button>
        </div>

        <nav className="flex-1 py-4 px-2 space-y-1">
          <NavItem icon={<Home />} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} expanded={isSidebarExpanded} />
          <NavItem icon={<CarFront />} label="Vehículos" active={activeTab === 'vehiculos'} onClick={() => setActiveTab('vehiculos')} expanded={isSidebarExpanded} />
          <NavItem icon={<Calendar />} label="Órdenes" active={activeTab === 'ordenes'} onClick={() => setActiveTab('ordenes')} expanded={isSidebarExpanded} />
          <NavItem icon={<Wrench />} label="Inventario" active={activeTab === 'inventario'} onClick={() => setActiveTab('inventario')} expanded={isSidebarExpanded} />
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Shell Header */}
        <header className="h-[64px] bg-shell/70 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-6 z-10 relative">
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
            {/* Notifications Dropdown */}
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
                        <div key={notif.id} className={`p-3 text-sm border-b border-outline/50 flex items-start ${notif.type === 'warning' ? 'bg-red-50/50' : ''}`}>
                          <div className={`w-2 h-2 mt-1.5 rounded-full mr-3 shrink-0 ${notif.type === 'warning' ? 'bg-red-500' : 'bg-primary'}`}></div>
                          <p className="text-on-surface leading-tight">{notif.text}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="w-8 h-8 rounded-full bg-primary-strong flex items-center justify-center text-white text-sm font-bold shadow-subtle">
              AD
            </div>
          </div>
        </header>

        {/* Workspace Document */}
        <main className="flex-1 overflow-auto p-8 relative">
          <div className="max-w-[1400px] mx-auto">
            {activeTab === 'dashboard' && <DashboardView vehicles={vehicles} />}
            {activeTab === 'vehiculos' && <VehiclesView vehicles={vehicles} setVehicles={setVehicles} searchQuery={searchQuery} addNotification={addNotification} />}
            {activeTab === 'ordenes' && <OrdersView vehicles={vehicles} setVehicles={setVehicles} searchQuery={searchQuery} addNotification={addNotification} />}
            {activeTab === 'inventario' && <InventoryView inventory={inventory} setInventory={setInventory} searchQuery={searchQuery} addNotification={addNotification} />}
          </div>
        </main>
      </div>
    </div>
  );
}

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
      <span className="mr-3">{icon}</span>
      {expanded && <span>{label}</span>}
    </button>
  );
}

function DashboardView({ vehicles }) {
  const inRepair = vehicles.filter(v => v.status === 'development').length;
  const ready = vehicles.filter(v => v.status === 'production').length;
  const planned = vehicles.filter(v => v.status === 'planned').length;

  return (
    <div className="space-y-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-on-workspace mb-1 tracking-tight">Dashboard General</h1>
        <p className="text-on-surface-muted text-sm">Resumen operativo del taller en tiempo real.</p>
      </header>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard title="Total Vehículos" value={vehicles.length} />
        <MetricCard title="En Reparación" value={inRepair} highlight={inRepair > 0} />
        <MetricCard title="Listos (Entrega)" value={ready} />
        <MetricCard title="Nuevas Citas" value={planned} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface rounded-lg p-6 border border-outline shadow-subtle">
          <h3 className="font-bold mb-4 text-on-surface">Flujo Operativo (Simulación)</h3>
          <div className="h-48 flex items-end justify-between space-x-2 pt-4">
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
            <ActivityItem text="El sistema está operando al 100%." time="En vivo" />
          </div>
        </div>
      </div>
    </div>
  );
}

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

function ActivityItem({ text, time, isAlert }) {
  return (
    <div className="flex items-start">
      <div className={`w-2 h-2 mt-1.5 rounded-full mr-3 ${isAlert ? 'bg-red-500' : 'bg-primary'}`}></div>
      <div>
        <p className="text-sm text-on-surface leading-tight mb-1">{text}</p>
        <span className="text-xs text-on-surface-muted font-medium">{time}</span>
      </div>
    </div>
  );
}

function VehiclesView({ vehicles, setVehicles, searchQuery, addNotification }) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ plate: '', model: '', owner: '' });

  const filteredVehicles = vehicles.filter(v => 
    v.plate.toLowerCase().includes(searchQuery.toLowerCase()) || 
    v.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.owner.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.plate || !formData.model) return;
    const newId = `ORD-00${vehicles.length + 1}`;
    setVehicles([...vehicles, { id: newId, ...formData, status: 'planned' }]);
    
    // Disparar Notificación
    addNotification(`Vehículo creado exitosamente: ${formData.plate} - ${formData.model}`, 'success');

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
            {filteredVehicles.length === 0 && (
              <tr><td colSpan="5" className="py-8 text-center text-on-surface-muted">No hay resultados para "{searchQuery}"</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-surface-elevated p-6 rounded-lg shadow-dialog w-[400px]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Nuevo Ingreso</h2>
              <button onClick={() => setShowModal(false)}><X size={20} className="text-on-surface-muted" /></button>
            </div>
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

function OrdersView({ vehicles, setVehicles, searchQuery, addNotification }) {
  const filteredVehicles = vehicles.filter(v => v.id.toLowerCase().includes(searchQuery.toLowerCase()) || v.model.toLowerCase().includes(searchQuery.toLowerCase()));

  const changeStatus = (id, newStatus) => {
    setVehicles(vehicles.map(v => v.id === id ? { ...v, status: newStatus } : v));
    const vehicle = vehicles.find(v => v.id === id);
    if(vehicle) {
      addNotification(`Orden ${id} (${vehicle.model}) cambió a estado: ${newStatus}`, 'info');
    }
  };

  return (
    <div className="space-y-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-on-workspace mb-1 tracking-tight">Órdenes de Trabajo</h1>
        <p className="text-on-surface-muted text-sm">Gestiona el progreso de las reparaciones.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVehicles.map(v => (
          <div key={v.id} className="bg-surface border border-outline rounded-lg p-5 shadow-subtle flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs font-mono text-on-surface-muted">{v.id}</span>
                <h3 className="font-bold text-on-surface mt-1">{v.model}</h3>
              </div>
              <StatusBadge status={v.status} />
            </div>
            
            <div className="mt-auto space-y-2 pt-4 border-t border-outline/50">
              <p className="text-xs text-on-surface-muted mb-2">Cambiar Estado:</p>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => changeStatus(v.id, 'planned')} className={`text-xs px-2 py-1 rounded-sm border ${v.status === 'planned' ? 'bg-status-planned-bg border-status-planned-fg text-status-planned-fg font-bold' : 'border-outline hover:bg-white/50 text-on-surface'}`}>Planificado</button>
                <button onClick={() => changeStatus(v.id, 'development')} className={`text-xs px-2 py-1 rounded-sm border ${v.status === 'development' ? 'bg-status-development-bg border-status-development-fg text-status-development-fg font-bold' : 'border-outline hover:bg-white/50 text-on-surface'}`}>En Reparación</button>
                <button onClick={() => changeStatus(v.id, 'production')} className={`text-xs px-2 py-1 rounded-sm border ${v.status === 'production' ? 'bg-status-production-bg border-status-production-fg text-status-production-fg font-bold' : 'border-outline hover:bg-white/50 text-on-surface'}`}>Listo</button>
              </div>
            </div>
          </div>
        ))}
        {filteredVehicles.length === 0 && <p className="text-on-surface-muted">No se encontraron órdenes.</p>}
      </div>
    </div>
  );
}

function InventoryView({ inventory, setInventory, searchQuery, addNotification }) {
  const [showModal, setShowModal] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', stock: 0, minStock: 10, price: 0 });

  const filtered = inventory.filter(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleCreateProduct = (e) => {
    e.preventDefault();
    if(!newItem.name) return;
    const newId = `INV-${inventory.length + 1}`;
    setInventory([...inventory, { id: newId, ...newItem }]);
    addNotification(`Producto creado: ${newItem.name} (Stock: ${newItem.stock})`, 'info');
    setShowModal(false);
    setNewItem({ name: '', stock: 0, minStock: 10, price: 0 });
  };

  const updateStock = (id, delta, actionName) => {
    setInventory(inventory.map(i => {
      if (i.id === id) {
        const newStock = Math.max(0, i.stock + delta);
        
        // Notify if it goes below minStock and wasn't before, or just general notification
        if (newStock <= i.minStock && i.stock > i.minStock) {
          addNotification(`¡Alerta! Producto bajo en stock: ${i.name} (Quedan ${newStock})`, 'warning');
        } else {
          addNotification(`Movimiento de inventario (${actionName}): ${i.name}. Nuevo stock: ${newStock}`, 'info');
        }
        
        return { ...i, stock: newStock };
      }
      return i;
    }));
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
                  {item.stock <= item.minStock && <span className="ml-2 text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full uppercase font-bold border border-red-200">Bajo Stock</span>}
                </td>
                <td className="py-3 px-4 text-sm text-right font-mono">${Number(item.price).toFixed(2)}</td>
                <td className="py-3 px-4 text-sm text-center font-bold text-on-surface">{item.stock}</td>
                <td className="py-3 px-4 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <button 
                      onClick={() => updateStock(item.id, 1, 'Compra')} 
                      className="bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 px-2 py-1 rounded-sm text-xs font-bold flex items-center shadow-sm"
                      title="Registrar Compra / Ingreso"
                    >
                      <ArrowUpRight size={14} className="mr-1" /> Compra
                    </button>
                    <button 
                      onClick={() => updateStock(item.id, -1, 'Merma/Salida')} 
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

function StatusBadge({ status }) {
  const styles = {
    mock: 'bg-status-mock-bg text-status-mock-fg',
    planned: 'bg-status-planned-bg text-status-planned-fg border border-status-planned-fg/20',
    development: 'bg-status-development-bg text-status-development-fg border border-status-development-fg/20',
    integrated: 'bg-status-integrated-bg text-status-integrated-fg border border-status-integrated-fg/20',
    production: 'bg-status-production-bg text-status-production-fg border border-status-production-fg/20',
  };
  
  const labels = {
    mock: 'Demo',
    planned: 'Planificado',
    development: 'En Reparación',
    integrated: 'Revisión QA',
    production: 'Listo (Entregable)',
  };

  return (
    <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wide ${styles[status] || styles.mock}`}>
      {labels[status] || labels.mock}
    </span>
  );
}
