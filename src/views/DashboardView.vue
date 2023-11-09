<template>
  <div>
    <header class="bg-blue-500 p-4">
      <nav class="container mx-auto flex items-center justify-between">
        <h1 class="text-2xl text-white">My Learning System</h1>
        <div class="flex items-center space-x-4">
          <span class="text-white">Welcome, {{ username }}</span>
          <button @click="logout" class="text-red-500">Logout</button>
        </div>
      </nav>
    </header>

    <main class="container mx-auto mt-8">
      <!-- Your content goes here -->
    </main>

    <footer class="bg-gray-200 py-4 mt-8">
      <div class="container mx-auto text-center text-gray-600">
        &copy; 2023 My Learning System
      </div>
    </footer>
  </div>
</template>

<script>
import VueCookies from 'vue-cookies';

export default {
  data() {
    return {
      username: '', // Initialize the username
    };
  },
  created() {
    // Check if the user is authenticated by checking for the JWT token
    const userToken = VueCookies.get('userToken');
    if (userToken) {
      try {
        // Decode the JWT token to extract user information
        const decodedToken = JSON.parse(atob(userToken.split('.')[1]));
        this.username = decodedToken.username;
      } catch (error) {
        // Handle decoding errors, e.g., invalid JWT format
        console.error('Error decoding JWT:', error);
        this.$router.push('/login');
      }
    } else {
      // If the user is not authenticated, you can redirect them to the login page
      this.$router.push('/login');
    }
  },
  methods: {
    logout() {
      // Clear the user token from cookies
      VueCookies.remove('userToken');
      // Redirect the user to the login page
      this.$router.push('/login');
    },
  },
};
</script>
