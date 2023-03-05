<template>
  <form @submit.prevent="forgotPassword()"
        id="forgotPassword"
        ref="form"
        class="grid w-full grid-cols-1 gap-4 sm:w-full md:w-1/2 lg:w-1/3">
    <div class="block">
      <span class="text-sm text-gray-500">Email Address</span>
      <input type="email"
             @input="inputChanged"
             class="block w-full mt-1 border-gray-300 rounded-md shadow-sm peer focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
             name="email"
             v-model="v$.email.$model"
             required />
      <div class="py-2 text-xs text-red-500"
           v-if="v$.email.$error">Please enter a valid email address.</div>
    </div>

    <div v-if="serverError"
         class="p-2 text-xs text-red-400 border border-red-300 rounded">
      {{ serverError }}
    </div>

    <div class="block">
      <button type="submit"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              class="inline-block w-full px-6 py-2.5 bg-indigo-600 disabled:cursor-not-allowed disabled:bg-indigo-200 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out"
              :disabled="initialEmpty || v$.$errors.length > 0">
        Submit
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
import { required, email } from '@vuelidate/validators'
import { API_URL } from '../../app.config'
export default defineComponent({
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      email: '',
      serverError: ''
    }
  },
  computed: {
    initialEmpty() {
      return !this.email
    }
  },
  methods: {
    inputChanged() {
      this.serverError = ''
    },
    async forgotPassword() {
      try {
        this.v$.$validate()
        const req = await fetch(`${API_URL}/user/forgot-password`, {
          method: "POST",
          body: JSON.stringify({
            email: this.email
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
      email: { required, email }
    }
  }
})
</script>
