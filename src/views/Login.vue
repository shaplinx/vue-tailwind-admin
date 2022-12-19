<template>
  <div class="flex items-center justify-center h-screen px-6">
    <div class="w-full max-w-sm p-6 bg-base-100 rounded-md shadow-md">
      <div class="flex items-center justify-center mb-5">
        <svg
          class="w-8 h-8 ml-2 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          ></path>
        </svg>
        <span class="text-2xl font-semibold text-gray-700">VueBoard</span>
      </div>

      <FormKit
        type="form"
        v-model="loginForm"
        :input-errors="errors"
        @submit="login"
        :actions="false"
      >
        <div class="block">
          <FormKit label="Email" type="email" name="email"></FormKit>
        </div>

        <div class="block mt-3">
          <FormKit label="Password" type="password" name="password"></FormKit>
        </div>



        <div class="mt-6">
          <dv-button iconClass="key" label="Sign In" :isLoading="auth.loggingIn" full>Sign In</dv-button
          >
        </div>
      </FormKit>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/store/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { AxiosResponse } from "axios";

const router = useRouter();
const auth = useAuthStore();

const loginForm = ref<LoginForm>({
  email: "",
  password: "",
});

const errors = ref<LoginFormError>({ email: [], password: [], remember: [] });
function login() {
  errors.value = {};
  auth
    .login({
      email: loginForm.value.email,
      password: loginForm.value.password,
      remember: loginForm.value.remember,
    })
    .then(() => {
      router.push("/dashboard");
    })
    .catch((err: AxiosResponse) => {
      errors.value = err.data.errors;
    });
}
</script>
