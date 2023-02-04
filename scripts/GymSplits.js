const app = Vue.createApp({
    //DATA & DEFINITIONS
    data() {
        return {
            ready: false,
            mapper: null,
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
        gameTimeFormatString(h, m, s) {
            if (h <= 0) {
                if (m <= 0) return `${s}`;
                if (s < 10) s = "0" + s.toString();
                return `${m}:${s}`;
            }
            if (s < 10) s = "0" + s.toString();
            if (m < 10) m = "0" + m.toString();
            return `${h}:${m}:${s}`;
        }
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

        this.mapper.properties.events.beatChampion.change(async(x) => {
            console.log('badge8 change: ' + x.value);
            if (x.value === true)
            this.championDefeated = this.mapper.properties.gameTime.hours + ':' + this.mapper.properties.gameTime.minutes + ':' + this.mapper.properties.gameTime.seconds;
        });
    },
}).mount('#app');