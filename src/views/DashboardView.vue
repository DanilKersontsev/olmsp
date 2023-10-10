<template>
  <div>
    <header class="bg-blue-500 p-4">
      <nav class="container mx-auto flex items-center justify-between">
        <h1 class="text-2xl text-white">My Learning System</h1>
        <div class="flex items-center space-x-4">
          <span class="text-white">Welcome, {{ username }}</span>
          <router-link to="/logout" class="text-red-500">Logout</router-link>
        </div>
      </nav>
    </header>

    <main class="container mx-auto mt-8">
      <!-- Sisu siia -->
    </main>

    <footer class="bg-gray-200 py-4 mt-8">
      <div class="container mx-auto text-center text-gray-600">
        &copy; 2023 My Learning System
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "John Doe", // Kasutaja nimi - saate selle muuta vastavalt sisselogitud kasutajale
    };
  }
};
</script>

<style scoped>
/* Tailwind CSS klassid on juba kasutatud mallis */
</style>
