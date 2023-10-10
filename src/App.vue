<template>
  <div id="app">
    <ModalForm
      v-if="!success"
      :default-values="defaultValues"
      @success="success = true;"
    />
    <span
      v-if="success"
      style="color: green; font-size: 32px;"
    >
      Регистрация успешно завершена
    </span>
    <!-- Если динамически меняем дефолтные значения
      уже после рендера компонента, они обновятся в форме -->
    <!-- <button @click="defaultValues = defaultValues2">Клик</button> -->
  </div>
</template>

<script>
import ModalForm from './components/ModalForm.vue';

export default {
  name: 'App',
  components: {
    ModalForm,
  },
  data() {
    return {
      defaultValues: {
        // username: 'Alex(default)',
        // email: 'alex@mail.com(default)',
        // role: { value: 3, name: 'Управляющий' },
      },
      // defaultValues2: {
      //   username: 'Alex222(default)',
      //   email: 'alex222@mail.com(default)',
      // },
      success: false,
    };
  },
};
</script>

<style lang="scss">
html, body, h1, h2, h3, p {
  padding: 0;
  margin: 0;
}
#app {
  font-family: 'Montserrat';
  background-color: #1E1E1E;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
