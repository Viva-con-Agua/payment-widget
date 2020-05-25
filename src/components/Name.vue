<template>
    <div class="name-input">
        <input
            v-model="name.first"
            type="text"
            name="first"
            placeholder="First Name"
            v-validate="'required'"
            />
        <input
            v-model="name.last"
            type="text"
            name="last"
            placeholder="Last Name"
            v-validate="'required'"
            />
    </div>
</template>
<script>
export default {
    name: 'NameInput',
    data () {
        name: {
            fist: '',
            last: ''
        }
    }
}
</script>
<style scoped>
    .name-input {
        display: flex;
    }
</style>
