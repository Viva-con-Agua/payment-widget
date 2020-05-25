<template>
    <div class="vca form fields">
        <div class="vca form fields first">
            <input
                v-model="name.first"
                type="text"
                name="first"
                placeholder="First Name"
                v-validate="'required'"
                />
        </div>

        <div class="last">
            <input
                v-model="name.last"
                type="text"
                name="last"
                placeholder="Last Name"
                v-validate="'required'"
                />
        </div>
    </div>
</template>
<script>
export default {
    name: 'NameInput',
    data () {
        return {
            name: {
                fist: '',
                last: ''
            }
        }
    }
}
</script>
<style scoped>

.name-input {
    display: flex;
    flex-direction: row;
    margin: 0 0 1em;
}
.name-input .first {

    width: 100%;
    padding-right: 0.6em;
}
.name-input .last {
    flex: 0 1 auto;
    width: 100%;
    padding-left: 0.6em;
}
input {
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 0.2rem;
    padding: 0.6em 1em;
    box-shadow: none;
}
@media only screen and (max-width: 767px) {
.name-input {
    display: flex;
    flex-direction: row;
    margin: 0 0 1em;
    flex-wrap: wrap;
}
    .name-input .first {
        width: 100%;
        margin: 0 0 1em;
        padding: 0em 0em;
    }
    .name-input .last {
        flex: 0 1 auto;
        width: 100%;
        padding: 0em 0em;
    }
    input {
        width: 100%;
        border: 1px solid #ccc;
        border-radius: 0.2rem;
        box-shadow: none;
    }

}
</style>
