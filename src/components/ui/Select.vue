<template>
  <div class="select">
    <div
      class="select__elm"
      :class="{ 'select__elm--open': visible }"
      @click="visible = !visible"
    >
      <div v-if="value" class="select__elm_selected">
        <span>{{ value.name }}</span>
      </div>
      <div v-else class="select__elm_placeholder">
        <span>{{ placeholder }}</span>
      </div>
      <div class="arrow" :class="{ expanded : visible }">
        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M13 9L9.5 12L6 9"
            stroke="#A7A7B6"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div :class="{ hidden : !visible, visible }">
        <ul>
          <li
            :class="{ current : item === value }"
            v-for="(item, item_index) in list"
            :key="item_index"
            @click="$emit('input', item)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>
    <p class="select__error">{{ error ? error[0] : '' }}</p>
  </div>
</template>

<script>
export default {
  name: 'UiSelect',
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
    placeholder: {
      type: String,
      default: '',
    },
    list: {
      type: Array,
      default: () => ([]),
    },
    error: {
      type: Array,
      default: () => ([]),
    },
  },
  data() {
    return {
      visible: false,
    };
  },
};
</script>

<style lang="scss">
.select {
  width: 100%;

  &__elm {
    position: relative;
    z-index: 1;
    cursor: pointer;
    @include input-style;

    &--open {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }

    &_selected {
      display: block;
      padding: 10px;
      color: $color5;
      @include typography-2;
    }

    &_placeholder {
      padding: 10px;
      color: $color13;
      @include typography-2;
    }

    .arrow {
      position: absolute;
      right: 12px;
      top: 9px;
    }

    .expanded {
      transform: rotateZ(180deg) translateY(2px);
    }
  }

  &__error {
    @include input-error-style;
  }

  ul {
    width: 100%;
    top: 37px;
    left: -1px;
    list-style-type: none;
    padding: 0;
    margin: 0;
    border: 1px solid $color15;
    border-bottom-right-radius: $radius-input;
    border-bottom-left-radius: $radius-input;
    position: absolute;
    z-index: 1;
    background: $color11;
    @include typography-2
  }

  li {
    padding: 12px;
    color: $color9;

    &:last-child {
      border-bottom-right-radius: $radius-input;
      border-bottom-left-radius: $radius-input;
    }

    &:hover {
      color: $color1;
      background: $color8;
      cursor: pointer;
    }
  }

  .current {
    color: $color11;
    background: $color1;
  }

  .hidden {
    visibility: hidden;
  }

  .visible {
    visibility: visible;
  }
}
</style>
