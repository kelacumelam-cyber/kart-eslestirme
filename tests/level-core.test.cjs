"use strict";
const assert=require("node:assert/strict");
const core=require("../src/level-core.js");
assert.equal(core.LEVELS.length,23);
assert.deepEqual(core.LEVELS.slice(0,5).map(l=>l.pairs),[2,3,4,5,6]);
assert.equal(core.LEVELS[5].pairs,6);
assert.equal(core.validate(core.LEVELS),true);
for(const type of core.TYPES)assert(core.LEVELS.some(x=>x.type===type));
assert.equal(new Set(core.LEVELS.map(x=>x.id)).size,23);
const pool=["🍎","🍓","🍇","🍓","🥑","🍌","🍋","🫐","🥝","🍒","🍐","🍊","🍉","🥭"];
let tested=0;
for(let i=1;i<=10;i++)for(let j=0;j<100;j++){
  const deck=core.uniquePairDeck(pool,i);
  assert.equal(core.validateDeck(deck,i),true);tested++;
}
const a=core.uniquePairDeck(pool,7,core.seededRandom(20261009));
const b=core.uniquePairDeck(pool,7,core.seededRandom(20261009));
assert.deepEqual(a,b);
assert.throws(()=>core.uniquePairDeck(["🍎","🍎"],2),/Not enough/);
assert.throws(()=>core.validateDeck(["🍎","🍎","🍎","🍎"],2),/Invalid/);
assert.throws(()=>core.validate([{id:1,version:1,type:"unknown",pairs:2,seed:1}]),/Invalid/);
console.log("PASS: 23 definitions, six types, 1000 valid decks, deterministic seed and invalid-input guards");
