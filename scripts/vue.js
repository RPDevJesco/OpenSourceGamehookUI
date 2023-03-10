const app = Vue.createApp({
    //DATA & DEFINITIONS
    data() {
        return {
            ready: false,
            mapper: null
        }
    },

    //FUNCTIONS -----------------------------------------------------------------------------------------------//
    methods: {
        /**
         * Determines which version of Pokemon is being run. Which will allow for
         * making a more seamless frontend that changes depending upon the game.
         * Gen 1 is 1, gen 2 is 2, fire red / leaf green along with gen 3 are 3. If it ever returns 0, that means an error has occurred.
         **/
        GameVersionState(){
            switch (this.mapper.meta.gameName) {
                case 'Pokemon Red and Blue':
                    return 1;
                case 'Pokemon Yellow':
                    return 1;
                case 'Pokemon Gold & Silver':
                    return 2;
                case 'Pokemon Crystal':
                    return 2;
                case 'Pokemon FireRed & LeafGreen':
                    return 3;
                case 'Pokemon Ruby & Sapphire':
                    return 4;
                case 'Pokemon Emerald':
                    return 4;
                default:
                    return 0;
            }
        },
        /**
         * Utilizes the GameVersionState to allow for switching between over world and battle states without needing different frontends.
         * Gen 1 takes the battle states of 0 and 1
         * Gen 2 takes the battle states of 2 and 3
         * Gen 3 takes the battle states of 4 and 5
         **/
        BattleState(){
            switch (this.GameVersionState()) {
                // 0 = over world state, 1 = battle state
                case 1:
                    if (this.mapper.properties.battle.type.value === `None`) {
                        return 0;
                    }
                    else if (this.mapper.properties.battle.type.value === `Wild`) {
                        return 1;
                    }
                    else if (this.mapper.properties.battle.type.value === `Trainer`) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                case 2:
                    // 2 = over world state, 3 = battle state
                    if (this.mapper.properties.battle.battleStart.value === 122 && this.mapper.properties.battle.mode.value === 'WILD') {
                        return 3
                    }
                    if (this.mapper.properties.battle.battleStart.value === 122 && this.mapper.properties.battle.mode.value === 'TRAINER') {
                        return 3
                    }
                    else
                        return 2
                case 3:
                    // battle.turnInfo.battleDialogue (3 when the battle starts, 6 when it ends)
                    // battle.turnInfo.battleOutcome (1 is won, 2 is lost) will reset when it goes to a new battle.
                    // 4 = over world state, 5 = battle state
                    if (this.mapper.properties.battle.turnInfo.battleDialogue.value === 0 && this.mapper.properties.battle.turnInfo.battleOutcome.value === 0) {
                        return 4; // This is how the values look upon reset or new game. Both being at 0, which means we are in the over world state.
                    }
                    else if (this.mapper.properties.battle.turnInfo.battleDialogue.value === 6 && this.mapper.properties.battle.turnInfo.battleOutcome.value === 1) {
                        return 4; // over world state
                    }
                    else if (this.mapper.properties.battle.turnInfo.battleDialogue.value === 6 && this.mapper.properties.battle.turnInfo.battleOutcome.value === 4) {
                        return 4; // over world state
                    }
                    else if (this.mapper.properties.battle.turnInfo.battleDialogue.value === 6 && this.mapper.properties.battle.turnInfo.battleOutcome.value === 2) {
                        return 4; // over world state
                    }
                    else if (this.mapper.properties.battle.turnInfo.battleDialogue.value === 3 && this.mapper.properties.battle.turnInfo.battleOutcome.value === 0) {
                        return 5; // battle state begin
                    }
                    else if (this.mapper.properties.battle.turnInfo.battleDialogue.value === 6 && this.mapper.properties.battle.turnInfo.battleOutcome.value === 0) {
                        return 5; // battle state begin
                    }
                    else {
                        return 4;
                    }
                case 4:
                    // 4 = over world state, 5 = battle state
                    if (this.mapper.properties.battle.turnInfo.battleOutcome.value === 'WON') {
                        return 4; // over world state
                    }
                    else if (this.mapper.properties.battle.turnInfo.battleOutcome.value === 'LOST') {
                        return 4; // over world state
                    }
                    else if (this.mapper.properties.battle.turnInfo.battleOutcome.value === null) {
                        return 5; // over world state
                    }
                    else {
                        return 4;
                    }
            }
        },
        /**
         * Swaps between the over world and Battle states src values.
         */
        SwapBattleToOverWorldState() {
            switch (this.BattleState()) {
                case 0:
                    return 'GenOneOverWorldStats.html';
                case 1:
                    return 'GenOneBattleStats.html';
                case 2:
                    return 'GenTwoOverWorldStats.html';
                case 3:
                    return 'GenTwoBattleStats.html';
                case 4:
                    return 'GenThreeFireRedLeafGreenOverWorldStats.html';
                case 5:
                    return 'GenThreeFireRedLeafGreenBattleStats.html';
            }
        },
        PokemonSprites() {
            if (this.BattleState() === 0 || this.BattleState() === 2 || this.BattleState() === 4) {
                let pokeDexEntry = this.mapper.properties.player.team[0].pokedexNumber.value;
                if (pokeDexEntry < 10) pokeDexEntry = '00' + pokeDexEntry;
                if (pokeDexEntry > 11 && pokeDexEntry < 100) pokeDexEntry = '0' + pokeDexEntry;
                return "https://www.serebii.net/pokearth/sprites/frlg/" + pokeDexEntry + ".png";
            }
            if (this.BattleState() === 1 || this.BattleState() === 3 || this.BattleState() === 5) {
                let pokeDexEntry = this.mapper.properties.battle.yourPokemon.pokedexNumber.value;
                if (pokeDexEntry < 10) pokeDexEntry = '00' + pokeDexEntry;
                if (pokeDexEntry > 11 && pokeDexEntry < 100) pokeDexEntry = '0' + pokeDexEntry;
                return "https://www.serebii.net/pokearth/sprites/frlg/" + pokeDexEntry + ".png";
            }
        },
    },

    //--------- PROGRAM MOUNTED -------------------------------------------------------------------------------//
    mounted: async function () {
        this.mapper = new GameHookMapperClient();
        this.mapper.onConnected = (x) => this.ready = true;
        this.mapper.onDisconnected = (x) => this.ready = false;
        await this.mapper.connect();
    },
}).mount('#app');