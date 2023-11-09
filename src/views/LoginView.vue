<template>
  <div class="bg-gray-100 min-h-screen flex items-center justify-center">
    <div class="bg-white p-8 rounded shadow-md">
      <h1 class="text-3xl font-semibold mb-4">Log in</h1>
      <form @submit.prevent="submitForm" id="login-form">
        <div class="mb-4">
          <label for="login_username" class="block text-gray-700">Username</label>
          <input
              v-model="formData.username"
              type="text"
              id="login_username"
              name="username"
              placeholder="Username"
              required
              class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          >
        </div>
        <div class="mb-4">
          <label for="login_password" class="block text-gray-700">Password</label>
          <input
              v-model="formData.password"
              type="password"
              id="login_password"
              name="password"
              placeholder="Password"
              required
              class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          >
        </div>
        <div id="login-error" class="text-red-500 text-sm mb-4">{{ loginError }}</div>
        <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded hover-bg-blue-600">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
import VueCookies from 'vue-cookies';
import { BASE_URL } from '../../api-config';

export default {
  data() {
    return {
      formData: {
        username: '',
        password: '',
      },
      loginError: '',
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await this.sendLoginRequest(this.formData);
        if (!response.ok) {
          await this.handleLoginError(response);
          return;
        }

        const responseData = await response.json();
        if (responseData.token) {
          VueCookies.set('userToken', responseData.token, '1d');
        }

        this.$router.push('/dashboard');
      } catch (error) {
        this.handleNetworkError(error);
      }
    },

    async sendLoginRequest(formData) {
      return fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
    },

    async handleLoginError(response) {
      if (response.status === 401) {
        this.loginError = 'Wrong username or password';
      } else {
        this.loginError = 'Login failed';
      }
    },

    handleNetworkError(error) {
      console.error('Network error:', error);
      this.loginError = 'Network error';
    },
  },
};
</script>
