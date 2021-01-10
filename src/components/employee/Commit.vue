<template lang="pug">
.commit
    .commit-info
        span
            span.commit-info-name {{commit.project}} - 
            span.commit-info-hash {{commit.hash}}
        br
        span.commit-info-date {{commit.date | moment('DD MMM, yyyy HH:mm:SS')}}
    .commit-message
        span {{commit.message}}
        
</template>

<script>
// import the store helpers in order to use directly the store getters
import {
    mapActions,
} from 'vuex'

export default {
    name: 'Commit',
    props: {
        commit: {
            type: Object,
            default: null,
            required: true,
        },
    }, 
    methods: {
    },
}
</script>

<!-- Added "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.commit {
    border-bottom: 1px solid #C4C4C4;
    font-size: 18px;
    &-info {
        display: flex;
        flex-direction: row;
        padding-bottom: 8px;
        &-name {
            font-weight: 700;
        }
        span:first-of-type {
            text-align: left;
        }
        span {
            flex: 1;
        }
        &-hash, &-date {
            color: #8D8D8D;
            text-align: right;
            font-weight: 700;
        }
    }
    &-message {
        font-weight: 400;
        text-align: left;
        padding-bottom: 8px;
    }
}
</style>
