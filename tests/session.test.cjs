"use strict";
const assert=require("node:assert/strict");
const {createSession,LEVELS,uniquePairDeck}=require("../src/level-core.js");
const deck=["🍎","🍎","🍌","🍌","🍇","🍇","🍓","🍓","🥝","🥝","🍉","🍉"];
function act(s,type,index,extra={}){return s.dispatch({type,index,generation:s.state().generation,...extra})}
const run=(type)=>{
 const s=createSession({type,pairs:6},deck);
 if(type==="preview"){assert.equal(s.state().phase,"preview");assert.equal(act(s,"flip",0).event,"busy");assert.equal(act(s,"preview-end").event,"preview-ended")}
 if(type==="ice")assert.equal(act(s,"flip",0).event,"ineligible");
 if(type==="waves")assert.equal(act(s,"flip",8).event,"ineligible");
 return s;
};
const normal=run("classic");
assert.equal(act(normal,"flip",0).event,"first-flip");
assert.equal(act(normal,"flip",1).event,"match-pending");
assert.equal(act(normal,"flip",2).event,"busy");
assert.equal(act(normal,"settle",null,{matched:false,symbol:"🍌"}).event,"match-settled");
assert.equal(normal.state().matchedPairs,1);
const old=normal.state().generation;
assert.equal(act(normal,"restart").event,"restarted");
assert.equal(normal.dispatch({type:"settle",generation:old}).event,"stale");
assert.equal(normal.state().matchedPairs,0);
const mismatch=run("budget");
assert.equal(act(mismatch,"flip",0).event,"first-flip");
assert.equal(act(mismatch,"flip",2).event,"mismatch-pending");
assert.equal(act(mismatch,"settle",null,{matched:true,symbol:"🍎"}).event,"mismatch-settled");
assert.equal(mismatch.state().matchedPairs,0);
const ice=run("ice");
assert.deepEqual(ice.state().frozenSymbols,["🍎","🍌"]);
assert.equal(act(ice,"flip",4).event,"first-flip");
assert.equal(act(ice,"flip",5).event,"match-pending");
assert.equal(act(ice,"settle").event,"match-settled");
assert.deepEqual(ice.state().frozenSymbols,["🍌"]);
const waves=run("waves");
assert.equal(waves.state().visiblePairs,3);
for(const first of [0,2,4]){assert.equal(act(waves,"flip",first).event,"first-flip");assert.equal(act(waves,"flip",first+1).event,"match-pending");act(waves,"settle")}
assert.equal(waves.state().visiblePairs,6);
assert.equal(waves.state().matchedPairs,3);
const all=LEVELS.map(l=>uniquePairDeck(deck,l.pairs<=6?l.pairs:6));
assert.equal(all.length,23);
console.log("PASS: session transitions, premature flips, spoofed settle, restart generation, ice and wave unlock");
