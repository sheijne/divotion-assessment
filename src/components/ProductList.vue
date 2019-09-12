<template>
    <v-row>
        <v-col v-for="product in products" :key="product.id" cols="6" sm="4" md="3" xl="2">
            <v-card>
                <v-img :src="product.image" :height="imageHeight"/>
                <v-card-title>{{ product.name }}</v-card-title>
                <v-card-text>{{ product.description }}</v-card-text>
                <v-card-actions>
                    <v-tooltip right>
                        <template v-slot:activator="{ on }">
                            <v-btn
                                icon
                                :color="!!wishlist[product.id] ? 'red' : undefined"
                                v-on="!$vuetify.breakpoint.xs && on"
                                @click="toggleWishlistProduct(product)"
                            >
                                <v-icon>{{ !!wishlist[product.id] ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
                            </v-btn>
                        </template>

                        <span>Add to wishlist</span>
                    </v-tooltip>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import Product from '@/models/Product';

@Component
export default class ProductList extends Vue {
  @Prop(Array)
  private products!: Product[];

  @Prop(Object)
  private wishlist!: IWishlist;

  @Action('wishlist/products/add')
  private addToWishlist(product: Product) {}

  @Action('wishlist/products/remove')
  private removeFromWishlist(product: Product) {}

  get imageHeight(): number {
    switch (this.$vuetify.breakpoint.name) {
      case 'xs': return 100;
      case 'sm': return 150;
      default: return 200;
    }
  }

  private toggleWishlistProduct(product: Product) {
    if (this.wishlist[product.id]) {
      this.removeFromWishlist(product);
    } else {
      this.addToWishlist(product);
    }
  }
}
</script>
