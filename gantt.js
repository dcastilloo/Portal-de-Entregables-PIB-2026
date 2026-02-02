/* =========
   Helpers fecha (UTC para evitar desfases)
========= */
function parseDMY(dmy) {
  // "12/01/2026" -> Date UTC
  const [dd, mm, yy] = dmy.split('/').map(s => parseInt(s, 10));
  return new Date(Date.UTC(yy, mm - 1, dd));
}
function parseISO(iso) {
  // "2026-01-12"
  const [y,m,d] = iso.split('-').map(n => parseInt(n,10));
  return new Date(Date.UTC(y, m-1, d));
}
function fmtISO(date){
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth()+1).padStart(2,'0');
  const d = String(date.getUTCDate()).padStart(2,'0');
  return `${y}-${m}-${d}`;
}
function addDays(d, n){
  const x = new Date(d.getTime());
  x.setUTCDate(x.getUTCDate() + n);
  return x;
}
function diffDays(a, b){
  // b - a in days
  const ms = (b.getTime() - a.getTime());
  return Math.round(ms / (1000*60*60*24));
}
function startOfWeekMonday(d){
  const x = new Date(d.getTime());
  const dow = (x.getUTCDay() + 6) % 7; // Mon=0
  return addDays(x, -dow);
}
function startOfMonth(d){
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1));
}
function daysInMonth(d){
  const y = d.getUTCFullYear(), m = d.getUTCMonth();
  return new Date(Date.UTC(y, m+1, 0)).getUTCDate();
}
function monthNameEs(m){ // 0-11
  const names = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
  return names[m];
}

/* =========
   DATA (ejemplo)
   - level 0 = padre (P)
   - level 1 = hijo (H)
   - parentId vincula hijo con padre
========= */
const TASKS = [
  // PIB
  { uid:"PIB-0", group:"PIB", id:"0",   parentId:null, activity:"PLAN DE IMPLEMENTACIÓN BIM 2026", tipo:"P", cont:"", inicio:"12/01/2026", fin:"18/12/2026", dur:340 },

  // EST 1
  { uid:"EST-1",   group:"EST", id:"1",   parentId:"PIB-0", activity:"Actualizar estándar CDE", tipo:"P", cont:"", inicio:"12/01/2026", fin:"27/02/2026", dur:46 },
  { uid:"EST-1.1", group:"EST", id:"1.1", parentId:"EST-1", activity:"Desarrollo", tipo:"H", cont:"", inicio:"12/01/2026", fin:"13/02/2026", dur:32 },
  { uid:"EST-1.2", group:"EST", id:"1.2", parentId:"EST-1", activity:"Publicación SIG", tipo:"H", cont:"", inicio:"16/02/2026", fin:"27/02/2026", dur:11 },

  // EST 2
  { uid:"EST-2",   group:"EST", id:"2",   parentId:"PIB-0", activity:"Actualizar estándar modelado", tipo:"P", cont:"", inicio:"12/01/2026", fin:"27/02/2026", dur:46 },
  { uid:"EST-2.1", group:"EST", id:"2.1", parentId:"EST-2", activity:"Desarrollo", tipo:"H", cont:"", inicio:"12/01/2026", fin:"13/02/2026", dur:32 },
  { uid:"EST-2.2", group:"EST", id:"2.2", parentId:"EST-2", activity:"Publicación SIG", tipo:"H", cont:"", inicio:"16/02/2026", fin:"27/02/2026", dur:11 },

  // EST 3
  { uid:"EST-3",   group:"EST", id:"3",   parentId:"PIB-0", activity:"Actualizar formatos gestión de la información", tipo:"P", cont:"", inicio:"12/01/2026", fin:"27/02/2026", dur:46 },
  { uid:"EST-2.1", group:"EST", id:"3.1", parentId:"EST-3, activity:"Desarrollo", tipo:"H", cont:"", inicio:"12/01/2026", fin:"13/02/2026", dur:32 },
  { uid:"EST-2.2", group:"EST", id:"3.2", parentId:"EST-3", activity:"Publicación SIG", tipo:"H", cont:"", inicio:"16/02/2026", fin:"27/02/2026", dur:11 },
   
  // PER 1
  { uid:"PER-1",   group:"PER", id:"1",   parentId:"PIB-0", activity:"Plan de comunicación y sensibilización de avances BIM", tipo:"P", cont:"", inicio:"02/02/2026", fin:"06/03/2026", dur:32 },
  { uid:"PER-1.1", group:"PER", id:"1.1", parentId:"PER-1", activity:"Definición de alcance", tipo:"H", cont:"", inicio:"09/02/2026", fin:"13/02/2026", dur:4 },
  { uid:"PER-1.2", group:"PER", id:"1.2", parentId:"PER-1", activity:"Desarrollo", tipo:"H", cont:"", inicio:"16/02/2026", fin:"06/03/2026", dur:18 },
  { uid:"PER-1.3", group:"PER", id:"1.3", parentId:"PER-1", activity:"Difusión", tipo:"H", cont:"", inicio:"09/02/2026", fin:"20/03/2026", dur:11 },

  // PRO 1
  { uid:"PRO-1",   group:"PER", id:"1",   parentId:"PIB-0", activity:"Actualizar Procedimiento de Ejecución", tipo:"P", cont:"", inicio:"09/02/2026", fin:"30/03/2026", dur:39 },
  { uid:"PER-1.1", group:"PER", id:"1.1", parentId:"PER-1", activity:"Definición de alcance", tipo:"H", cont:"", inicio:"02/02/2026", fin:"06/02/2026", dur:4 },
  { uid:"PER-1.2", group:"PER", id:"1.2", parentId:"PER-1", activity:"Desarrollo", tipo:"H", cont:"", inicio:"09/02/2026", fin:"20/02/2026", dur:11 },
  { uid:"PER-1.3", group:"PER", id:"1.3", parentId:"PER-1", activity:"Difusión", tipo:"H", cont:"", inicio:"23/02/2026", fin:"06/03/2026", dur:11 },

  // TEC 4 (ejemplo “Mayor”)
  { uid:"TEC-4",   group:"TEC", id:"4",   parentId:"PIB-0", activity:"Automatizar el modelado 3D de redes", tipo:"P", cont:"Mayor", inicio:"16/02/2026", fin:"27/11/2026", dur:284 },
  { uid:"TEC-4.1", group:"TEC", id:"4.1", parentId:"TEC-4", activity:"Definición de alcance", tipo:"H", cont:"Mayor", inicio:"16/02/2026", fin:"06/03/2026", dur:18 },
  { uid:"TEC-4.2", group:"TEC", id:"4.2", parentId:"TEC-4", activity:"Elaboración TDR", tipo:"H", cont:"Mayor", inicio:"09/03/2026", fin:"31/03/2026", dur:22 },
  { uid:"TEC-4.3", group:"TEC", id:"4.3", parentId:"TEC-4", activity:"Proceso de contratación", tipo:"H", cont:"Mayor", inicio:"06/04/2026", fin:"04/09/2026", dur:151 },
  { uid:"TEC-4.4", group:"TEC", id:"4.4", parentId:"TEC-4", activity:"Recopilación de información", tipo:"H", cont:"Mayor", inicio:"06/04/2026", fin:"04/09/2026", dur:151 },
  { uid:"TEC-4.5", group:"TEC", id:"4.5", parentId:"TEC-4", activity:"Ejecución contractual", tipo:"H", cont:"Mayor", inicio:"07/09/2026", fin:"27/11/2026", dur:81 },
];

/* =========
   Estado + DOM
========= */
const app = document.getElementById('app');

const paneLeft = document.getElementById('paneLeft');
const paneRight = document.getElementById('paneRight');

const taskHeader = document.getElementById('taskHeader');
const taskRows = document.getElementById('taskRows');

const timeHeader = document.getElementById('timeHeader');
const timeBody = document.getElementById('timeBody');
const timeRows = document.getElementById('timeRows');
const todayLine = document.getElementById('todayLine');

const viewMode = document.getElementById('viewMode');
const windowStart = document.getElementById('windowStart');
const windowSpan = document.getElementById('windowSpan');
const filterTipo = document.getElementById('filterTipo');
const filterCont = document.getElementById('filterCont');

const btnToday = document.getElementById('btnToday');
const btnExpandAll = document.getElementById('btnExpandAll');
const btnCollapseAll = document.getElementById('btnCollapseAll');

const colCheckboxes = document.querySelectorAll('input[type="checkbox"][data-col]');

const state = {
  view: 'week',
  start: startOfWeekMonday(parseISO('2026-01-12')),
  span: 26, // semanas o meses según vista
  collapsed: new Set(), // parent uid
  filters: { tipo:'', cont:'' },
};

/* =========
   Derivados
========= */
function toDate(dstr){
  // admite "dd/mm/yyyy"
  return parseDMY(dstr);
}
function getLevel(t){
  return t.parentId ? 1 : 0;
}
function isParent(t){
  return !t.parentId && TASKS.some(x => x.parentId === t.uid);
}
function childrenOf(parentUid){
  return TASKS.filter(x => x.parentId === parentUid);
}

/* =========
   UI: opciones de rango según vista
========= */
function setSpanOptions(){
  windowSpan.innerHTML = '';
  const opts = state.view === 'week'
    ? [{v:13, t:'13 semanas'}, {v:26, t:'26 semanas'}, {v:52, t:'52 semanas'}]
    : [{v:6, t:'6 meses'}, {v:12, t:'12 meses'}, {v:18, t:'18 meses'}];

  opts.forEach(o=>{
    const op = document.createElement('option');
    op.value = String(o.v);
    op.textContent = o.t;
    windowSpan.appendChild(op);
  });

  windowSpan.value = String(state.span);
}

/* =========
   Build header columns (tabla tareas)
========= */
function renderTaskHeader(){
  taskHeader.innerHTML = `
    <div class="task-col h c-id">ID</div>
    <div class="task-col h c-act">Actividad</div>
    <div class="task-col h c-tipo">Tipo</div>
    <div class="task-col h c-cont">Cont.</div>
    <div class="task-col h c-inicio">Inicio</div>
    <div class="task-col h c-fin">Fin</div>
    <div class="task-col h c-dur">Duración</div>
  `;
}

/* =========
   Timeline scale
========= */
function getWindowEnd(){
  if(state.view === 'week'){
    return addDays(state.start, state.span * 7);
  } else {
    // meses: sumar meses desde start-of-month
    let d = startOfMonth(state.start);
    for(let i=0;i<state.span;i++){
      d = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth()+1, 1));
    }
    return d;
  }
}

// px per day base (ajustable)
function getPxPerDay(){
  return state.view === 'week' ? 16 : 6;
}

function buildTimeHeader(){
  timeHeader.innerHTML = '';
  const pxDay = getPxPerDay();
  const start = state.view === 'week' ? startOfWeekMonday(state.start) : startOfMonth(state.start);
  const end = getWindowEnd();

  // Exponemos variable CSS para grid de días (líneas finas)
  timeRows.style.setProperty('--dayW', `${pxDay}px`);

  if(state.view === 'week'){
    // cada semana un bloque 7 días
    let d = new Date(start.getTime());
    while(d < end){
      const th = document.createElement('div');
      th.className = 'th';
      th.style.width = `${pxDay*7}px`;
      const y = d.getUTCFullYear();
      const m = String(d.getUTCMonth()+1).padStart(2,'0');
      const da = String(d.getUTCDate()).padStart(2,'0');
      th.textContent = `${y}-${m}-${da}`;
      timeHeader.appendChild(th);
      d = addDays(d, 7);
    }
  } else {
    // bloques por mes
    let d = startOfMonth(start);
    while(d < end){
      const dim = daysInMonth(d);
      const th = document.createElement('div');
      th.className = 'th';
      th.style.width = `${pxDay*dim}px`;
      th.textContent = `${monthNameEs(d.getUTCMonth())} ${d.getUTCFullYear()}`;
      timeHeader.appendChild(th);
      d = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth()+1, 1));
    }
  }
}

/* =========
   Today line
========= */
function positionTodayLine(){
  const today = new Date(); // local
  const todayUTC = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
  const start = state.view === 'week' ? startOfWeekMonday(state.start) : startOfMonth(state.start);
  const end = getWindowEnd();

  if(todayUTC < start || todayUTC > end){
    todayLine.style.display = 'none';
    return;
  }
  todayLine.style.display = 'block';

  const pxDay = getPxPerDay();
  const offsetDays = diffDays(start, todayUTC);
  todayLine.style.left = `${offsetDays * pxDay}px`;
}

/* =========
   Filters + collapse logic
========= */
function passesFilters(t){
  if(state.filters.tipo && t.tipo !== state.filters.tipo) return false;
  if(state.filters.cont && (t.cont || '') !== state.filters.cont) return false;
  return true;
}

function isHiddenByCollapse(t){
  if(!t.parentId) return false;
  // si su padre está colapsado, ocultar
  return state.collapsed.has(t.parentId);
}

/* =========
   Render rows
========= */
function renderRows(){
  taskRows.innerHTML = '';
  timeRows.innerHTML = '';

  const start = state.view === 'week' ? startOfWeekMonday(state.start) : startOfMonth(state.start);
  const pxDay = getPxPerDay();

  // Orden simple: por grupo+id (puedes customizar)
  const ordered = [...TASKS].sort((a,b) => (a.group+a.id).localeCompare(b.group+b.id, 'es'));

  ordered.forEach(t=>{
    // aplica filtros
    if(!passesFilters(t)) return;

    // collapse
    if(isHiddenByCollapse(t)) return;

    const lvl = getLevel(t);
    const parent = isParent(t);

    // ---- Left row
    const row = document.createElement('div');
    row.className = `row level-${lvl}`;

    const twisty = document.createElement('span');
    twisty.className = 'twisty' + (parent ? '' : ' hidden');
    twisty.textContent = state.collapsed.has(t.uid) ? '+' : '–';
    twisty.title = parent ? 'Contraer/expandir' : '';

    if(parent){
      twisty.onclick = (e) => {
        e.stopPropagation();
        if(state.collapsed.has(t.uid)) state.collapsed.delete(t.uid);
        else state.collapsed.add(t.uid);
        rerender();
      };
    }

    const badge = document.createElement('span');
    badge.className = 'badge ' + (t.tipo === 'P' ? 'p' : 'h');
    badge.textContent = t.group;

    const actWrap = document.createElement('div');
    actWrap.className = 'act-wrap';
    actWrap.appendChild(twisty);
    actWrap.appendChild(badge);

    const actText = document.createElement('span');
    actText.textContent = t.activity;
    actText.style.minWidth = '0';
    actText.style.overflow = 'hidden';
    actText.style.textOverflow = 'ellipsis';
    actWrap.appendChild(actText);

    row.innerHTML = `
      <div class="task-cell cell-id">${t.id}</div>
      <div class="task-cell cell-act"></div>
      <div class="task-cell cell-tipo">${t.tipo}</div>
      <div class="task-cell cell-cont">${t.cont || ''}</div>
      <div class="task-cell cell-inicio">${t.inicio}</div>
      <div class="task-cell cell-fin">${t.fin}</div>
      <div class="task-cell cell-dur">${t.dur ?? ''}</div>
    `;
    row.querySelector('.cell-act').appendChild(actWrap);
    taskRows.appendChild(row);

    // ---- Right timeline row
    const tr = document.createElement('div');
    tr.className = 'time-row';

    const s = toDate(t.inicio);
    const e = toDate(t.fin);
    const visEnd = getWindowEnd();

    // clamp al rango visible
    const barStart = s < start ? start : s;
    const barEnd = e > visEnd ? visEnd : e;

    // si no intersecta
    if(barEnd > start && barStart < visEnd){
      const leftDays = diffDays(start, barStart);
      const widthDays = Math.max(1, diffDays(barStart, barEnd));
      const bar = document.createElement('div');
      bar.className = 'bar ' + (t.tipo === 'P' ? 'parent' : 'leaf');
      bar.style.left = `${leftDays * pxDay}px`;
      bar.style.width = `${widthDays * pxDay}px`;
      bar.title = `${t.activity}\n${t.inicio} → ${t.fin}`;

      const lbl = document.createElement('div');
      lbl.className = 'lbl';
      lbl.textContent = t.activity;
      bar.appendChild(lbl);

      tr.appendChild(bar);
    }

    timeRows.appendChild(tr);
  });

  // Ajusta ancho total de timeline según ventana
  const totalDays = diffDays(start, getWindowEnd());
  timeRows.style.width = `${totalDays * pxDay}px`;
}

/* =========
   Filters options
========= */
function buildFilterOptions(){
  // Tipo
  const tipos = Array.from(new Set(TASKS.map(t => t.tipo))).sort();
  filterTipo.innerHTML = `<option value="">(Todos)</option>` + tipos.map(x => `<option value="${x}">${x}</option>`).join('');

  // Cont
  const conts = Array.from(new Set(TASKS.map(t => (t.cont||'')).filter(Boolean))).sort();
  filterCont.innerHTML = `<option value="">(Todos)</option>` + conts.map(x => `<option value="${x}">${x}</option>`).join('');
}

/* =========
   Column toggles
========= */
function applyColumnToggles(){
  colCheckboxes.forEach(ch=>{
    const col = ch.dataset.col;
    const cls = `hide-${col}`;
    if(ch.checked) app.classList.remove(cls);
    else app.classList.add(cls);
  });
}

/* =========
   Scroll sync (vertical)
========= */
let syncing = false;
paneLeft.addEventListener('scroll', () => {
  if(syncing) return;
  syncing = true;
  timeBody.scrollTop = paneLeft.scrollTop;
  syncing = false;
});
timeBody.addEventListener('scroll', () => {
  if(syncing) return;
  syncing = true;
  paneLeft.scrollTop = timeBody.scrollTop;
  syncing = false;
});

/* =========
   Main rerender
========= */
function rerender(){
  renderTaskHeader();
  buildTimeHeader();
  positionTodayLine();
  renderRows();
  applyColumnToggles();
}

function setDefaultWindowStart(){
  // Por defecto, inicio = 2026-01-12 (tu cronograma)
  const d = parseISO('2026-01-12');
  state.start = state.view === 'week' ? startOfWeekMonday(d) : startOfMonth(d);
  windowStart.value = fmtISO(state.start);
}

/* =========
   Events
========= */
viewMode.addEventListener('change', ()=>{
  state.view = viewMode.value;
  // realinea start según vista
  const d = parseISO(windowStart.value || fmtISO(state.start));
  state.start = state.view === 'week' ? startOfWeekMonday(d) : startOfMonth(d);
  setSpanOptions();
  state.span = parseInt(windowSpan.value, 10);
  rerender();
});

windowStart.addEventListener('change', ()=>{
  const d = parseISO(windowStart.value);
  state.start = state.view === 'week' ? startOfWeekMonday(d) : startOfMonth(d);
  rerender();
});

windowSpan.addEventListener('change', ()=>{
  state.span = parseInt(windowSpan.value, 10);
  rerender();
});

filterTipo.addEventListener('change', ()=>{
  state.filters.tipo = filterTipo.value;
  rerender();
});
filterCont.addEventListener('change', ()=>{
  state.filters.cont = filterCont.value;
  rerender();
});

btnToday.addEventListener('click', ()=>{
  const now = new Date();
  const t = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
  state.start = state.view === 'week' ? startOfWeekMonday(t) : startOfMonth(t);
  windowStart.value = fmtISO(state.start);
  rerender();
});

btnExpandAll.addEventListener('click', ()=>{
  state.collapsed.clear();
  rerender();
});
btnCollapseAll.addEventListener('click', ()=>{
  // colapsa todos los padres
  TASKS.filter(isParent).forEach(p => state.collapsed.add(p.uid));
  rerender();
});

colCheckboxes.forEach(ch=>{
  ch.addEventListener('change', applyColumnToggles);
});

/* =========
   Init
========= */
(function init(){
  buildFilterOptions();

  state.view = viewMode.value;
  setSpanOptions();
  state.span = parseInt(windowSpan.value, 10);

  setDefaultWindowStart();

  rerender();

  // refrescar línea “hoy” cada minuto por si queda abierto
  setInterval(positionTodayLine, 60*1000);
})();
