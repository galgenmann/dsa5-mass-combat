import ActorSheetDsa5 from "../../../systems/dsa5/modules/actor/actor-sheet.js";

class Weapon {
    constructor() {
        this.name = "New Weapon";
        thi.damage = 0;
        self.burndamage = 0;
        self.range = 0;
        self.notes = "";
    }
}

function prepareShipFlags(actor) {
    console.log(actor.id);
    actor.setFlag("dsa5_ship_combat","crew", {
        "rowers":0,
        "soliders": 0,
        "officers": 0,
        "sailors": 0,
        "gunners": 0
    });

    actor.setFlag("dsa5_ship_combat", "weapons", {
        "Backbord": [],
        "Steuerbord": [],
        "Heck": [],
        "Bug": [],
        "Zentral": []
    });
}

class WeaponPicker extends FormApplication {
    constructor(weapons = []) {
        super();
        this.weapons = weapons;
    }

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            popOut: true,
            template: `./modules/dsa5_ship_combat/templates/weapon_picker.html`,
            title: "Ship Weapon Picker",
        })
    }

    activateListeners(html) {
        super.activateListeners(html);
    }

    async _updateObject(event, formData) {
        console.log(formData.input)
    }

    getData(opts = {}) {
        let data = super.getData()
        data.weapons = self.weapons; 
        return data;
    }
}

export default class ActorSheetdsa5Ship extends ActorSheetDsa5 {
    static async registerSheet(){
        Actors.registerSheet("dsa5", ActorSheetdsa5Ship, { types: ["character"] });
        game.dsa5.sheets.ActorSheetdsa5Ship = ActorSheetdsa5Ship;
        await loadTemplates(['modules/dsa5_ship_combat/templates/ship_main.html']);
        await loadTemplates(['modules/dsa5_ship_combat/templates/weapon_picker.html']);
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
        console.log(data.ship);

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
        html.find(".weapon-add").on("click", () => {
            let weapons = [new Weapon(), new Weapon()];
            new WeaponPicker(weapons).render(true);
        });
    }
    
    get template() {
        return "./modules/dsa5_ship_combat/templates/ship_sheet.html";
    }
}