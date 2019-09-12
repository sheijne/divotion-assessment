<template>
    <v-list class="wishlist">
        <v-subheader v-if="!wishlistProducts.length">
            Your wishlist is empty.
        </v-subheader>

        <template v-for="product in wishlistProducts">
            <v-hover v-slot:default="{ hover }">
                <v-list-item :key="`item-${product.id}`">
                    <v-list-item-avatar>
                        <v-overlay color="red" absolute :value="hover">
                            <v-btn icon @click="removeFromWishlist(product)">
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                        </v-overlay>
                        <v-img :src="product.image"/>
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title>{{ product.name }}</v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-icon>
                        <v-fade-transition>
                            <v-btn v-visible="$vuetify.breakpoint.xs || hover" icon x-small @click="incrementWishlistProduct(product)">
                                <v-icon small>mdi-plus</v-icon>
                            </v-btn>
                        </v-fade-transition>

                        <span class="wishlist-count">{{ wishlist[product.id] }}</span>

                        <v-fade-transition>
                            <v-btn v-visible="$vuetify.breakpoint.xs || hover" icon x-small @click="decrementWishlistProduct(product)">
                                <v-icon small>mdi-minus</v-icon>
                            </v-btn>
                        </v-fade-transition>
                    </v-list-item-icon>
                </v-list-item>
            </v-hover>

            <v-divider :key="`divider-${product.id}`" inset/>
        </template>
    </v-list>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, Getter, State } from 'vuex-class';
import Product from '@/models/Product';

@Component
export default class Wishlist extends Vue {
  @State('wishlist')
  private wishlist!: IWishlist;

  @Getter('wishlist/products/all')
  private wishlistProducts!: Product[];

  @Action('wishlist/products/remove')
  private removeFromWishlist(product: Product) {}

  @Action('wishlist/products/increment')
  private incrementWishlistProduct(product: Product) {}

  @Action('wishlist/products/decrement')
  private decrementWishlistProduct(product: Product) {}
}
</script>

<style lang="scss">
    .wishlist .v-list-item {
        .v-list-item__icon {
            align-items: center;
            justify-content: flex-end;

            > .wishlist-count {
                padding: 0 8px;
            }
        }
    }
</style>
