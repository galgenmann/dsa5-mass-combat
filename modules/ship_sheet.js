import ActorSheetDsa5 from "../../../systems/dsa5/modules/actor/actor-sheet.js";

export default class ActorSheetdsa5Ship extends ActorSheetDsa5 {
    static registerSheet(){
        Actors.registerSheet("dsa5", ActorSheetdsa5Ship, { types: ["character"] });
        game.dsa5.sheets.ActorSheetdsa5Ship = ActorSheetdsa5Ship;
        console.log(game.dsa5.sheets.ActorSheetdsa5Ship);
    }
}
    //Actors.registerSheet("dsa5", CharacterMerchantSheetDSA5, { types: ["character"] })
    /*
    static get defaultOptions() {
        const options = super.defaultOptions;
        mergeObject(options, {
            classes: options.classes.concat(["dsa5", "actor", "character-sheet"]),
            width: 784,
        });
        return options;
    }


    get template() {
        if (this.showLimited()) return "ship_sheet.html";
        return "ship_sheet.html";
    }

}*////Data\systems\dsa5\modules\actor\actor-dsa5.js
