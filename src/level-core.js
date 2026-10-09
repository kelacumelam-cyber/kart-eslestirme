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
  // Pure gameplay state: UI animations are dispatched from returned events.
  // Delayed animation callbacks must pass the generation token they received.
  function createSession(level, deck) {
    validateDeck(deck,level.pairs);
    const frozen=new Set(level.type==="ice"?[...new Set(deck)].slice(0,Math.min(2,level.pairs-1)):[]);
    const waveHidden=new Set(level.type==="waves"?[...new Set(deck)].slice(3):[]);
    let generation=1, phase=level.type==="preview"?"preview":"playing";
    let selected=null, pendingResult=null, moves=0, matched=new Set(), unlocked=new Set(), waveActive=false;
    const state=()=>Object.freeze({generation,phase,moves,matchedPairs:matched.size,selected,
      frozenSymbols:[...frozen].filter(s=>!unlocked.has(s)),
      visiblePairs:level.type==="waves"&&!waveActive?Math.min(3,level.pairs):level.pairs});
    function dispatch(action) {
      if(!action||action.generation!==generation)return {accepted:false,event:"stale",state:state()};
      if(action.type==="preview-end"&&phase==="preview"){phase="playing";return {accepted:true,event:"preview-ended",state:state()}}
      if(action.type==="restart"){generation++;phase=level.type==="preview"?"preview":"playing";selected=null;pendingResult=null;moves=0;matched.clear();unlocked.clear();waveActive=false;return {accepted:true,event:"restarted",state:state()}}
      if(action.type==="settle"&&phase==="settling"){
        const matchedNow=pendingResult!==null&&pendingResult.success;
        if(pendingResult===null)return {accepted:false,event:"missing-pending",state:state()};
        if(matchedNow){
          matched.add(pendingResult.symbol);
          if(level.type==="ice"){
            const next=[...frozen].find(s=>!unlocked.has(s));if(next!==undefined)unlocked.add(next);
          }
          if(level.type==="waves"&&matched.size>=3)waveActive=true;
        }
        selected=null;pendingResult=null;phase=matched.size===level.pairs?"completed":"playing";
        return {accepted:true,event:matchedNow?"match-settled":"mismatch-settled",state:state()};
      }
      if(action.type!=="flip"||phase!=="playing")return {accepted:false,event:"busy",state:state()};
      const index=action.index;
      if(!Number.isInteger(index)||index<0||index>=deck.length)return {accepted:false,event:"invalid-index",state:state()};
      const symbol=deck[index];
      if(matched.has(symbol)||frozen.has(symbol)&&!unlocked.has(symbol)||waveHidden.has(symbol)&&!waveActive||selected===index)
        return {accepted:false,event:"ineligible",state:state()};
      if(selected===null){selected=index;return {accepted:true,event:"first-flip",symbol,state:state()}}
      const first=deck[selected],success=first===symbol;
      moves++;phase="settling";pendingResult={success,symbol:success?symbol:null};
      return {accepted:true,event:success?"match-pending":"mismatch-pending",symbol:success?symbol:null,
        indices:[selected,index],state:state()};
    }
    return Object.freeze({state,dispatch});
  }
  const LEVELS=Object.freeze(levels());
  validate(LEVELS);
  return Object.freeze({VERSION,TYPES,TUTORIAL,LEVELS,validate,uniquePairDeck,validateDeck,seededRandom,createSession});
});
