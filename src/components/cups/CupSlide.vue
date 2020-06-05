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
    <input type="range" min="0" max="10" value="0" @input="setAmount">
    </div>
</template>
<script>
export default {
    name: 'CupSlide',
    data () {
        return {
            empty: 10,
            full: 0
        }
    },
    methods: {
        setAmount (e) {
            this.full = parseInt(e.target.value)
            this.empty = 10 - parseInt(e.target.value)
            this.$emit("amount", e.target.value)
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
