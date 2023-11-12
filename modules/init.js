import DSA5Dialog from "../../../systems/dsa5/modules/dialog/dialog-dsa5.js";
import ActorSheetdsa5Ship from "./ship_sheet.js";

Hooks.on("init", async function() {
  await ActorSheetdsa5Ship.registerSheet();
  console.log("Initializing DSA4 Naval Combat module");
});

Hooks.once("ready", async function() {
    // for development purposes: will render the first actor sheet, which has an ship sheet configured as its active sheet
    // results in rendering the sheet when refreshing with F5 automatacially
    game.actors.contents.find(element => {
        return element.sheet instanceof ActorSheetdsa5Ship;
    }).sheet.render(true);
});