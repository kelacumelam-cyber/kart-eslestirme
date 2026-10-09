"use strict";
(function(root,factory){const api=factory();if(typeof module==="object"&&module.exports)module.exports=api;else root.Kart100=api})(typeof globalThis!=="undefined"?globalThis:this,function(){
const WORLDS = [
  { id: 1, name: "Meyve Bahçesi", icon: "🍎", emojis: ["🍎","🍌","🍇","🍓","🍒","🥝","🍉","🍍","🍑","🍋","🍐","🍊","🥥","🥑","🍈","🥭","🫐","🍏","🍅","🥕","🥦","🥒","🌽","🫑","🍄"] },
  { id: 2, name: "Sevimli Hayvanlar", icon: "🐶", emojis: ["🐶","🐱","🐭","🐹","🐰","🦊","🐻","🐼","🐨","🐯","🦁","🐮","🐷","🐸","🐵","🐔","🐧","🐦","🐤","🦆","🦅","🦉","🦇","🐺","🐗"] },
  { id: 3, name: "Vahşi Doğa", icon: "🦁", emojis: ["🦒","🦓","🦔","🐘","🦏","🦛","🐪","🐫","🦘","🦬","🐃","🐂","🐎","🐖","🐑","🦙","🐐","🦌","🦥","🦦","🦨","🦡","🐿️","🦫","🐆"] },
  { id: 4, name: "Derin Deniz", icon: "🐬", emojis: ["🐙","🦑","🦐","🦞","🦀","🐡","🐠","🐟","🐬","🐳","🐋","🦈","🦭","🐊","🐢","🐚","🪸","🪼","🦦","🦆","🦩","🦢","🐧","⛵","🏖️"] },
  { id: 5, name: "Gurme Lezzetler", icon: "🍕", emojis: ["🍕","🍔","🍟","🌭","🍿","🥞","🧇","🧀","🍗","🥪","🌮","🌯","🍣","🍜","🍦","🍩","🎂","🧁","🥧","🍫","🍬","🥨","🥐","🥯","🍳"] },
  { id: 6, name: "Botanik & Çiçek", icon: "🌸", emojis: ["🌸","🌺","🌻","🌹","🌷","🌼","💐","🍄","🌾","🍀","🍁","🍂","🍃","🌿","🌱","🌴","🌵","🪴","🌲","🌳","🎋","🎍","🪷","🪻","☘️"] },
  { id: 7, name: "Kozmik Evren", icon: "🚀", emojis: ["🚀","🛸","🛰️","🪐","🌍","🌕","☀️","⭐","🌟","🌠","☄️","🌌","👨‍🚀","👾","👽","🔭","📡","🌙","🌒","🌔","🌑","✨","⚡","💫","🛸"] },
  { id: 8, name: "Hız & Taşıtlar", icon: "🏎️", emojis: ["🏎️","🚗","🚕","🚙","🚌","🚎","🚑","🚒","🚓","🚜","🛵","🏍️","🚲","🚂","✈️","🚁","⛵","🚤","🛳️","🛩️","🚊","🚅","🛴","🛹","🛞"] },
  { id: 9, name: "Spor Arenası", icon: "🏆", emojis: ["⚽","🏀","🏈","⚾","🥎","🎾","🏐","🎱","🏓","🏸","🥊","🎳","🛹","🎿","🏆","🥇","🥈","🥉","🎯","⛳","🥋","⛸️","🎣","🤿","🎲"] },
  { id: 10, name: "Sihir & Efsane", icon: "🔮", emojis: ["🔮","👑","💎","🗡️","🛡️","🏹","🏺","📜","🗝️","🪄","🏰","🐉","🦄","🧙","🪙","⚡","🔥","✨","🪬","🧞","🎭","🧝","🦹","🧙‍♂️","🛡️"] }
];
const VERSION=1, COUNT=100;
const KINDS=["classic","preview","shape","budget","ice","waves"];
const TUTORIAL=[2,3,4,5,6];
const BASE=["classic","classic","preview","classic","shape","classic","budget","classic","ice","classic","waves","classic","classic","preview","classic","shape","classic","budget","classic","ice","classic","waves","classic","classic"];
function definition(n){
 if(!Number.isInteger(n)||n<1||n>COUNT)throw Error("Bölüm numarası geçersiz");
 const type=n<=5?"classic":BASE[(n-6)%BASE.length];
 const pairs=n<=5?TUTORIAL[n-1]:Math.min(10,6+Math.floor((n-6)/22));
 return Object.freeze({id:n,version:VERSION,type,pairs,world:Math.floor((n-1)/10),goal:type==="budget"?"move-efficiency":"match-all",seed:n*104729});
}
const LEVELS=Object.freeze(Array.from({length:COUNT},(_,i)=>definition(i+1)));
function validate(){
 if(LEVELS.length!==100||WORLDS.length!==10)throw Error("100 bölüm/10 dünya yapılandırması eksik");
 const ids=new Set(),stats={};
 for(const l of LEVELS){
  if(ids.has(l.id)||l.id!==ids.size+1||!KINDS.includes(l.type)||l.pairs<2||l.pairs>10)throw Error("Bölüm tanımı bozuk");
  ids.add(l.id);stats[l.type]=(stats[l.type]||0)+1;
  if(new Set(WORLDS[l.world].emojis).size<l.pairs)throw Error("Dünyada emoji havuzu yetersiz");
 }
 if(stats.classic<=50||KINDS.some(k=>!stats[k]))throw Error("Mekanik dengesi bozuk");
 return Object.freeze(stats);
}
const STATS=validate();
return Object.freeze({VERSION,COUNT,KINDS,WORLDS,LEVELS,STATS,definition,validate});
});
