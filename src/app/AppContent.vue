<template>
    <v-content id="app-content">
        <v-container>
            <product-list :products="products" :wishlist="wishlist"/>
        </v-container>
    </v-content>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import Product from '@/models/Product';
import ProductList from '@/components/ProductList.vue';

@Component({
  components: { ProductList },
})
export default class AppContent extends Vue {
  private products: Product[] = Product.all();

  @State('wishlist')
  private wishlist!: IWishlist;
}
</script>
