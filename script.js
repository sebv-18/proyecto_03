const $=id=>document.getElementById(id);
const fmt=n=>"$"+n.toLocaleString("es-CL");
/* Acepta: imagen base64, URL completa, ruta propia (img/foto.jpg) o ID de Unsplash */
const U=i=>!i?"":(/^(data:|https?:|\/|\.|[\w-]+\/)/.test(i)?i:`https://images.unsplash.com/photo-${i}?w=900&q=72&auto=format&fit=crop`);
const cart={};
const root=document.documentElement;

/* ---------- Iconos (trazo uniforme) ---------- */
const ICON={
  pin:`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>`,
  clock:`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`,
  ig:`<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="5"/><circle cx="12" cy="12" r="3.6"/><path d="M16.8 7.2h.01"/></svg>`,
  wa:`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.5A8 8 0 0 1 8.1 18.5L4 20l1.5-4A8 8 0 1 1 20 11.5z"/><path d="M9.5 9c.3 2.5 2.5 4.5 5.5 5.5"/></svg>`,
  plus:`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>`
};

/* ---------- Productos planos: cada opción de precio es una línea del pedido ---------- */
const IT=[], GR=[];
MENU.forEach(m=>{
  const vs=m.v||[["",m.p]];
  const ks=vs.map(([l,p])=>{IT.push({n:l?`${m.n} (${l})`:m.n,p:p||0,ask:!p});return IT.length-1});
  GR.push({m,ks,vs});
});

/* ---------- Portada y pie de página (desde config.js) ---------- */
function initBrand(){
  const wa=CONFIG.phone?`https://wa.me/${CONFIG.phone}`:"";
  document.title=CONFIG.waName+" · Carta digital";

  /* logo: config.logo > logo.js (versión dorada incrustada) > iniciales */
  const LG=CONFIG.logo||(typeof LOGO_GOLD!=="undefined"?LOGO_GOLD:"");
  const mono=()=>`<span class="mono">${CONFIG.monogram||""}</span>`;
  document.querySelectorAll("[data-logo]").forEach(img=>{
    if(LG)img.src=U(LG);
    else if(img.classList.contains("seal"))img.outerHTML=mono();
    else img.remove();
  });
  if(typeof LOGO_FAV!=="undefined"){
    const l=document.createElement("link");l.rel="icon";l.href=LOGO_FAV;document.head.appendChild(l);
  }

  /* portada */
  $("place").textContent=CONFIG.place;
  const [n1,...rest]=CONFIG.name;
  $("hName").innerHTML=`<span class="ln a"><span>${n1}</span></span>`+(rest.length?`<span class="ln b"><span>${rest.join(" ")}</span></span>`:"");
  $("hTag").textContent=CONFIG.tagline;
  if(CONFIG.heroPhoto){
    const p=$("coverPhoto"), im=new Image();
    im.onload=()=>{p.style.backgroundImage=`url("${U(CONFIG.heroPhoto)}")`;p.classList.add("on");$("cover").classList.add("has-photo")};
    im.src=U(CONFIG.heroPhoto);
  }
  $("cidx").innerHTML=CATS.map(c=>`<li><button onclick="openMenu('${c.id}')">${c.t}</button></li>`).join("");
  $("hChips").innerHTML=
    `<a class="fact" href="${CONFIG.maps}" target="_blank" rel="noopener">${ICON.pin}${CONFIG.addressShort}</a>`+
    `<span class="fact">${ICON.wa}Pedidos por WhatsApp</span>`;

  /* pie: ubicación, horarios y contacto */
  const hours=CONFIG.hours||[];
  const secs=[];
  secs.push(`<section><h3>${ICON.pin}Ubicación</h3><p>${CONFIG.address}</p><div class="links" style="margin-top:14px"><a class="pillink" href="${CONFIG.maps}" target="_blank" rel="noopener">Cómo llegar</a></div></section>`);
  if(hours.length)secs.push(`<section><h3>${ICON.clock}Horarios</h3><ul class="hours">${hours.map(h=>Array.isArray(h)?`<li><span>${h[0]}</span><span>${h[1]}</span></li>`:`<li><span>${h}</span></li>`).join("")}</ul></section>`);
  else if(wa)secs.push(`<section><h3>${ICON.clock}Horarios</h3><p>Consulta nuestros horarios por WhatsApp.</p></section>`);
  const links=(wa?`<a class="pillink" href="${wa}" target="_blank" rel="noopener">${ICON.wa}WhatsApp</a>`:"")+
              (CONFIG.instagram?`<a class="pillink" href="${CONFIG.instagram}" target="_blank" rel="noopener">${ICON.ig}Instagram</a>`:"");
  if(links)secs.push(`<section><h3>Contacto</h3><div class="links">${links}</div></section>`);
  const nm=CONFIG.name.length>1?`${CONFIG.name[0]}<em>${CONFIG.name.slice(1).join(" ")}</em>`:CONFIG.name[0];
  $("where").innerHTML=
    `<div class="foot-top">${LG?`<img src="${U(LG)}" alt="" width="76" height="76">`:mono()}<div><h2>${nm}</h2><p>${CONFIG.place}</p></div></div>`+
    `<div class="foot-grid">${secs.join("")}</div>`+
    `<p class="copy">© ${new Date().getFullYear()} ${CONFIG.waName}</p>`;
}

/* ---------- Portada ⇄ carta ---------- */
function goCat(id,smooth){
  const el=$("cat-"+id); if(!el)return;
  el.scrollIntoView({behavior:smooth?"smooth":"instant",block:"start"});
}
function openMenu(id,instant){
  if(instant)root.classList.add("no-anim");
  root.classList.remove("is-cover");root.classList.add("is-open");
  $("app").inert=false;$("cover").inert=true;
  if(document.activeElement&&document.activeElement.blur)document.activeElement.blur();
  window.scrollTo({top:0,behavior:"instant"});
  if(id)goCat(id,false);
  if(instant)requestAnimationFrame(()=>requestAnimationFrame(()=>root.classList.remove("no-anim")));
}
function showCover(){
  root.classList.remove("is-open");root.classList.add("is-cover");
  $("app").inert=true;$("cover").inert=false;
  window.scrollTo({top:0,behavior:"instant"});
}

/* ---------- Carta ---------- */
const ctl=(k,round)=>cart[k]
  ?`<div class="step"><button onclick="change(${k},-1)" aria-label="Quitar uno">−</button><b>${cart[k]}</b><button onclick="add(${k})" aria-label="Agregar uno">+</button></div>`
  :`<button class="add${round?" round":""}" onclick="add(${k})" aria-label="Agregar ${IT[k].n}">${ICON.plus}${round?"":"<span>Agregar</span>"}</button>`;
const ctlBox=(k,round)=>`<span class="ctl" data-k="${k}" data-r="${round?1:0}">${ctl(k,round)}</span>`;
const priceHtml=p=>p?`<span class="price">${fmt(p)}</span>`:`<span class="price ask">Consultar</span>`;

let photoCount=0;
function dish(g){
  const x=g.m, multi=!!x.v, slim=!x.d&&!multi&&!x.i, k0=g.ks[0];
  const alt=x.i&&(photoCount++%2===1);
  const photo=x.i?`<figure class="dish-photo"><img loading="lazy" decoding="async" src="${U(x.i)}" alt="${x.n}" onerror="this.closest('.dish').classList.remove('has-photo','alt');this.closest('figure').remove()"></figure>`:"";
  const pill=x.tag?`<span class="pill">${x.tag}</span>`:"";
  const cls=`dish${slim?" slim":""}${x.i?" has-photo":""}${alt?" alt":""}${g.ks.some(k=>cart[k])?" in":""}`;
  const main=`<div class="dish-main"><h3>${x.n}${pill}</h3>${x.d?`<p>${x.d}</p>`:""}</div>`;
  const attrs=`class="${cls}" data-ks="${g.ks.join(",")}"`;
  if(!multi)
    return `<article ${attrs}>${photo}${main}<div class="dish-side">${priceHtml(x.p)}${ctlBox(k0,slim)}</div></article>`;
  const opts=g.ks.map((k,j)=>`<div class="opt"><span class="ol">${g.vs[j][0]}</span>${priceHtml(g.vs[j][1])}${ctlBox(k,true)}</div>`).join("");
  return `<article ${attrs}>${photo}${main}<div class="opts">${opts}</div></article>`;
}
function renderTabs(){
  $("tabs").innerHTML=CATS.map(c=>`<button class="tab" data-id="${c.id}" onclick="tabTo('${c.id}')">${c.t}</button>`).join("");
}
function tabTo(id){setActive(id);goCat(id,true)}
let activeId="";
function setActive(id){
  if(id===activeId)return; activeId=id;
  const tabs=$("tabs");
  tabs.querySelectorAll(".tab").forEach(b=>b.classList.toggle("on",b.dataset.id===id));
  const on=tabs.querySelector(".tab.on");
  if(on)tabs.scrollTo({left:on.offsetLeft-(tabs.clientWidth-on.offsetWidth)/2,behavior:"smooth"});
}
function renderMenu(){
  photoCount=0;
  $("menu").innerHTML=CATS.map((c,i)=>{
    let last="";
    const dishes=GR.filter(g=>g.m.c===c.id).map(g=>{
      let h="";
      if(g.m.h&&g.m.h!==last){h=`<h4 class="grp">${g.m.h}</h4>`;last=g.m.h}
      return h+dish(g);
    }).join("");
    const cph=c.i?`<figure class="spread-photo"><img loading="lazy" decoding="async" src="${U(c.i)}" alt="${c.t}" onerror="this.closest('figure').remove()"></figure>`:"";
    return (i?`<div class="orn" aria-hidden="true"><i></i></div>`:"")+
      `<section class="spread${i%2?" alt":""}" id="cat-${c.id}" data-id="${c.id}" aria-labelledby="h-${c.id}">`+
      `<header class="spread-head">${cph}<h2 id="h-${c.id}">${c.t}</h2><p class="intro">${c.s}</p></header>`+
      `<div class="dishes">${dishes}</div></section>`;
  }).join("");
  observe();
}
/* resalta la categoría visible y revela los títulos al llegar */
function observe(){
  if(!("IntersectionObserver" in window)){document.querySelectorAll(".spread").forEach(s=>s.classList.add("seen"));return}
  const spy=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)setActive(e.target.dataset.id)}),{rootMargin:"-35% 0px -60% 0px"});
  const seen=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("seen");seen.unobserve(e.target)}}),{rootMargin:"0px 0px -12% 0px"});
  document.querySelectorAll(".spread").forEach(s=>{spy.observe(s);seen.observe(s)});
}

/* actualiza solo el control de un producto (sin redibujar toda la carta) */
function syncBox(box,k,d){
  const had=box.contains(document.activeElement);
  box.innerHTML=ctl(k,box.dataset.r==="1");
  const c=box.closest(".dish");
  if(c)c.classList.toggle("in",c.dataset.ks.split(",").some(q=>cart[q]));
  if(had){const bs=box.querySelectorAll("button");(bs[d>0?bs.length-1:0]).focus({preventScroll:true})}
}
function refreshCtl(k,d){document.querySelectorAll(`.ctl[data-k="${k}"]`).forEach(b=>syncBox(b,k,d))}
function refreshAll(){document.querySelectorAll(".ctl").forEach(b=>syncBox(b,+b.dataset.k,0))}

/* ---------- Pedido ---------- */
function add(k){cart[k]=(cart[k]||0)+1;update(k,1);const b=$("cartBtn");b.classList.remove("bump");void b.offsetWidth;b.classList.add("bump")}
function change(k,d){cart[k]=(cart[k]||0)+d;if(cart[k]<=0)delete cart[k];update(k,d)}
function clearCart(){for(const k in cart)delete cart[k];update();refreshAll();openSheet(false)}
function openSheet(o){
  $("sheet").classList.toggle("on",o);$("scrim").classList.toggle("on",o);
  $("sheet").setAttribute("aria-hidden",o?"false":"true");
  document.body.style.overflow=o?"hidden":"";
  if(o)setTimeout(()=>$("sheet").querySelector(".x").focus({preventScroll:true}),60);
}
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&$("sheet").classList.contains("on"))openSheet(false)});
function toggleAddr(){$("addrBox").style.display=document.querySelector('input[name=tipo]:checked').value==="domicilio"?"block":"none"}
function sendOrder(a){
  const name=$("fName").value.trim(), addr=$("fAddr").value.trim(), note=$("fNote").value.trim();
  const dom=document.querySelector('input[name=tipo]:checked').value==="domicilio", err=$("err");
  const ks=Object.keys(cart);
  err.textContent="";
  if(!CONFIG.phone){err.textContent="Falta configurar el número de WhatsApp del local.";return false}
  if(!ks.length){err.textContent="Agrega al menos un producto a tu pedido.";return false}
  if(!name){err.textContent="Escribe tu nombre para continuar.";$("fName").focus();return false}
  if(dom&&!addr){err.textContent="Escribe tu dirección para el despacho.";$("fAddr").focus();return false}
  const t=ks.reduce((s,k)=>s+cart[k]*IT[k].p,0), ask=ks.some(k=>IT[k].ask);
  const msg=`Hola, ${CONFIG.waName}! Quisiera hacer un pedido.\n\n`
    +`Nombre: ${name}\nEntrega: ${dom?"A domicilio":"Retiro en local"}\n`+(dom?`Dirección: ${addr}\n`:"")
    +"\nPedido:\n"+ks.map(k=>`- ${cart[k]} x ${IT[k].n} (${IT[k].ask?"precio a consultar":fmt(IT[k].p*cart[k])})`).join("\n")
    +(note?`\n\nComentarios: ${note}`:"")
    +`\n\nTotal: ${fmt(t)}`+(ask?" + productos por consultar":"");
  a.href=`https://wa.me/${CONFIG.phone}?text=${encodeURIComponent(msg)}`;
  return true;
}
function update(k,d){
  const ks=Object.keys(cart);
  const n=ks.reduce((s,q)=>s+cart[q],0), t=ks.reduce((s,q)=>s+cart[q]*IT[q].p,0), ask=ks.some(q=>IT[q].ask);
  $("cartBtn").classList.toggle("empty",n===0);
  $("barN").textContent=n;
  $("barT").textContent=fmt(t)+(ask?"+":"");
  $("total").textContent=fmt(t);
  const L=$("lines"), idx=L.contains(document.activeElement)?[...L.querySelectorAll("button")].indexOf(document.activeElement):-1;
  L.innerHTML=n===0
    ?`<p class="empty-msg">Aún no agregaste productos. Elige algo de la carta.</p>`
    :ks.map(q=>`<div class="line"><span>${IT[q].n}<small>${IT[q].ask?"Precio a consultar":fmt(IT[q].p*cart[q])}</small></span><div class="step"><button onclick="change(${q},-1)" aria-label="Quitar uno">−</button><b>${cart[q]}</b><button onclick="change(${q},1)" aria-label="Agregar uno">+</button></div></div>`).join("")
      +(ask?`<p class="note">Los productos con precio a consultar se confirman por WhatsApp y no están incluidos en el total.</p>`:"");
  if(idx>=0){const bs=L.querySelectorAll("button");if(bs.length)bs[Math.min(idx,bs.length-1)].focus({preventScroll:true})}
  if(k!==undefined)refreshCtl(k,d);
}

initBrand();renderTabs();renderMenu();update();
$("cover").inert=false;
/* enlace directo a la carta o a una categoría (#carta, #cat-gohan): abre sin portada */
if(/^#(carta|cat-)/.test(location.hash)){const id=location.hash.replace(/^#(cat-)?/,"");openMenu($("cat-"+id)?id:null,true)}