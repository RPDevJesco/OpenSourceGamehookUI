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
        PokemonSprite(teamNumber) {
            let dexEntry = this.mapper.get('player.team.' + teamNumber + '.pokedexNumber').value;
            if (dexEntry === null) return;
            if (dexEntry < 10) dexEntry = '00' + dexEntry;
            if (dexEntry > 11 && dexEntry < 100) dexEntry = '0' + dexEntry;
            return "https://www.serebii.net/pokearth/sprites/frlg/" + dexEntry + ".png";
        },
        PokemonMove(teamNumber, moveNumber) {
            let move = this.mapper.get('player.team.' + teamNumber + '.move' + moveNumber).value;
            if (move === null) return '--';
            return move;
        },
        PokemonPP(teamNumber, moveNumber) {
            let move = this.mapper.get('player.team.' + teamNumber + '.move' + moveNumber + 'pp').value;
            if (move === null) return;
            if (move === 0) return;
            return move;
        },
        PokemonLevel(teamNumber) {
            let level = this.mapper.get('player.team.' + teamNumber + '.level').value;
            if (level === null) return;
            return level;
        }
    },
    //--------- PROGRAM MOUNTED -------------------------------------------------------------------------------//
    mounted: async function () {
        this.mapper = new GameHookMapperClient();
        this.mapper.onConnected = (x) => this.ready = true;
        this.mapper.onDisconnected = (x) => this.ready = false;
        await this.mapper.connect();
    },
}).mount('#app');