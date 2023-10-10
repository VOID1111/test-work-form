<template>
  <div class="button">
    <button>{{ title }}</button>
  </div>
</template>

<script>
export default {
  name: 'UiButton',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss">
.button {}
</style>
