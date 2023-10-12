<template>
  <div class="switch">
    <label for="switch-label" class="switch__elm">
      <input v-model="checkbox" id="switch-label" type="checkbox">
      <div class="slider round"></div>
    </label>
    <span v-if="label" class="switch__label">{{ label }}</span>
  </div>
</template>

<script>
export default {
  name: 'UiSwitch',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
  },
  computed: {
    checkbox: {
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

<style scoped lang="scss">
.switch {
  display: flex;
  align-items: center;
  width: fit-content;

  &__elm {
    position: relative;
    display: inline-block;
    width: 39px;
    height: 19px;

    input {
      display: none;
    }

    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: $color4;
      -webkit-transition: 0.4s;
      transition: 0.4s;
    }

    .slider:before {
      position: absolute;
      content: "";
      height: 17px;
      width: 17px;
      left: 0;
      bottom: 0;
      background-color: $color2;
      -webkit-transition: 0.4s;
      transition: 0.4s;
      border: 1px solid $color3;
    }

    input:checked + .slider {
      background-color: $color1;
    }

    input:focus + .slider {
      box-shadow: 0 0 1px $color1;
    }

    input:checked + .slider:before {
      -webkit-transform: translateX(20px);
      -ms-transform: translateX(20px);
      transform: translateX(20px);
    }

    .slider.round {
      border-radius: 34px;
    }

    .slider.round:before {
      border-radius: 50%;
    }
  }

  &__label {
    @include typography-3;
    margin-left: 15px;
    color: $color5;
  }
}
</style>
