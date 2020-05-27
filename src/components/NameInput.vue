<template>
    <div class="fields">
        <div class="first">
            <input
                v-model="value.first"
                type="text"
                name="first"
                placeholder="First Name"
                v-validate="'required'"
                />
        </div>

        <div class="last">
            <input
                v-model="value.last"
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
    props: ['value']
}
</script>
