<template>
    <div class="cupslide">
        <div class="images">
        <div class="images">
            <div  v-for="index in full" :key="index" class="images_empty">
                <img src="../../assets/Logo_1.png"/>
            </div>
        </div>
        <div class="images">
            <div  v-for="index in empty" :key="index" class="images_empty">
                <img src="../../assets/Logo_2.png"/>
            </div>
        </div>
    </div>
    <input type="range" min="0" max="1000" :value="value" step="100" @input="setAmount">
    </div>
</template>
<script>
export default {
    name: 'CupSlide',
    data () {
        return {
            value: 0,
            empty: 10,
            full: 0
        }
    },
    methods: {
        setAmount (e) {
            var mask = parseInt(e.target.value /100)
            this.full = mask
            this.empty = 10 - mask
            this.$emit("amount", e.target.value)
        },
        replyAmount (value) {
            this.value = value
            if (value <= 1000) {
                this.full = Math.floor(value / 100)
                this.empty = 10 - Math.floor(value / 100)
            } else {
                this.full = 10
                this.empty = 0
            }
        }
    }
}
</script>
<style>
.cupslide input {
    width: 100%;
    box-shadow: none;
}
.images {
    display: flex;
    flex-direction: row;
}
.images_full img {
    padding: 5px;
    width: 50px;
}
.images_empty img {
    position: static;
    padding: 5px;
    width: 50px;
}



</style>
