/* ==========================================================================
   CAMADA RC | Conta, sessão, favoritos, locais, roteiros e utilitários.
   Mantém a API global window.RC utilizada pela página Local original.
========================================================================== */
export function initializeLocationCore() {
  if (window.RC) return window.RC;

/* =====================================================================
   Rota Cultural — camada compartilhada entre TODAS as páginas.
   Contas, sessão, favoritos, locais, plano de recomendação, cabeçalho e
   painel de demonstração. Tudo salvo no localStorage (protótipo front-end):
   quando houver servidor, troque as funções RC.* por chamadas à API.
   ===================================================================== */

'use strict';
const RC=window.RC={};
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
RC.$=$;RC.$$=$$;RC.esc=esc;

/* ---------- configuração (edite aqui) ---------- */
RC.config={
  inline:false,                                // true = login, menu e ações abrem DENTRO da página (usado na tela Local)
  demo:false,                                   // false = esconde o painel "Modo demonstração"
  social:{ig:'https://www.instagram.com/',fb:'https://www.facebook.com/'},
  whatsapp:'',                                 // ex.: '5511999999999' (com DDI+DDD)
  whatsappText:'Olá! Vim pelo site Rota Cultural.',
  videoId:''                                   // ID de um vídeo do YouTube; vazio = passeio em fotos
};

/* ---------- armazenamento ---------- */
const mem={};let ls=null;try{const t='__rc';localStorage.setItem(t,'1');localStorage.removeItem(t);ls=localStorage}catch{/* Usa memória temporária quando o navegador bloqueia o localStorage. */}
RC.memoryMode=!ls;
const raw={get:k=>ls?ls.getItem(k):(k in mem?mem[k]:null),set:(k,v)=>{if(ls)ls.setItem(k,v);else mem[k]=v},del:k=>{if(ls)ls.removeItem(k);else delete mem[k]}};
const J={get(k,d){try{const v=raw.get(k);return v==null?d:JSON.parse(v)}catch{return d}},
         set(k,v){try{raw.set(k,JSON.stringify(v));return true}catch{return false}}};
RC.store=J;

/* ---------- constantes ---------- */
const LVL={visitante:0,usuario:1,morador:2,admin:3};
RC.LVL=LVL;
RC.ROLE_LABEL={visitante:'Visitante',usuario:'Viajante',morador:'Nativo',admin:'Administrador'};
RC.THEME_LABEL={natureza:'Natureza',historico:'Histórico',praias:'Praias',cidades:'Cidades',aventura:'Aventura',montanhas:'Montanhas',amazonia:'Amazônia',romanticos:'Românticos'};
RC.THEME_CAT={natureza:'Natureza',historico:'Histórico',praias:'Praias',cidades:'Cidades',aventura:'Aventura',montanhas:'Natureza',amazonia:'Natureza',romanticos:'Cidades'};
RC.SEED=[
 {s:'campeche',n:'Praia do Campeche',l:'Florianópolis, SC',c:'Praias',p:'Gratuito',tema:'praias'},
 {s:'pelourinho',n:'Pelourinho',l:'Salvador, BA',c:'Histórico',p:'Gratuito',tema:'historico'},
 {s:'ouro-preto',n:'Centro Histórico de Ouro Preto',l:'Ouro Preto, MG',c:'Histórico',p:'Gratuito',tema:'romanticos'},
 {s:'paulista',n:'Avenida Paulista',l:'São Paulo, SP',c:'Cidades',p:'Gratuito',tema:'cidades'},
 {s:'pao-de-acucar',n:'Pão de Açúcar',l:'Rio de Janeiro, RJ',c:'Cidades',p:'Pago',tema:'montanhas'},
 {s:'chapada-diamantina',n:'Chapada Diamantina',l:'Lençóis, BA',c:'Natureza',p:'Pago',tema:'natureza'},
 {s:'tirolesa-brotas',n:'Tirolesa na floresta',l:'Brotas, SP',c:'Aventura',p:'Pago',tema:'aventura'},
 {s:'amazonia-reserva',n:'Reserva na Amazônia',l:'Manaus, AM',c:'Natureza',p:'Pago',tema:'amazonia'}];

/* ---------- utilidades ---------- */
RC.slug=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
RC.ago=t=>{const d=Math.max(0,Date.now()-t)/60000;if(d<1)return'agora';if(d<60)return`há ${Math.floor(d)} min`;if(d<1440)return`há ${Math.floor(d/60)} h`;return`há ${Math.floor(d/1440)} d`};
RC.fmtDate=t=>new Date(t).toLocaleDateString('pt-BR');
RC.emailOk=v=>/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v).trim());
RC.pwErr=p=>p.length<8?'A senha precisa ter pelo menos 8 caracteres.':(!/[A-Za-z]/.test(p)||!/\d/.test(p))?'Use letras e números na senha.':'';
RC.cpfOk=v=>{v=String(v).replace(/\D/g,'');if(v.length!==11||/^(\d)\1+$/.test(v))return false;const c=n=>{let s=0;for(let i=0;i<n;i++)s+=+v[i]*(n+1-i);const r=(s*10)%11;return r===10?0:r};return c(9)===+v[9]&&c(10)===+v[10]};
RC.maskCpf=v=>{v=String(v).replace(/\D/g,'').slice(0,11);return v.replace(/(\d{3})(\d)/,'$1.$2').replace(/(\d{3})(\d)/,'$1.$2').replace(/(\d{3})(\d{1,2})$/,'$1-$2')};
RC.maskCep=v=>{v=String(v).replace(/\D/g,'').slice(0,8);return v.replace(/(\d{5})(\d)/,'$1-$2')};
RC.download=(name,text,mime='text/csv;charset=utf-8')=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob(['\ufeff'+text],{type:mime}));a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},500)};
RC.csv=rows=>rows.map(r=>r.map(c=>`"${String(c==null?'':c).replace(/"/g,'""')}"`).join(';')).join('\n');
RC.resizeImage=(file,max=900,q=.78)=>new Promise((res,rej)=>{if(!/^image\//.test(file.type))return rej(new Error('Arquivo não é uma imagem.'));const r=new FileReader();r.onerror=()=>rej(new Error('Falha ao ler o arquivo.'));r.onload=()=>{const im=new Image();im.onerror=()=>rej(new Error('Imagem inválida.'));im.onload=()=>{const k=Math.min(1,max/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.round(im.width*k);c.height=Math.round(im.height*k);c.getContext('2d').drawImage(im,0,0,c.width,c.height);res(c.toDataURL('image/jpeg',q))};im.src=r.result};r.readAsDataURL(file)});
RC.lookupCep=async cep=>{cep=String(cep).replace(/\D/g,'');if(cep.length!==8)return{ok:false,error:'CEP inválido (8 dígitos).'};
 try{const c=new AbortController(),t=setTimeout(()=>c.abort(),6000);const r=await fetch(`https://viacep.com.br/ws/${cep}/json/`,{signal:c.signal});clearTimeout(t);const d=await r.json();
  if(d.erro)return{ok:false,error:'CEP não encontrado.'};return{ok:true,cidade:d.localidade,uf:d.uf,bairro:d.bairro,logradouro:d.logradouro}}
 catch{return{ok:false,offline:true,error:'Não foi possível consultar o CEP agora. Preencha cidade e UF manualmente.'}}};

/* ---------- criptografia (protótipo!) ---------- */
async function sha(str){
 if(window.crypto&&crypto.subtle){const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(str));return[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}
 let h=5381;for(const c of str)h=((h<<5)+h+c.charCodeAt(0))|0;return'f'+(h>>>0).toString(16);
}
const rnd=()=>{const a=new Uint8Array(8);window.crypto&&crypto.getRandomValues?crypto.getRandomValues(a):a.forEach((_,i)=>a[i]=Math.random()*255);return[...a].map(x=>x.toString(16).padStart(2,'0')).join('')};

/* ---------- contas e sessão ---------- */
RC.users=()=>J.get('rc_users',[]);
const saveUsers=u=>J.set('rc_users',u);
RC.session=()=>J.get('rc_session',null);
RC.user=()=>{const s=RC.session();return s?(RC.users().find(u=>u.id===s.uid)||null):null};
RC.role=()=>(RC.user()||{}).role||'visitante';
RC.can=min=>LVL[RC.role()]>=LVL[min];
const emit=()=>{renderHeader();syncDemo();window.dispatchEvent(new CustomEvent('rc:session'))};
const setSession=uid=>J.set('rc_session',{uid,ts:Date.now()});
RC.register=async d=>{
 const nome=String(d.nome||'').trim().replace(/\s+/g,' '),email=String(d.email||'').trim().toLowerCase(),cpf=String(d.cpf||'').replace(/\D/g,''),pw=String(d.senha||'');
 const users=RC.users();
 if(nome.length<3||!/\s/.test(nome))return{ok:false,field:'nome',error:'Informe nome e sobrenome.'};
 if(!RC.emailOk(email))return{ok:false,field:'email',error:'Informe um e-mail válido.'};
 if(users.some(u=>u.email===email))return{ok:false,field:'email',error:'Este e-mail já está cadastrado.'};
 if(!RC.cpfOk(cpf))return{ok:false,field:'cpf',error:'CPF inválido.'};
 const cpfHash=await sha('cpf:'+cpf);
 if(users.some(u=>u.cpfHash===cpfHash))return{ok:false,field:'cpf',error:'Este CPF já está cadastrado.'};
 const pe=RC.pwErr(pw);if(pe)return{ok:false,field:'senha',error:pe};
 if(pw!==d.confirma)return{ok:false,field:'confirma',error:'As senhas não conferem.'};
 if(!String(d.cidade||'').trim()||!/^[A-Za-z]{2}$/.test(String(d.uf||'').trim()))return{ok:false,field:'cep',error:'Informe o CEP (ou cidade e UF) para validar a localidade.'};
 const salt=rnd(),user={id:'u'+Date.now().toString(36)+rnd().slice(0,4),nome,email,cpfHash,cpfMask:'•••.•••.•••-'+cpf.slice(9),salt,hash:await sha(salt+pw),
  role:d.nativo?'morador':'usuario',cep:String(d.cep||'').replace(/\D/g,''),cidade:String(d.cidade).trim(),uf:String(d.uf).trim().toUpperCase(),cepOk:!!d.cepOk,nativo:!!d.nativo,created:Date.now(),favs:[]};
 users.push(user);if(!saveUsers(users))return{ok:false,error:'Não foi possível salvar (armazenamento cheio).'};
 setSession(user.id);emit();return{ok:true,user};
};
RC.login=async(email,pw)=>{
 email=String(email||'').trim().toLowerCase();const att=J.get('rc_att',{n:0,until:0});
 if(Date.now()<att.until)return{ok:false,error:`Muitas tentativas. Tente de novo em ${Math.ceil((att.until-Date.now())/1000)} s.`};
 const u=RC.users().find(x=>x.email===email),ok=u&&(await sha(u.salt+pw))===u.hash;
 if(!ok){att.n=(att.n||0)+1;if(att.n>=5){att.until=Date.now()+30000;att.n=0}J.set('rc_att',att);return{ok:false,error:'E-mail ou senha incorretos.'}}
 J.set('rc_att',{n:0,until:0});setSession(u.id);emit();return{ok:true,user:u};
};
RC.loginAs=uid=>{if(!RC.users().some(u=>u.id===uid))return false;setSession(uid);emit();return true};
RC.logout=()=>{try{raw.del('rc_session')}catch{/* A sessão temporária já será descartada ao recarregar. */}emit()};
RC.updateUser=(uid,patch)=>{const us=RC.users(),u=us.find(x=>x.id===uid);if(!u)return false;Object.assign(u,patch);saveUsers(us);emit();return true};
RC.changePassword=async(uid,old,nw)=>{const us=RC.users(),u=us.find(x=>x.id===uid);if(!u)return{ok:false,error:'Conta não encontrada.'};
 if((await sha(u.salt+old))!==u.hash)return{ok:false,field:'atual',error:'Senha atual incorreta.'};const pe=RC.pwErr(nw);if(pe)return{ok:false,field:'nova',error:pe};
 u.salt=rnd();u.hash=await sha(u.salt+nw);saveUsers(us);return{ok:true}};
RC.deleteUser=uid=>{saveUsers(RC.users().filter(u=>u.id!==uid));const s=RC.session();if(s&&s.uid===uid)RC.logout();else emit();return true};
RC.setRole=(uid,role)=>RC.updateUser(uid,{role});
/* recuperação de senha (sem e-mail real: o código aparece na tela, só para teste) */
RC.resetStart=async email=>{email=String(email||'').trim().toLowerCase();if(!RC.emailOk(email))return{ok:false,error:'Informe um e-mail válido.'};
 const u=RC.users().find(x=>x.email===email);if(!u)return{ok:true,found:false};
 const code=String(Math.floor(100000+Math.random()*900000));J.set('rc_reset',{email,h:await sha('rst:'+code),exp:Date.now()+10*60000,tries:0});return{ok:true,found:true,code}};
RC.resetFinish=async(email,code,pw,conf)=>{email=String(email||'').trim().toLowerCase();const r=J.get('rc_reset',null);
 if(!r||r.email!==email||Date.now()>r.exp)return{ok:false,field:'codigo',error:'Código expirado. Peça um novo.'};
 if(r.tries>=5){J.set('rc_reset',null);return{ok:false,field:'codigo',error:'Muitas tentativas. Peça um novo código.'}}
 if((await sha('rst:'+String(code).trim()))!==r.h){r.tries++;J.set('rc_reset',r);return{ok:false,field:'codigo',error:'Código incorreto.'}}
 const pe=RC.pwErr(pw);if(pe)return{ok:false,field:'senha',error:pe};if(pw!==conf)return{ok:false,field:'confirma',error:'As senhas não conferem.'};
 const us=RC.users(),u=us.find(x=>x.email===email);if(!u)return{ok:false,error:'Conta não encontrada.'};
 u.salt=rnd();u.hash=await sha(u.salt+pw);saveUsers(us);J.set('rc_reset',null);return{ok:true}};

/* ---------- contas de teste (usadas pelo "Modo demonstração") ---------- */
const DEMO=[
 {id:'demo-usuario',nome:'Viajante Demo',email:'viajante@demo.com',pw:'123',role:'usuario',cidade:'São Paulo',uf:'SP'},
 {id:'demo-morador',nome:'Nativo Demo',email:'nativo@demo.com',pw:'123',role:'morador',cidade:'Florianópolis',uf:'SC',nativo:true},
 {id:'demo-admin',nome:'Admin Demo',email:'admin@demo.com',pw:'123',role:'admin',cidade:'São Paulo',uf:'SP'}];
RC.DEMO=DEMO;
RC.ready=(async()=>{
 let us=RC.users();let ch=false;if(!J.get('rc_demo_v2',false)){us=us.filter(u=>!String(u.id).startsWith('demo-'));J.set('rc_demo_v2',true);ch=true}
 for(const d of DEMO){if(us.some(u=>u.id===d.id))continue;const salt=rnd();us.push({id:d.id,nome:d.nome,email:d.email,cpfHash:'demo-'+d.id,cpfMask:'(conta de teste)',salt,hash:await sha(salt+d.pw),role:d.role,cep:'',cidade:d.cidade,uf:d.uf,cepOk:true,nativo:!!d.nativo,created:Date.now(),favs:[]});ch=true}
 if(ch)saveUsers(us);
})();

/* ---------- favoritos ---------- */
RC.isFav=s=>{const u=RC.user();return !!(u&&u.favs&&u.favs.includes(s))};
RC.favs=()=>(RC.user()||{}).favs||[];
RC.toggleFav=s=>{const u=RC.user();if(!u)return null;const us=RC.users(),me=us.find(x=>x.id===u.id);me.favs=me.favs||[];const i=me.favs.indexOf(s);i>=0?me.favs.splice(i,1):me.favs.push(s);saveUsers(us);return i<0};

/* ---------- Meu roteiro (locais que a pessoa quer visitar; funciona até sem login) ---------- */
RC.route=()=>{const u=RC.user();return u?(u.route||[]):J.get('rc_route_anon',[])};
RC.inRoute=s=>RC.route().includes(s);
RC.toggleRoute=s=>{const u=RC.user(),r=RC.route().slice(),i=r.indexOf(s);i>=0?r.splice(i,1):r.push(s);
 if(u){const us=RC.users();us.find(x=>x.id===u.id).route=r;saveUsers(us)}else J.set('rc_route_anon',r);return i<0};

/* ---------- locais (semente + cadastrados pelos usuários) ---------- */
RC.userPlaces=()=>J.get('rc_places',[]);
RC.savePlaces=p=>J.set('rc_places',p);
RC.stories=()=>J.get('rc_stories',[]);RC.saveStories=a=>J.set('rc_stories',a);
const localState=()=>J.get('rc_local_v1',{});
RC.seedStatus=s=>((localState().status)||{})[s]||'aprovado';
RC.setSeedStatus=(s,v)=>{const S=localState();S.status=S.status||{};S.status[s]=v;J.set('rc_local_v1',S)};
RC.placeStatus=s=>{const u=RC.userPlaces().find(p=>p.slug===s);return u?u.status:RC.seedStatus(s)};
RC.setPlaceStatus=(s,v)=>{const ps=RC.userPlaces(),p=ps.find(x=>x.slug===s);if(p){p.status=v;RC.savePlaces(ps)}else RC.setSeedStatus(s,v)};
RC.catsOff=()=>J.get('rc_cats_off',[]);
RC.setCatsOff=a=>J.set('rc_cats_off',a);
RC.places=()=>{
 const seeds=RC.SEED.filter(p=>RC.seedStatus(p.s)==='aprovado');
 const us=RC.userPlaces().filter(p=>p.status==='aprovado').map(p=>({s:p.slug,n:p.n,l:p.loc,c:RC.THEME_CAT[p.tema]||'Cidades',p:p.pago?'Pago':'Gratuito',tema:p.tema,user:true}));
 return seeds.concat(us);
};
RC.allPlacesAdmin=()=>RC.SEED.map(p=>({...p,status:RC.seedStatus(p.s),seed:true})).concat(RC.userPlaces().map(p=>({s:p.slug,n:p.n,l:p.loc,c:RC.THEME_CAT[p.tema]||'',p:p.pago?'Pago':'Gratuito',tema:p.tema,status:p.status,owner:p.owner,user:true})));
RC.placeInfo=s=>RC.allPlacesAdmin().find(p=>p.s===s)||null;

/* ---------- plano de recomendação ---------- */
RC.plan=()=>{const u=RC.user();return u?(u.plan||null):J.get('rc_plan_anon',null)};
RC.savePlan=p=>{const u=RC.user();if(u){const us=RC.users();us.find(x=>x.id===u.id).plan=p;saveUsers(us)}else J.set('rc_plan_anon',p)};
RC.recommend=({perfil,preco,cidade})=>{
 const favCats=RC.favs().map(s=>(RC.placeInfo(s)||{}).c);
 return RC.places().map(p=>{let sc=0;
  if(perfil&&p.c===perfil)sc+=4;if(perfil&&RC.THEME_LABEL[p.tema]===perfil)sc+=2;
  if(preco==='gratuito'){if(p.p==='Gratuito')sc+=2;else sc-=3}
  if(cidade&&p.l.toLowerCase().includes(cidade.toLowerCase()))sc+=3;
  if(favCats.includes(p.c))sc+=1;return{...p,score:sc}}).sort((a,b)=>b.score-a.score||a.n.localeCompare(b.n)).filter((p,i)=>p.score>0||i<3).slice(0,4);
};

/* ---------- mensagens e interesses ---------- */
RC.push=(key,item)=>{const a=J.get(key,[]);a.unshift(item);return J.set(key,a.slice(0,500))};

/* ---------- avisos e diálogos ---------- */
let tt;RC.toast=m=>{let t=$('#gtoast');if(!t){t=document.createElement('div');t.id='gtoast';t.className='location-toast';t.setAttribute('role','status');t.setAttribute('aria-live','polite');(document.querySelector('.location-page')||document.body).appendChild(t)}
 t.textContent=m;t.classList.add('is-visible');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('is-visible'),3000)};
const nextUrl=()=>encodeURIComponent(location.pathname.split('/').pop()+location.search+location.hash);
RC.loginUrl=(hash='entrar')=>`login.html?next=${nextUrl()}#${hash}`;
const ic=n=>`<svg class="location-icon" aria-hidden="true"><use href="#i-${n}"/></svg>`;
RC.ic=ic;
/* RC.need('favoritar') → true se pode; senão abre o convite para entrar */
RC.need=(what,min='usuario')=>{
 if(RC.can(min))return true;
 if(RC.role()!=='visitante'){RC.toast(`Seu perfil (${RC.ROLE_LABEL[RC.role()]}) não tem acesso a esta ação.`);return false}
 if(RC.config.inline){RC.openAuth('entrar',what);return false}
 let d=$('#rcLogin');if(!d){d=document.createElement('dialog');d.id='rcLogin';d.className='location-auth-dialog';(document.querySelector('.location-page')||document.body).appendChild(d)}
 d.innerHTML=`<form method="dialog"><h3>${ic('lock')}Entre para ${esc(what)}</h3><p>Crie uma conta gratuita ou entre para continuar. Leva menos de um minuto.</p>
  <div class="location-auth-dialog__actions"><a class="location-button" href="${RC.loginUrl('entrar')}">Entrar</a><a class="location-button location-button--ghost" href="${RC.loginUrl('cadastrar')}">Criar conta</a>
  ${RC.config.demo?`<button type="button" class="location-button location-button--ghost" data-demo="usuario">Entrar como usuário de teste</button>`:''}<button class="location-button location-button--ghost" value="x">Agora não</button></div></form>`;
 d.showModal();return false;
};
document.addEventListener('click',e=>{const b=e.target.closest('#rcLogin [data-demo]');if(b){RC.loginAs('demo-'+b.dataset.demo);$('#rcLogin').close();RC.toast('Você entrou como usuário de teste. Repita a ação.')}});
/* protege páginas: visitante → login; sem permissão → início */
RC.guard=min=>{
 if(RC.can(min))return true;
 if(RC.role()==='visitante'){location.replace(`login.html?next=${nextUrl()}#entrar`)}
 else{sessionStorage.setItem('rc_flash','Seu perfil não tem acesso a essa página.');location.replace('index.html')}
 return false;
};


/* ---------- janela de login / cadastro / recuperar senha (usada quando RC.config.inline = true) ---------- */
const AUTH_HTML=()=>`<button class="location-auth-dialog__close" type="button" data-x aria-label="Fechar">${ic('x')}</button>
<section data-v="entrar"><h3>${ic('key')}Entrar</h3><p data-why>Acesse sua conta para favoritar, avaliar e cadastrar locais.</p>
 <form class="location-auth-form" data-f="login" novalidate><label>E-mail<input name="email" type="email" autocomplete="email"><span class="location-auth-form__error" data-for="email"></span></label>
 <label>Senha<span class="location-auth-form__password"><input name="senha" type="password" autocomplete="current-password"><button type="button" data-eye aria-label="Mostrar senha">${ic('eye')}</button></span><span class="location-auth-form__error" data-for="senha"></span></label>
 <p class="location-auth-form__error" data-for="geral" role="alert"></p><button class="location-button" type="submit">Logar</button>
 <p class="location-auth-dialog__subtitle"><button type="button" class="location-linkbtn" data-go="recuperar">Esqueci a senha</button> · <button type="button" class="location-linkbtn" data-go="cadastrar">Criar conta</button></p></form>
 <div class="location-auth-dialog__demo"><b>Contas de teste (senha 123):</b><button type="button" data-fill="viajante@demo.com|123">Viajante</button><button type="button" data-fill="nativo@demo.com|123">Nativo</button><button type="button" data-fill="admin@demo.com|123">Admin</button></div></section>
<section data-v="cadastrar" hidden><h3>${ic('user')}Criar conta</h3><p>É gratuito e leva menos de um minuto.</p>
 <form class="location-auth-form" data-f="reg" novalidate>
  <label>Nome completo<input name="nome" autocomplete="name"><span class="location-auth-form__error" data-for="nome"></span></label>
  <label>E-mail<input name="email" type="email" autocomplete="email"><span class="location-auth-form__error" data-for="email"></span></label>
  <div class="location-auth-form__row"><label>CPF<input name="cpf" inputmode="numeric" maxlength="14" placeholder="000.000.000-00" autocomplete="off"><span class="location-auth-form__error" data-for="cpf"></span></label>
  <label>CEP<input name="cep" inputmode="numeric" maxlength="9" placeholder="00000-000" autocomplete="postal-code"><span class="location-auth-form__error" data-for="cep"></span></label></div>
  <button class="location-button location-button--ghost" type="button" data-cep>${ic('pin')}Autenticar localidade</button><p class="location-auth-dialog__subtitle" data-cepmsg>Consultamos o CEP para confirmar a sua cidade.</p>
  <div class="location-auth-form__row"><label>Cidade<input name="cidade"></label><label>UF<input name="uf" maxlength="2" style="text-transform:uppercase"></label></div>
  <div class="location-auth-form__row"><label>Senha<span class="location-auth-form__password"><input name="senha" type="password" autocomplete="new-password"><button type="button" data-eye aria-label="Mostrar senha">${ic('eye')}</button></span><span class="location-auth-form__error" data-for="senha"></span></label>
  <label>Confirmar senha<input name="confirma" type="password" autocomplete="new-password"><span class="location-auth-form__error" data-for="confirma"></span></label></div>
  <label class="location-rccheck"><input type="checkbox" name="nativo"><span>Sou <b>nativo(a)</b> desta cidade (posso escrever dicas e cadastrar locais).</span></label>
  <label class="location-rccheck"><input type="checkbox" name="termos"><span>Li e aceito os termos de uso e a política de privacidade.</span></label><span class="location-auth-form__error" data-for="termos"></span>
  <p class="location-auth-form__error" data-for="geral" role="alert"></p><button class="location-button" type="submit">Criar usuário</button>
  <p class="location-auth-dialog__subtitle">Já tem conta? <button type="button" class="location-linkbtn" data-go="entrar">Entrar</button></p></form></section>
<section data-v="recuperar" hidden><h3>${ic('key')}Recuperar senha</h3>
 <form class="location-auth-form" data-f="rec1" novalidate><p>Informe o e-mail da conta. Enviaremos um código de verificação.</p><label>E-mail<input name="email" type="email"><span class="location-auth-form__error" data-for="email"></span></label>
  <button class="location-button" type="submit">Recuperar senha</button><p class="location-auth-dialog__subtitle"><button type="button" class="location-linkbtn" data-go="entrar">Voltar para entrar</button></p></form>
 <form class="location-auth-form" data-f="rec2" novalidate hidden><p class="location-auth-dialog__note" data-code></p><label>Código de 6 dígitos<input name="codigo" inputmode="numeric" maxlength="6"><span class="location-auth-form__error" data-for="codigo"></span></label>
  <label>Nova senha<input name="senha" type="password" autocomplete="new-password"><span class="location-auth-form__error" data-for="senha"></span></label><label>Confirmar nova senha<input name="confirma" type="password" autocomplete="new-password"><span class="location-auth-form__error" data-for="confirma"></span></label>
  <button class="location-button" type="submit">Validar dados e salvar</button></form></section>`;
RC.openAuth=(view='entrar',why)=>{
 let d=$('#rcAuth');
 if(!d){d=document.createElement('dialog');d.id='rcAuth';d.className='location-auth-dialog location-auth';d.innerHTML=AUTH_HTML();(document.querySelector('.location-page')||document.body).appendChild(d);wireAuth(d)}
 const sh=v=>{$$('[data-v]',d).forEach(x=>x.hidden=x.dataset.v!==v)};d._show=sh;sh(view);
 const w=$('[data-why]',d);if(w)w.textContent=why?`Entre para ${why}. Se ainda não tem conta, crie uma em segundos.`:'Acesse sua conta para favoritar, avaliar e cadastrar locais.';
 if(!d.open)d.showModal();setTimeout(()=>{const i=$('[data-v]:not([hidden]) input',d);i&&i.focus()},60);
};
function wireAuth(d){
 const err=(f,k,m)=>{const e=$(`[data-for="${k}"]`,f);if(e)e.textContent=m||'';const i=f.elements[k];if(i&&i.setAttribute)i.setAttribute('aria-invalid',!!m)};
 const clr=f=>{$$('[data-for]',f).forEach(e=>e.textContent='');$$('[aria-invalid]',f).forEach(i=>i.removeAttribute('aria-invalid'))};
 let cepOk=false,recMail='';
 d.addEventListener('click',async e=>{
  if(e.target.closest('[data-x]')||e.target===d){d.close();return}
  const g=e.target.closest('[data-go]');if(g){d._show(g.dataset.go);return}
  const ey=e.target.closest('[data-eye]');if(ey){const i=ey.parentElement.querySelector('input'),sh=i.type==='password';i.type=sh?'text':'password';ey.setAttribute('aria-label',sh?'Ocultar senha':'Mostrar senha');ey.innerHTML=ic(sh?'eye-off':'eye');return}
  const fl=e.target.closest('[data-fill]');if(fl){const[em,pw]=fl.dataset.fill.split('|'),f=$('[data-f=login]',d);f.elements.email.value=em;f.elements.senha.value=pw;f.elements.senha.focus();return}
  if(e.target.closest('[data-cep]')){const f=$('[data-f=reg]',d),m=$('[data-cepmsg]',d);m.textContent='Consultando…';const r=await RC.lookupCep(f.elements.cep.value);
   if(r.ok){f.elements.cidade.value=r.cidade;f.elements.uf.value=r.uf;f.elements.cidade.readOnly=f.elements.uf.readOnly=true;cepOk=true;err(f,'cep','');m.textContent=`Localidade confirmada: ${r.cidade}/${r.uf}.`}else{cepOk=false;m.textContent=r.error}}
 });
 d.addEventListener('input',e=>{const f=e.target.form;if(!f||f.dataset.f!=='reg')return;if(e.target.name==='cpf')e.target.value=RC.maskCpf(e.target.value);if(e.target.name==='cep'){e.target.value=RC.maskCep(e.target.value);cepOk=false;f.elements.cidade.readOnly=f.elements.uf.readOnly=false}});
 d.addEventListener('submit',async e=>{e.preventDefault();const f=e.target,el=f.elements,k=f.dataset.f;clr(f);const btn=$('[type=submit]',f);
  if(k==='login'){if(!RC.emailOk(el.email.value))return err(f,'email','Informe um e-mail válido.');if(!el.senha.value)return err(f,'senha','Informe sua senha.');
   btn.disabled=true;const r=await RC.login(el.email.value,el.senha.value);btn.disabled=false;if(!r.ok)return err(f,'geral',r.error);f.reset();d.close();RC.toast(`Bem-vindo(a), ${r.user.nome.split(' ')[0]}!`)}
  if(k==='reg'){if(!el.termos.checked)return err(f,'termos','Aceite os termos para continuar.');
   if(el.cep.value&&!cepOk&&!el.cidade.value){const r=await RC.lookupCep(el.cep.value);if(r.ok){el.cidade.value=r.cidade;el.uf.value=r.uf;cepOk=true}}
   btn.disabled=true;const r=await RC.register({nome:el.nome.value,email:el.email.value,cpf:el.cpf.value,cep:el.cep.value,cidade:el.cidade.value,uf:el.uf.value,cepOk,senha:el.senha.value,confirma:el.confirma.value,nativo:el.nativo.checked});btn.disabled=false;
   if(!r.ok){if(r.field&&$(`[data-for="${r.field}"]`,f)){err(f,r.field,r.error);el[r.field]&&el[r.field].focus()}else err(f,'geral',r.error);return}
   f.reset();d.close();RC.toast('Conta criada! Bem-vindo(a) ao Rota Cultural.')}
  if(k==='rec1'){const r=await RC.resetStart(el.email.value);if(!r.ok)return err(f,'email',r.error);recMail=el.email.value.trim().toLowerCase();f.hidden=true;const f2=$('[data-f=rec2]',d);f2.hidden=false;
   $('[data-code]',d).innerHTML=r.found?`Código enviado para <b>${esc(recMail)}</b>.<br><b>Ambiente de teste (sem e-mail real):</b> seu código é <b style="font-size:1.2em">${r.code}</b> (vale 10 minutos).`:'Se o e-mail estiver cadastrado, você receberá um código.';f2.elements.codigo.focus()}
  if(k==='rec2'){const r=await RC.resetFinish(recMail,el.codigo.value,el.senha.value,el.confirma.value);if(!r.ok)return err(f,r.field||'codigo',r.error);f.reset();f.hidden=true;$('[data-f=rec1]',d).hidden=false;d._show('entrar');RC.toast('Senha alterada! Agora é só logar.')}
 });
}

/* ---------- cabeçalho (menu do usuário), rodapé e painel de demonstração ---------- */
function renderHeader(){
 const acts=$('.location-header .location-header__actions');if(!acts)return;const burger=$('#burger',acts),u=RC.user();
 if(!u){acts.innerHTML=RC.config.inline?`<button type="button" class="location-button location-button--small location-button--outline" data-auth="cadastrar">${ic('user')} Cadastrar</button><button type="button" class="location-button location-button--small" data-auth="entrar">Entrar</button>`:`<a class="location-button location-button--small location-button--outline" href="${RC.loginUrl('cadastrar')}">${ic('user')} Cadastrar</a><a class="location-button location-button--small" href="${RC.loginUrl('entrar')}">Entrar</a>`}
 else{
  acts.innerHTML=`<button class="location-umenu-btn" id="umBtn" type="button" data-acct aria-haspopup="dialog"><span class="location-rc-av" aria-hidden="true">${esc(u.nome[0].toUpperCase())}</span><span class="location-un">${esc(u.nome.split(' ')[0])}<small>${RC.ROLE_LABEL[u.role]}</small></span></button>`;
 }
 if(burger)acts.appendChild(burger);
}
document.addEventListener('click',e=>{
 const au=e.target.closest('[data-auth]');if(au){RC.openAuth(au.dataset.auth);return}
 const ac=e.target.closest('[data-acct]');if(ac){window.dispatchEvent(new CustomEvent('rc:open',{detail:'dados'}));return}
 const op=e.target.closest('#umMenu [data-open]');if(op){const m0=$('#umMenu');if(m0)m0.hidden=true;window.dispatchEvent(new CustomEvent('rc:open',{detail:op.dataset.open}));return}
 const b=e.target.closest('#umBtn'),m=$('#umMenu');
 if(b&&m){const o=m.hidden;m.hidden=!o;b.setAttribute('aria-expanded',o);return}
 if(e.target.closest('#umOut')){RC.logout();RC.toast('Você saiu da conta.');if(/(perfil|admin|cadastrar-local)\.html/.test(location.pathname))setTimeout(()=>location.replace('index.html'),400);return}
 if(m&&!m.hidden&&!e.target.closest('.location-umenu-wrap')){m.hidden=true;$('#umBtn')&&$('#umBtn').setAttribute('aria-expanded','false')}
});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){const m=$('#umMenu');if(m&&!m.hidden){m.hidden=true;const b=$('#umBtn');b&&(b.setAttribute('aria-expanded','false'),b.focus())}}});
function initHeader(){
 const h=$('.location-header');if(!h)return;const solid=document.body.dataset.header==='solid';
 const f=()=>h.classList.toggle('location-header--solid',solid||scrollY>60);f();addEventListener('scroll',f,{passive:true});
 const b=$('#burger'),nav=$('#nav');
 if(b&&nav){b.addEventListener('click',()=>{const o=nav.classList.toggle('is-open');b.setAttribute('aria-expanded',o)});nav.addEventListener('click',e=>{if(e.target.closest('a'))nav.classList.remove('is-open')})}
}
function initFooter(){
 $$('[data-social]').forEach(a=>{const k=a.dataset.social;let url=k==='wa'?`https://wa.me/${RC.config.whatsapp||''}?text=${encodeURIComponent(RC.config.whatsappText)}`:RC.config.social[k];a.href=url;a.target='_blank';a.rel='noopener noreferrer'});
}
/* painel "Modo demonstração": entra DE VERDADE nas contas de teste */
function demoHTML(){
 const r=RC.role(),open=!J.get('rc_demo_hidden',false);
 return open?`<button class="location-demo-panel__close" id="demoX" aria-label="Fechar modo demonstração">${ic('x')}</button><b>Modo demonstração · entrar como</b><div class="location-demo-panel__roles" id="roles">${[['visitante','Visitante'],['usuario','Usuário'],['morador','Morador'],['admin','Admin']].map(([k,l])=>`<button data-r="${k}" aria-pressed="${r===k}">${l}</button>`).join('')}</div><small>${RC.user()?`Conectado: ${esc(RC.user().nome)}`:'Sem login'} · <a href="login.html#entrar">contas de teste</a></small>`
  :`<button class="location-demo-panel__open" id="demoOpen" aria-label="Abrir modo demonstração" title="Modo demonstração">${ic('settings')}</button>`;
}
function syncDemo(){const d=$('#demo');if(d){d.className=J.get('rc_demo_hidden',false)?'location-demo-panel location-demo-panel--mini':'location-demo-panel';d.innerHTML=demoHTML()}}
RC.demoPanel=()=>{if(!RC.config.demo||$('#demo'))return;const d=document.createElement('aside');d.id='demo';d.setAttribute('aria-label','Modo demonstração');(document.querySelector('.location-page')||document.body).appendChild(d);syncDemo();
 d.addEventListener('click',e=>{
  if(e.target.closest('#demoX')){J.set('rc_demo_hidden',true);syncDemo();return}
  if(e.target.closest('#demoOpen')){J.set('rc_demo_hidden',false);syncDemo();return}
  const b=e.target.closest('[data-r]');if(!b)return;const r=b.dataset.r;
  if(r==='visitante'){RC.logout();RC.toast('Você saiu (Visitante).')}else{RC.loginAs('demo-'+r);RC.toast('Você entrou como '+RC.ROLE_LABEL[r]+' (conta de teste).')}
 })};
addEventListener('storage',e=>{if(['rc_session','rc_users'].includes(e.key))emit()});
RC.start=async()=>{await RC.ready;initHeader();initFooter();renderHeader();RC.demoPanel();
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}),{threshold:.1});$$('.location-reveal').forEach(el=>io.observe(el));
 let f=null;try{f=sessionStorage.getItem('rc_flash');if(f)sessionStorage.removeItem('rc_flash')}catch{/* A mensagem temporária não está disponível nesta sessão. */}if(f)setTimeout(()=>RC.toast(f),400);
 if(RC.memoryMode)setTimeout(()=>RC.toast('Modo visualização: seus dados não serão salvos ao recarregar a página.'),1200)};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>RC.start());else RC.start();
  return RC;
}
