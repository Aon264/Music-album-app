<template>
  <nav class="navbar">
    <!-- Search -->
    <input
      type="text"
      placeholder="Search albums..."
      v-model="localSearch"
      @input="$emit('search', localSearch)"
    />

    <!-- Sort -->
    <select v-model="localSort" @change="$emit('sort', localSort)">
      <option value="name">Sort by Name</option>
      <option value="price">Sort by Price</option>
      <option value="year">Sort by Year</option>
    </select>

    <!-- Genre Filter -->
    <select v-model="localGenre" @change="$emit('filter', localGenre)">
      <option value="">All Genres</option>
      <option value="progressive metal">Progressive Metal</option>
      <option value="post-hardcore">Post-Hardcore</option>
    </select>

    <!-- Add Album Button -->
    <button class="add-album-btn" @click="this.$router.push('/addalbum')">Add Album</button>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      localSearch: '',
      localSort: 'name',
      localGenre: ''
    };
  },
};
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  background-color: #2e2e2e;
  color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.navbar input,
.navbar select {
  padding: 0.5rem 0.8rem;
  border-radius: 6px;
  border: none;
  outline: none;
  font-size: 0.9rem;
}

.navbar input {
  flex: 1;
  min-width: 200px;
}

.navbar select {
  background: #fff;
  color: #333;
  cursor: pointer;
}

.navbar select:hover,
.navbar input:focus {
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.7);
}

.add-album-btn {
  background: #4db6ff;
  color: #111;
  font-weight: bold;
  padding: 0.6rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s ease-in-out;
}

.add-album-btn:hover {
  background: #1e90ff;
}
</style>
