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
         * Gen 1 is 1, gen 2 is 2 and gen 3 is 3. If it ever returns 0, that means an error has occurred.
         **/
        GameVersionState(){
            if (this.mapper.meta.gameName === 'Pokemon Red and Blue') {
                return 1;
            }
            else if (this.mapper.meta.gameName === 'Pokemon Yellow') {
                return 1;
            }
            else if (this.mapper.meta.gameName === 'Pokemon Gold and Silver') {
                return 2;
            }
            else if (this.mapper.meta.gameName === 'Pokemon Crystal') {
                return 2;
            }
            else if (this.mapper.meta.gameName === 'Pokemon FireRed & LeafGreen') {
                return 3;
            }
            else if (this.mapper.meta.gameName === 'Pokemon Ruby & Sapphire') {
                return 3;
            }
            else if (this.mapper.meta.gameName === 'Pokemon Emerald') {
                return 3;
            }
            else {
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
            if (this.GameVersionState() === 1) {
                // 0 = over world state, 1 = battle state
                if (this.mapper.properties.player.team[0].level > 0 && this.mapper.properties.battle.outcome.value === 'WON') {
                    return 0
                }
                else
                    return 1
            }
            if (this.GameVersionState() === 2) {
                // 2 = over world state, 3 = battle state
                if (this.mapper.properties.player.team[0].level > 0 && this.mapper.properties.battle.outcome.value === 'WON') {
                    return 2
                }
                else
                    return 3
            }
            if (this.GameVersionState() === 3) {
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
            }

        },
        /**
         * Swaps between the over world and Battle states src values.
         */
        SwapBattleToOverWorldState() {
          if (this.BattleState() === 4) {
              return 'GenThreeOverWorldStats.html';
          }
          if (this.BattleState() === 5) {
              return 'GenThreeBattleStats.html';
          }
        },
        PokemonSprites() {
            if (this.BattleState() === 4) {
                let pokeDexEntry = this.mapper.properties.player.team[0].pokedexNumber.value;
                if (pokeDexEntry < 10) pokeDexEntry = '00' + pokeDexEntry;
                if (pokeDexEntry > 11 && pokeDexEntry < 100) pokeDexEntry = '0' + pokeDexEntry;
                return "https://www.serebii.net/pokearth/sprites/frlg/" + pokeDexEntry + ".png";
            }
            if (this.BattleState() === 5) {
                let pokeDexEntry = this.mapper.properties.battle.yourPokemon.pokedexNumber.value;
                if (pokeDexEntry < 10) pokeDexEntry = '00' + pokeDexEntry;
                if (pokeDexEntry > 11 && pokeDexEntry < 100) pokeDexEntry = '0' + pokeDexEntry;
                return "https://www.serebii.net/pokearth/sprites/frlg/" + pokeDexEntry + ".png";
            }
        },
        // This function will properly format the time to be in an easily readable format as it would display on a clock.
        gameTimeFormatString(h, m, s) {
            if (h <= 0) {
                if (m <= 0) return `${s}`;
                if (s < 10) s = "0" + s.toString();
                return `${m}:${s}`;
            }
            if (s < 10) s = "0" + s.toString();
            if (m < 10) m = "0" + m.toString();
            return `${h}:${m}:${s}`;
        },
        gameTimeHMS: function() {
            this.gameTimer = this.gameTimeFormatString(
                this.mapper.properties.gameTime.hours,
                this.mapper.properties.gameTime.minutes,
                this.mapper.properties.gameTime.seconds);
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