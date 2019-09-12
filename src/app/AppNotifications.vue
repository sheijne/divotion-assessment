<template>
    <v-snackbar v-model="notifications.active">
        {{ notifications.data.message }}
        <v-btn text @click="toggleWidget('notifications')">Close</v-btn>
    </v-snackbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Mutation, State } from 'vuex-class';

@Component
export default class AppNotifications extends Vue {
  @State('widgets')
  private widgets!: IWidgets;

  @Mutation('widgets/toggle')
  private toggleWidget!: any;

  get notifications() {
    return this.widgets.notifications;
  }
}
</script>
