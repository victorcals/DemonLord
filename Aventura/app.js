new Vue({
    el: '#app',
    data: {
        start: false,
        playerLife: 0,
        monsterLife: 22,
        logs: [

        ]

    },
    computed: {
        hasResult() {
            return this.playerLife == 0 || this.monsterLife == 0
        }

    },
    methods: {

        startGame() {

            this.start = true
            this.playerLife = 100
            this.monsterLife = 100
            this.logs = []
        },
        attack(especial) {
            this.hurt('monsterLife', 5, 10, especial, 'Jogador', 'Monstro', 'player')
            if (this.monsterLife > 0) {
                this.hurt('playerLife', 7, 12, false, 'Monstro', 'Jogador', 'monster')

            }
        },

        hurt(atr, min, max, especial, source, target, cls) {
            const plus = especial ? 5 : 0

            const hurt = this.getRandon(min + plus, max + plus)
            this[atr] = Math.max(this[atr] - hurt, 0)

            this.registerLog(`${source} atiungiu ${target} com ${hurt}`, cls)
        },

        healandhurt() {
            this.heal(10, 15)
            this.hurt('playerLife', 7, 12, false, 'Monstro', 'Jogador', 'monster')
        },

        heal(min, max) {
            const heal = this.getRandon(min, max)
            this.playerLife = Math.min(this.playerLife + heal, 100)
            this.registerLog(`Jogador se curou em ${heal}.`, 'playerheal')
        },
        getRandon(min, max) {
            const value = Math.random() * (max - min) + min
            return Math.round(value)
        },

        registerLog(text, cls) {
            this.logs.unshift({ text, cls })
        }

    },
    watch: {
        hasResult(value) {
            if (value) this.start = false
        }

    }

})