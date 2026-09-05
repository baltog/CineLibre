const catalog = [
  {id:"f1", type:"film", title:"Lumière sur l'océan", year:2026, genre:"Aventure", duration:"1h 48", rating:4.8, new:true, c1:"#0b6e9d", c2:"#13244d", desc:"Une aventure fictive au large d'un océan immense, entre découverte, entraide et paysages spectaculaires."},
  {id:"f2", type:"film", title:"Le Dernier Voyage", year:2025, genre:"Drame", duration:"1h 52", rating:4.7, new:true, c1:"#713f9c", c2:"#1b1b46", desc:"Un récit fictif sur un voyage inattendu qui change la manière de voir le monde."},
  {id:"f3", type:"film", title:"Un été différent", year:2025, genre:"Comédie", duration:"1h 34", rating:4.5, new:false, c1:"#d27b35", c2:"#542a43", desc:"Une comédie légère et fictive où une petite ville découvre qu'un été ordinaire peut devenir inoubliable."},
  {id:"f4", type:"film", title:"Les Petites Étoiles", year:2024, genre:"Famille", duration:"1h 29", rating:4.6, new:false, c1:"#236c66", c2:"#102e45", desc:"Une histoire familiale fictive pleine de douceur, de rêves et de petites victoires."},
  {id:"f5", type:"film", title:"Au-delà des nuages", year:2024, genre:"Fantastique", duration:"1h 41", rating:4.4, new:false, c1:"#3654a5", c2:"#171b45", desc:"Un monde fantastique fictif où les nuages cachent un passage vers un ailleurs mystérieux."},
  {id:"f6", type:"film", title:"Le Secret du village", year:2023, genre:"Mystère", duration:"1h 46", rating:4.3, new:false, c1:"#4c7652", c2:"#17231d", desc:"Un mystère fictif dans un village paisible où chaque habitant semble connaître une partie de l'histoire."},
  {id:"s1", type:"series", title:"Les Carnets du Nord", year:2026, genre:"Documentaire", duration:"6 épisodes", rating:4.9, new:true, c1:"#1b728a", c2:"#102239", desc:"Une série documentaire fictive consacrée aux paysages, aux métiers et aux histoires du Nord."},
  {id:"s2", type:"series", title:"Mission Horizon", year:2025, genre:"Aventure", duration:"8 épisodes", rating:4.6, new:true, c1:"#7b4b25", c2:"#24172d", desc:"Une équipe fictive part à la recherche d'un horizon que personne n'a encore cartographié."},
  {id:"s3", type:"series", title:"Histoires de famille", year:2024, genre:"Drame", duration:"10 épisodes", rating:4.5, new:false, c1:"#8b3e59", c2:"#2a172d", desc:"Des histoires fictives, humaines et touchantes qui suivent plusieurs générations d'une même famille."},
  {id:"s4", type:"series", title:"La Maison bleue", year:2023, genre:"Comédie", duration:"8 épisodes", rating:4.2, new:false, c1:"#2774a8", c2:"#192a4a", desc:"Une comédie fictive située dans une grande maison où rien ne se passe jamais comme prévu."}
];

let favorites = JSON.parse(localStorage.getItem("cinelibre-favorites") || "[]");
const $ = id => document.getElementById(id);

function filtered(){
  const q = $("searchInput").value.trim().toLowerCase();
  const type = $("typeFilter").value, genre = $("genreFilter").value, sort = $("sortFilter").value;
  let list = catalog.filter(x =>
    (!q || [x.title,x.genre,x.type,String(x.year)].join(" ").toLowerCase().includes(q)) &&
    (type === "all" || x.type === type) &&
    (genre === "all" || x.genre === genre)
  );
  if(sort==="rating") list.sort((a,b)=>b.rating-a.rating);
  if(sort==="title") list.sort((a,b)=>a.title.localeCompare(b.title,"fr"));
  if(sort==="recent") list.sort((a,b)=>b.year-a.year);
  return list;
}
function card(item){
  const active = favorites.includes(item.id) ? "active" : "";
  return `<article class="card">
    <div class="poster" style="--c1:${item.c1};--c2:${item.c2}">
      <span class="badge">${item.type==="film"?"FILM":"SÉRIE"}${item.new?" • NOUVEAU":""}</span>
      <button class="heart ${active}" onclick="toggleFav('${item.id}')" aria-label="Ajouter aux favoris">${favorites.includes(item.id)?"♥":"♡"}</button>
      <div class="poster-title">${item.title}</div>
    </div>
    <div class="card-body">
      <h3>${item.title}</h3>
      <div class="meta"><span>${item.year}</span><span>•</span><span>${item.genre}</span><span>•</span><span>★ ${item.rating}</span></div>
      <button class="card-btn" onclick="openDetail('${item.id}')">Voir la fiche</button>
    </div>
  </article>`;
}
function render(){
  const list=filtered();
  $("resultCount").textContent=list.length;
  $("newCards").innerHTML=list.filter(x=>x.new).slice(0,4).map(card).join("");
  $("filmCards").innerHTML=list.filter(x=>x.type==="film").map(card).join("");
  $("seriesCards").innerHTML=list.filter(x=>x.type==="series").map(card).join("");
  $("noResults").classList.toggle("hidden",list.length!==0);
  updateFavCount();
}
function updateFavCount(){
  $("favCount").textContent=favorites.length;
  $("supportFavText").textContent=`${favorites.length} favori${favorites.length>1?"s":""}`;
}
function toggleFav(id){
  favorites = favorites.includes(id) ? favorites.filter(x=>x!==id) : [...favorites,id];
  localStorage.setItem("cinelibre-favorites",JSON.stringify(favorites));
  render();
}
function openDetail(id){
  const x=catalog.find(v=>v.id===id); if(!x)return;
  $("detailContent").innerHTML=`<div class="detail">
    <div class="detail-poster" style="--c1:${x.c1};--c2:${x.c2}">${x.title}</div>
    <div>
      <span class="section-kicker">${x.type==="film"?"FILM":"SÉRIE"}</span>
      <h2>${x.title}</h2>
      <div class="meta">${x.year} • ${x.genre} • ${x.duration} • ★ ${x.rating}</div>
      <div class="chips"><span class="chip">Disponible légalement*</span><span class="chip">CinéLibre</span></div>
      <p class="description">${x.desc}</p>
      <p class="description"><small>* Démonstration : ce titre est fictif. Le bouton de lecture doit être relié uniquement à une source dont la diffusion est autorisée.</small></p>
      <button class="card-btn" onclick="toggleFav('${x.id}');openDetail('${x.id}')">${favorites.includes(x.id)?"♥ Retirer des favoris":"♡ Ajouter aux favoris"}</button>
    </div>
  </div>`;
  $("detailDialog").showModal();
}
$("closeDialog").addEventListener("click",()=>$("detailDialog").close());
$("detailDialog").addEventListener("click",e=>{if(e.target===e.currentTarget)e.currentTarget.close()});
["searchInput","typeFilter","genreFilter","sortFilter"].forEach(id=>$(id).addEventListener("input",render));
$("showAllBtn").addEventListener("click",()=>{ $("searchInput").value=""; $("typeFilter").value="all"; $("genreFilter").value="all"; $("sortFilter").value="recent"; render(); document.getElementById("films").scrollIntoView({behavior:"smooth"}); });
$("menuBtn").addEventListener("click",()=>{
  const nav=document.querySelector(".nav");
  const open=nav.style.display==="flex";
  nav.style.display=open?"none":"flex";
  if(!open){nav.style.position="absolute";nav.style.top="72px";nav.style.left="0";nav.style.right="0";nav.style.padding="18px";nav.style.background="#0b111c";nav.style.flexDirection="column";nav.style.alignItems="flex-start";nav.style.borderBottom="1px solid var(--line)"}
});
render();
