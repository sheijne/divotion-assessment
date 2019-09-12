import Vue from 'vue';
import Vuex from 'vuex';
import VuexORM from '@vuex-orm/core';
import Product from '@/models/Product';

Vue.use(Vuex);

const database = new VuexORM.Database();

database.register(Product);

export default new Vuex.Store({
  plugins: [VuexORM.install(database)],
  state: {
    widgets: {
      notifications: {
        active: false,
        data: {
          message: '',
        },
      },
      wishlist: {
        active: false,
      },
    },
    wishlist: getWishlist(),
  },
  getters: {
    ['wishlist/products/all'](state) {
      return Product.all().filter((product: Product) => !!state.wishlist[product.id]);
    },
  },
  mutations: {
    ['widgets/toggle'](state, name: string): boolean {
      const widget = state.widgets[name];
      return widget.active = !widget.active;
    },
    ['widgets/setData'](state, payload: { widget: string, data: any }) {
      const { widget, data } = payload;
      const oldData = state.widgets[widget].data;
      Object.assign(oldData, data);
    },
    ['wishlist/products/clear'](state) {
      state.wishlist = getEmptyWishlist();
    },
    ['wishlist/products/add'](state, product) {
      const count = state.wishlist[product.id];

      if (!count) {
        Vue.set(state.wishlist, product.id, 1);
        state.wishlist.count++;
      }
    },
    ['wishlist/products/remove'](state, product) {
      const count = state.wishlist[product.id];

      if (count) {
        Vue.set(state.wishlist, product.id, 0);
        state.wishlist.count -= count;
      }
    },
    ['wishlist/products/increment'](state, product) {
      state.wishlist[product.id]++;
      state.wishlist.count++;
    },
    ['wishlist/products/decrement'](state, product) {
      if (state.wishlist[product.id] > 0) {
        state.wishlist[product.id]--;
        state.wishlist.count--;
      }
    },
  },
  actions: {
    ['widgets/notifications/notify'](_, message) {
      if (!this.state.widgets.notifications.active) {
        this.commit('widgets/toggle', 'notifications');
      }

      this.commit('widgets/setData', { widget: 'notifications', data: { message } });
    },
    ['wishlist/products/clear']() {
      this.commit('wishlist/products/clear');
      updateWishlist((this.state.wishlist));

      this.dispatch('widgets/notifications/notify', `Cleared all products from wishlist.`);
    },
    ['wishlist/products/add'](_, product) {
      this.commit('wishlist/products/add', product);
      updateWishlist(this.state.wishlist);

      this.dispatch('widgets/notifications/notify', `Added ${product.name} to wishlist.`);
    },
    ['wishlist/products/remove'](_, product) {
      this.commit('wishlist/products/remove', product);
      updateWishlist(this.state.wishlist);

      this.dispatch('widgets/notifications/notify', `Removed ${product.name} from wishlist.`);
    },
    ['wishlist/products/increment'](_, product) {
      this.commit('wishlist/products/increment', product);
      updateWishlist(this.state.wishlist);

      this.dispatch('widgets/notifications/notify', `Added one ${product.name} to wishlist.`);
    },
    ['wishlist/products/decrement'](_, product) {
      this.commit('wishlist/products/decrement', product);
      updateWishlist(this.state.wishlist);

      this.dispatch('widgets/notifications/notify', `Removed one ${product.name} to wishlist.`);
    },
  },
});

function getEmptyWishlist(): IWishlist {
  return { count: 0 };
}

function getWishlist(): IWishlist {
  const wishlist = localStorage.getItem('wishlist');
  return wishlist ? JSON.parse(wishlist) : getEmptyWishlist();
}

function updateWishlist(wishlist: IWishlist) {
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
}
