<template>
  <form @submit.prevent="resetPassword()"
        id="resetPassword"
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
      <span class="text-sm text-gray-500">Reset Token</span>
      <input type="text"
             @input="inputChanged"
             :class="[v$.token.$error ? 'border-red-500 focus:border-red-300 focus:ring-red-200' : 'border-gray-300 focus:border-indigo-300 focus:ring-indigo-200', 'mt-1 block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-50']"
             name="token"
             v-model="v$.token.$model"
             required />
      <div class="py-2 text-xs text-red-500"
           v-if="v$.token.$error">Please enter the reset token.</div>
    </div>

    <div class="flex flex-col gap-4 sm:flex-row sm:gap-2">

      <div class="block w-full">
        <div class="flex items-center gap-2">
          <span class="text-sm text-gray-500">New Password</span>
          <div title="Password must be 7-30 characters long.">
            <HelpCircle color="#999"
                        :size="16" />
          </div>
        </div>
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
      <div class="block w-full">
        <div class="flex items-center gap-2">
          <span class="text-sm text-gray-500">Confirm New Password</span>
        </div>
        <input type="password"
               @input="inputChanged"
               :class="[v$.confirmPassword.$error ? 'border-red-500 focus:border-red-300 focus:ring-red-200' : 'border-gray-300 focus:border-indigo-300 focus:ring-indigo-200', 'mt-1 block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-50']"
               placeholder=""
               name="confirmPassword"
               v-model="v$.confirmPassword.$model"
               required />
        <div class="py-2 text-xs text-red-500"
             v-if="v$.confirmPassword.$error">Passwords do not match.</div>
      </div>
      <div v-if="serverError"
           class="p-2 text-xs text-red-400 border border-red-300 rounded">
        {{ serverError }}
      </div>

    </div>

    <div class="block">
      <button type="submit"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              class="inline-block w-full px-6 py-2.5 bg-indigo-600 disabled:cursor-not-allowed disabled:bg-indigo-200 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out"
              :disabled="initialEmpty || v$.$errors.length > 0">
        Reset Password
      </button>
    </div>

    <div class="block">
      <div class="flex items-center justify-center w-full">
        <a class="text-xs text-indigo-500 underline hover:text-indigo-600"
           href="/login">Back to Login</a>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, sameAs, minLength, maxLength } from '@vuelidate/validators'
import { HelpCircle, Loader2 } from 'lucide-vue-next'
import { API_URL } from '../../app.config'
export default defineComponent({
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      email: '',
      token: '',
      password: '',
      confirmPassword: '',
      serverError: ''
    }
  },
  computed: {
    initialEmpty() {
      return !this.email || !this.token || !this.password || !this.confirmPassword
    }
  },
  mounted() {
  },
  methods: {
    inputChanged() {
      this.serverError = ''
    },
    async resetPassword() {
      try {
        const validatedForm = await this.v$.$validate()
        if (!validatedForm) return
        const req = await fetch(`${API_URL}/user/reset-password`, {
          method: "POST",
          body: JSON.stringify({
            email: this.email,
            token: this.token,
            password: this.password
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
        const res = await req.json()
        switch (req.status) {
          case 403:
            this.serverError = res.message
            break
          case 404:
            this.serverError = "Server error."
          default:
            break
        }
      } catch (error: unknown) {
        if (error instanceof Error || error instanceof SyntaxError) {
          this.serverError = 'An unknown error occurred.'
        } else {
          console.error(error)
        }
      }
    },
  },
  validations() {
    return {
      email: { required, email },
      token: { required },
      password: { required, minLength: minLength(7), maxLength: maxLength(30) },
      confirmPassword: { required, sameAs: sameAs(this.password) }

    }
  },
  components: {
    HelpCircle,
    Loader2
  }
})
</script>
