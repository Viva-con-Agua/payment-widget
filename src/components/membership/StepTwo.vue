<template>
    <div class="steptwo">
        <vca-field label="Ich spende als">
                <div class="interval">
                    <button :class="getTypeClass('private')" class="selectbutton"  @click.prevent="selectCompany(false)">Privatperson</button>
                    <button :class="getTypeClass('company')" class="selectbutton" @click.prevent="selectCompany(true)">Unternehmen</button>
                </div>
        </vca-field>
        <vca-field label="Persönliche Angaben">
            <vca-input 
                   ref="email"
                   errorMsg="Bitte E-Mail Adresse eintragen"
                   placeholder="E-Mail Adresse"
                   v-model.trim="supporter.email" 
                   :rules="$v.supporter.email"/>
                <vca-field-row>
                    <vca-input 
                   ref="first_name"
                   first
                   errorMsg="Bitte Vornamen eintragen"
                   placeholder="Vorname"
                   v-model.trim="supporter.first_name" 
                   :rules="$v.supporter.first_name">
                    </vca-input>
                    <vca-input
                        ref="last_name"
                        last
                        errorMsg="Bitte Nachnamen eintragen"
                        placeholder="Nachname"
                        v-model.trim="supporter.last_name" 
                        :rules="$v.supporter.last_name">
                    </vca-input>
                </vca-field-row>
            <vca-input 
                   v-if="offset.company"
                   ref="email"
                   errorMsg="Bitte E-Mail Adresse eintragen"
                   placeholder="Name des Unternehmens"
                   v-model.trim="supporter.company_name" 
                   :rules="$v.supporter.company_name"/>
                <vca-input 
                   ref="email"
                   errorMsg="Bitte E-Mail Adresse eintragen"
                   placeholder="Straße und Hausnummer"
                   v-model.trim="supporter.street" 
                   :rules="$v.supporter.street"/>
                    <vca-field-row>
                        <vca-input 
                   ref="first_name"
                   first
                   errorMsg="Bitte Vornamen eintragen"
                   placeholder="Plz"
                   v-model.trim="supporter.zip" 
                   :rules="$v.supporter.zip">
                        </vca-input>
                        <vca-input
                            ref="last_name"
                            last
                            errorMsg="Bitte Nachnamen eintragen"
                            placeholder="Ort"
                            v-model.trim="supporter.city" 
                            :rules="$v.supporter.city">
                        </vca-input>
                    </vca-field-row>
                        <div class="vca-input">
                            <country-select v-model="supporter.country" :country="supporter.country" topCountry="DE" />
                        </div>
                    </vca-field>
                    <vca-field label="Weitere Angaben">
                        <div class="vca-input-checkbox">
                            <label class="container">
                                <input type="checkbox" v-model="offset.data_privacy">
                                <span class="checkmark"></span>
                                Ich habe die <a href="https://www.vivaconagua.org/datenschutzerklaerung" target="_blank">Datenschutzerklärung</a> und die <a href="https://www.vivaconagua.org/agb" target="_blank">AGB</a> gelesen.
                            </label>
                        </div>
                        <div class="vca-input-checkbox">
                            <label class="container">
                                <input type="checkbox" v-model="offset.newsletter">
                                <span class="checkmark"></span>
                                Ich würde mich gerne zusätzlich zur Viva con Agua Flaschenpost eintragen.
                            </label>
                        </div>
                        <div class="selectknown">
                            <label>So bin ich auf euch aufmerksam geworden</label>
                            <div class="vca-input">
                                <select v-model="offset.known_from" name="known">
                                    <option value="">Bitte wählen</option>
                                    <option value="facebook">Facebook</option>
                                </select>
                            </div>
                        </div>
        </vca-field>
        <button class="submit membership-button" @click.prevent="submit"> Weiter zu Schritt 3 </button>
    </div>
</template>
<script>

import { required, email } from 'vuelidate/lib/validators'
export default {
    name: 'StepTwo',
    props: {
    },
    data () {
        return {
            offset: {
                company: false,
                data_privacy: false,
                newsletter: false,
                known_from: ""
            },
            supporter: {
                email: '',
                first_name: '',
                last_name: '',
                street: '',
                zip: '',
                city: '',
                country: 'DE',
                company_name: ''
            }
        }
    },
    validations: {
        supporter: {
            email: {
                required,
                email
            },
            first_name: {
                required
            },
            last_name: {
                required
            },
            country_name: {
                required
            },
            city: {
                required
            },
            zip: {
                required
            },

        },
    },
    methods: {
        selectCompany(company) {
            console.log(company)
            this.offset.company = company
        },
        getTypeClass(val) {
            if (this.offset.company) {
                return (val == 'company') ? 'btn_selected' : 'btn_deselected';
            } else {
                return (val != 'company') ? 'btn_selected' : 'btn_deselected';
            }
        },
        submit() {
            this.$emit("submit", this.supporter, this.offset)
        }

    }
}
</script>
<style>
.interval {
    text-align: center;
}
.vca-input select {
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 0.2rem;
    padding: 0.6em 1em;
    box-shadow: none;
    outline-color: #008fc2;  
    background-color:white;
    background-position: right;
    background-repeat: no-repeat;
}

.vca-input select option {
  background:#222;
  border-top:1px solid #444;
  padding:.3em 1em .3em 1em;
}

.vca-input-checkbox {
    margin-bottom: .3em;
}

.selectknown {
    display: inline-flex;
    width: 100%;
    margin-top: 15px;
}

.selectknown label {
    padding-top: .6em;
    margin-right: .6em;
}

.selectknown select {
    min-width: 170px;
}

</style>