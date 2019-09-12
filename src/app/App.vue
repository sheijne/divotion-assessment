<template>
    <v-app>
        <app-header/>

        <app-content/>

        <app-wishlist/>

        <app-notifications/>
    </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AppContent from '@/app/AppContent.vue';
import AppHeader from '@/app/AppHeader.vue';
import AppNotifications from '@/app/AppNotifications.vue';
import AppWishlist from '@/app/AppWishlist.vue';
import Product from '@/models/Product';

@Component({
  components: {
    AppContent,
    AppHeader,
    AppNotifications,
    AppWishlist,
  },
})
export default class App extends Vue {
}
</script>
