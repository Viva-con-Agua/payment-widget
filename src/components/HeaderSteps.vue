<template>
        <div class="tabs">
            <ul>
                <li v-for="step in getSteps" :key="step" :class="{ 'is-active': step.id == currentStep }">
                    <div class="tab-content">
                        <div class="tab-id">{{ step.id }}.</div>

                        <div class="tab-label">{{ step.label }}</div>
                    </div>
                </li>
            </ul>
        </div>
</template>
<script>

export default {
    name: 'HeaderSteps',
    props: {
        steps: {
            type: Number,
            default: 1
        },
        currentStep: {
            type: Number,
            default: 1
        },
        currentLabel: {
            type: String,
            default: ''
        }
    },
    computed: {
        getSteps() {
            console.log(this.steps)
            console.log(this.currentStep)
            return this.steps
        }
    }
}
</script>
<style type="text/css">

.tabs ul {
    border-spacing: 5px 0;
    overflow: hidden;
    display: table;
    width: 100%;
    padding-left: 5px;
    border: 1px solid #ccc;

    margin-bottom: -1px;
    border-top: none;
    border-left: none;
    border-right: none;
    background-color: #fff;
}

ul li {
    list-style: none;
}
/* Style the buttons inside the tab */
.tabs li {
    background-color: inherit;
    display: table-cell;
    margin: 0 2px;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    border-top: 1px solid #dddddd;
    border-right: 1px solid #dddddd;
    border-left: 1px solid #dddddd;

    outline: none;
    padding: 14px 16px;
    transition: 0.3s;
    font-size: 17px;
}

/* Change background color of buttons on hover */
.tabs li:hover {
    background-color: #ddd;
}

/* Create an active/current tablink class */
.tabs li.is-active {
    background-color: #008fc3;
    border-color: #008fc3 #008fc3 #008fc3;
}

.tabs li.is-active div.tab-content {
    color: white;/*#008fc3;*/
    background-image: url("~@/assets/icon_drop_white.png");
    background-size: contain;
    background-position: 7% center; 
    background-repeat: no-repeat;
}
.tabs li div.tab-content {
    background-image: url("~@/assets/icon_drop.png");
    background-size: contain;
    background-position: 7% center; 
    background-repeat: no-repeat;
    width: 100%;
    min-height: 75px;
    height: 100%;
    margin: auto auto;
    text-decoration: none;
    vertical-align: middle;
    display: inline-flex;
    justify-content: center;
    text-align: center;
}

.tabs li div.tab-content div {
    
}

.tabs li div.tab-content .tab-label {
    flex-grow: 2;
    width: 0;
    margin: auto 0;
}
.tabs li.is-active div.tab-content .tab-id {
    color: black;
}

.tabs li div.tab-content .tab-id {
    height: 100%;
    margin: auto 0;
    width: 0;
    flex-grow: 1;
    font-size: 2em;    
}

@media only screen and (max-width: 600px) {

 

}

</style>