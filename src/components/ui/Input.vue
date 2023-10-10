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
    height: 37px;
    width: 100%;
    width: calc(100% - 20px);
    padding: 0 10px;
    border-radius: 11px;
    border: 1px solid #E6E6EB;
    font-size: 14px;
    font-weight: 400;
    font-style: normal;
    font-family: Montserrat;
    color: black;

    &:focus{
      outline: none;
    }

    &::placeholder {
      color: #9292A0;
      font-family: Montserrat;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 19px;
      letter-spacing: -0.021px;
    }
  }

  &__error {
    position: absolute;
    top: 40px;
    left: 10px;
    font-size: 10px;
    font-weight: 500;
    font-family: Montserrat;
    font-style: normal;
    color: red;
  }
}
</style>
