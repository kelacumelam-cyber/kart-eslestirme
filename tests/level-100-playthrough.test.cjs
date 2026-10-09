"use strict";
const assert=require("node:assert/strict");
const {createSession,uniquePairDeck,seededRandom}=require("../src/level-core.js");
const {LEVELS,WORLDS}=require("../src/level-100.js");
let scenarios=0,matches=0,mismatches=0;
for(const level of LEVELS){
 for(let trial=0;trial<4;trial++){
  const deck=uniquePairDeck(WORLDS[level.world].emojis,level.pairs,seededRandom(level.seed+trial));
  const game=createSession(level,deck);
  const send=(type,extra={})=>game.dispatch({type,generation:game.state().generation,...extra});
  if(level.type==="preview"){
   assert.equal(game.state().phase,"preview");
   assert.equal(send("flip",{index:0}).event,"busy");
   assert.equal(send("preview-end").event,"preview-ended");
  }
  const groups=new Map();
  deck.forEach((symbol,index)=>{if(!groups.has(symbol))groups.set(symbol,[]);groups.get(symbol).push(index)});
  let turns=0;
  while(game.state().phase!=="completed"){
   if(++turns>level.pairs+1)throw Error("Session deadlock: level "+level.id);
   const state=game.state();
   const eligible=[...groups.entries()].filter(([symbol])=>
     !state.frozenSymbols.includes(symbol) &&
     !(level.type==="waves"&&state.visiblePairs<level.pairs&&[...groups.keys()].slice(3).includes(symbol))
   );
   let progressed=false;
   for(const [symbol,indices] of eligible){
    // Matched symbols are rejected. Choose the first eligible incomplete pair.
    const first=send("flip",{index:indices[0]});
    if(!first.accepted)continue;
    assert.equal(first.event,"first-flip");
    const second=send("flip",{index:indices[1]});
    assert.equal(second.event,"match-pending");
    assert.equal(send("flip",{index:indices[0]}).event,"busy");
    const settled=send("settle",{matched:false,symbol:"forged"});
    assert.equal(settled.event,"match-settled");
    matches++;progressed=true;break;
   }
   if(!progressed)throw Error("No eligible pair: level "+level.id);
  }
  assert.equal(game.state().matchedPairs,level.pairs);
  assert.equal(game.state().moves,level.pairs);
  assert.equal(send("flip",{index:0}).event,"busy");
  // Restart invalidates the previous generation (stale timer safety).
  const generation=game.state().generation;
  assert.equal(send("restart").event,"restarted");
  assert.equal(game.dispatch({type:"settle",generation}).event,"stale");
  assert.equal(game.state().matchedPairs,0);
  scenarios++;
 }
}
console.log("PASS: "+scenarios+" complete level sessions, "+matches+" correct matches, all six mechanics, no deadlocks");
