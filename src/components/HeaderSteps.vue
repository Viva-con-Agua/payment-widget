<template>
        <div class="steps">
            <ul>
                <li v-for="step in steps" :key="step.id" 
                    :class="{
                         'is-active': step.id == currentStep, 
                         'is-inactive': step.id != currentStep, 
                         'last': step.id == steps.length, 
                         'first': step.id == 1,
                         'behind': step.id > currentStep
                 }">
                    <div class="step-content">
                        <div class="step-id"><div>{{ step.id }}.</div></div>
                        <div class="step-label"><div>{{ step.label }}</div></div>
                    </div>
                    <div v-if="step.id != currentStep" class="step-background"></div>
                </li>
            </ul>
        </div>
</template>
<script>

export default {
    name: 'HeaderSteps',
    props: {
        steps: {
            type: Array,
            default() {
                return [
                    {
                        id: '1',
                        label: ''
                    }
                ]
            }
        },
        currentStep: {
            type: Number,
            default: 1
        },
        currentLabel: {
            type: String,
            default: ''
        }
    }
}
</script>
<style type="text/css">

.first {
    margin-left: 0px;
}

.last {
    margin-right: 0px;
}

.behind .step-content {
    right: 0;
    left: unset !important;
}

.behind .step-background {
    left: 0;
}

.step-background {
    background-image: url("~@/assets/blue_pixel.jpg");
    background-repeat: repeat-x;
    background-position: center 35%;

    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    width: 50%;
}

/*
    Default CSS
*/

.steps ul {
    overflow: hidden;
    display: table;
    margin-bottom: 0px;
    padding: 0;
    width: 100%;
}

/* Style the buttons inside the step */
.steps li {
    list-style: none;
    display: table-cell;
    position: relative;
    padding: 14px 16px;
    transition: 0.3s;
    font-size: 17px;
}

.steps li div.step-content .step-label {    
    white-space: nowrap;
}

/* 
    ACTIVE STEP
*/
.steps li.is-active {
    background-color: #008fc3;
    border-color: #008fc3 #008fc3 #008fc3;

    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px 5px 0 0;
}

.steps li.is-active div.step-content {
    width: 100%;
    min-height: 75px;
    height: 100%;
    text-decoration: none;
    position: relative;
}

.steps li.is-active div.step-content .step-id {
    color: #008fc3;
    font-weight: bold;
    font-size: 36px;
    text-align: center;
    
    background-image: url("~@/assets/icon_drop_white.png");
    background-size: contain;
    background-position: center center; 
    background-repeat: no-repeat;
    
    display: table;
    position: absolute;
    left: 0;
    width: 30%;
    height: 100%;
}

.steps li.is-active div.step-content .step-label {
    color: white;
    font-size: 24px;
    text-align: left;
    white-space: break-spaces;
    
    display: table;
    position: absolute;
    right: 0;
    top: 0;
    left: 30%;
    height: 100%;
}

.steps li.is-active div.step-content .step-label div,
.steps li.is-active div.step-content .step-id div {
    vertical-align: middle;
    display: table-cell;
    padding-top: 5px;
}

.steps li.is-active div.step-content .step-id div {
    padding-left: 5px;
}

.steps li.is-active div.step-content .step-label div {
    padding-left: 10px;
}

/*
    INACTIVE steps
*/

.steps li.is-inactive {
    vertical-align: middle;
    opacity: 0.5;
}

.steps li.is-inactive div.step-content {
    text-align: center;
    text-decoration: none;

    display: table;
    padding-top: 20px;
    padding-left: 5px;
    position: absolute;
    left: 0;
    top: 0;
    width: 50%;
    height: auto;
}

.steps li.is-inactive div.step-content .step-label {    
    color: #008fc3; 
    display: table-row;
}

.steps li.is-inactive div.step-content .step-id {
    color: white;
    background-image: url("~@/assets/icon_drop.png");
    background-size: contain;
    background-position: center center; 
    background-repeat: no-repeat;
    font-size: 20px;

    margin: 5px auto;
    display: table-row;
    height: 40px;
}

.steps li.is-inactive div.step-content .step-id div {
    padding-top: 10px;
}

.steps li.is-inactive div.step-content .step-label div {
    padding-top: 5px;
}

/*********************
*** SCREEN 1120 PX ***
**********************/

@media only screen and (max-width: 1120px) {

    .steps li.is-active div.step-content div.step-label {
        font-size: 22px;
    }

}

/*********************
*** SCREEN 1000 PX ***
**********************/

@media only screen and (max-width: 1000px) {

    .steps li.is-active div.step-content div.step-label {
        font-size: 17px;
    }

    .steps li.is-inactive div.step-content .step-label {    
        font-size: 14px;
        white-space: normal;
    }

    .steps li.is-active div.step-content div.step-id {
        font-size: 24px;
    }

    .steps li.is-inactive div.step-content div.step-id {
        font-size: 18px;
    }

}

/*********************
*** SCREEN 800 PX ***
**********************/

@media only screen and (max-width: 800px) {

    .step-background {
        width: 35%;
    }

    .steps li.is-active div.step-content div.step-label {
        font-size: 15px;
    }

    .steps li.is-inactive div.step-content div.step-label {
        font-size: 14px;
    }

}

/*********************
*** SCREEN 600 PX ***
**********************/

@media only screen and (max-width: 600px) {

    .step-background {
        display: none;
    }

    .steps li div.step-content .step-label {    
        display: none !important;
    }

    .steps li {
        padding: 7px 8px;
    }

    .steps li.is-active div.step-content div.step-id {
        width: 100%;
    }

    .steps li.is-inactive div.step-content {
        display: block;
        min-height: 75px;
        width: 100%;
        padding: 0px;
        position: relative;

    }

    .steps li.is-inactive div.step-content .step-id {
        height: 80%;
        width: 100%;
        display: table;
        position: absolute;
        margin-top: 10px;
    }

    .steps li.is-inactive div.step-content .step-id div {
        font-size: 16px;
        display: table-cell;
        vertical-align: middle;
        padding-top: 5px;
    }

}

</style>