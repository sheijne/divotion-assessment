<template>
    <v-navigation-drawer
        v-model="widgets.wishlist.active"
        fixed
        right
        temporary
        width="300px"
    >
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title class="title">Wishlist</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
                <v-tooltip left>
                    <template v-slot:activator="{ on }">
                        <v-btn icon v-on="!$vuetify.breakpoint.xs && on" @click="clearWishlist">
                            <v-badge color="grey" left>
                                <template v-slot:badge>
                                    {{ wishlist.count }}
                                </template>

                                <v-icon>mdi-delete</v-icon>
                            </v-badge>
                        </v-btn>
                    </template>

                    <span>Empty wishlist</span>
                </v-tooltip>
            </v-list-item-action>
        </v-list-item>

        <v-divider/>

        <wishlist/>
    </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, State } from 'vuex-class';
import Wishlist from '@/components/Wishlist.vue';

@Component({
  components: { Wishlist },
})
export default class AppWishlist extends Vue {
  @State('wishlist')
  private wishlist!: IWishlist;

  @State('widgets')
  private widgets!: IWidgets;

  @Action('wishlist/products/clear')
  private clearWishlist() {}
}
</script>
