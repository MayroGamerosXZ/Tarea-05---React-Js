import React, { useState } from 'react';
import { Settings, Home, Wrench, Calendar, CarFront, FileText, Bell, Search, Menu, Plus, X } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarExpanded, setSidebarExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Global State (Mock Database)
  const [vehicles, setVehicles] = useState([
    { id: 'ORD-001', plate: 'ABC-123', model: 'Toyota Hilux 2021', owner: 'Carlos Mendoza', status: 'production' },
    { id: 'ORD-002', plate: 'XYZ-987', model: 'Nissan Sentra 2018', owner: 'María López', status: 'development' },
    { id: 'ORD-003', plate: 'JKL-456', model: 'Honda Civic 2022', owner: 'Roberto Gómez', status: 'planned' },
  ]);

  const [inventory, setInventory] = useState([
    { id: 'INV-1', name: 'Aceite Sintético 5W-30', stock: 24, minStock: 10, price: 45.00 },
    { id: 'INV-2', name: 'Bujías NGK Iridium', stock: 5, minStock: 20, price: 12.50 },
    { id: 'INV-3', name: 'Filtro de Aire', stock: 15, minStock: 10, price: 18.00 },
  ]);

  return (
    <div className="min-h-screen bg-workspace text-on-workspace flex overflow-hidden font-sans">
      
      {/* Shell Sidebar */}
      <aside 
        className={`bg-shell/70 backdrop-blur-md border-r border-white/10 flex flex-col transition-all duration-300 ${
          isSidebarExpanded ? 'w-[256px]' : 'w-[64px]'
        }`}
      >
        <div className="h-[64px] flex items-center justify-between px-4 border-b border-white/10">
          {isSidebarExpanded && <span className="text-on-shell font-bold text-lg">Evreghen</span>}
          <button onClick={() => setSidebarExpanded(!isSidebarExpanded)} className="text-white/70 hover:text-white">
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
        <header className="h-[64px] bg-shell/70 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-6 z-10">
          <div className="flex items-center bg-white/10 rounded-sm px-3 py-1.5 w-64 border border-white/5 focus-within:border-primary transition-colors">
            <Search size={16} className="text-white/50 mr-2" />
            <input 
              type="text" 
              placeholder="Buscar..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm text-on-shell outline-none w-full placeholder-white/50"
            />
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-white/70 hover:text-white relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-primary-strong flex items-center justify-center text-white text-sm font-bold shadow-subtle">
              AD
            </div>
          </div>
        </header>

        {/* Workspace Document */}
        <main className="flex-1 overflow-auto p-8 relative">
          <div className="max-w-[1400px] mx-auto">
            {activeTab === 'dashboard' && <DashboardView vehicles={vehicles} />}
            {activeTab === 'vehiculos' && <VehiclesView vehicles={vehicles} setVehicles={setVehicles} searchQuery={searchQuery} />}
            {activeTab === 'ordenes' && <OrdersView vehicles={vehicles} setVehicles={setVehicles} searchQuery={searchQuery} />}
            {activeTab === 'inventario' && <InventoryView inventory={inventory} setInventory={setInventory} searchQuery={searchQuery} />}
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
        <h1 className="text-3xl font-bold text-on-workspace mb-1 tracking-tight">Centro de Comando</h1>
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
            {[40, 70, 45, vehicles.length * 15, 60, 30, 80].map((h, i) => (
              <div key={i} className="w-full bg-primary/60 hover:bg-primary transition-colors rounded-t-xs" style={{ height: `${Math.min(h, 100)}%` }}></div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-on-surface-muted uppercase tracking-wider font-semibold">
            <span>Lun</span><span>Mar</span><span>Mie</span><span>Jue</span><span>Vie</span><span>Sab</span><span>Dom</span>
          </div>
        </div>

        <div className="bg-surface rounded-lg p-6 border border-outline shadow-subtle">
          <h3 className="font-bold mb-4 text-on-surface">Actividad Reciente</h3>
          <div className="space-y-4">
            <ActivityItem text={`Último registro: ${vehicles[vehicles.length - 1]?.model || 'N/A'}`} time="Reciente" />
            <ActivityItem text="Alerta: Inventario de Bujías bajo." time="Hace 1 hr" isAlert />
            <ActivityItem text="Sistema iniciado correctamente." time="Hace 2 hrs" />
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

function VehiclesView({ vehicles, setVehicles, searchQuery }) {
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

function OrdersView({ vehicles, setVehicles, searchQuery }) {
  const filteredVehicles = vehicles.filter(v => v.id.toLowerCase().includes(searchQuery.toLowerCase()) || v.model.toLowerCase().includes(searchQuery.toLowerCase()));

  const changeStatus = (id, newStatus) => {
    setVehicles(vehicles.map(v => v.id === id ? { ...v, status: newStatus } : v));
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
                <button onClick={() => changeStatus(v.id, 'planned')} className={`text-xs px-2 py-1 rounded-sm border ${v.status === 'planned' ? 'bg-status-planned-bg border-status-planned-fg text-status-planned-fg' : 'border-outline hover:bg-white/50'}`}>Planificado</button>
                <button onClick={() => changeStatus(v.id, 'development')} className={`text-xs px-2 py-1 rounded-sm border ${v.status === 'development' ? 'bg-status-development-bg border-status-development-fg text-status-development-fg' : 'border-outline hover:bg-white/50'}`}>En Reparación</button>
                <button onClick={() => changeStatus(v.id, 'production')} className={`text-xs px-2 py-1 rounded-sm border ${v.status === 'production' ? 'bg-status-production-bg border-status-production-fg text-status-production-fg' : 'border-outline hover:bg-white/50'}`}>Listo</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InventoryView({ inventory, setInventory, searchQuery }) {
  const filtered = inventory.filter(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const updateStock = (id, delta) => {
    setInventory(inventory.map(i => {
      if (i.id === id) {
        const newStock = Math.max(0, i.stock + delta);
        return { ...i, stock: newStock };
      }
      return i;
    }));
  };

  return (
    <div className="space-y-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-on-workspace mb-1 tracking-tight">Inventario de Repuestos</h1>
        <p className="text-on-surface-muted text-sm">Control de stock y suministros.</p>
      </header>

      <div className="bg-surface rounded-lg border border-outline shadow-subtle overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-primary/5 border-b border-outline">
              <th className="py-3 px-4 text-xs font-semibold uppercase text-primary-strong">SKU</th>
              <th className="py-3 px-4 text-xs font-semibold uppercase text-primary-strong">Artículo</th>
              <th className="py-3 px-4 text-xs font-semibold uppercase text-primary-strong text-right">Precio</th>
              <th className="py-3 px-4 text-xs font-semibold uppercase text-primary-strong text-center">Stock Actual</th>
              <th className="py-3 px-4 text-xs font-semibold uppercase text-primary-strong text-center">Ajustar</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, i) => (
              <tr key={i} className="border-b border-outline/50 hover:bg-white/50 transition-colors">
                <td className="py-3 px-4 text-sm font-mono text-on-surface-muted">{item.id}</td>
                <td className="py-3 px-4 text-sm font-medium text-on-surface">
                  {item.name}
                  {item.stock <= item.minStock && <span className="ml-2 text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full uppercase font-bold">Bajo Stock</span>}
                </td>
                <td className="py-3 px-4 text-sm text-right">${item.price.toFixed(2)}</td>
                <td className="py-3 px-4 text-sm text-center font-bold text-on-surface">{item.stock}</td>
                <td className="py-3 px-4 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <button onClick={() => updateStock(item.id, -1)} className="bg-white border border-outline text-on-surface w-6 h-6 rounded-sm hover:bg-gray-100 flex items-center justify-center">-</button>
                    <button onClick={() => updateStock(item.id, 1)} className="bg-white border border-outline text-on-surface w-6 h-6 rounded-sm hover:bg-gray-100 flex items-center justify-center">+</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    mock: 'bg-status-mock-bg text-status-mock-fg',
    planned: 'bg-status-planned-bg text-status-planned-fg',
    development: 'bg-status-development-bg text-status-development-fg',
    integrated: 'bg-status-integrated-bg text-status-integrated-fg',
    production: 'bg-status-production-bg text-status-production-fg',
  };
  
  const labels = {
    mock: 'Demo',
    planned: 'Planificado',
    development: 'En Reparación',
    integrated: 'Revisión QA',
    production: 'Listo (Entregable)',
  };

  return (
    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold tracking-wide ${styles[status] || styles.mock}`}>
      {labels[status] || labels.mock}
    </span>
  );
}
