<template>
  <div class="checkbox">
    <input v-model="inputValue" type="checkbox" id="checkbox">
    <label for="checkbox"></label>
  </div>
</template>

<script>
export default {
  name: 'UiCheckbox',
  props: {
    value: {
      type: Boolean,
      default: false,
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
.checkbox {
  input {
    position: absolute;
    z-index: -1;
    opacity: 0;

    &:checked+label::before {
      border-color: #FFD467;
      background-color: #FFD467;
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23000' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
    }
  }

  input+label {
    display: inline-flex;
    align-items: center;
    user-select: none;
    cursor: pointer;

    &::before {
      content: '';
      display: inline-block;
      width: 17px;
      height: 17px;
      flex-shrink: 0;
      flex-grow: 0;
      border: 1px solid #adb5bd;
      border-radius: 5px;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 50% 50%;
    }
  }
}
</style>
