import ActorSheetDsa5 from "../../../systems/dsa5/modules/actor/actor-sheet.js";

function prepareShipFlags(actor) {
    console.log(actor.id);
    actor.setFlag("dsa5_ship_combat","crew", {
        "rowers":0,
        "soliders": 0,
        "officers": 0,
        "sailors": 0,
        "gunners": 0
    });
}

export default class ActorSheetdsa5Ship extends ActorSheetDsa5 {
    static async registerSheet(){
        Actors.registerSheet("dsa5", ActorSheetdsa5Ship, { types: ["character"] });
        game.dsa5.sheets.ActorSheetdsa5Ship = ActorSheetdsa5Ship;
        await loadTemplates(['modules/dsa5_ship_combat/templates/ship_main.html']);
        await loadTemplates(['modules/dsa5_ship_combat/templates/ship_combat.html']);
        await loadTemplates(['modules/dsa5_ship_combat/templates/ship_inventory.html']);
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

    async _render(force = false, options = {}) {
        await super._render(force, options);
    }
    
    async getData(options) {
        if (this.object.flags.dsa5_ship_combat === undefined && this.object.isOwner) {
            prepareShipFlags(this.object);
        }
        const data = await super.getData(options);
        data.ship = data.actor.flags.dsa5_ship_combat;

        return data;

    }

    activateListeners(html) {
        super.activateListeners(html);
        html.find(".gunners_input").change(ev => {
            const val = parseInt(ev.currentTarget.value);
            //todo: handle possible errors
            this.object.setFlag("dsa5_ship_combat", "crew", {gunners: val});
            this._render();
        });
    }
    
    get template() {
        return "./modules/dsa5_ship_combat/templates/ship_sheet.html";
    }
}