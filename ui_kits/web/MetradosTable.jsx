// MetradosTable.jsx — right column WBS hierarchical planilla
const MetradosTable = ({ proyecto, rows, onDelete, onExport, totalGeneral }) => {
  const theme = proyecto === "contingencia" ? "amber" : "blue";
  const primary = theme === "amber" ? "#f59e0b" : "#0084ff";

  // Build WBS groupings from flat rows
  const groups = rows.reduce((acc, r) => {
    const titleCode = r.partida.codigo.split(".")[0];
    const partidaCode = r.partida.codigo.split(".").slice(0, 2).join(".");
    if (!acc[titleCode]) acc[titleCode] = { label: "01 · ESTRUCTURAS", partidas: {} };
    if (!acc[titleCode].partidas[partidaCode]) {
      acc[titleCode].partidas[partidaCode] = { label: partidaCode + " · GRUPO", items: [] };
    }
    acc[titleCode].partidas[partidaCode].items.push(r);
    return acc;
  }, {});

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col h-full" style={{ boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-200 px-5 py-3 flex items-center justify-between">
        <div>
          <h2 className="text-xs font-black text-slate-800 uppercase tracking-widest">Planilla de Metrados</h2>
          <p className="text-[10px] text-slate-400 font-medium">Estructura WBS jerárquica · {rows.length} registros</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Total General</span>
            <span className="text-sm font-black font-mono text-slate-800">{totalGeneral}</span>
          </div>
          <button onClick={onExport} className="h-[32px] px-3 rounded-xl bg-emerald-500 text-white text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 hover:bg-emerald-600 shadow-lg transition-all" style={{ boxShadow: "0 6px 10px -2px rgba(16,185,129,0.3)" }}>
            <IconDownload size={13} />Exportar
          </button>
        </div>
      </div>

      {/* Column head */}
      <div className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-3 px-4 py-2 bg-slate-50 border-b border-slate-200 text-[9px] font-black text-slate-400 uppercase tracking-widest">
        <span className="w-4" />
        <span>Descripción</span>
        <span className="w-20 text-right">Ubicación</span>
        <span className="w-14 text-right">Unid.</span>
        <span className="w-20 text-right">Total</span>
        <span className="w-6" />
      </div>

      {/* Body */}
      <div className="flex-1 overflow-auto">
        {rows.length === 0 ? (
          <div className="h-full flex items-center justify-center p-10">
            <div className="text-center max-w-sm">
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300">
                <IconSearch size={26} />
              </div>
              <div className="text-sm font-black text-slate-700">Sin registros aún</div>
              <div className="text-xs text-slate-400 mt-1">Registra tu primer metrado usando el formulario de la izquierda.</div>
            </div>
          </div>
        ) : (
          Object.entries(groups).map(([code, group]) => (
            <div key={code}>
              {/* TITLE ROW */}
              <div className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-3 items-center px-4 py-2.5 border-b-2" style={{ background: `linear-gradient(to right, ${primary}11, transparent)`, borderColor: primary + "33" }}>
                <span className="w-1 h-5 rounded-full" style={{ background: primary }} />
                <span className="text-xs font-black tracking-widest uppercase" style={{ color: primary }}>{group.label}</span>
                <span className="w-20" /><span className="w-14" /><span className="w-20" /><span className="w-6" />
              </div>

              {Object.entries(group.partidas).map(([pcode, partidaGroup]) => {
                const headPartida = partidaGroup.items[0].partida;
                return (
                  <div key={pcode}>
                    {/* PARTIDA header */}
                    <div className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-3 items-center px-4 py-2 bg-slate-50/70 border-b border-slate-100">
                      <ModDot mod={headPartida.modificacion} />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-black text-slate-500 bg-white border border-slate-200 px-1.5 py-0.5 rounded">{pcode}</span>
                          <span className="text-[11px] font-black text-slate-700 truncate uppercase tracking-wide">{headPartida.descripcion}</span>
                        </div>
                      </div>
                      <span className="w-20" />
                      <span className="w-14 text-right text-[10px] font-bold text-slate-400 uppercase">{headPartida.unidad}</span>
                      <span className="w-20 text-right font-mono text-xs font-black text-slate-700">{partidaGroup.items.reduce((s, i) => s + parseFloat(i.total), 0).toFixed(2)}</span>
                      <span className="w-6" />
                    </div>

                    {/* VIRTUAL ELEMENT grouper (if acero) */}
                    {headPartida.isAcero && (
                      <div className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-3 items-center px-4 py-1.5 border-b border-slate-50">
                        <span className="w-4 pl-2 text-slate-300">↳</span>
                        <div className="flex items-center gap-2">
                          <span className="px-1.5 py-0.5 rounded-md text-[9px] font-black bg-blue-50 text-blue-700 border border-blue-100">Φ 1/2"</span>
                          <span className="text-[10px] text-slate-500 italic">Varillas de acero corrugado</span>
                        </div>
                        <span className="w-20" /><span className="w-14" /><span className="w-20" /><span className="w-6" />
                      </div>
                    )}

                    {/* ATOMIC rows */}
                    {partidaGroup.items.map((r, i) => (
                      <div key={i} className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-3 items-center px-4 py-2 border-b border-slate-50 hover:bg-blue-50/30 group">
                        <span className="w-4 pl-4 text-slate-300 text-[11px]">·</span>
                        <span className="text-[11px] text-slate-600 truncate">{r.detalle}</span>
                        <span className="w-20 text-right text-[10px] text-slate-400 truncate">{r.ubicacion}</span>
                        <span className="w-14 text-right text-[10px] font-bold text-slate-400 uppercase">{headPartida.unidad}</span>
                        <span className="w-20 text-right font-mono text-xs font-black text-slate-700">{r.total}</span>
                        <button onClick={() => onDelete(i)} className="w-6 h-6 rounded-md opacity-0 group-hover:opacity-100 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"><IconTrash size={12} /></button>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

window.MetradosTable = MetradosTable;
