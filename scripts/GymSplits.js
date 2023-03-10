const app = Vue.createApp({
    //DATA & DEFINITIONS
    data() {
        return {
            ready: false,
            mapper: null,
            gameTimer: '--',
            gym1Split: '--',
            gym2Split: '--',
            gym3Split: '--',
            gym4Split: '--',
            gym5Split: '--',
            gym6Split: '--',
            gym7Split: '--',
            gym8Split: '--',
            championDefeated: '--'
        }
    },

    //FUNCTIONS -----------------------------------------------------------------------------------------------//
    methods: {
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
        /**
         * Determines which version of Pokemon is being run. Which will allow for
         * making a more seamless frontend that changes depending upon the game.
         * Gen 1 is 1, gen 2 is 2, fire red / leaf green is 3 and gen 3 is 4. If it ever returns 0, that means an error has occurred.
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
    },

    //--------- PROGRAM MOUNTED -------------------------------------------------------------------------------//
    mounted: async function () {
        this.mapper = new GameHookMapperClient();
        this.mapper.onConnected = (x) => this.ready = true;
        this.mapper.onDisconnected = (x) => this.ready = false;
        await this.mapper.connect();

        this.mapper.properties.player.badges.badge1.change(async(x) => {
            console.log('badge1 change: ' + x.value);
            if (x.value === true)
            this.gym1Split = this.mapper.properties.gameTime.hours + ':' + this.mapper.properties.gameTime.minutes + ':' + this.mapper.properties.gameTime.seconds;
        });

        this.mapper.properties.player.badges.badge2.change(async(x) => {
            console.log('badge2 change: ' + x.value);
            if (x.value === true)
            this.gym2Split = this.mapper.properties.gameTime.hours + ':' + this.mapper.properties.gameTime.minutes + ':' + this.mapper.properties.gameTime.seconds;
        });

        this.mapper.properties.player.badges.badge3.change(async(x) => {
            console.log('badge3 change: ' + x.value);
            if (x.value === true)
            this.gym3Split = this.mapper.properties.gameTime.hours + ':' + this.mapper.properties.gameTime.minutes + ':' + this.mapper.properties.gameTime.seconds;
        });

        this.mapper.properties.player.badges.badge4.change(async(x) => {
            console.log('badge4 change: ' + x.value);
            if (x.value === true)
            this.gym4Split = this.mapper.properties.gameTime.hours + ':' + this.mapper.properties.gameTime.minutes + ':' + this.mapper.properties.gameTime.seconds;
        });

        this.mapper.properties.player.badges.badge5.change(async(x) => {
            console.log('badge5 change: ' + x.value);
            if (x.value === true)
            this.gym5Split = this.mapper.properties.gameTime.hours + ':' + this.mapper.properties.gameTime.minutes + ':' + this.mapper.properties.gameTime.seconds;
        });

        this.mapper.properties.player.badges.badge6.change(async(x) => {
            console.log('badge6 change: ' + x.value);
            if (x.value === true)
            this.gym6Split = this.mapper.properties.gameTime.hours + ':' + this.mapper.properties.gameTime.minutes + ':' + this.mapper.properties.gameTime.seconds;
        });

        this.mapper.properties.player.badges.badge7.change(async(x) => {
            console.log('badge7 change: ' + x.value);
            if (x.value === true)
            this.gym7Split = this.mapper.properties.gameTime.hours + ':' + this.mapper.properties.gameTime.minutes + ':' + this.mapper.properties.gameTime.seconds;
        });

        this.mapper.properties.player.badges.badge8.change(async(x) => {
            console.log('badge8 change: ' + x.value);
            if (x.value === true)
            this.gym8Split = this.mapper.properties.gameTime.hours + ':' + this.mapper.properties.gameTime.minutes + ':' + this.mapper.properties.gameTime.seconds;
        });

        if (this.mapper.properties.events.beatChampion === undefined) return;
        this.mapper.properties.events.beatChampion.change(async(x) => {
            console.log('badge8 change: ' + x.value);
            if (x.value === true)
            this.championDefeated = this.mapper.properties.gameTime.hours + ':' + this.mapper.properties.gameTime.minutes + ':' + this.mapper.properties.gameTime.seconds;
        });

        if (this.mapper.properties.player.badges.badge9 === undefined) return;
        this.mapper.properties.player.badges.badge9.change(async(x) => {
            console.log('badge1 change: ' + x.value);
            if (x.value === true)
                this.gym1Split = this.mapper.properties.gameTime.hours + ':' + this.mapper.properties.gameTime.minutes + ':' + this.mapper.properties.gameTime.seconds;
        });
        if (this.mapper.properties.player.badges.badge10 === undefined) return;
        this.mapper.properties.player.badges.badge10.change(async(x) => {
            console.log('badge2 change: ' + x.value);
            if (x.value === true)
                this.gym2Split = this.mapper.properties.gameTime.hours + ':' + this.mapper.properties.gameTime.minutes + ':' + this.mapper.properties.gameTime.seconds;
        });
        if (this.mapper.properties.player.badges.badge11 === undefined) return;
        this.mapper.properties.player.badges.badge11.change(async(x) => {
            console.log('badge3 change: ' + x.value);
            if (x.value === true)
                this.gym3Split = this.mapper.properties.gameTime.hours + ':' + this.mapper.properties.gameTime.minutes + ':' + this.mapper.properties.gameTime.seconds;
        });
        if (this.mapper.properties.player.badges.badge12 === undefined) return;
        this.mapper.properties.player.badges.badge12.change(async(x) => {
            console.log('badge4 change: ' + x.value);
            if (x.value === true)
                this.gym4Split = this.mapper.properties.gameTime.hours + ':' + this.mapper.properties.gameTime.minutes + ':' + this.mapper.properties.gameTime.seconds;
        });
        if (this.mapper.properties.player.badges.badge13 === undefined) return;
        this.mapper.properties.player.badges.badge13.change(async(x) => {
            console.log('badge5 change: ' + x.value);
            if (x.value === true)
                this.gym5Split = this.mapper.properties.gameTime.hours + ':' + this.mapper.properties.gameTime.minutes + ':' + this.mapper.properties.gameTime.seconds;
        });
        if (this.mapper.properties.player.badges.badge14 === undefined) return;
        this.mapper.properties.player.badges.badge14.change(async(x) => {
            console.log('badge6 change: ' + x.value);
            if (x.value === true)
                this.gym6Split = this.mapper.properties.gameTime.hours + ':' + this.mapper.properties.gameTime.minutes + ':' + this.mapper.properties.gameTime.seconds;
        });
        if (this.mapper.properties.player.badges.badge15 === undefined) return;
        this.mapper.properties.player.badges.badge15.change(async(x) => {
            console.log('badge7 change: ' + x.value);
            if (x.value === true)
                this.gym7Split = this.mapper.properties.gameTime.hours + ':' + this.mapper.properties.gameTime.minutes + ':' + this.mapper.properties.gameTime.seconds;
        });
        if (this.mapper.properties.player.badges.badge16 === undefined) return;
        this.mapper.properties.player.badges.badge16.change(async(x) => {
            console.log('badge8 change: ' + x.value);
            if (x.value === true)
                this.gym8Split = this.mapper.properties.gameTime.hours + ':' + this.mapper.properties.gameTime.minutes + ':' + this.mapper.properties.gameTime.seconds;
        });
    },
}).mount('#app');