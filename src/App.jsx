import React, { useState } from 'react';
import { Settings, Home, Wrench, Calendar, CarFront, FileText, Bell, Search, Menu } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarExpanded, setSidebarExpanded] = useState(true);

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
          <NavItem icon={<Calendar />} label="Órdenes de Trabajo" active={activeTab === 'ordenes'} onClick={() => setActiveTab('ordenes')} expanded={isSidebarExpanded} />
          <NavItem icon={<Wrench />} label="Inventario" active={activeTab === 'inventario'} onClick={() => setActiveTab('inventario')} expanded={isSidebarExpanded} />
          <NavItem icon={<FileText />} label="Reportes" active={activeTab === 'reportes'} onClick={() => setActiveTab('reportes')} expanded={isSidebarExpanded} />
        </nav>

        <div className="p-4 border-t border-white/10">
          <NavItem icon={<Settings />} label="Configuración" expanded={isSidebarExpanded} />
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Shell Header */}
        <header className="h-[64px] bg-shell/70 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-6 z-10">
          <div className="flex items-center bg-white/10 rounded-sm px-3 py-1.5 w-64 border border-white/5">
            <Search size={16} className="text-white/50 mr-2" />
            <input 
              type="text" 
              placeholder="Buscar vehículo, placa..." 
              className="bg-transparent text-body-md text-on-shell outline-none w-full placeholder-white/50"
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
            {activeTab === 'dashboard' && <DashboardView />}
            {activeTab === 'vehiculos' && <VehiclesView />}
            {(activeTab !== 'dashboard' && activeTab !== 'vehiculos') && (
              <div className="flex flex-col items-center justify-center h-64 text-on-surface-muted">
                <Wrench size={48} className="mb-4 opacity-20" />
                <h2 className="text-xl font-bold">Módulo en Desarrollo</h2>
                <p>Esta sección está siendo construida.</p>
              </div>
            )}
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

function DashboardView() {
  return (
    <div className="space-y-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-on-workspace mb-1 tracking-tight">Centro de Comando</h1>
        <p className="text-on-surface-muted text-sm">Resumen operativo del taller en tiempo real.</p>
      </header>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard title="Vehículos Ingresados" value="14" trend="+2" />
        <MetricCard title="En Reparación" value="6" />
        <MetricCard title="Listos para Entrega" value="3" highlight />
        <MetricCard title="Nuevas Citas" value="5" trend="-1" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Area */}
        <div className="lg:col-span-2 bg-surface rounded-lg p-6 border border-outline shadow-subtle">
          <h3 className="font-bold mb-4 text-on-surface">Rendimiento Semanal</h3>
          <div className="h-48 flex items-end justify-between space-x-2 pt-4">
            {[40, 70, 45, 90, 60, 30, 80].map((h, i) => (
              <div key={i} className="w-full bg-primary/60 hover:bg-primary transition-colors rounded-t-xs" style={{ height: `${h}%` }}></div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-on-surface-muted uppercase tracking-wider font-semibold">
            <span>Lun</span><span>Mar</span><span>Mie</span><span>Jue</span><span>Vie</span><span>Sab</span><span>Dom</span>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-surface rounded-lg p-6 border border-outline shadow-subtle">
          <h3 className="font-bold mb-4 text-on-surface">Actividad Reciente</h3>
          <div className="space-y-4">
            <ActivityItem text="Toyota Hilux - Cambio de aceite completado." time="10 min" />
            <ActivityItem text="Ingreso: Nissan Sentra (Frenos)." time="1 hr" />
            <ActivityItem text="Alerta: Repuesto 'Bujías NGK' con stock bajo." time="2 hrs" isAlert />
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, trend, highlight }) {
  return (
    <div className={`bg-surface rounded-lg p-5 border shadow-subtle flex flex-col ${highlight ? 'border-primary/50 bg-primary/5' : 'border-outline'}`}>
      <span className="text-xs uppercase tracking-wider font-semibold text-on-surface-muted mb-2">{title}</span>
      <div className="flex items-baseline justify-between">
        <span className="text-3xl font-bold text-on-surface">{value}</span>
        {trend && (
          <span className={`text-xs font-bold ${trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
            {trend}
          </span>
        )}
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

function VehiclesView() {
  const vehicles = [
    { id: 'ORD-001', plate: 'ABC-123', model: 'Toyota Hilux 2021', owner: 'Carlos Mendoza', status: 'production' },
    { id: 'ORD-002', plate: 'XYZ-987', model: 'Nissan Sentra 2018', owner: 'María López', status: 'development' },
    { id: 'ORD-003', plate: 'JKL-456', model: 'Honda Civic 2022', owner: 'Roberto Gómez', status: 'planned' },
    { id: 'ORD-004', plate: 'QWE-741', model: 'Ford Ranger 2019', owner: 'Ana Silva', status: 'integrated' },
    { id: 'ORD-005', plate: 'DEMO-00', model: 'Vehículo de Prueba', owner: 'Sistema', status: 'mock' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end mb-6">
        <header>
          <h1 className="text-3xl font-bold text-on-workspace mb-1 tracking-tight">Vehículos Activos</h1>
          <p className="text-on-surface-muted text-sm">Gestión de unidades y órdenes de trabajo.</p>
        </header>
        <button className="bg-primary hover:bg-primary-strong text-white px-4 py-2 rounded-sm text-sm font-medium transition-colors shadow-subtle flex items-center">
          <CarFront size={16} className="mr-2" />
          Registrar Ingreso
        </button>
      </div>

      <div className="bg-surface rounded-lg border border-outline shadow-subtle overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-primary/5 border-b border-outline">
              <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-primary-strong">Orden</th>
              <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-primary-strong">Placa</th>
              <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-primary-strong">Vehículo</th>
              <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-primary-strong">Cliente</th>
              <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-primary-strong text-right">Estado Operativo</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((v, i) => (
              <tr key={i} className="border-b border-outline/50 hover:bg-white/50 transition-colors">
                <td className="py-3 px-4 text-sm font-medium text-on-surface">{v.id}</td>
                <td className="py-3 px-4 text-sm font-mono text-on-surface-muted">{v.plate}</td>
                <td className="py-3 px-4 text-sm text-on-surface">{v.model}</td>
                <td className="py-3 px-4 text-sm text-on-surface-muted">{v.owner}</td>
                <td className="py-3 px-4 text-right">
                  <StatusBadge status={v.status} />
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
    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold tracking-wide ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}
