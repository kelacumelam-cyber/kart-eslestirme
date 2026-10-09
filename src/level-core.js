"use strict";
(function (root, factory) {
  const api=factory();
  if(typeof module==="object"&&module.exports)module.exports=api;
  else root.KartLevelCore=api;
})(typeof globalThis!=="undefined"?globalThis:this,function(){
  const VERSION=1;
  const TYPES=Object.freeze(["classic","preview","shape","budget","ice","waves"]);
  const TUTORIAL=Object.freeze([2,3,4,5,6]);
  const PILOT=Object.freeze([
    ["classic",6],["classic",7],["preview",6],["classic",8],["shape",6],["classic",8],
    ["budget",6],["classic",9],["ice",6],["classic",9],["waves",6],["preview",8],
    ["classic",10],["shape",8],["budget",8],["ice",8],["waves",8],["classic",10]
  ]);
  function levels(){
    return [...TUTORIAL.map(n=>["classic",n]),...PILOT].map(([type,pairs],i)=>Object.freeze({
      id:i+1,version:VERSION,type,pairs,goal:type==="budget"?"move-efficiency":"match-all",
      difficultyBand:i<5?"tutorial":i<12?"foundation":"developing",seed:(i+1)*104729
    }));
  }
  function validate(defs){
    if(!Array.isArray(defs)||defs.length===0)throw Error("Level list is empty");
    const ids=new Set();
    for(const [i,l] of defs.entries()){
      if(!l||!Number.isInteger(l.id)||ids.has(l.id)||l.id!==i+1)throw Error("Nonsequential or duplicate level ID");
      ids.add(l.id);
      if(l.version!==VERSION||!TYPES.includes(l.type)||!Number.isInteger(l.pairs)||l.pairs<2||l.pairs>21)throw Error("Invalid level definition");
      if(!Number.isInteger(l.seed)||l.seed<0)throw Error("Invalid level seed");
    }
    return true;
  }
  function uniquePairDeck(pool,pairs,random=Math.random){
    const symbols=[...new Set(pool)];
    if(!Number.isInteger(pairs)||pairs<1||symbols.length<pairs)throw Error("Not enough unique symbols");
    function shuffled(list){const arr=list.slice();for(let i=arr.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]]}return arr}
    const picked=shuffled(symbols).slice(0,pairs);
    const deck=shuffled([...picked,...picked]);
    validateDeck(deck,pairs);
    return deck;
  }
  function validateDeck(deck,pairs){
    const counts=new Map();
    for(const symbol of deck)counts.set(symbol,(counts.get(symbol)||0)+1);
    if(deck.length!==pairs*2||counts.size!==pairs||[...counts.values()].some(n=>n!==2))throw Error("Invalid pair distribution");
    return true;
  }
  function seededRandom(seed){
    if(!Number.isInteger(seed))throw Error("Invalid seed");
    let state=seed>>>0;
    return ()=>{state=(Math.imul(1664525,state)+1013904223)>>>0;return state/4294967296};
  }
  const LEVELS=Object.freeze(levels());
  validate(LEVELS);
  return Object.freeze({VERSION,TYPES,TUTORIAL,LEVELS,validate,uniquePairDeck,validateDeck,seededRandom});
});
