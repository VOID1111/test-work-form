<template>
  <div class="modal">
    <div class="modal__header">
      <h2 class="modal__header_title">Регистрация</h2>
    </div>
    <div class="modal__form form">
      <div class="form__public">
        <UiSwitch v-model="form.public" label="Публичный профиль" />
        <p class="form__public_subtitle">
          Включает профиль для просмотра другими пользователями по ссылке
        </p>
      </div>
      <div class="form__data">
        <h3 class="form__data_title">Данные</h3>
        <div class="form__data_fields">
          <UiInput
            v-model="form.username"
            field="username"
            placeholder="Имя"
            type="text"
            :error="errors.username || []"
            @input="errors.username = null"
          />
          <UiInput
            v-model="form.email"
            field="email"
            placeholder="Email"
            type="email"
            :error="errors.email || []"
            @input="errors.email = null"
          />
          <UiSelect
            v-model="form.role"
            field="role"
            placeholder="Должность"
            :list="roles"
            :error="errors.role || []"
            @input="errors.role = null"
          />
          <UiInput
            v-model="form.password"
            field="password"
            placeholder="Пароль"
            type="password"
            :error="errors.password || []"
            @input="errors.password = null"
          />
          <UiInput
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
        <UiCheckbox v-model="confirm" />
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
import UiSwitch from './ui/Switch.vue';
import UiInput from './ui/Input.vue';
import UiSelect from './ui/Select.vue';
import UiCheckbox from './ui/Checkbox.vue';

export default {
  name: 'ModalForm',
  components: {
    UiSwitch,
    UiInput,
    UiSelect,
    UiCheckbox,
  },
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
    sendPost() {
      const data = {
        ...this.form,
        public: Number(this.form.public),
        role: this.form.role ? this.form.role.number : 0,
      };

      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }

      const requestOptions = {
        method: 'POST',
        body: formData,
      };
      fetch('https://lmstestapi.reezonly.com/v1/user/signup', requestOptions)
        .then((response) => response.json())
        .then((res) => {
          if (res.success) {
            this.$emit('success', true);
          } else if (!res.success && res.errors) {
            this.errors = res.errors;
          }
        })
        .catch((err) => {
          console.log(err);
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
  background-color: white;
  border-radius: 15px;

  &__header {
    padding: 27px 20px;
    box-shadow: 0px -1px 0px 0px #EDEFF3 inset;

    &_title {
      color: #000;
      font-family: Montserrat;
      font-size: 19px;
      font-style: normal;
      font-weight: 700;
      line-height: 27px;
      letter-spacing: -0.066px;
    }
  }
}

.form {
  padding: 0 20px;

  &__public {
    padding: 27px 0 30px 0;
    border-bottom: 1px solid #D9D9D9;

    &_subtitle {
      margin-top: 15px;
      color: #696977;
      font-family: Montserrat;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 19px;
      letter-spacing: -0.021px;
    }
  }

  &__data {
    padding: 20px 0 30px 0;
    border-bottom: 1px solid #D9D9D9;

    &_title {
      color: #000;
      font-family: Montserrat;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 19px;
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
      color: #000;
      font-family: Montserrat;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 19px;
      letter-spacing: -0.021px;
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
    border: 1px solid #07A86E;
    color: #07A86E;
    background-color: white;
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 19px;
    letter-spacing: -0.021px;

    &:hover {
      background-color: #07A86E;
      color: white;
      cursor: pointer;
    }

    &--disabled {
      opacity: 0.6;

      &:hover {
        background-color: white;
        color: #07A86E;
        cursor: not-allowed;
      }
    }
  }
}
</style>
