const films=[
["Lumière sur l'océan","Documentaire"],["Le Dernier Voyage","Science-fiction"],["Un été différent","Comédie"],
["Les Petites Étoiles","Drame"],["Au-delà des nuages","Aventure"],["Le Secret du village","Mystère"]
];
const series=[
["Les Carnets du Nord","Drame"],["Mission Horizon","Science-fiction"],["Histoires de famille","Comédie"],
["La Maison bleue","Mystère"],["Planète sauvage","Documentaire"],["Les Explorateurs","Aventure"]
];
function render(items,id){
 const el=document.getElementById(id);
 el.innerHTML=items.map(x=>`<article class="card"><div class="poster">🎬<br>${x[0]}</div><div><b>${x[0]}</b><br><small>${x[1]}</small></div></article>`).join("");
}
render(films,"filmGrid"); render(series,"seriesGrid");
document.getElementById("search").addEventListener("input",e=>{
 const q=e.target.value.toLowerCase();
 document.querySelectorAll(".card").forEach(c=>c.style.display=c.innerText.toLowerCase().includes(q)?"block":"none");
});
