<template>
  <nav class="navbar">
    <input
      type="text"
      placeholder="Search albums..."
      v-model="localSearch"
      @input="$emit('search', localSearch)"
    />

    <select v-model="localSort" @change="$emit('sort', localSort)">
      <option value="name">Sort by Name</option>
      <option value="price">Sort by Price</option>
      <option value="year">Sort by Year</option>
    </select>

    <select v-model="localGenre" @change="$emit('filter', localGenre)">
      <option value="">All Genres</option>
      <option value="progressive metal">Progressive Metal</option>
      <option value="post-hardcore">Post-Hardcore</option>
    </select>

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
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
  }
  50% {
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
  }
}

@keyframes buttonGlow {
  0%, 100% {
    box-shadow: 0 0 5px rgba(30, 144, 255, 0.5);
  }
  50% {
    box-shadow: 0 0 15px rgba(30, 144, 255, 0.9);
  }
}

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
  animation: slideDown 0.6s ease-out;
}

.navbar input,
.navbar select {
  padding: 0.5rem 0.8rem;
  border-radius: 6px;
  border: none;
  outline: none;
  font-size: 0.9rem;
  transition: all 0.3s ease-in-out;
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

.navbar input:focus {
  animation: pulse 1s ease-in-out;
}

.navbar select:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.add-album-btn {
  background: #4db6ff;
  color: #111;
  font-weight: bold;
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 0 5px rgba(30, 144, 255, 0.5);
}

.add-album-btn:hover {
  background: #1e90ff;
  animation: buttonGlow 0.8s ease-in-out;
}
</style>
