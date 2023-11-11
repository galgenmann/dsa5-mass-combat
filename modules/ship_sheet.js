import ActorSheetDsa5 from "../../../systems/dsa5/modules/actor/actor-sheet.js";

export default class ActorSheetdsa5Ship extends ActorSheetDsa5 {
    static async registerSheet(){
        Actors.registerSheet("dsa5", ActorSheetdsa5Ship, { types: ["character"] });
        game.dsa5.sheets.ActorSheetdsa5Ship = ActorSheetdsa5Ship;
        console.log(game.dsa5.sheets.ActorSheetdsa5Ship);
    }

    static get defaultOptions() {
        const options = super.defaultOptions;
        mergeObject(options, {
            classes: options.classes.concat(["dsa5", "actor", "character-sheet"]),
            width: 784,
            heigt: 100,
        });
        return options;
    }

    /*
    async _render(force = false, options = {}) {
        await super._render(force, options);
        loadTemplates(['./modules/dsa5_ship_combat/templates/ship_main.html'])
    }*/


    get template() {
        return "./modules/dsa5_ship_combat/templates/ship_sheet.html";
    }
}
