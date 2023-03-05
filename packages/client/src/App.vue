<template>
  <div class="flex flex-col w-full h-full">
    <AppHeader></AppHeader>
    <main class="flex flex-col items-center justify-center flex-1 w-full">
      <RouterView></RouterView>
    </main>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppHeader from './components/AppHeader.vue'
export default defineComponent({
  name: 'App',
  components: {
    AppHeader,
  }
})
</script>
