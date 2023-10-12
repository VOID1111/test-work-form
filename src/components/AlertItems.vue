<template>
    <div class="alerts">
        <div
          v-for="(item, index_item) in items"
          :key="index_item"
          :class="`alerts__item alerts__item--${item.type}`">
            {{ item.text }}
        </div>
    </div>
</template>

<script>
export default {
  name: 'AlertItems',
  props: {
    defaultValues: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {};
  },
  computed: {
    items() {
      return this.$store.getters.getAlerts;
    },
  },
  mounted() {
    setInterval(() => {
      const time = Date.now();
      this.items.forEach((item) => {
        if (time > item.id + 3000) {
          this.$store.commit('removeAlert', item.id);
        }
      });
    }, 1000);
  },
};
</script>

<style scoped lang="scss">
.alerts {
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 280px;

  &__item {
    min-height: 40px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    margin-bottom: 10px;
    background-color: $color11;
    @include typography-2;

    &:last-child {
      margin-bottom: 0;
    }

    &--success {
      border-left: 5px solid $color7;
    }

    &--error {
      border-left: 5px solid $color14;
    }
  }
}
</style>
