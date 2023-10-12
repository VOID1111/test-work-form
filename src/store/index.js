import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    alerts: [
      // {
      //   type: 'success',
      //   text: 'Заявка отправлена успешно',
      // },
      // {
      //   type: 'error',
      //   text: 'Возникла ошибка',
      // },
    ],
  },
  getters: {
    getAlerts(state) {
      return state.alerts;
    },
  },
  mutations: {
    addAlert(state, alert) {
      state.alerts.push({ ...alert, id: Date.now() });
    },
    removeAlert(state, id) {
      const index = state.alerts.findIndex((item) => item.id === id);
      state.alerts.splice(index, 1);
    },
  },
  actions: {
    sendFormData(context, data) {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }

      const requestOptions = {
        method: 'POST',
        body: formData,
      };

      return new Promise((resolve, reject) => {
        fetch('https://lmstestapi.reezonly.com/v1/user/signup', requestOptions)
          .then((response) => response.json())
          .then((res) => {
            if (res.success) {
              context.commit('addAlert', {
                type: 'success',
                text: 'Заявка отправлена успешно',
              });
              resolve({ type: 'success' });
            } else if (!res.success && res.errors) {
              context.commit('addAlert', {
                type: 'error',
                text: 'Возникла ошибка',
              });
              resolve({ type: 'error', data: res.errors });
            }
          })
          .catch((err) => {
            console.log(err);
            context.commit('addAlert', {
              type: 'error',
              text: 'Возникла ошибка',
            });
            reject(err);
          });
      });
    },
  },
});
