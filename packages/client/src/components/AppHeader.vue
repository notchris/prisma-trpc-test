<template>
    <header class="flex items-center justify-between p-2 bg-neutral-100">
        <a href="/" class="font-bold ">App</a>
        <div class="flex gap-2 relative">
            <Menu>
                <MenuButton class="py-1 px-2 rounded bg-neutral-700 hover:bg-neutral-600 text-white text-xs">Menu
                </MenuButton>
                <MenuItems class="absolute flex flex-col top-7 right-0">
                    <MenuItem v-slot="{ active }">
                    <a class="px-10 py-2 text-xs bg-white hover:bg-slate-200 rounded-t" href="/account">
                        Account
                    </a>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                    <a class="px-10 py-2 text-xs bg-white hover:bg-slate-200" href="/editor">
                        Editor
                    </a>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                    <a class="px-10 py-2 text-xs bg-white hover:bg-slate-200 rounded-b border-t border-t-neutral-200"
                        href="/logout">
                        Logout
                    </a>
                    </MenuItem>
                </MenuItems>
            </Menu>
        </div>
</header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { User, Lightbulb } from 'lucide-vue-next'
import { store } from '../store'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
export default defineComponent({
    name: 'AppHeader',
    components: {
        User,
        Lightbulb,
        Menu,
        MenuButton,
        MenuItems,
        MenuItem
    }
})
</script>
<style scoped>
button[data-headlessui-state="open"] {
    --tw-bg-opacity: 1;
    background-color: rgb(82 82 82 / var(--tw-bg-opacity));
}
</style>