<template>
    <div class="w-full h-full">
        {{ message }}
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { trpc } from "../util/trpc"
export default defineComponent({
    name: 'Editor',
    data() {
        return {
            message: ''
        }
    },
    mounted() {
        (async () => {
            const data = await trpc.sayHello.query({
                name: "Chris McGrane",
                age: 6000
            })

            this.message = data
        })()
    }
})
</script>
