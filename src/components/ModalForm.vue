<template>
  <div class="modal">
    <div class="modal__header">
      <h2 class="modal__header_title">Регистрация</h2>
    </div>
    <div class="modal__form form">
      <div class="form__public">
        <ui-switch v-model="form.public" label="Публичный профиль" />
        <p class="form__public_subtitle">
          Включает профиль для просмотра другими пользователями по ссылке
        </p>
      </div>
      <div class="form__data">
        <h3 class="form__data_title">Данные</h3>
        <div class="form__data_fields">
          <ui-input
            v-model="form.username"
            field="username"
            placeholder="Имя"
            type="text"
            :error="errors.username || []"
            @input="errors.username = null"
          />
          <ui-input
            v-model="form.email"
            field="email"
            placeholder="Email"
            type="email"
            :error="errors.email || []"
            @input="errors.email = null"
          />
          <ui-select
            v-model="form.role"
            field="role"
            placeholder="Должность"
            :list="roles"
            :error="errors.role || []"
            @input="errors.role = null"
          />
          <ui-input
            v-model="form.password"
            field="password"
            placeholder="Пароль"
            type="password"
            :error="errors.password || []"
            @input="errors.password = null"
          />
          <ui-input
            v-model="form.password_repeat"
            field="password_repeat"
            placeholder="Повторите пароль"
            type="password"
            :error="errors.password_repeat || []"
            @input="errors.password_repeat = null"
          />
        </div>
      </div>
      <div class="form__confirm">
        <ui-checkbox v-model="confirm" />
        <p class="form__confirm_text">
          Нажимая на кнопку “Регистрация”, я подтверждаю свое согласение с политикой <br>
          конфиденциальности и обработки персональных данных
        </p>
      </div>
      <button
        class="form__action"
        :class="{ 'form__action--disabled': !isValid }"
        :disabled="!isValid"
        @click="sendPost()"
      >
        Регистрация
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalForm',
  props: {
    defaultValues: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      form: {
        public: true,
        username: '',
        role: null,
        email: '',
        password: '',
        password_repeat: '',
      },
      errors: {},
      confirm: true,
      roles: [
        { value: 1, name: 'Мастер' },
        { value: 2, name: 'Прораб' },
        { value: 3, name: 'Управляющий' },
        { value: 4, name: 'Менеджер' },
      ],
    };
  },
  created() {
    this.assignForm(this.defaultValues);
  },
  methods: {
    assignForm(val) {
      if (val && Object.keys(val).length > 0) {
        Object.assign(this.form, val);
      }
    },
    async sendPost() {
      const data = {
        ...this.form,
        public: Number(this.form.public),
        role: this.form.role ? this.form.role.number : 0,
      };

      await this.$store.dispatch('sendFormData', data).then((response) => {
        if (response.type === 'success') {
          this.$emit('success', true);
        } else if (response.type === 'error') {
          this.errors = response.data;
        }
      });
    },
  },
  computed: {
    isValid() {
      return this.confirm;
    },
  },
  watch: {
    defaultValues(val) {
      this.assignForm(val);
    },
  },
};
</script>

<style scoped lang="scss">
.modal {
  width: 958px;
  background-color: $color11;
  border-radius: 15px;
  box-shadow: 4px 4px 8px 0px $color10;

  &__header {
    padding: 27px 20px;
    box-shadow: 0px -1px 0px 0px $color12 inset;

    &_title {
      @include typography-1;
      color: $color5;
    }
  }
}

.form {
  padding: 0 20px;

  &__public {
    padding: 27px 0 30px 0;
    border-bottom: 1px solid $color8;

    &_subtitle {
      @include typography-2;
      margin-top: 15px;
      color: $color9;
    }
  }

  &__data {
    padding: 20px 0 30px 0;
    border-bottom: 1px solid $color8;

    &_title {
      color: $color5;
      @include typography-3;
    }

    &_fields {
      margin-top: 25px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      row-gap: 25px;
      column-gap: 18px;
      grid-template:
        'username role'
        'email .'
        'password password_repeat';
    }
  }

  &__confirm {
    padding: 25px 0;
    display: flex;

    &_text {
      margin-left: 15px;
      color: $color5;
      @include typography-2;
    }
  }

  &__action {
    display: block;
    height: 39px;
    width: 234px;
    margin: 0 auto;
    margin-bottom: 42px;
    margin-top: 37px;
    border-radius: 9px;
    border: 1px solid $color7;
    color: $color7;
    background-color: $color11;
    @include typography-2;

    &:hover {
      background-color: $color7;
      color: $color11;
      cursor: pointer;
    }

    &--disabled {
      opacity: 0.6;

      &:hover {
        background-color: $color11;
        color: $color7;
        cursor: not-allowed;
      }
    }
  }
}
</style>
