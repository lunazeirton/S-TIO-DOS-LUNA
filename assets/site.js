'use strict';
const pontos=dadosMapa.features.filter(f=>f.geometry.type==='Point');
const poligonos=dadosMapa.features.filter(f=>f.geometry.type==='Polygon');
const tabela=document.querySelector('#marcos-tabela');
const marcadores=new Map();let mapa,grupoMarcos,areaLayers=[];
const statusMapa=document.querySelector('#map-status');
function aviso(msg){statusMapa.textContent=msg;statusMapa.hidden=false;}
for(const p of pontos){const [lon,lat]=p.geometry.coordinates;const tr=document.createElement('tr');for(const txt of [p.properties.name,lat.toFixed(7),lon.toFixed(7)]){const td=document.createElement('td');td.textContent=txt;tr.append(td)}const td=document.createElement('td');const b=document.createElement('button');b.textContent='Localizar';b.onclick=()=>{if(!mapa)return;if(!mapa.hasLayer(grupoMarcos)){grupoMarcos.addTo(mapa);document.querySelector('#marcos').checked=true}mapa.setView([lat,lon],18);marcadores.get(p.properties.name).openPopup();document.querySelector('#mapa').scrollIntoView({behavior:'smooth'})};td.append(b);tr.append(td);tabela.append(tr)}
try{
 if(typeof L==='undefined')throw new Error('Biblioteca indisponível');
 mapa=L.map('map',{scrollWheelZoom:false});
 const satelite=L.tileLayer('https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',{maxZoom:19,attribution:'Imagens © Esri, Maxar, Earthstar Geographics e comunidade GIS'}).addTo(mapa);
 const ruas=L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'});
 let erros=0;satelite.on('tileerror',()=>{if(++erros>=3)aviso('As imagens de satélite não carregaram. Confira sua conexão ou selecione o mapa de ruas em Camadas.');});satelite.on('tileload',()=>{statusMapa.hidden=true;erros=0});ruas.on('tileload',()=>{statusMapa.hidden=true});
 L.control.layers({'Satélite':satelite,'Mapa de ruas':ruas},{},{collapsed:true}).addTo(mapa);L.control.scale({imperial:false,position:'bottomright'}).addTo(mapa);
 areaLayers=poligonos.map((f,i)=>L.geoJSON(f,{style:{color:i?'#ffd27d':'#70eea3',weight:3,fillOpacity:.12}}).bindPopup(i?'Área BLIO-M<br>31,1711 ha informados no KML':'Área F08M<br>51,8414 ha informados no KML').addTo(mapa));
 const limites=L.featureGroup(areaLayers).getBounds();function enquadrar(){mapa.fitBounds(limites,{padding:[35,35]})}enquadrar();document.querySelector('#enquadrar').onclick=enquadrar;
 grupoMarcos=L.layerGroup().addTo(mapa);
 for(const p of pontos){const [lon,lat]=p.geometry.coordinates;const content=document.createElement('div');const title=document.createElement('strong');title.textContent=p.properties.name;content.append(title,document.createElement('br'),`Latitude: ${lat.toFixed(7)}`,document.createElement('br'),`Longitude: ${lon.toFixed(7)}`);const m=L.marker([lat,lon],{icon:L.divIcon({className:'marco-dot',iconSize:[12,12],iconAnchor:[6,6]}),title:p.properties.name,alt:p.properties.name}).bindPopup(content).bindTooltip(p.properties.name,{direction:'top'}).addTo(grupoMarcos);marcadores.set(p.properties.name,m)}
 for(const [id,layer] of [['area1',areaLayers[0]],['area2',areaLayers[1]],['marcos',grupoMarcos]])document.getElementById(id).onchange=e=>e.target.checked?layer.addTo(mapa):mapa.removeLayer(layer);
}catch(err){aviso('Não foi possível abrir o mapa. Consulte as coordenadas abaixo ou baixe o KML.');document.querySelector('#enquadrar').disabled=true;}
const dialog=document.querySelector('#document-dialog');let ultimoBotao;
document.querySelectorAll('[data-src]').forEach(b=>b.addEventListener('click',()=>{ultimoBotao=b;document.querySelector('#dialog-title').textContent=b.dataset.title;const img=document.querySelector('#dialog-img');img.src=b.dataset.src;img.alt=b.dataset.title;document.querySelector('#dialog-download').href=b.dataset.src;dialog.showModal();document.body.style.overflow='hidden'}));
document.querySelector('#close-dialog').onclick=()=>dialog.close();dialog.addEventListener('close',()=>{document.body.style.overflow='';ultimoBotao?.focus()});dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
