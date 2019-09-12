<template>
    <v-app-bar id="app-header" app>
        <a href="/" title="Home" aria-label="Home">
            <v-img :src="require('../assets/logo.svg')" height="38" width="38"/>
        </a>

        <v-toolbar-title class="headline">
            <span>Products</span>
        </v-toolbar-title>

        <v-spacer/>

        <v-tooltip left>
            <template v-slot:activator="{ on }">
                <v-btn icon color="red" v-on="!$vuetify.breakpoint.xs && on" @click="toggleWidget('wishlist')">
                    <v-badge color="grey" left>
                        <template v-slot:badge>
                            <span>{{ wishlist.count }}</span>
                        </template>

                        <v-icon>mdi-heart</v-icon>
                    </v-badge>
                </v-btn>
            </template>

            <span>Open wishlist</span>
        </v-tooltip>
    </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Mutation, State } from 'vuex-class';

@Component
export default class AppHeader extends Vue {
  @State('wishlist')
  private wishlist!: IWishlist;

  @Mutation('widgets/toggle')
  private toggleWidget: any;
}
</script>

<style lang="scss">
    #app-header {
        .v-toolbar__title {
            margin-left: 8px;;
        }
    }
</style>
