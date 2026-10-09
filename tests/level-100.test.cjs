"use strict";
const assert=require("node:assert/strict");
const core=require("../src/level-core.js");
const game=require("../src/level-100.js");
assert.equal(game.COUNT,100);
assert.equal(game.WORLDS.length,10);
assert.deepEqual(game.LEVELS.slice(0,5).map(l=>l.pairs),[2,3,4,5,6]);
assert.deepEqual(game.STATS,{classic:60,preview:8,shape:8,budget:8,ice:8,waves:8});
let count=0;
for(const level of game.LEVELS){
  const pool=game.WORLDS[level.world].emojis;
  for(let j=0;j<20;j++){
    const deck=core.uniquePairDeck(pool,level.pairs);
    assert.equal(core.validateDeck(deck,level.pairs),true);
    const session=core.createSession(level,deck);
    assert.equal(session.state().matchedPairs,0);
    count++;
  }
}
assert.throws(()=>game.definition(101),/geçersiz/);
assert.throws(()=>game.definition(0),/geçersiz/);
console.log("PASS: 100-level schema, 10 worlds, six modes and "+count+" decks");
