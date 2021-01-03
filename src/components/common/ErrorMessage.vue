<template lang="pug">
  .error
      .error-message
        slot
</template>

<script>
export default {
    name: 'ErrorMessage',
}
</script>

<!-- Added "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.error {
    display: flex;
    color: red;
    font-weight: 500;
    
    &-message {
        font-size: 14px;
    }
}

</style>
