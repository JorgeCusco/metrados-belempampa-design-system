// MetradosForm.jsx — left column: specialty → partida → location → math → save
const { useState: useStateF } = React;

const SPECIALTIES = ["Estructuras", "Arquitectura", "IISS", "IIEE", "IIMM", "HVAC"];
const SECTORES = ["Sector 1", "Sector 2", "Sector 3", "Sector 4", "Sector 5"];
const NIVELES = ["Sótano", "Planta Baja", "Nivel 1", "Nivel 2", "Nivel 3", "Azotea"];
const AMBIENTES = ["Aula", "Laboratorio", "SS.HH.", "Pasillo", "Escalera", "Hall Principal"];
const EJES_X = ["Eje A", "Eje B", "Eje C", "Eje D", "Eje E"];
const EJES_Y = ["Eje 1", "Eje 2", "Eje 3", "Eje 4", "Eje 5"];

const SAMPLE_PARTIDAS = [
  { id: "01.01.01", codigo: "01.01.01", descripcion: "CONCRETO EN COLUMNAS F'c=210 kg/cm2", unidad: "m3", modificacion: null, isAcero: false },
  { id: "01.01.02", codigo: "01.01.02", descripcion: "ACERO DE REFUERZO Fy=4200 kg/cm2 EN COLUMNAS", unidad: "kg", modificacion: "DD", isAcero: true },
  { id: "01.01.03", codigo: "01.01.03", descripcion: "ENCOFRADO Y DESENCOFRADO NORMAL EN COLUMNAS", unidad: "m2", modificacion: null, isAcero: false },
  { id: "01.02.01", codigo: "01.02.01", descripcion: "CONCRETO EN VIGAS F'c=210 kg/cm2", unidad: "m3", modificacion: "PN", isAcero: false },
  { id: "01.02.02", codigo: "01.02.02", descripcion: "ACERO DE REFUERZO Fy=4200 kg/cm2 EN VIGAS", unidad: "kg", modificacion: null, isAcero: true },
  { id: "01.03.01", codigo: "01.03.01", descripcion: "CONCRETO EN LOSA ALIGERADA F'c=210 kg/cm2", unidad: "m3", modificacion: "MM", isAcero: false },
  { id: "01.04.05", codigo: "01.04.05", descripcion: "CONCRETO EN PLACAS F'c=280 kg/cm2", unidad: "m3", modificacion: "DD-PN", isAcero: false },
];

const MetradosForm = ({ proyecto, selectedPartida, onSelectPartida, onAdd, onToast }) => {
  const [specialty, setSpecialty] = useStateF("Estructuras");
  const [sector, setSector] = useStateF("");
  const [nivel, setNivel] = useStateF("");
  const [ambiente, setAmbiente] = useStateF("");
  const [ejeX, setEjeX] = useStateF("");
  const [ejeY, setEjeY] = useStateF("");
  const [detalle, setDetalle] = useStateF("");
  const [longitud, setLongitud] = useStateF("");
  const [ancho, setAncho] = useStateF("");
  const [altura, setAltura] = useStateF("");
  const [cantidad, setCantidad] = useStateF("1");

  const partida = selectedPartida;
  const theme = proyecto === "contingencia" ? "amber" : "blue";

  const handleClear = () => {
    onSelectPartida(null);
    setSector(""); setNivel(""); setAmbiente(""); setEjeX(""); setEjeY("");
    setDetalle(""); setLongitud(""); setAncho(""); setAltura(""); setCantidad("1");
  };

  const handleSave = () => {
    if (!partida) { onToast("Selecciona una partida primero", "error"); return; }
    const l = parseFloat(longitud) || 0, a = parseFloat(ancho) || 0, h = parseFloat(altura) || 1, c = parseFloat(cantidad) || 1;
    const total = l * a * h * c;
    onAdd({
      partida,
      detalle: detalle || "—",
      ubicacion: [sector, nivel, ambiente, ejeX, ejeY].filter(Boolean).join(" / ") || "—",
      total: total.toFixed(2),
    });
    onToast("Metrado añadido correctamente", "success");
    handleClear();
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col" style={{ boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05)" }}>
      {/* Header bar */}
      <div className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-200 px-5 py-3.5 flex items-center justify-between">
        <h2 className="text-xs font-black text-slate-800 uppercase tracking-widest">Registro de Metrado</h2>
        <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${theme === "amber" ? "bg-amber-50 text-amber-700" : "bg-blue-50 text-blue-700"}`}>{proyecto === "contingencia" ? "Contingencia" : "Hospital"}</span>
      </div>

      <div className="p-5 flex flex-col gap-4">
        {/* Specialty tabs */}
        <div>
          <label className="text-[10px] text-slate-500 tracking-widest font-bold uppercase pl-1 mb-1.5 block">Especialidad</label>
          <div className="flex gap-1 bg-slate-50 p-1 rounded-xl border border-slate-100">
            {SPECIALTIES.map(s => (
              <button key={s} onClick={() => setSpecialty(s)}
                className={`flex-1 px-2 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${specialty === s ? (theme === "amber" ? "bg-white text-amber-600 shadow border border-amber-100" : "bg-white text-blue-700 shadow border border-blue-100") : "text-slate-400 hover:text-slate-700"}`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Partida search */}
        <div>
          <label className="text-[10px] text-slate-500 tracking-widest font-bold uppercase pl-1 mb-1.5 block">Partida</label>
          <SearchCombobox partidas={SAMPLE_PARTIDAS} value={partida?.descripcion} onSelect={onSelectPartida} onAddPartida={() => onToast("Abre modal de nueva partida", "info")} />
          {partida && (
            <div className="mt-2 flex items-center justify-between bg-blue-50/50 border border-blue-100 rounded-xl px-3 py-2">
              <div className="flex items-center gap-2 min-w-0">
                <ModDot mod={partida.modificacion} />
                <div className="flex flex-col min-w-0">
                  <span className="text-[9px] font-black uppercase tracking-wider text-blue-600">{partida.codigo} · {partida.unidad}</span>
                  <span className="text-[10px] text-slate-500 truncate">{partida.descripcion}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Ubicación grid */}
        <div className="grid grid-cols-2 gap-3">
          <Select label="Sector" options={SECTORES} value={sector} onSelect={setSector} placeholder="—" />
          <Select label="Nivel" options={NIVELES} value={nivel} onSelect={setNivel} placeholder="—" />
          <Select label="Ambiente" options={AMBIENTES} value={ambiente} onSelect={setAmbiente} placeholder="—" className="col-span-2" />
          <Select label="Eje X" options={EJES_X} value={ejeX} onSelect={setEjeX} placeholder="—" />
          <Select label="Eje Y" options={EJES_Y} value={ejeY} onSelect={setEjeY} placeholder="—" />
        </div>

        {/* Detalle */}
        <div>
          <label className="text-[10px] text-slate-500 tracking-widest font-bold uppercase pl-1 mb-1.5 block">Detalle / Elemento</label>
          <input value={detalle} onChange={e => setDetalle(e.target.value)} placeholder={partida?.isAcero ? "Φ 1/2\" — longitudinal" : "C-1, V-101, etc."}
            className="w-full h-[34px] px-3 rounded-xl border border-slate-200 bg-white text-xs text-slate-700 font-bold focus:border-blue-400 focus:ring-4 focus:ring-blue-50 outline-none transition-all" style={{ borderLeftWidth: 3, borderLeftColor: "#0084ff" }} />
        </div>

        {/* Math row */}
        <div>
          <label className="text-[10px] text-slate-500 tracking-widest font-bold uppercase pl-1 mb-1.5 block">Cálculo{partida?.unidad ? ` (${partida.unidad})` : ""}</label>
          <div className="grid grid-cols-4 gap-2">
            {[["L", longitud, setLongitud], ["A", ancho, setAncho], ["H", altura, setAltura], ["#", cantidad, setCantidad]].map(([lbl, v, setter]) => (
              <div key={lbl} className="relative">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[9px] font-black text-slate-400 uppercase">{lbl}</span>
                <input type="number" value={v} onChange={e => setter(e.target.value)} placeholder="0.00"
                  className="w-full h-[34px] pl-7 pr-2 rounded-xl border border-slate-200 bg-white text-xs font-mono font-bold text-slate-700 text-right focus:border-blue-400 focus:ring-4 focus:ring-blue-50 outline-none transition-all" />
              </div>
            ))}
          </div>
        </div>

        {/* Action row */}
        <div className="flex gap-2 pt-2 border-t border-slate-100">
          <button onClick={handleClear} className="flex-1 h-[38px] rounded-xl border border-slate-200 bg-white text-slate-600 text-[11px] font-black uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-slate-50 hover:border-slate-300 transition-all">
            <IconEraser size={14} />Limpiar
          </button>
          <button onClick={handleSave}
            className={`flex-[2] h-[38px] rounded-xl text-white text-[11px] font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all hover:shadow-xl hover:-translate-y-[1px] ${theme === "amber" ? "bg-amber-500 hover:bg-amber-600" : "bg-[#0084ff] hover:bg-blue-600"}`}
            style={theme !== "amber" ? { boxShadow: "0 10px 15px -3px rgba(0,132,255,0.3)" } : undefined}>
            <IconSave size={14} />Guardar metrado
          </button>
        </div>
      </div>
    </div>
  );
};

window.MetradosForm = MetradosForm;
