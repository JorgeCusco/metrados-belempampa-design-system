// Header.jsx — brand lockup + Hospital/Contingencia toggle
const Header = ({ proyecto, onProyectoChange }) => (
  <header className="flex items-center justify-between px-2">
    <div className="flex items-center gap-3">
      <div className="bg-[#0084ff] text-white p-2.5 rounded-xl shadow-lg" style={{ boxShadow: "0 10px 15px -3px rgba(0,132,255,0.3)" }}>
        <IconBuilding2 size={24} />
      </div>
      <div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">Metrados Belempampa</h1>
        <p className="text-sm text-gray-500 font-medium">Plataforma Costos y Presupuestos</p>
      </div>
    </div>

    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200" style={{ boxShadow: "inset 0 2px 4px 0 rgba(0,0,0,0.05)" }}>
      <button onClick={() => onProyectoChange("hospital")}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${proyecto === "hospital" ? "bg-white text-blue-700 shadow-md border border-blue-100" : "text-slate-500 hover:text-slate-700"}`}>
        <IconStethoscope size={16} />Hospital
      </button>
      <button onClick={() => onProyectoChange("contingencia")}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${proyecto === "contingencia" ? "bg-white text-amber-600 shadow-md border border-amber-100" : "text-slate-500 hover:text-slate-700"}`}>
        <IconAlert size={16} />Contingencia
      </button>
    </div>
  </header>
);

window.Header = Header;
