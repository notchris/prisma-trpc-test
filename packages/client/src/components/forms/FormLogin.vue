<template>
  <form @submit.prevent="login()"
        id="login"
        ref="form"
        class="grid w-full grid-cols-1 gap-4 sm:w-full md:w-1/2 lg:w-1/3">
    <div class="block">
      <span class="text-sm text-gray-500">Email Address</span>
      <input type="email"
             @input="inputChanged"
             :class="[v$.email.$error ? 'border-red-500 focus:border-red-300 focus:ring-red-200' : 'border-gray-300 focus:border-indigo-300 focus:ring-indigo-200', 'mt-1 block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-50']"
             name="email"
             v-model="v$.email.$model"
             required />
      <div class="py-2 text-xs text-red-500"
           v-if="v$.email.$error">Please enter a valid email address.</div>
    </div>

    <div class="block">
      <span class="text-sm text-gray-500">Password</span>
      <input type="password"
             @input="inputChanged"
             :class="[v$.password.$error ? 'border-red-500 focus:border-red-300 focus:ring-red-200' : 'border-gray-300 focus:border-indigo-300 focus:ring-indigo-200', 'mt-1 block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-50']"
             placeholder=""
             name="password"
             v-model="v$.password.$model"
             required />
      <div class="py-2 text-xs text-red-500"
           v-if="v$.password.$error">Please enter a valid password.</div>
    </div>

    <div v-if="serverError"
         class="p-2 text-xs text-red-400 border border-red-300 rounded">
      {{ serverError }}
    </div>

    <div class="block">
      <button type="submit"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              class="flex items-center justify-center text-center w-full px-6 py-2.5 bg-indigo-600 disabled:cursor-not-allowed disabled:bg-indigo-200 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out "
              :disabled="initialEmpty || v$.$errors.length > 0">
        <div v-if="!loading">
          Login
        </div>
        <Loader2 v-else
                 class="animate-spin"
                 color="#FFF"
                 :size="16" />
      </button>
    </div>

    <div class="block">
      <div class="flex items-center justify-center w-full">
        <a class="text-xs text-indigo-500 underline hover:text-indigo-600"
           href="/signup">Signup</a>
        <span class="px-2 text-neutral-200">|</span>
        <a class="text-xs text-indigo-500 underline hover:text-indigo-600"
           href="/forgot-password">Forgot
          Password?</a>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { Loader2 } from 'lucide-vue-next'
import { API_URL } from '../../app.config'
export default defineComponent({
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      email: '',
      password: '',
      serverError: '',
      loading: false
    }
  },
  computed: {
    initialEmpty() {
      return !this.email || !this.password
    }
  },
  methods: {
    inputChanged() {
      this.serverError = ''
    },
    async login() {
      this.loading = true
      try {
        this.v$.$validate()
        const req = await fetch(`${API_URL}/user/login`, {
          method: "POST",
          body: JSON.stringify({
            email: this.email,
            password: this.password
          }),
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
        })
        const res = await req.json()

        switch (req.status) {
          case 200:
            this.$router.push('/account')
            break
          case 403:
            this.serverError = res.message
            this.loading = false
            break
          case 404:
            this.serverError = "Server error."
            this.loading = false
          default:
            break
        }
      } catch (error: unknown) {
        if (error instanceof Error || error instanceof SyntaxError) {
          this.serverError = 'An unknown error occurred.'
        } else {
          console.error(error)
        }
        this.loading = false
      }
    },
  },
  validations() {
    return {
      password: { required },
      email: { required, email }
    }
  },
  components: {
    Loader2
  }
})
</script>
