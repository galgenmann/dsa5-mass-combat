import ItemSheetdsa5 from "../../../systems/dsa5/modules/item/item-sheet.js";
//import ship_weapons_json from "./ship_weapons.json" assert { type: 'json'};

class Weapon {
    constructor() {
        this.name = "New Weapon";
        this.hullDamage = 0;
        this.rigDamage = 0;
        this.hullBurnDamage = 0;
        this.rigBurnDamage = 0;
        this.range = 0;
        this.notes = "";
        this.trueDamage = false;
        this.rigSickleDamage = null;
    }

    doDamage(targeActor = {}) {
        // todo: add check if targetActor is a ship
        console.log(`${targetActor.name} takes ${this.hullDamage} damage`)
    }
}

class WeaponPickOption {
    actorid = "";
    weapons = [];
    position = "";
}

function prepareShipFlags(actor) {
    console.log(actor.id);
    actor.setFlag("dsa5_ship_combat", "crew", {
        "rowers": 0,
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

function readJson() {
    fetch("./modules/dsa5_ship_combat/modules/ship_weapons.json")
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            console.log(data)
        });
}

class AttackRoll extends FormApplication {
    constructor(actor = {}) {
        super();
        this.actor = actor;
    }
}

class WeaponPicker extends FormApplication {
    constructor(pickoptions = new WeaponPickOption()) {
        super();
        this.pickoptions = pickoptions;
    }

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            popOut: true,
            template: `modules/dsa5_ship_combat/templates/weapon_picker.html`,
            title: "Ship Weapon Picker",
        });
    }

    activateListeners(html) {
        super.activateListeners(html);
        html.find('.weapon-add').on('click', (e) => {
            let actor = game.actors.get(this.pickoptions.actorid);
            let weapon_name = e.currentTarget.childNodes[0].data;
            let weapon = this.pickoptions.weapons.find((w) => w.name === weapon_name);
            let weapons = actor.flags.dsa5_ship_combat.weapons;
            weapons[this.pickoptions.position].push(weapon);
            actor.setFlag("dsa5_ship_combat", "weapons", weapons);
        })
    }

    async _updateObject(event, formData) {
        console.log(formData.input)
    }

    getData(opts = {}) {
        let data = super.getData();
        data.weapons = this.pickoptions.weapons;

        return data;
        //game.actors.get(actorId)
    }
}

export default class ItemUnitSheet extends ItemSheetdsa5 {
    static async registerSheet() {
        Items.registerSheet("dsa5", ItemUnitSheet, { types: ["character"] });
        game.dsa5.sheets.ActorSheetdsa5Ship = ActorSheetdsa5Ship;
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
            this.object.setFlag("dsa5_ship_combat", "crew", { gunners: val });
            this._render();
        });
        html.find(".weapon-add").on("click", (e) => {
            let options = new WeaponPickOption();
            //console.log(ship_weapons_json)
            readJson();
            fetch("modules/dsa5_ship_combat/modules/ship_weapons.json")
                .then((res) => res.json())
                .then((weapons) => {
                    options.weapons = weapons;
                    options.actorid = this.actor.id;
                    options.position = e.currentTarget.attributes.targetpos.nodeValue;
                    new WeaponPicker(options).render(true);
                });
        });

        html.find(".weapon-remove").on("click", (e) => {
            let position = e.currentTarget.parentElement.parentElement.parentElement.attributes.targetpos.nodeValue;
            let index = e.currentTarget.attributes.index.nodeValue;

            let weapons = this.actor.flags.dsa5_ship_combat.weapons;
            weapons[position].splice(index, 1);
            this.actor.setFlag("dsa5_ship_combat", "weapons", weapons);
        });

        html.find(".weapon-attack").on("click", (e) => {
            let position = e.currentTarget.parentElement.parentElement.parentElement.attributes.targetpos.nodeValue;
            let index = e.currentTarget.attributes.index.nodeValue;

            weapons[position].splice(index, 1);
            this.actor.setFlag("dsa5_ship_combat", "weapons", weapons);
        });
    }

    get template() {
        return "modules/dsa5-mass-combat/templates/ship_sheet.html";
    }
}
