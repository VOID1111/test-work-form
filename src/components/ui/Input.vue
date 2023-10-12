<template>
  <div class="input" :style="`grid-area: ${$attrs.field};`">
    <label :for="$attrs.field">
      <input v-model="inputValue" v-bind="{ ...$attrs, ...$props, id: $attrs.field}">
    </label>
    <span class="input__error">{{ error ? error[0] : '' }}</span>
  </div>
</template>

<script>
export default {
  name: 'UiInput',
  props: {
    value: {
      type: String,
      default: '',
    },
    error: {
      type: Array,
      default: () => ([]),
    },
  },
  computed: {
    inputValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
};
</script>

<style lang="scss">
.input {
  position: relative;

  input {
    width: calc(100% - 20px);
    padding: 0 10px;
    @include input-style;
    @include typography-2;

    &:focus{
      outline: none;
    }

    &::placeholder {
      color: $color13;
      @include typography-2;
    }
  }

  &__error {
    @include input-error-style;
  }
}
</style>
