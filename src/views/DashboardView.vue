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
      username: '',
    };
  },
  created() {
    const userToken = VueCookies.get('userToken');
    if (userToken) {
      try {
        const decodedToken = JSON.parse(atob(userToken.split('.')[1]));
        this.username = decodedToken.username;
      } catch (error) {
        console.error('Error decoding JWT:', error);
        this.$router.push('/login');
      }
    } else {
      this.$router.push('/login');
    }
  },
  methods: {
    logout() {
      VueCookies.remove('userToken');
      this.$router.push('/login');
    },
  },
};
</script>
