import ActorSheetdsa5Ship from "./ship_sheet.js";

Hooks.on("init", async function() {
  await ActorSheetdsa5Ship.registerSheet();
  console.log("Initializing DSA4 Naval Combat module");
});

Hooks.once("ready", function() {
    console.log(game.dsa5);
});