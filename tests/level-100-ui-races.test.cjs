"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const CORE=require("../src/level-core.js");
const GAME=require("../src/level-100.js");
const html=fs.readFileSync(path.join(__dirname,"../game-mobile-v1.html"),"utf8");
const script=html.split("<script>\n")[1]?.split("</script>")[0]||html.match(/<script>\s*([\s\S]*?)<\/script>/)?.[1];
assert.ok(script,"Inline game startup must exist");
function element(){
 const names=new Set();
 const obj={style:{setProperty(){}},dataset:{},children:[],textContent:"",disabled:false,offsetWidth:320,
 parentElement:{getBoundingClientRect:()=>({width:320,height:480})},
 append(v){this.children.push(v)},appendChild(v){this.children.push(v)},replaceChildren(){this.children=[]},
 setAttribute(){},querySelector(){return element()},
 getContext(){return {clearRect(){},setTransform(){},beginPath(){},arc(){},fill(){}}}};
 obj.classList={add:(...v)=>v.forEach(x=>names.add(x)),remove:(...v)=>v.forEach(x=>names.delete(x)),
 contains:x=>names.has(x),toggle:(x,on)=>on?names.add(x):names.delete(x)};
 return obj;
}
function boot(unlock){
 const ids=[...html.matchAll(/id="([^"]+)"/g)].map(x=>x[1]);
 const nodes=Object.fromEntries(ids.map(id=>[id,element()]));
 const storage={data:{"kart_eslestirme_100_v1":String(unlock)},getItem(k){return this.data[k]??null},setItem(k,v){this.data[k]=v}};
 const pending=new Map();let seq=0;let now=0;
 function schedule(fn){const id=++seq;pending.set(id,fn);return id}
 const doc={getElementById:id=>nodes[id]||(()=>{throw Error("Missing "+id)})(),createElement:element};
 const fn=new Function("document","localStorage","KartLevelCore","Kart100","setTimeout","clearTimeout","setInterval","clearInterval","requestAnimationFrame","cancelAnimationFrame","window","performance",script+
 ";return {tiles:()=>tiles,session:()=>session,render,flip,getLevel:()=>levelIndex};");
 const api=fn(doc,storage,CORE,GAME,schedule,id=>pending.delete(id),()=>++seq,()=>{},schedule,id=>pending.delete(id),
 {matchMedia:()=>({matches:true}),devicePixelRatio:1},{now:()=>now});
 return {api,nodes,storage,pending,tick(){const callbacks=[...pending.values()];pending.clear();callbacks.forEach(fn=>fn())}};
}
let checks=0;
{
 const t=boot(1),cards=t.api.tiles();
 cards[0].button.onclick();cards[0].button.onclick();
 assert.equal(t.api.session().state().moves,0,"same-card double tap cannot count as move");
 const wrong=cards.find(c=>c.emoji!==cards[0].emoji);
 wrong.button.onclick();assert.equal(t.api.session().state().phase,"settling");
 wrong.button.onclick();cards[0].button.onclick();
 assert.equal(t.api.session().state().moves,1,"rapid taps during settle must be ignored");
 t.tick();assert.equal(t.api.session().state().phase,"playing");checks++;
}
{
 const t=boot(1),cards=t.api.tiles();cards[0].button.onclick();
 const wrong=cards.find(c=>c.emoji!==cards[0].emoji);wrong.button.onclick();
 t.nodes.restart.onclick();t.tick();
 assert.equal(t.api.session().state().moves,0,"stale callback cannot affect fresh round");
 assert.equal(t.api.session().state().matchedPairs,0);checks++;
}
{
 const t=boot(2);const previous=t.nodes.previous;
 assert.equal(t.api.getLevel(),1);previous.onclick();
 assert.equal(t.api.getLevel(),0);assert.equal(t.api.tiles().length,4);
 const cards=t.api.tiles(),pairs=new Map();
 for(const card of cards){if(!pairs.has(card.emoji))pairs.set(card.emoji,[]);pairs.get(card.emoji).push(card)}
 for(const pair of pairs.values()){pair[0].button.onclick();pair[1].button.onclick();t.tick()}
 assert.equal(t.nodes.advance.disabled,false);
 t.nodes.advance.onclick();assert.equal(t.api.getLevel(),1);
 assert.equal(t.api.session().state().moves,0);checks++;
}
console.log("PASS: "+checks+" UI race tests (double tap, settling lock, restart callback, unlocked navigation)");
