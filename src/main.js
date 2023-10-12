import Vue from 'vue';
import App from './App.vue';
import store from './store';

// регистрируем глобально наши ui компоненты
import '@/components/ui';

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
