// Primitives.jsx — shared building blocks: icons, ModDot, Select, SearchCombobox
const { useState, useRef, useEffect, useMemo } = React;

// ── Inline Lucide icons (stroke-width 2, round caps/joins) ──
const Ic = ({ d, size = 16, children, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...rest}>
    {children}
  </svg>
);
const IconBuilding2 = p => <Ic {...p}><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18"/><path d="M18 10h2a2 2 0 0 1 2 2v10"/><path d="M2 14h2a2 2 0 0 1 2 2v6"/><path d="M6 22h12"/><path d="M10 6h4M10 10h4M10 14h4M10 18h4"/></Ic>;
const IconStethoscope = p => <Ic {...p}><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></Ic>;
const IconAlert = p => <Ic {...p}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></Ic>;
const IconSearch = p => <Ic {...p}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></Ic>;
const IconChevron = p => <Ic {...p}><polyline points="6 9 12 15 18 9"/></Ic>;
const IconSave = p => <Ic {...p}><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></Ic>;
const IconEraser = p => <Ic {...p}><path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"/><path d="M22 21H7"/><path d="m5 11 9 9"/></Ic>;
const IconDownload = p => <Ic {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></Ic>;
const IconTrash = p => <Ic {...p}><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></Ic>;

// ── Modification dot (DD/PN/MM/PC/default) ──
const ModDot = ({ mod, title }) => {
  if (!mod) {
    return <span className="inline-block w-[10px] h-[10px] rounded-full bg-sky-200 border border-sky-300 shrink-0" title={title || "Sin modificación"} />;
  }
  const map = {
    DD: "bg-red-500 border-red-600",
    PN: "bg-green-500 border-green-600",
    MM: "bg-blue-500 border-blue-600",
    PC: "",
  };
  const style = mod === "PC" ? { background: "#FF69B4", borderColor: "#FF1493" } : undefined;
  return (
    <span className={`inline-flex gap-1 shrink-0`}>
      {mod.split("-").map((tag, i) => (
        <span key={i} className={`w-[10px] h-[10px] rounded-full border shadow-sm ${map[tag] || "bg-slate-200 border-slate-300"}`} style={tag === "PC" ? style : undefined} title={tag} />
      ))}
    </span>
  );
};

// ── Select (custom dropdown with chevron) ──
const Select = ({ value, options, onSelect, placeholder = "Seleccionar...", label, className = "", dense = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = e => { if (ref.current && !ref.current.contains(e.target)) setIsOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  return (
    <div ref={ref} className={`relative w-full ${className}`}>
      {label && <label className={`${dense ? "text-[9px] text-slate-400 tracking-tighter" : "text-[10px] text-slate-500 tracking-widest"} font-bold block mb-1 uppercase pl-1`}>{label}</label>}
      <button type="button" onClick={() => setIsOpen(o => !o)}
        className={`w-full px-3 py-2 border rounded-xl text-xs text-left flex justify-between items-center transition-all outline-none bg-white ${isOpen ? "border-blue-400 ring-4 ring-blue-50 shadow-sm" : "border-slate-200 hover:border-blue-300 hover:shadow-md"}`}>
        <span className={value ? "text-slate-800 font-bold" : "text-slate-400 font-medium"}>{value || placeholder}</span>
        <IconChevron size={14} className={`text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-blue-500" : ""}`} />
      </button>
      {isOpen && (
        <div className="absolute z-[100] w-full mt-2 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl shadow-2xl max-h-60 overflow-y-auto">
          <ul className="py-1.5 p-1">
            {options.map(o => (
              <li key={o} onClick={() => { onSelect(o); setIsOpen(false); }}
                className={`px-4 py-2.5 text-xs cursor-pointer rounded-lg flex items-center justify-between ${value === o ? "bg-blue-600 text-white font-black shadow-lg shadow-blue-200" : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"}`}>
                {o}{value === o && <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// ── SearchCombobox ──
const SearchCombobox = ({ partidas, value, onSelect, onAddPartida }) => {
  const [query, setQuery] = useState(value || "");
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => setQuery(value || ""), [value]);
  useEffect(() => {
    const h = e => { if (ref.current && !ref.current.contains(e.target)) setIsOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  const filtered = useMemo(() => {
    if (!query.trim()) return partidas;
    const tokens = query.toLowerCase().split(" ").filter(Boolean);
    return partidas.filter(p => tokens.every(t => p.descripcion.toLowerCase().includes(t) || p.codigo.toLowerCase().includes(t)));
  }, [query, partidas]);

  return (
    <div ref={ref} className="relative w-full group">
      <div className="relative">
        <IconSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input type="text" value={query}
          onChange={e => { setQuery(e.target.value); setIsOpen(true); }}
          onFocus={e => { e.target.select(); setIsOpen(true); }}
          onClick={() => setIsOpen(true)}
          placeholder="Buscar por código o descripción..."
          className="w-full pl-10 pr-10 h-[34px] rounded-xl border border-slate-200 bg-white shadow-sm focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all text-xs outline-none font-bold text-slate-700" />
        <IconChevron size={16} className={`absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none transition-transform duration-300 ${isOpen ? "rotate-180 text-blue-500" : ""}`} />
      </div>
      {isOpen && (
        <div className="absolute z-[110] w-full mt-2 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl shadow-2xl max-h-64 overflow-auto">
          {filtered.length === 0 ? (
            <div className="p-4 flex flex-col items-center gap-3">
              <div className="text-xs text-slate-400 italic font-medium">Ninguna partida encontrada.</div>
              {onAddPartida && (
                <button onClick={onAddPartida} className="w-full py-2.5 bg-blue-50 text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-wider hover:bg-blue-600 hover:text-white transition-all border border-blue-100 border-dashed">+ Crear nueva partida</button>
              )}
            </div>
          ) : (
            <ul className="py-1.5 p-1">
              {filtered.map(p => (
                <li key={p.id} onClick={() => { onSelect(p); setQuery(p.descripcion); setIsOpen(false); }}
                  className="px-4 py-3 hover:bg-blue-600 hover:text-white cursor-pointer flex gap-3 items-start rounded-xl transition-all group/item border-b border-slate-50 last:border-0">
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-bold leading-tight block">{p.descripcion}</span>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0 ml-2">
                    <span className="text-[10px] font-mono font-black text-slate-400 bg-slate-100 group-hover/item:bg-blue-500 group-hover/item:text-white border border-slate-100 px-2 py-0.5 rounded-md">{p.codigo}</span>
                    <ModDot mod={p.modificacion} />
                  </div>
                </li>
              ))}
              {onAddPartida && (
                <li className="p-1 mt-1 border-t border-slate-100">
                  <button onClick={e => { e.stopPropagation(); onAddPartida(); setIsOpen(false); }}
                    className="w-full py-2 bg-slate-50 text-slate-500 rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-blue-50 hover:text-blue-600 transition-all border border-slate-200 border-dashed">+ Agregar partida personalizada</button>
                </li>
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

Object.assign(window, {
  Ic, IconBuilding2, IconStethoscope, IconAlert, IconSearch, IconChevron,
  IconSave, IconEraser, IconDownload, IconTrash,
  ModDot, Select, SearchCombobox,
});
