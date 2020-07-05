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
                        <div class="step-label">{{ step.label }}</div>
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

.step-background {
    background-image: url("~@/assets/blue_pixel.jpg");
    background-repeat: repeat-x;
    background-position: center 35%;

    opacity: 0.5;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    width: 50%;
    z-index: 0;

}

/*
    Default CSS
*/

.steps ul {
    border-spacing: 5px 0;
    overflow: hidden;
    margin-bottom: 0px;
    display: table;
    width: 100%;
    padding: 0;
    border-left: 1px solid #ccc;
    border-top: 1px solid #ccc;
    border-right: 1px solid #ccc;

    border-top: none;
    border-left: none;
    border-right: none;
    background-color: #fff;

/*
    background-image: url("~@/assets/blue_pixel.jpg");
    background-repeat: repeat-x;
    background-position: center 90%;
*/
}

ul li {
    list-style: none;
}
/* Style the buttons inside the step */
.steps li {
    background-color: inherit;
    display: table-cell;
    outline: none;
    position: relative;
    padding: 14px 16px;
    transition: 0.3s;
    font-size: 17px;
}


.steps li div.step-content .step-label {    
    white-space: nowrap;
}

.first {
    margin-left: 0px;
}

.last {
    margin-right: 0px;
}

.behind {

}

/* 
    ACTIVE STEP
*/
.steps li.is-active {
    background-color: #008fc3;
    border-color: #008fc3 #008fc3 #008fc3;
}

.steps li.is-active div.step-content {
    width: 100%;
    min-height: 75px;
    height: 100%;
    margin: auto auto;
    text-decoration: none;
    display: inline-flex;

}

.steps li.is-active div.step-content div.step-label,
.steps li.is-active div.step-content div.step-id {
    width: 0;
}

.steps li.is-active div.step-content .step-id {
    color: #008fc3;
    font-weight: bold;
    background-image: url("~@/assets/icon_drop_white.png");
    background-size: contain;
    background-position: center center; 
    background-repeat: no-repeat;
    display: flex;
    font-size: 12px;
    justify-content: center;
    align-items: center; 
    flex-grow: 1;
    font-size: 2em;    
}

.steps li.is-active div.step-content .step-label {    
    color: white;
    flex-grow: 2;
    margin: auto 0;
    text-align: left;
    padding-left: 10px;
    font-size: 1.5em;
}

.steps li.is-active div.step-content .step-id div {
    margin-left: 5px;
    margin-top: 5px;
}

/*
    INACTIVE steps
*/

.steps li.is-inactive {
/*    background-image: url("~@/assets/blue_pixel.jpg");
    background-repeat: repeat-x;
    background-position: center 90%;*/
    vertical-align: middle;
}

.steps li.is-inactive div.step-content {
    opacity: 0.5;
    width: 0;
    min-height: 75px;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    width: 50%;
    padding-top: 15px;
    text-align: center;
    text-decoration: none;
}

.steps li.is-inactive div.step-content div.step-label,
.steps li.is-inactive div.step-content div.step-id {
}

.steps li.is-inactive div.step-content .step-label {    
    color: #008fc3; 
}

.steps li.is-inactive div.step-content .step-id {
    color: white;
    background-image: url("~@/assets/icon_drop.png");
    background-size: contain;
    background-position: center center; 
    background-repeat: no-repeat;
    font-size: 1.2em;

    margin: 5px auto;
    display: block;
    height: 40px;
    width: 70px;
}

.steps li.is-inactive div.step-content .step-id div {
  text-align: center;
  position: relative;
  top: 50%;
  -ms-transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
}

@media only screen and (max-width: 950px) {

    .steps li.is-active div.step-content div.step-label {
        font-size: 17px;
    }

    .steps li div.step-content .step-label {    
        font-size: 14px;
    }

}

@media only screen and (max-width: 600px) {

    .step-background {
        display: none;
    }

    .steps li div.step-content .step-label {    
        display: none;
    }

    .steps li.is-active {
        padding: 7px 8px;
    }

    .steps li.is-active div.step-content div.step-id {
        width: auto;
    }

    .steps li.is-active div.step-content .step-id div {
        font-size: 1em;
    }

    .steps li.is-inactive {
        padding: 7px 8px;
        background: none;
    }

    .steps li.is-inactive div.step-content {
        opacity: 0.5;
        width: 100%;
        min-height: 75px;
        display: flex;
        justify-content: center;
    }

    .steps li.is-inactive div.step-content .step-id {
        width: 100%;
        height: auto;        
    }

    .steps li.is-inactive div.step-content .step-id div {
        font-size: 16px;
    }

}

</style>