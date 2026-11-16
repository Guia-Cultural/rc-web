/* ==========================================================================
   INTERAÇÕES DA COMUNIDADE | Dados, publicação, filtros, conta e modais.
   O módulo é inicializado somente quando a página está autorizada e montada.
========================================================================== */
import { COMMUNITY_IMAGES } from "../data/communityImages.js";

export function initializeCommunityInteractions(root, authUser = null) {
  if (!root) return () => {};

// ============================================================
// DADOS BASE
// ============================================================
const IMG=COMMUNITY_IMAGES;
const CATS={Cidades:['building','#6B7CFF','#fff'],Históricos:['landmark','#FFC107','#000'],Natureza:['mountain','#22C55E','#000'],Praias:['wave','#00B8D9','#000'],Aventura:['compass','#FF6B3D','#000'],Dicas:['bulb','#E91E8C','#fff'],Gastronomia:['fork','#FF9500','#000'],Hospedagem:['bed','#8B5CF6','#fff']};
const POOL={Cidades:['x-rio','card-cidades','stairs'],Históricos:['x-church','x-colonial','x-street'],Natureza:['x-fall','macaw','hero-natureza'],Praias:['card-praias','flip'],Aventura:['surf','boat','card-aventura'],Dicas:['stairs','vendor'],Gastronomia:['vendor'],Hospedagem:['cows','x-colonial']};

// ============================================================
// ATALHOS
// ============================================================
const $=(s,scope=root)=>scope.querySelector(s),$$=(s,scope=root)=>[...scope.querySelectorAll(s)];
const ic=n=>`<svg class="community-icon" aria-hidden="true"><use href="#i-${n}"/></svg>`;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const ini=n=>n.trim().split(/\s+/).map(w=>w[0]).slice(0,2).join('').toUpperCase();
const ago=t=>{const m=Math.max(1,Math.floor((Date.now()-t)/6e4));if(m<60)return`há ${m} min`;const h=Math.floor(m/60);if(h<24)return`há ${h}h`;const d=Math.floor(h/24);if(d<7)return`há ${d}d`;if(d<30)return`há ${Math.floor(d/7)} sem`;if(d<365)return`há ${Math.floor(d/30)} meses`;return`há ${Math.floor(d/365)} ano${d>=730?'s':''}`};
const toast=m=>{const t=$('#toast');t.textContent=m;t.classList.add('is-visible');clearTimeout(toast.k);toast.k=setTimeout(()=>t.classList.remove('is-visible'),2800)};

// ============================================================
// PERFIL E TEMA DA CONTA
// ============================================================
const PK='rc_perfil_v4',TK='rc_tema_v4';
let P={nome:'Mariana',sobrenome:'Oliveira',email:'mariana.oliveira@email.com',end:'',cidade:'',uf:''};
try{Object.assign(P,JSON.parse(localStorage.getItem(PK))||{})}catch{/* Perfil local indisponível; mantém os dados padrão. */}
if(authUser){const authName=String(authUser.nome||authUser.name||'').trim();if(authName){const [firstName,...lastNames]=authName.split(/\s+/);P.nome=firstName;P.sobrenome=lastNames.join(' ')||P.sobrenome;}P.email=authUser.email||P.email;P.cidade=authUser.cidade||P.cidade;P.uf=authUser.uf||P.uf;}
const full=()=>`${P.nome} ${P.sobrenome}`.trim();
const TEMAS=[
 {k:'verde',n:'Verde',t:'#1FA055',on:'#fff',band:'#7ED58B',soft:'#E3F5E4'},
 {k:'rosa',n:'Rosa',t:'#F28DB8',on:'#3A0A22',band:'#FAD0E3',soft:'#FFF0F6'},
 {k:'amarelo',n:'Amarelo',t:'#FFC107',on:'#0E1A3D',band:'#FFE07A',soft:'#FFF6D6'},
 {k:'vermelho',n:'Vermelho',t:'#D92D2D',on:'#fff',band:'#F5A3A3',soft:'#FDE8E8'},
 {k:'preto',n:'Preto',t:'#111827',on:'#fff',band:'#CFCFCF',soft:'#F1F1F1'},
 {k:'roxo',n:'Roxo',t:'#7C3AED',on:'#fff',band:'#CDB6FA',soft:'#F1EAFE'},
 {k:'azulescuro',n:'Azul escuro',t:'#1B2A6B',on:'#fff',band:'#A9B7F0',soft:'#E8ECFB'},
 {k:'azulclaro',n:'Azul claro',t:'#38BDF8',on:'#0A2540',band:'#A5E0FB',soft:'#E6F6FE'},
 {k:'rosachoque',n:'Rosa choque',t:'#E91E8C',on:'#fff',band:'#F59AD0',soft:'#FDE2F1'}];
let temaK='verde';try{temaK=localStorage.getItem(TK)||'verde'}catch{/* Mantém o tema padrão quando o armazenamento está indisponível. */}

// ============================================================
// HISTÓRIAS (dados de exemplo)
// ============================================================
const H=36e5,now=Date.now(),C=(a,t,l,h)=>({a,t,l,ts:now-h*H});
const seed=[
[1,'Lucas Silva','Históricos','x-church','Três horas no centro histórico sem gastar nada','Ouro Preto, MG','Fiz um roteiro a pé passando por igrejas, praças e casarões. Dica: vá cedo, a luz da manhã deixa tudo mais bonito e o movimento é menor. Terminei no mirante com um café, e o sino da igreja tocando ao fundo.',41,18,17,[C('Camila R.','Salvei pra fazer no sábado!',3,12),C('Rafael S.','Que luz linda nessa foto.',1,9)],1],
[2,'Camila Ribeiro','Aventura','hero-montanhas','Primeira vez em uma trilha: o que eu levaria de novo','Monte Verde, MG','Água, boné, lanche leve e tênis com boa aderência. Comece por trilhas curtas e avise alguém do seu trajeto. O cansaço passa, a vista fica.',33,26,30,[C('Lucas S.','Ótima lista, vou imprimir.',2,22),C('Ana P.','Qual trilha você fez?',0,20),C('Pedro L.','Bota boa faz toda a diferença.',4,18)],0],
[3,'Rafael Souza','Dicas','stairs','Programas gratuitos para o fim de semana','Rio de Janeiro, RJ','Museus com entrada gratuita aos domingos, feiras de artesanato e saraus em praças. Vale seguir a agenda cultural da prefeitura e chegar cedo. A Escadaria Selarón é de graça e rende as melhores fotos.',24,31,52,[C('Mariana S.','Precisava dessa lista!',5,40),C('Bruno M.','Domingo no museu é programa certo.',2,38),C('Larissa C.','Salvei!',1,30),C('Ana P.','Alguma dica de sarau?',0,28)],1],
[4,'Lucas Almeida','Praias','flip','Praia tranquila fora da temporada','Praia do Forte, BA','Em dias de semana a faixa de areia fica quase vazia e os quiosques têm preço mais justo. Leve protetor, dinheiro trocado e um coco gelado para fechar o dia.',12,9,80,[C('Ana P.','Fui em maio e confirmo!',2,60)],0],
[5,'Mariana Silva','Gastronomia','vendor','Almoço típico por menos de R$ 40','Belo Horizonte, MG','Procurei o prato do dia em restaurantes de bairro, longe da rua principal. Sabor caseiro, porção generosa e atendimento de quem conhece o cliente pelo nome.',9,14,120,[C('Pedro L.','Qual restaurante?',0,100)],0],
[6,'Ana Paula','Cidades','x-rio','Rio a pé: um fim de semana sem carro','Rio de Janeiro, RJ','Metrô, VLT e muita caminhada. Dá para ver o centro histórico, a Lapa e a orla gastando pouco. Termine no pôr do sol da Urca, que é de graça.',7,6,160,[],0],
[7,'Bruno Martins','Natureza','hero-natureza','Amanhecer no rio: vale acordar às 5h','Campos do Jordão, SP','Chegamos no escuro e esperamos o sol tocar a mata. O reflexo na água parada é a melhor recompensa. Leve agasalho e garrafa térmica.',19,22,200,[C('Camila R.','Que lugar lindo!',3,180),C('Juliana P.','Entrou na minha lista.',1,170)],0],
[8,'Juliana Prado','Aventura','boat','Um dia flutuando nos rios de Bonito','Bonito, MS','Passeio de meio dia com guia local, água transparente e peixes passando ao lado. Reserve com antecedência e leve repelente biodegradável.',15,28,240,[C('Lucas A.','Sonho antigo!',2,220)],1],
[9,'Pedro Lima','Aventura','surf','Aula de surfe: vale o frio na barriga','Itacaré, BA','Reserve com instrutor, vá de roupa leve e guarde o celular. O último trecho da onda é o mais longo e o mais bonito.',11,7,280,[],0],
[10,'Larissa Costa','Hospedagem','cows','Pousada simples com café da roça','Gonçalves, MG','Valeu cada centavo: café da manhã caseiro, dona atenciosa e varanda com vista para as serras. As vacas passam de manhã e dão bom dia.',8,12,300,[C('Rafael S.','Passa o nome?',1,280)],0],
[11,'Thiago Alves','Natureza','x-fall','Cachoeiras da Chapada em dois dias','Lençóis, BA','Fiz Fumaça e Poço Azul com guia local. Leve calçado fechado, lanche e muita água. Vale dormir perto da entrada para sair cedo.',17,19,340,[C('Juliana P.','Que roteiro bom!',2,320),C('Bruno M.','Anotado.',0,310)],0],
[12,'Fernanda Reis','Praias','card-praias','5 dicas para curtir praia gastando pouco','Salvador, BA','Vá de transporte público, leve lanche, alugue guarda-sol com o ambulante e evite sábado. No fim do dia a orla é toda sua.',14,16,380,[],0],
[13,'Beatriz Nunes','Natureza','capy','Pantanal sem pressa: fauna para todo lado','Poconé, MT','Capivaras, jacarés e araras bem perto da pousada. O melhor horário é o fim da tarde, com o calor baixando e os bichos saindo.',22,24,420,[C('Thiago A.','Que foto incrível!',4,400)],0],
[14,'Caio Mendes','Históricos','x-colonial','Paraty sem multidão: ande de manhã','Paraty, RJ','As ruas de pedra ficam vazias até as 10h. Aproveite para fotografar o casario e tomar café com calma antes dos passeios de barco.',13,11,460,[],0]];
// roteiros de exemplo (id da história → paradas)
const ROT={
 1:[['Igreja de São Francisco de Assis','Chegue cedo, antes dos grupos'],['Praça Tiradentes','Café e fotos do casario'],['Mirante da Cruz','Pôr do sol com vista da cidade']],
 2:[['Início da trilha curta','Leve água e avise alguém'],['Mirante','Pausa para lanche e fotos'],['Volta pelo mesmo caminho','Saia antes do fim da tarde']],
 3:[['Museu com entrada gratuita','Aos domingos'],['Feira de artesanato','Chegue cedo'],['Escadaria Selarón','Entrada gratuita']]};
let S={posts:seed.map(a=>({id:a[0],a:a[1],c:a[2],i:a[3],t:a[4],loc:a[5],x:a[6],l:a[7],s:a[8],ts:now-a[9]*H,cm:a[10],rot:(ROT[a[0]]||[]).map(([p,d])=>({p,d}))})),liked:{},saved:{},cl:{},cat:'Todos',sort:'new',q:'',sv:false,me:false,n:6,hl:'like',fc:''};
try{const r=JSON.parse(localStorage.getItem('rc_blog_v4'));if(r&&r.posts)Object.assign(S,{posts:r.posts,liked:r.liked||{},saved:r.saved||{},cl:r.cl||{}})}catch{/* Mantém os dados de exemplo quando não há dados locais válidos. */}
const save=()=>{try{localStorage.setItem('rc_blog_v4',JSON.stringify({posts:S.posts,liked:S.liked,saved:S.saved,cl:S.cl}))}catch{toast('Não foi possível salvar neste navegador.')}};
const src=p=>p.i.startsWith('data:')||p.i.startsWith('images/')?p.i:(IMG[p.i]||IMG['x-church']);
const pick=c=>POOL[c][Math.floor(Math.random()*POOL[c].length)];
const mine=p=>!!p.own;
const mins=p=>Math.max(1,Math.round(p.x.split(/\s+/).length/160));
const who=p=>`<div class="community-who"><span class="community-avatar" style="--community-s:38px">${ini(p.a)}</span><div><b>${esc(p.a)}</b><small>${p.c} · ${ago(p.ts)}</small></div></div>`;
const MET={like:p=>p.l,cm:p=>p.cm.length,sv:p=>p.s};
const LBL={like:p=>`${ic('heart')}${p.l} curtidas`,cm:p=>`${ic('comment')}${p.cm.length} comentários`,sv:p=>`${ic('bookmark')}${p.s} salvos`};
const CAP={like:'As histórias mais curtidas pela comunidade.',cm:'As conversas mais animadas da semana.',sv:'O que mais gente guardou para fazer depois.'};
const RC=[['#FF6B00','#fff'],['#1455F1','#fff'],['#27D118','#000']];

// ============================================================
// NAVBAR · conta
// ============================================================
function refUser(){
 $('#navav').textContent=$('#meav').textContent=ini(full());$('#navnm').textContent=P.nome;$('#mename').textContent=full();
 const a=$('#cav'),n=$('#cnome');if(a)a.textContent=ini(full());if(n)n.textContent=full()}
$('#burger').onclick=()=>$('#links').classList.toggle('is-open');
$('#login').onclick=()=>$('#out').classList.remove('is-visible');

// ============================================================
// FORMULÁRIO EM ETAPAS
// ============================================================
let step=1,pend=null;
const DK='rc_draft_v4';
$('#ccats').innerHTML=Object.keys(CATS).map(c=>`<button type="button" class="community-composer__category" data-c="${c}" style="--community-k:${CATS[c][1]};--community-kt:${CATS[c][2]}" aria-pressed="false">${ic(CATS[c][0])}${c}</button>`).join('');
$('#ccats').onclick=e=>{const b=e.target.closest('[data-c]');if(!b)return;S.fc=S.fc===b.dataset.c?'':b.dataset.c;$$('#ccats button').forEach(x=>x.setAttribute('aria-pressed',x.dataset.c===S.fc));erro('cat','');draft()};
function erro(k,m){const d=root.querySelector(`[data-e="${k}"]`);if(d)d.textContent=m||''}
function goStep(n){step=n;
 $$('.community-composer__panel').forEach(e=>e.classList.toggle('is-on',+e.dataset.etapa===n));
 $$('.community-composer__step').forEach(b=>{const k=+b.dataset.passo;b.classList.toggle('is-on',k===n);b.classList.toggle('is-ok',k<n)});
 $('#voltar').hidden=n===1;$('#prox').hidden=n===3;$('#pub').hidden=n!==3;$('#cc').style.visibility=n===2?'visible':'hidden'}
function validar(n){let ok=true;
 if(n===1){const m=S.fc?'':'Escolha uma categoria para continuar.';erro('cat',m);if(m)ok=false}
 if(n===2){const a=$('#tit').value.trim().length<5?'O título precisa de ao menos 5 caracteres.':'',b=$('#txt').value.trim().length<30?'Conte um pouco mais (mínimo de 30 caracteres).':'';erro('tit',a);erro('txt',b);if(a||b)ok=false}
 return ok}
$('#prox').onclick=()=>{if(validar(step))goStep(step+1)};
$('#voltar').onclick=()=>goStep(step-1);
$('#passos').onclick=e=>{const b=e.target.closest('[data-passo]');if(!b)return;const n=+b.dataset.passo;if(n<=step)return goStep(n);let ok=true;for(let k=step;k<n&&ok;k++)ok=validar(k);if(ok)goStep(n)};

// rascunho automático + contador
function draft(){const t=$('#txt').value,n=t.length;$('#cc').textContent=n+'/600';const bi=$('#cbi');bi.style.width=n/6+'%';bi.style.background=n>540?'#E8222B':n>=30?'#27D118':'#1455F1';
 try{localStorage.setItem(DK,JSON.stringify({c:S.fc,t:$('#tit').value,x:t,l:$('#loc').value}));if(n||$('#tit').value){$('#ds').innerHTML=ic('check')+' Rascunho salvo'}else $('#ds').textContent=''}catch{/* A edição continua disponível mesmo sem persistência local. */}}
['#tit','#txt','#loc'].forEach(s=>$(s).addEventListener('input',draft));
try{const d=JSON.parse(localStorage.getItem(DK));if(d&&(d.t||d.x)){$('#tit').value=d.t||'';$('#txt').value=d.x||'';$('#loc').value=d.l||'';S.fc=d.c||'';$$('#ccats button').forEach(x=>x.setAttribute('aria-pressed',x.dataset.c===S.fc));draft()}}catch{/* Não há rascunho recuperável; mantém o formulário vazio. */}
// sugestões que ajudam a começar o texto
$('#sugest').onclick=e=>{const b=e.target.closest('[data-ini]');if(!b)return;const t=$('#txt');if(t.value.length+b.dataset.ini.length>600)return;t.value+=(t.value&&!t.value.endsWith('\n')?'\n':'')+b.dataset.ini;t.focus();draft()};
// foto
$('#foto').onchange=e=>{const f=e.target.files[0];if(!f)return;if(!f.type.startsWith('image/'))return toast('Escolha um arquivo de imagem');
 const im=new Image();im.onload=()=>{const k=Math.min(1,720/im.width),c=document.createElement('canvas');c.width=im.width*k;c.height=im.height*k;c.getContext('2d').drawImage(im,0,0,c.width,c.height);pend=c.toDataURL('image/jpeg',.7);$('#pvi').src=pend;$('#pv').classList.add('is-active');$('#dt').textContent='Trocar foto'};im.src=URL.createObjectURL(f)};
$('#rmf').onclick=()=>{pend=null;$('#pv').classList.remove('is-active');$('#foto').value='';$('#dt').textContent='Adicionar foto'};
// roteiro: abre um modal com os roteiros que o usuário já tem (vêm da tela Roteiros)
const MEUS_ROTEIROS=[
 {t:'Fim de semana em Ouro Preto',paradas:[{p:'Igreja de São Francisco de Assis',d:'Chegue cedo'},{p:'Praça Tiradentes',d:'Café e fotos'},{p:'Mirante da Cruz',d:'Pôr do sol'}]},
 {t:'Trilhas de Monte Verde',paradas:[{p:'Início da trilha curta',d:'Leve água'},{p:'Mirante',d:'Pausa para lanche'}]}];// deixe [] para testar sem roteiros
let rotEsc=null;
const rmodal=$('#rmodal');
function drawRotSel(){const s=$('#rotSel');s.hidden=!rotEsc;if(!rotEsc)return;s.innerHTML=`<div class="community-composer__selected-route"><header><b>${ic('map')} ${esc(rotEsc.t)}</b><button type="button" class="community-pilula" data-troca>Trocar</button></header><ol>${rotEsc.paradas.map(x=>`<li>${esc(x.p)}</li>`).join('')}</ol></div>`}
function openR(){$('#rlist').innerHTML=MEUS_ROTEIROS.length?MEUS_ROTEIROS.map((r,i)=>`<button type="button" class="community-route-option" data-r="${i}"><b>${esc(r.t)}</b><small>${r.paradas.length} ${r.paradas.length>1?'paradas':'parada'}</small></button>`).join(''):'<p class="community-route-dialog__empty">Nenhum roteiro por aqui ainda.</p>';rmodal.hidden=false}
function closeR(){rmodal.hidden=true;if(!rotEsc)$('#rotOn').checked=false}
$('#rotOn').onchange=e=>{if(e.target.checked)openR();else{rotEsc=null;drawRotSel()}};
$('#rotSel').onclick=e=>{if(e.target.closest('[data-troca]'))openR()};
rmodal.addEventListener('click',e=>{if(e.target===rmodal||e.target.closest('#rx'))return closeR();const b=e.target.closest('[data-r]');if(b){rotEsc=MEUS_ROTEIROS[+b.dataset.r];rmodal.hidden=true;drawRotSel()}});
// publicar
$('#form').onsubmit=e=>{e.preventDefault();
 if(step<3)return $('#prox').click();
 if(!validar(1))return goStep(1);if(!validar(2))return goStep(2);
 const paradas=rotEsc?rotEsc.paradas.map(x=>({p:x.p,d:x.d})):[];
 S.posts.unshift({id:Date.now(),a:full(),c:S.fc,i:pend||pick(S.fc),t:$('#tit').value.trim(),x:$('#txt').value.trim(),loc:$('#loc').value.trim(),l:0,s:0,ts:Date.now(),cm:[],rot:paradas,own:true});
 save();try{localStorage.removeItem(DK)}catch{/* A publicação já foi salva; a limpeza do rascunho é opcional. */}
 e.target.reset();pend=null;S.fc='';rotEsc=null;drawRotSel();$$('#ccats button').forEach(x=>x.setAttribute('aria-pressed','false'));$('#pv').classList.remove('is-active');$('#dt').textContent='Adicionar foto';$('#ds').textContent='';draft();goStep(1);
 Object.assign(S,{cat:'Todos',sort:'new',q:'',sv:false,me:false,n:6});$('#sort').value='new';$('#q').value='';upd();toast('História publicada! Ela já está na comunidade.');$('#feed').scrollIntoView()};
goStep(1);

// ============================================================
// DESTAQUES
// ============================================================
const pcat=p=>`<span class="community-post__category" style="--community-k:${CATS[p.c][1]};color:${CATS[p.c][2]}">${ic(CATS[p.c][0])}${p.c}</span>`;
function hl(){const k=S.hl;let l=[...S.posts].sort((a,b)=>MET[k](b)-MET[k](a)).slice(0,3);
 $('#hcap').textContent=CAP[k];$$('#seg button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.k===k));
 const f=l[0],r=l.slice(1),st=i=>`--community-c:${RC[i][0]};--community-ct:${RC[i][1]}`;
 $('#hlg').innerHTML=(f?`<article class="community-highlight-feature" style="${st(0)}" data-open="${f.id}"><div class="community-password"><span class="community-rk">1</span><img src="${src(f)}" alt="${esc(f.t)}">${pcat(f)}</div><div class="community-tx"><span class="community-mb">${LBL[k](f)}</span><h3>${esc(f.t)}</h3><p>${esc(f.x)}</p>${who(f)}<button class="community-button community-button--blue" type="button">Ler história ${ic('arrow')}</button></div></article>`:'')+
 (r.length?`<div class="community-hlsm">${r.map((p,i)=>`<article class="community-hs" style="${st(i+1)};animation-delay:${(i+1)*.12}s" data-open="${p.id}"><div class="community-password"><span class="community-rk">${i+2}</span><img src="${src(p)}" alt="${esc(p.t)}">${pcat(p)}</div><div class="community-tx"><span class="community-mb">${LBL[k](p)}</span><h3>${esc(p.t)}</h3>${who(p)}</div></article>`).join('')}</div>`:'')}
$('#seg').onclick=e=>{const b=e.target.closest('[data-k]');if(b){S.hl=b.dataset.k;hl()}};

// ============================================================
// FEED
// ============================================================
function chips(){$('#chips').innerHTML=['Todos',...Object.keys(CATS)].map(c=>{const d=CATS[c]||['','#FFC107','#000'];return`<button class="community-chip" style="--community-k:${d[1]};--community-kt:${d[2]}" data-c="${c}" aria-pressed="${S.cat===c}">${c==='Todos'?'':ic(d[0])}${c}</button>`}).join('')}
const card=(p,i)=>{const d=CATS[p.c],nr=(p.rot||[]).length;
 return`<article class="community-hist" style="--community-c:${d[1]};--community-d:${i%6*.07}s" data-id="${p.id}">
<div class="community-hist__capa" data-open="${p.id}"><img src="${src(p)}" alt="${esc(p.t)}" loading="lazy"><span class="community-hist__cat" style="color:${d[2]}">${ic(d[0])}${p.c}</span>${nr?`<span class="community-hist__rota">${ic('map')}Roteiro · ${nr} ${nr>1?'paradas':'parada'}</span>`:''}<button class="community-hist__salvar" data-a="sv" aria-pressed="${!!S.saved[p.id]}" aria-label="Salvar história">${ic('bookmark')}</button></div>
<div class="community-hist__corpo">${p.loc?`<span class="community-hist__local">${ic('pin')}${esc(p.loc)}</span>`:''}<h4 class="community-hist__titulo" data-open="${p.id}">${esc(p.t)}</h4><p class="community-hist__resumo">${esc(p.x)}</p></div>
<div class="community-hist__rodape"><div class="community-hist__autor"><span class="community-avatar" style="--community-s:34px">${ini(p.a)}</span><div><b>${esc(p.a)}</b><small>${ago(p.ts)}</small></div></div>
<div class="community-hist__acoes"><button class="community-pilula" data-a="like" aria-pressed="${!!S.liked[p.id]}" aria-label="Curtir">${ic('heart')}${p.l}</button><button class="community-pilula" data-open="${p.id}" aria-label="Ver comentários">${ic('comment')}${p.cm.length}</button></div></div></article>`};
function feed(){chips();$('#tsv').setAttribute('aria-pressed',S.sv);$('#tme').setAttribute('aria-pressed',S.me);
 const nz=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase(),q=nz(S.q);
 let l=S.posts.filter(p=>(S.cat==='Todos'||p.c===S.cat)&&(!S.sv||S.saved[p.id])&&(!S.me||mine(p))&&(!q||nz(p.t+p.a+(p.loc||'')+p.x).includes(q)));
 l.sort(S.sort==='new'?(a,b)=>b.ts-a.ts:(a,b)=>MET[S.sort](b)-MET[S.sort](a));
 $('#cnt').textContent=`${l.length} ${l.length===1?'história':'histórias'}`;
 $('#grid').innerHTML=l.length?l.slice(0,S.n).map(card).join(''):`<div class="community-empty"><h3>Nada por aqui ainda</h3><p>${S.sv?'Salve histórias para encontrá-las aqui.':'Que tal contar a primeira história desta categoria?'}</p><a class="community-button community-button--small community-button--blue" href="#escrever">Escrever uma história</a></div>`;
 $('#more').parentElement.hidden=l.length<=S.n}
$('#chips').onclick=e=>{const b=e.target.closest('[data-c]');if(b){S.cat=b.dataset.c;S.n=6;feed()}};
$('#q').oninput=e=>{S.q=e.target.value.trim();S.n=6;feed()};$('#sort').onchange=e=>{S.sort=e.target.value;feed()};
$('#tsv').onclick=()=>{S.sv=!S.sv;S.n=6;feed()};$('#tme').onclick=()=>{S.me=!S.me;S.n=6;feed()};$('#more').onclick=()=>{S.n+=6;feed()};

// ============================================================
// NÚMEROS
// ============================================================
function cnt(el,to){const from=+el.textContent||0,t0=performance.now();if(from===to)return;const st=t=>{const k=Math.min(1,(t-t0)/800);el.textContent=Math.round(from+(to-from)*(1-Math.pow(1-k,3)));k<1&&requestAnimationFrame(st)};requestAnimationFrame(st)}
function stats(){const my=S.posts.filter(mine),v={posts:my.length,likes:my.reduce((a,p)=>a+p.l,0),saved:Object.keys(S.saved).length};
 $$('[data-s]').forEach(el=>cnt(el,v[el.dataset.s]));
 const g={posts:S.posts.length,likes:S.posts.reduce((a,p)=>a+p.l,0),cm:S.posts.reduce((a,p)=>a+p.cm.length,0)};$$('[data-g]').forEach(el=>cnt(el,g[el.dataset.g]))}

// ============================================================
// MODAL · HISTÓRIA (comentários só aparecem aqui)
// ============================================================
let openId=0;
const mhtml=p=>{const d=CATS[p.c],rot=p.rot||[],rel=S.posts.filter(x=>x.id!==p.id&&x.c===p.c).concat(S.posts.filter(x=>x.id!==p.id&&x.c!==p.c)).slice(0,2);
 return`<article data-id="${p.id}" style="--community-c:${d[1]}">
<div class="community-hm__capa"><img src="${src(p)}" alt="${esc(p.t)}"><button class="community-hm__salvar" data-a="sv" aria-pressed="${!!S.saved[p.id]}" aria-label="Salvar história">${ic('bookmark')}</button></div>
<div class="community-hm__corpo">
 <div class="community-hm__meta">${p.loc?`<span class="community-pill community-pill--local">${ic('pin')}${esc(p.loc)}</span>`:''}<span class="community-pill" style="background:${d[1]};color:${d[2]}">${ic(d[0])}${p.c}</span><span class="community-pill">${ic('clock')}${mins(p)} min de leitura</span><span class="community-pill">${ago(p.ts)}</span></div>
 <span class="community-hm__autor">${esc(p.a.trim().split(/\s+/).slice(0,2).join(' '))}</span>
 <h3 class="community-hm__titulo">${esc(p.t)}</h3>
 <p class="community-hm__texto">${esc(p.x)}</p>
 ${rot.length?`<div class="community-hm__roteiro"><h4>${ic('map')}Roteiro · ${rot.length} ${rot.length>1?'paradas':'parada'}</h4><ol>${rot.map((s,k)=>`<li><span>${k+1}</span><div><b>${esc(s.p)}</b>${s.d?`<small>${esc(s.d)}</small>`:''}</div></li>`).join('')}</ol></div>`:''}
</div>
<div class="community-hm__acoes"><button class="community-pilula" data-a="like" aria-pressed="${!!S.liked[p.id]}">${ic('heart')}${p.l} curtidas</button>${p.own?`<button class="community-pilula community-pilula--apagar" data-a="del">${ic('trash')}Excluir</button>`:''}</div>
<div class="community-coms"><h4>Comentários (${p.cm.length})</h4>${p.cm.map((c,k)=>{const key=p.id+':'+k,on=S.cl[key];return`<div class="community-com" style="animation-delay:${k*.05}s"><span class="community-avatar">${ini(c.a)}</span><div class="community-com__corpo"><span class="community-com__nome">${esc(c.a)}</span><p>${esc(c.t)}</p><div class="community-com__rodape"><span>${ago(c.ts)}</span><button class="community-com__curtir" data-cl="${key}" aria-pressed="${!!on}">${ic('heart')}${c.l+(on?1:0)}</button></div></div></div>`}).join('')}
<form class="community-compor" data-f="${p.id}"><span class="community-avatar">${ini(full())}</span><input placeholder="Escreva um comentário" maxlength="200" aria-label="Comentário"><button class="community-button community-button--small community-button--blue" type="submit">Enviar</button></form></div>
${rel.length?`<div class="community-continue"><h4>Continue lendo</h4><div class="community-continue__lista">${rel.map(x=>`<button data-open="${x.id}"><img src="${src(x)}" alt=""><span>${esc(x.t)}</span></button>`).join('')}</div></div>`:''}
</article>`};
function refM(){const p=S.posts.find(x=>x.id===openId);if(p){$('#mc').innerHTML=mhtml(p);$('#hm').style.setProperty('--community-c',CATS[p.c][1])}}
function openM(id){closeConta();openId=id;refM();$('#modal').hidden=false;document.body.style.overflow='hidden';$('#hm').scrollTop=0;$('#mx').focus()}
function closeM(){openId=0;$('#modal').hidden=true;document.body.style.overflow='';if(location.hash.startsWith('#post-'))history.replaceState(null,'',location.pathname+location.search)}
$('#mx').onclick=closeM;$('#modal').onclick=e=>{if(e.target.id==='modal')closeM()};
function upd(){feed();hl();stats();if(openId)refM();if(!contaEl.hidden&&['roteiros','blogs'].includes(contaSec))renderConta()}
function burst(b){const r=b.getBoundingClientRect();for(let i=0;i<8;i++){const s=document.createElement('span');s.className='community-burst';s.textContent='♥';s.style.left=r.left+r.width/2+'px';s.style.top=r.top+'px';s.style.setProperty('--community-x',(Math.random()*90-45)+'px');s.style.setProperty('--community-y2',-(30+Math.random()*60)+'px');root.appendChild(s);setTimeout(()=>s.remove(),850)}}

// ============================================================
// MODAL · CONTA (abre direto ao clicar no botão da navbar)
// ============================================================
const SECS=[['dados','Meus dados','user'],['conhecer','Conhecer lugares','compass'],['roteiros','Meus roteiros','map'],['blogs','Meus blogs','book'],['seguranca','Segurança','lock']];
let contaSec='dados';
const contaEl=$('#conta'),cbox=$('#cbox');
cbox.innerHTML=`<aside class="community-account-panel__sidebar"><div class="community-account-panel__profile"><span class="community-avatar" id="cav"></span><b id="cnome"></b><small>Viajante</small></div>
<nav class="community-account-panel__menu" id="cmenu">${SECS.map(s=>`<button class="community-account-panel__item" data-sec="${s[0]}">${ic(s[2])}${s[1]}</button>`).join('')}</nav></aside>
<div class="community-account-panel__main"><header class="community-account-panel__top"><span id="cico"></span><h2 id="ctit"></h2><button class="community-account-panel__close" id="cx" aria-label="Fechar">✕</button></header><div class="community-account-panel__content" id="cmain"></div></div>`;
function aplicaTema(){const t=TEMAS.find(x=>x.k===temaK)||TEMAS[0];['t','on','band','soft'].forEach(k=>cbox.style.setProperty('--'+k,t[k]));$$('[data-tema]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.tema===t.k))}
const item=p=>`<button class="community-mini" data-open="${p.id}" style="--community-c:${CATS[p.c][1]}"><img src="${src(p)}" alt=""><span><b>${esc(p.t)}</b><small>${p.loc?esc(p.loc)+' · ':''}${p.c}</small></span><em>${ic('heart')}${p.l}</em></button>`;
const vazio=(t,btn)=>`<div class="community-vazio">${t}${btn?`<br><button class="community-button community-button--small community-button--themed" data-go="escrever">Contar minha experiência</button>`:''}</div>`;
const VIEWS={
 dados:()=>`<h3>Cor do perfil</h3><div class="community-paleta">${TEMAS.map(t=>`<button class="community-cor" data-tema="${t.k}" style="--community-c:${t.t}" aria-label="${t.n}" title="${t.n}"></button>`).join('')}</div>
 <h3>Seus dados</h3><form class="community-account-panel__form" id="fdados" novalidate>
 <div class="community-form__row"><div class="community-form__field"><label for="d-nome">Nome</label><input class="community-form__input" id="d-nome" maxlength="30" autocomplete="given-name" value="${esc(P.nome)}"><div class="community-form__error" data-e="nome"></div></div><div class="community-form__field"><label for="d-sob">Sobrenome</label><input class="community-form__input" id="d-sob" maxlength="40" autocomplete="family-name" value="${esc(P.sobrenome)}"></div></div>
 <div class="community-form__field"><label for="d-email">E-mail</label><input class="community-form__input" id="d-email" type="email" autocomplete="email" value="${esc(P.email)}"><div class="community-form__error" data-e="email"></div></div>
 <div class="community-form__field"><label>Senha</label><div class="community-account-panel__password"><input class="community-form__input" type="password" value="••••••••" disabled aria-label="Senha"><button type="button" data-sec="seguranca">Alterar</button></div></div>
 <div class="community-form__field"><label for="d-end">Endereço</label><input class="community-form__input" id="d-end" maxlength="80" autocomplete="street-address" placeholder="Rua e número" value="${esc(P.end)}"></div>
 <div class="community-form__row"><div class="community-form__field"><label for="d-cid">Cidade</label><input class="community-form__input" id="d-cid" maxlength="40" value="${esc(P.cidade)}"></div><div class="community-form__field"><label for="d-uf">Estado</label><input class="community-form__input" id="d-uf" maxlength="2" placeholder="UF" value="${esc(P.uf)}"></div></div>
 <button class="community-button community-button--themed" type="submit">Salvar alterações</button></form>`,
 conhecer:()=>`<h3>Conhecer lugares · 0 locais</h3>${vazio('Você ainda não guardou lugares para conhecer depois. Em <b>Explorar outros locais</b>, use <b>Quero conhecer</b>.')}`,
 roteiros:()=>`<h3>Meu roteiro · 0 locais</h3>${vazio('Seu roteiro está vazio. Em <b>Explorar outros locais</b>, use <b>Adicionar ao roteiro</b>.')}
  <h3>Roteiros salvos de outras pessoas</h3>${vazio('Você ainda não salvou roteiros. Use <b>Salvar roteiro</b> na seção Roteiros.')}`,
 blogs:()=>{const mh=S.posts.filter(mine),sh=S.posts.filter(p=>S.saved[p.id]&&!mine(p));
  return`<h3>Minhas histórias · ${mh.length}</h3>${mh.length?`<div class="community-lista-mini">${mh.map(item).join('')}</div>`:vazio('Você ainda não contou nenhuma experiência.',1)}
  <h3>Histórias salvas de outras pessoas · ${sh.length}</h3>${sh.length?`<div class="community-lista-mini">${sh.map(item).join('')}</div>`:vazio('Você ainda não salvou histórias. Nos cards da comunidade, use o botão de <b>salvar</b>.')}`},
 seguranca:()=>`<h3>Alterar senha</h3><form class="community-account-panel__form" id="fsenha" novalidate>
 <div class="community-form__field"><label for="s-nova">Nova senha</label><input class="community-form__input" id="s-nova" type="password" autocomplete="new-password" placeholder="Mínimo de 8 caracteres"><div class="community-form__error" data-e="nova"></div></div>
 <div class="community-form__field"><label for="s-conf">Confirmar nova senha</label><input class="community-form__input" id="s-conf" type="password" autocomplete="new-password"><div class="community-form__error" data-e="conf"></div></div>
 <button class="community-button community-button--themed" type="submit">Salvar nova senha</button></form>
 <h3>Esqueceu a senha?</h3><p style="margin:0 0 .8rem;font-weight:700;color:var(--community-muted)">Enviamos um link de redefinição para <b style="color:var(--community-navy)">${esc(P.email)}</b>.</p><button class="community-button community-button--small community-button--ghost" data-forgot>Enviar link</button>
 <h3>Sair da conta</h3><button class="community-button community-perigo community-button--small" data-sair>${ic('x')}Sair da conta</button>`};
function renderConta(){const s=SECS.find(x=>x[0]===contaSec);
 $$('.community-account-panel__item').forEach(b=>b.setAttribute('aria-current',b.dataset.sec===contaSec));
 $('#cico').innerHTML=ic(s[2]);$('#ctit').textContent=s[1];$('#cmain').innerHTML=VIEWS[contaSec]();aplicaTema();refUser()}
function openConta(sec){if(sec)contaSec=sec;contaEl.hidden=false;document.body.style.overflow='hidden';renderConta()}
function closeConta(){if(contaEl.hidden)return;contaEl.hidden=true;if(!openId)document.body.style.overflow=''}
$('#abtn').onclick=()=>openConta('dados');
contaEl.addEventListener('click',e=>{
 if(e.target===contaEl||e.target.closest('#cx'))return closeConta();
 const s=e.target.closest('[data-sec]');if(s){contaSec=s.dataset.sec;return renderConta()}
 const t=e.target.closest('[data-tema]');if(t){temaK=t.dataset.tema;try{localStorage.setItem(TK,temaK)}catch{/* A troca de tema continua ativa durante esta sessão. */}return aplicaTema()}
 if(e.target.closest('[data-go]')){closeConta();return $('#escrever').scrollIntoView()}
 if(e.target.closest('[data-forgot]'))return toast('Link de redefinição enviado para '+P.email);
 if(e.target.closest('[data-sair]')){closeConta();$('#out').classList.add('is-visible')}});
contaEl.addEventListener('submit',e=>{e.preventDefault();const f=e.target;
 if(f.id==='fdados'){const nome=$('#d-nome').value.trim(),em=$('#d-email').value.trim();
  erro('nome',nome?'':'Informe seu nome.');erro('email',/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)?'':'Informe um e-mail válido.');if(!nome||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em))return;
  P={nome,sobrenome:$('#d-sob').value.trim(),email:em,end:$('#d-end').value.trim(),cidade:$('#d-cid').value.trim(),uf:$('#d-uf').value.trim().toUpperCase()};
  try{localStorage.setItem(PK,JSON.stringify(P))}catch{/* Os dados permanecem atualizados nesta sessão. */}refUser();toast('Dados atualizados nesta sessão!')}
 if(f.id==='fsenha'){const a=$('#s-nova').value,b=$('#s-conf').value;erro('nova',a.length<8?'Use ao menos 8 caracteres.':'');erro('conf',b!==a?'As senhas não conferem.':'');if(a.length<8||b!==a)return;f.reset();toast('Senhas validadas. A alteração definitiva depende do serviço de autenticação.')}});

// ============================================================
// CLIQUES GERAIS (curtir, salvar, excluir, abrir história)
// ============================================================
root.addEventListener('keydown',e=>{if(e.key!=='Escape')return;if(!rmodal.hidden)closeR();else if(!contaEl.hidden)closeConta();else if(openId)closeM()});
root.addEventListener('click',e=>{
 const cl=e.target.closest('[data-cl]');if(cl){const k=cl.dataset.cl;S.cl[k]?delete S.cl[k]:S.cl[k]=1;save();refM();return}
 const b=e.target.closest('[data-a]');
 if(b){const id=+b.closest('[data-id]').dataset.id,p=S.posts.find(x=>x.id===id),a=b.dataset.a;
  if(a==='like'){const on=!S.liked[id];on?(S.liked[id]=1,p.l++,burst(b)):(delete S.liked[id],p.l--);save();upd();$$(`[data-id="${id}"] [data-a=like]`).forEach(x=>x.classList.add('community-bp'))}
  if(a==='sv'){const on=!S.saved[id];on?(S.saved[id]=1,p.s++):(delete S.saved[id],p.s=Math.max(0,p.s-1));save();upd();toast(on?'História salva em Meus blogs':'Removida dos salvos')}
  if(a==='del'&&confirm('Excluir esta história?')){S.posts=S.posts.filter(x=>x.id!==id);save();closeM();upd();toast('História excluída')}
  return}
 const o=e.target.closest('[data-open]');if(o)openM(+o.dataset.open)});
root.addEventListener('submit',e=>{const f=e.target.closest('[data-f]');if(!f)return;e.preventDefault();const i=f.querySelector('input'),v=i.value.trim();if(!v)return;
 S.posts.find(x=>x.id===+f.dataset.f).cm.push({a:P.nome,t:v,l:0,ts:Date.now()});save();upd();toast('Comentário enviado')});

// janelas do rodapé
const dlg=$('#dlg'),db=$('#db'),EM=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FAQ=[['O Rota Cultural é gratuito?','Sim. Explorar destinos, filtrar locais e participar da comunidade não custam nada.'],['Como funcionam os destaques?','Os rankings mostram as histórias mais curtidas, comentadas e salvas, além da seleção feita pela equipe Rota Cultural.'],['Posso excluir minha história?','Sim, a qualquer momento, pelo botão “Excluir” dos seus próprios posts.'],['Os preços e horários estão atualizados?','Os valores são referenciais. Confirme sempre no canal oficial da atração antes de ir.']];
function view(k){dlg.showModal();
 if(k==='faq')db.innerHTML=`<h2>Perguntas frequentes</h2><p class="community-section__lead" style="margin:.4rem 0 1rem">As dúvidas mais comuns sobre a comunidade.</p>${FAQ.map(q=>`<details><summary>${q[0]}</summary><p>${q[1]}</p></details>`).join('')}`;
 else if(k==='terms')db.innerHTML=`<h2>Termos de uso</h2><p class="community-section__lead" style="margin:.4rem 0 1rem">Resumo das regras da comunidade.</p><details open><summary>Conteúdo</summary><p>Fale de experiências reais, sem divulgar dados pessoais. Conteúdo ofensivo pode ser removido.</p></details><details open><summary>Privacidade</summary><p>Usamos seus dados apenas para operar sua conta e melhorar sua experiência.</p></details>`;
 else db.innerHTML=`<h2>Fale conosco</h2><p class="community-section__lead" style="margin:.4rem 0 1rem">Conte como podemos ajudar. Respondemos por e-mail.</p><form id="cf2" novalidate><div class="community-form__field"><label>E-mail<input class="community-form__input" name="e" type="email" autocomplete="email"></label><div class="community-form__error" data-x="e"></div></div><div class="community-form__field"><label>Mensagem<textarea class="community-form__input" name="m"></textarea></label><div class="community-form__error" data-x="m"></div></div><button class="community-button community-button--blue" type="submit">Enviar mensagem</button></form>`}
root.addEventListener('click',e=>{if(e.target.closest('[data-action=close-dialog]')){dlg.close();return}const d=e.target.closest('[data-dlg]');if(d){e.preventDefault();view(d.dataset.dlg)}if(e.target===dlg)dlg.close()});
dlg.addEventListener('submit',e=>{e.preventDefault();const f=e.target,v=Object.fromEntries(new FormData(f));let bad=false;
 const s=(k,m)=>{f.querySelector(`[data-x=${k}]`).textContent=m||'';if(m)bad=true};s('e',EM.test(v.e)?'':'Informe um e-mail válido.');s('m',v.m.trim().length<10?'Escreva ao menos 10 caracteres.':'');if(bad)return;
 db.innerHTML=`<h2>Mensagem enviada!</h2><p class="community-section__lead" style="margin:.4rem 0 1rem">Responderemos em <b>${esc(v.e)}</b>.</p><button class="community-button community-button--blue" data-action="close-dialog">Fechar</button>`});

// ============================================================
// ENTRADA
// ============================================================
$$('.community-marquee .community-marquee__track').forEach(t=>{t.innerHTML+=t.innerHTML;t.innerHTML+=t.innerHTML});// repete os nomes para o loop não ter falha
$$('img[data-i]').forEach(i=>i.src=IMG[i.dataset.i]);
const io='IntersectionObserver'in window?new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add('is-visible');io.unobserve(en.target)}}),{threshold:.15}):null;
$$('.community-reveal,.community-rule-card').forEach(el=>io?io.observe(el):el.classList.add('is-visible'));
refUser();upd();
if(location.hash.startsWith('#post-')){const id=+location.hash.slice(6);if(S.posts.some(p=>p.id===id))openM(id)}


  return () => {
    if (io) io.disconnect();
    document.body.style.overflow = "";
  };
}
