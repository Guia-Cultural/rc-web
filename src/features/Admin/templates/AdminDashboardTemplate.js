/* ==========================================================================
   ADMIN DASHBOARD TEMPLATE | Runtime interno da interface carregada em iframe.
   Este código roda somente no documento isolado do iframe administrativo.
========================================================================== */

(function(){'use strict';
const EMB=window.parent!==window;
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const J={get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch{return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v));return true}catch{return false}}};
/* ---- dados compartilhados com local.html (mesmas chaves do localStorage) ---- */
const TH={natureza:'Natureza',historico:'Histórico',praias:'Praias',cidades:'Cidades',aventura:'Aventura',montanhas:'Montanhas',amazonia:'Amazônia',romanticos:'Românticos'};
const SEED=[['campeche','Praia do Campeche','Florianópolis, SC','praias'],['pelourinho','Pelourinho','Salvador, BA','historico'],['ouro-preto','Centro Histórico de Ouro Preto','Ouro Preto, MG','romanticos'],['paulista','Avenida Paulista','São Paulo, SP','cidades'],['pao-de-acucar','Pão de Açúcar','Rio de Janeiro, RJ','montanhas'],['chapada-diamantina','Chapada Diamantina','Lençóis, BA','natureza'],['tirolesa-brotas','Tirolesa na floresta','Brotas, SP','aventura'],['amazonia-reserva','Reserva na Amazônia','Manaus, AM','amazonia']];
const ROLE={usuario:'Viajante',morador:'Nativo',admin:'Administrador'};
const users=()=>J.get('rc_users',[]),saveU=u=>J.set('rc_users',u);
const sess=()=>J.get('rc_session',null),me=()=>{const s=sess();return s&&users().find(u=>u.id===s.uid)||null};
const LS=()=>Object.assign({rev:{},fb:{},rep:[],rot:{},status:{}},J.get('rc_local_v1',{}));
const patchLS=p=>{const c=J.get('rc_local_v1',{});Object.assign(c,p);J.set('rc_local_v1',c)};
const uPlaces=()=>J.get('rc_places',[]),stories=()=>J.get('rc_stories',[]);
const places=()=>{const st=LS().status||{};return SEED.map(([s,n,l,t])=>({s,n,l,tema:t,status:st[s]||'aprovado',seed:1})).concat(uPlaces().map(p=>({s:p.slug,n:p.n,l:p.loc,tema:p.tema,status:p.status,owner:p.owner,motivo:p.motivo})))};
const uname=id=>(users().find(u=>u.id===id)||{nome:'—'}).nome;
const pname=s=>(places().find(p=>p.s===s)||{n:s}).n;
const flat=o=>Object.entries(o||{}).flatMap(([k,a])=>(a||[]).map(x=>({...x,k})));
const ago=t=>{const d=Math.max(0,Date.now()-t)/60000;return d<1?'agora':d<60?`há ${Math.floor(d)} min`:d<1440?`há ${Math.floor(d/60)} h`:`há ${Math.floor(d/1440)} d`};
const toast=m=>{const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove('on'),2600)};
const ic=n=>({grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',pin:'<path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0113 0M16 4.6a3.5 3.5 0 010 6.8M18 20a6.5 6.5 0 00-2-4.6"/>',tag:'<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.3"/>',chat:'<path d="M4 5h16v11H9l-5 4z"/>',flag:'<path d="M5 21V4M5 4h12l-2 4 2 4H5"/>',chart:'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',check:'<path d="M5 12.5l4.5 4.5L19 7"/>',x:'<path d="M6 6l12 12M18 6L6 18"/>',trash:'<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',dl:'<path d="M12 3v12m0 0l-4-4m4 4l4-4M4 20h16"/>',map:'<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z"/>'}[n]||'');
const I=n=>`<svg class="i" viewBox="0 0 24 24" aria-hidden="true">${ic(n)}</svg>`;
/* ---- gráficos ---- */
const COL=['#3D7BFF','#FFE53B','#1FCBA0','#FF8A5B','#0E2A6B','#B28DFF','#FF6FB5','#7BD3F7'];
function pie(d){d=d.filter(x=>x.v>0);const t=d.reduce((a,x)=>a+x.v,0);if(!t)return'<p class="empty">Sem dados ainda.</p>';let c=0;
 return `<div class="pie"><svg viewBox="0 0 42 42" role="img" aria-label="Gráfico de pizza">${d.map((x,i)=>{const p=x.v/t*100,o=-c;c+=p;return `<circle class="sl" r="15.9155" cx="21" cy="21" fill="none" stroke="${COL[i%8]}" stroke-width="9" style="stroke-dasharray:0 100" data-d="${p} ${100-p}" stroke-dashoffset="${o}" transform="rotate(-90 21 21)"><title>${esc(x.l)}: ${x.v}</title></circle>`}).join('')}</svg>
 <ul>${d.map((x,i)=>`<li><i style="background:${COL[i%8]}"></i>${esc(x.l)} <b>${x.v}</b> <small>${Math.round(x.v/t*100)}%</small></li>`).join('')}</ul></div>`}
const run=()=>requestAnimationFrame(()=>requestAnimationFrame(()=>{$$('.sl').forEach(c=>c.style.strokeDasharray=c.dataset.d);$$('.cnt').forEach(el=>{const n=+el.dataset.n;if(!n){el.textContent='0';return}const t0=performance.now();(function f(t){const p=Math.min(1,(t-t0)/900);el.textContent=Math.round(n*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)})(t0)})}));
const kpi=(l,n,i,c)=>`<div class="card kpi" style="--c:${c}"><span class="ic">${I(i)}</span><b class="cnt" data-n="${n}">0</b><small>${l}</small></div>`;
/* ---- métricas ---- */
const real=u=>!String(u.id).startsWith('demo-');
function metrics(days){const since=days?Date.now()-days*864e5:0,us=users().filter(real),rot=flat(LS().rot);
 const nu=us.filter(u=>u.created>=since),ns=stories().filter(s=>s.ts>=since),nr=rot.filter(r=>(r.ts||0)>=since);
 const lk={};users().forEach(u=>(u.favs||[]).forEach(s=>lk[s]=(lk[s]||0)+1));const top=Object.entries(lk).sort((a,b)=>b[1]-a[1]);
 return{nu,ns,nr,top,us}}
/* ---- telas ---- */
let view=(location.hash||'#geral').slice(1),filt='todos',period=30,q='';
const NAV=[['geral','Visão geral','grid'],['locais','Locais','pin'],['usuarios','Usuários','users'],['categorias','Categorias','tag'],['feedbacks','Feedbacks','chat'],['denuncias','Denúncias','flag'],['relatorios','Relatórios','chart']];
const stB=s=>`<span class="st ${s==='aprovado'?'a':s==='pendente'?'p':'r'}">${({aprovado:'Aprovado',pendente:'Em análise',reprovado:'Reprovado'})[s]||s}</span>`;
function pend(){return places().filter(p=>p.status==='pendente')}
const placeRow=p=>`<div class="row"><div class="g"><b>${esc(p.n)}</b><small>${esc(p.l)} · ${esc(TH[p.tema]||'')}${p.owner?' · por '+esc(uname(p.owner)):' · local do site'}</small>${p.status==='reprovado'&&p.motivo?`<small style="color:#b3262b;display:block">Motivo: ${esc(p.motivo)}</small>`:''}</div>${stB(p.status)}
 <button class="btn sm" data-ap="${esc(p.s)}" ${p.status==='aprovado'?'disabled':''}>${I('check')}Aprovar</button><button class="btn sm red" data-rj="${esc(p.s)}" ${p.status==='reprovado'?'disabled':''}>${I('x')}Reprovar</button>${p.seed?'':`<button class="btn sm line" data-dl="${esc(p.s)}" aria-label="Excluir ${esc(p.n)}">${I('trash')}</button>`}</div>`;
const V={
geral(){const ps=places(),op=LS().rep.filter(r=>!r.resolvida).length,us=users();
 return `<div class="grid kp">${kpi('Usuários',us.length,'users','#3D7BFF')}${kpi('Locais aprovados',ps.filter(p=>p.status==='aprovado').length,'pin','#1FCBA0')}${kpi('Aguardando aprovação',pend().length,'check','#E0B800')}${kpi('Denúncias abertas',op,'flag','#E5484D')}${kpi('Histórias no blog',stories().length,'chat','#B28DFF')}${kpi('Roteiros criados',flat(LS().rot).length,'map','#FF8A5B')}</div>
 <div class="grid two" style="margin-top:1rem"><div class="card"><h2>Usuários por perfil</h2>${pie(Object.keys(ROLE).map(r=>({l:ROLE[r],v:us.filter(u=>u.role===r).length})))}</div>
 <div class="card"><h2>Locais por status</h2>${pie([['aprovado','Aprovados'],['pendente','Em análise'],['reprovado','Reprovados']].map(([k,l])=>({l,v:ps.filter(p=>p.status===k).length})))}</div></div>
 <div class="card" style="margin-top:1rem"><h2>Cadastros aguardando você</h2>${pend().length?pend().slice(0,4).map(placeRow).join(''):'<p class="empty">Nenhum cadastro pendente. 🎉</p>'}</div>`},
locais(){const ps=places().filter(p=>filt==='todos'||p.status===filt);
 return `<div class="tools fil" role="group" aria-label="Filtrar">${[['todos','Todos'],['pendente','Em análise'],['aprovado','Aprovados'],['reprovado','Reprovados']].map(([k,l])=>`<button data-f="${k}" aria-pressed="${filt===k}">${l}</button>`).join('')}</div><div class="card">${ps.length?ps.map(placeRow).join(''):'<p class="empty">Nenhum local neste filtro.</p>'}</div>`},
usuarios(){const me0=me(),l=users().filter(u=>!q||(u.nome+u.email).toLowerCase().includes(q));
 return `<div class="tools"><input id="q" type="search" placeholder="Buscar nome ou e-mail" value="${esc(q)}" aria-label="Buscar usuários"></div><div class="card">${l.length?l.map(u=>`<div class="row"><span class="av">${esc(u.nome[0].toUpperCase())}</span><div class="g"><b>${esc(u.nome)}</b><small>${esc(u.email)} · ${esc(u.cidade||'')}/${esc(u.uf||'')} · desde ${new Date(u.created||Date.now()).toLocaleDateString('pt-BR')}</small></div>
 <select data-role="${esc(u.id)}" aria-label="Perfil de ${esc(u.nome)}" style="width:auto" ${u.id===me0.id?'disabled':''}>${Object.keys(ROLE).map(r=>`<option value="${r}" ${u.role===r?'selected':''}>${ROLE[r]}</option>`).join('')}</select>
 <button class="btn sm red" data-du="${esc(u.id)}" ${u.id===me0.id||!real(u)?'disabled':''} aria-label="Excluir ${esc(u.nome)}">${I('trash')}</button></div>`).join(''):'<p class="empty">Nenhum usuário encontrado.</p>'}</div>`},
categorias(){const off=J.get('rc_cats_off',[]),ps=places();
 return `<div class="card"><h2>Categorias visíveis no cadastro de locais</h2>${Object.entries(TH).map(([k,l])=>`<div class="row"><div class="g"><b>${l}</b><small>${ps.filter(p=>p.tema===k).length} locais</small></div><span>${off.includes(k)?'Desativada':'Ativa'}</span><button class="sw" data-cat="${k}" aria-pressed="${!off.includes(k)}" aria-label="Ativar ${l}"></button></div>`).join('')}</div>`},
feedbacks(){const ls=LS(),rv=flat(ls.rev).map(x=>({...x,tp:'Avaliação',h:`${x.n} ★`,body:x.t,by:x.a})),fb=flat(ls.fb).map(x=>({...x,tp:'Dica de nativo',h:'',body:x.t,by:x.a})),l=rv.concat(fb).sort((a,b)=>(b.ts||0)-(a.ts||0));
 return `<div class="card">${l.length?l.map(x=>`<div class="row"><div class="g"><b>${x.tp} ${esc(x.h)} · ${esc(pname(x.k))}</b><small>${esc(x.by||'')} · ${x.ts?ago(x.ts):''}</small><div>${esc(x.body)}</div></div><button class="btn sm red" data-df="${esc(x.k)}|${esc(x.id)}" aria-label="Excluir feedback">${I('trash')}</button></div>`).join(''):'<p class="empty">Nenhum feedback recebido.</p>'}</div>`},
denuncias(){const l=LS().rep.slice().sort((a,b)=>(a.resolvida-b.resolvida)||b.ts-a.ts);
 return `<div class="card">${l.length?l.map(r=>`<div class="row"><div class="g"><b>${esc(r.motivo)} · ${esc(r.place||pname(r.slug))}</b><small>${esc(r.user||'')} · ${ago(r.ts)}</small><div>${esc(r.texto)}</div></div>${r.resolvida?'<span class="st a">Resolvida</span>':`<button class="btn sm" data-rs="${esc(r.id)}">${I('check')}Resolver</button>`}<button class="btn sm red" data-dr="${esc(r.id)}" aria-label="Excluir denúncia">${I('trash')}</button></div>`).join(''):'<p class="empty">Nenhuma denúncia.</p>'}</div>`},
relatorios(){const m=metrics(period),days=[...Array(7)].map((_,i)=>{const d=new Date();d.setHours(0,0,0,0);d.setDate(d.getDate()-6+i);return d.getTime()}),rot=flat(LS().rot),inD=(t,d)=>t>=d&&t<d+864e5;
 const ser=[['Cadastros',m.us.map(u=>u.created),COL[0]],['Histórias',stories().map(s=>s.ts),COL[1]],['Roteiros',rot.map(r=>r.ts||0),COL[2]]],mx=Math.max(1,...days.flatMap(d=>ser.map(s=>s[1].filter(t=>inD(t,d)).length))),ps=places();
 const tops=m.top.slice(0,5),tm=tops[0]?tops[0][1]:1;
 return `<div class="tools"><label>Período dos totais: <select id="per">${[[7,'7 dias'],[30,'30 dias'],[90,'90 dias'],[0,'Tudo']].map(([v,l])=>`<option value="${v}" ${period===v?'selected':''}>${l}</option>`).join('')}</select></label><button class="btn y" id="csv">${I('dl')}Exportar CSV</button></div>
 <div class="grid kp">${kpi('Novos usuários',m.nu.length,'users','#3D7BFF')}${kpi('Histórias novas no blog',m.ns.length,'chat','#B28DFF')}${kpi('Roteiros novos',m.nr.length,'map','#FF8A5B')}</div>
 <div class="grid two" style="margin-top:1rem"><div class="card"><h2>Local mais curtido (Explorar)</h2>${tops.length?`<div class="hb">${tops.map(([s,n],i)=>`<div><span style="background:none;height:auto">${i===0?'🏆 ':''}${esc(pname(s))}</span><span><i style="--w:${n/tm*100}%"></i></span><b>${n}</b></div>`).join('')}</div>`:'<p class="empty">Ninguém favoritou locais ainda.</p>'}</div>
 <div class="card"><h2>Locais por categoria</h2>${pie(Object.entries(TH).map(([k,l])=>({l,v:ps.filter(p=>p.tema===k&&p.status==='aprovado').length})))}</div>
 <div class="card"><h2>Usuários por perfil</h2>${pie(Object.keys(ROLE).map(r=>({l:ROLE[r],v:users().filter(u=>u.role===r).length})))}</div>
 <div class="card"><h2>Atividade dos últimos 7 dias</h2><div class="bars">${days.map(d=>`<div class="bg"><div class="cols">${ser.map(s=>{const n=s[1].filter(t=>inD(t,d)).length;return `<div class="bf" title="${s[0]}: ${n}" style="--h:${n/mx*100}%;background:${s[2]};min-height:${n?4:0}px"></div>`}).join('')}</div><small>${new Date(d).toLocaleDateString('pt-BR',{day:'2-digit',month:'2-digit'})}</small></div>`).join('')}</div><div class="lg">${ser.map(s=>`<span><i style="background:${s[2]}"></i>${s[0]}</span>`).join('')}</div></div></div>`}
};
function render(){if(!V[view])view='geral';const nav=$('#nav');
 nav.innerHTML=NAV.map(([k,l,i])=>{const n=k==='locais'?pend().length:k==='denuncias'?LS().rep.filter(r=>!r.resolvida).length:0;return `<button data-v="${k}" ${k===view?'aria-current="page"':''}>${I(i)}${l}${n?`<span class="n">${n}</span>`:''}</button>`}).join('');
 $('#ttl').textContent=NAV.find(n=>n[0]===view)[1];$('#view').innerHTML=V[view]();run()}
/* ---- ações ---- */
const ask=t=>new Promise(r=>{const d=$('#dAsk');$('#askT').textContent=t;d.returnValue='';d.onclose=()=>r(d.returnValue==='ok');d.showModal()});
function setStatus(s,st,motivo){const ps=uPlaces(),p=ps.find(x=>x.slug===s);if(p){p.status=st;if(st==='reprovado')p.motivo=motivo;else delete p.motivo;J.set('rc_places',ps)}else{const c=LS().status||{};c[s]=st;patchLS({status:c})}}
let rejSlug='';
document.addEventListener('click', async event => {
  const target = event.target;

  /* ========================================================================
     NAVEGAÇÃO E FILTROS
  ======================================================================== */
  const viewButton = target.closest('[data-v]');
  if (viewButton) {
    view = viewButton.dataset.v;
    location.hash = view;
    render();
    return;
  }

  const filterButton = target.closest('[data-f]');
  if (filterButton) {
    filt = filterButton.dataset.f;
    render();
    return;
  }

  /* ========================================================================
     MODERAÇÃO DE LOCAIS E USUÁRIOS
  ======================================================================== */
  const approveButton = target.closest('[data-ap]');
  if (approveButton) {
    setStatus(approveButton.dataset.ap, 'aprovado');
    toast('Local aprovado.');
    render();
    return;
  }

  const rejectButton = target.closest('[data-rj]');
  if (rejectButton) {
    rejSlug = rejectButton.dataset.rj;
    $('#rejN').textContent = pname(rejSlug);
    $('#fRej').reset();
    $('#rejE').textContent = '';
    $('#dRej').showModal();
    $('#fRej').m.focus();
    return;
  }

  const deletePlaceButton = target.closest('[data-dl]');
  if (deletePlaceButton) {
    if (await ask('Excluir este local definitivamente?')) {
      J.set('rc_places', uPlaces().filter(place => place.slug !== deletePlaceButton.dataset.dl));
      toast('Local excluído.');
      render();
    }
    return;
  }

  const deleteUserButton = target.closest('[data-du]');
  if (deleteUserButton) {
    if (await ask('Excluir este usuário? A ação é permanente.')) {
      saveU(users().filter(user => user.id !== deleteUserButton.dataset.du));
      toast('Usuário excluído.');
      render();
    }
    return;
  }

  /* ========================================================================
     CATEGORIAS, FEEDBACKS E DENÚNCIAS
  ======================================================================== */
  const categoryButton = target.closest('[data-cat]');
  if (categoryButton) {
    const disabledCategories = J.get('rc_cats_off', []);
    const key = categoryButton.dataset.cat;
    J.set('rc_cats_off', disabledCategories.includes(key)
      ? disabledCategories.filter(item => item !== key)
      : disabledCategories.concat(key));
    render();
    return;
  }

  const deleteFeedbackButton = target.closest('[data-df]');
  if (deleteFeedbackButton) {
    const [key, id] = deleteFeedbackButton.dataset.df.split('|');
    if (await ask('Excluir este feedback?')) {
      const data = LS();
      data.rev[key] = (data.rev[key] || []).filter(item => item.id !== id);
      data.fb[key] = (data.fb[key] || []).filter(item => item.id !== id);
      patchLS({ rev: data.rev, fb: data.fb });
      toast('Feedback excluído.');
      render();
    }
    return;
  }

  const resolveReportButton = target.closest('[data-rs]');
  if (resolveReportButton) {
    const reports = LS().rep;
    reports.forEach(report => {
      if (report.id === resolveReportButton.dataset.rs) report.resolvida = true;
    });
    patchLS({ rep: reports });
    toast('Denúncia resolvida.');
    render();
    return;
  }

  const deleteReportButton = target.closest('[data-dr]');
  if (deleteReportButton) {
    if (await ask('Excluir esta denúncia?')) {
      patchLS({ rep: LS().rep.filter(report => report.id !== deleteReportButton.dataset.dr) });
      toast('Denúncia excluída.');
      render();
    }
    return;
  }

  /* ========================================================================
     EXPORTAÇÃO E AÇÕES DE SESSÃO
  ======================================================================== */
  if (target.closest('#csv')) {
    const rows = [['Tipo', 'Nome', 'Detalhe']].concat(
      users().map(user => ['Usuário', user.nome, `${user.email} · ${ROLE[user.role]}`]),
      places().map(place => ['Local', place.n, `${place.l} · ${place.status}`]),
      stories().map(story => ['História', story.titulo, story.a])
    );
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob(['\ufeff' + rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(';')).join('\n')], { type: 'text/csv;charset=utf-8' }));
    link.download = 'relatorio-rota-cultural.csv';
    link.click();
    toast('Relatório exportado.');
    return;
  }

  if (target.closest('#out')) {
    if (EMB) parent.postMessage('rc-admin-logout', '*');
    else {
      localStorage.removeItem('rc_session');
      location.href = 'local.html';
    }
    return;
  }

  if (target.closest('#back') && EMB) {
    event.preventDefault();
    parent.postMessage('rc-admin-close', '*');
  }
});
document.addEventListener('change',e=>{const t=e.target;if(t.dataset.role){const us=users();us.find(u=>u.id===t.dataset.role).role=t.value;saveU(us);toast('Perfil atualizado.');render()}if(t.id==='per'){period=+t.value;render()}});
document.addEventListener('input',e=>{if(e.target.id==='q'){q=e.target.value.toLowerCase();const p=e.target.selectionStart;render();const i=$('#q');i.focus();i.setSelectionRange(p,p)}});
$('#fRej').addEventListener('submit',e=>{if(e.submitter&&e.submitter.value==='ok'){const m=e.target.m.value.trim();if(m.length<5){e.preventDefault();$('#rejE').textContent='Informe o motivo (mínimo 5 caracteres).';return}setStatus(rejSlug,'reprovado',m);toast('Local reprovado. O nativo verá o motivo.');setTimeout(render,0)}});
addEventListener('storage',()=>{if(!$('dialog[open]'))render()});addEventListener('hashchange',()=>{const h=location.hash.slice(1);if(V[h]&&h!==view){view=h;render()}});
/* ---- entrada: só administradores ---- */
const u=me();
if(!u||u.role!=='admin'){if(EMB)$('#gateBack').addEventListener('click',e=>{e.preventDefault();parent.postMessage('rc-admin-close','*')});$('#gate').hidden=false;if(u)$('#gateMsg').textContent='Sua conta ('+(ROLE[u.role]||'')+') não tem acesso à área do administrador.'}
else{$('#app').hidden=false;$('#av').textContent=u.nome[0].toUpperCase();$('#who').textContent=u.nome;render()}
})();
