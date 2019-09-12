import Vue from 'vue';
import App from '@/app/App.vue';
import products from '@/assets/products.json';
import vVisible from '@/directives/Visible';
import Product from '@/models/Product';
import vuetify from '@/plugins/vuetify';
import store from '@/plugins/vuex';

Vue.config.productionTip = false;

Vue.directive('visible', vVisible);

Promise.all([

  Product.insert({ data: products }),

]).then(() => {

  const app = new Vue({
    el: '#app',
    vuetify,
    store,
    render: (h) => h(App),
  });

});
