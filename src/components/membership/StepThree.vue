<template>
                        <Payment v-if="!isCH" v-on:success="success" :payment="payment" :label="getLabel" :country="country" :valid="$v.payment" @notValid="validate"/>
</template>
