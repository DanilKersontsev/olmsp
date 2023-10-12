<template>
  <div class="bg-gray-100 min-h-screen flex items-center justify-center">
    <div class="bg-white p-8 rounded shadow-md">
      <h1 class="text-3xl font-semibold mb-4">Registration</h1>
      <form @submit.prevent="submitForm" id="registration-form">
        <div class="mb-4">
          <label for="reg_username" class="block text-gray-700">Username</label>
          <input
              v-model="formData.username"
              type="text"
              id="reg_username"
              name="username"
              placeholder="Username"
              required
              class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          >
          <div id="username-error" class="text-red-500 text-sm mt-1">{{ errors.username }}</div>
        </div>
        <div class="mb-4">
          <label for="reg_email" class="block text-gray-700">Email</label>
          <input
              v-model="formData.email"
              type="email"
              id="reg_email"
              name="email"
              placeholder="Email"
              required
              class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          >
          <div id="email-error" class="text-red-500 text-sm mt-1">{{ errors.email }}</div>
        </div>
        <div class="mb-4">
          <label for="reg_password" class="block text-gray-700">Password</label>
          <input
              v-model="formData.password"
              type="password"
              id="reg_password"
              name="password"
              placeholder="Password"
              required
              class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          >
          <div id="password-error" class="text-red-500 text-sm mt-1">{{ errors.password }}</div>
        </div>
        <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Register</button>
        <p class="mt-4">Already have an account? <a href="/login" class="text-blue-500">Login</a></p>
      </form>

      <!-- Alert for errors -->
      <div v-if="registrationError" class="text-red-500 text-sm mt-2">
        {{ registrationError }}
      </div>

      <!-- Success alert -->
      <div v-if="registrationSuccess" class="text-green-500 text-sm mt-2">
        {{ registrationSuccess }}
        <!-- Redirect to the login page -->
        <button @click="redirectToLoginPage" class="text-blue-500 mt-2 cursor-pointer">Go to Login</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        username: "",
        email: "",
        password: "",
      },
      errors: {
        username: "",
        email: "",
        password: "",
      },
      registrationError: null,
      registrationSuccess: null,
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await fetch('http://localhost:3000/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.formData),
        });

        if (!response.ok) {
          const responseData = await response.json();
          this.errors = responseData;
          this.registrationError = responseData.error; // Set error message from the server response
          this.registrationSuccess = null;
          return;
        }

        // Registration was successful
        console.log('Registration successful');
        this.registrationSuccess = 'Registration successful. You can now log in.';
        this.registrationError = null;
      } catch (error) {
        // Handle errors if the request fails
        console.error(error);
        this.registrationError = 'An error occurred during registration.';
        this.registrationSuccess = null;
      }
    },
    redirectToLoginPage() {
      // Redirect to the login page
      window.location.href = '/login';
    },
  },
};
</script>
