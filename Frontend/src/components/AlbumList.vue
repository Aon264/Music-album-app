<template>
  <NavBar @search="onSearch" @sort="onSort" @filter="onFilter" />
  <div>
    <ul>
      <li v-for="album in filteredAlbums" :key="album.id" @click="goToDetail(album.id)">
        <img :src="album.coverUrl" alt="cover" />
        <h3>{{ album.title }} ({{ album.year }})</h3>
        <p>Artist: {{ album.artist }}</p>
        <p>Genre: {{ album.genre }}</p>
        <p>Price: ${{ album.price }}</p>
        <p>Score: {{ album.score }}/10</p>
      </li>
    </ul>
  </div>
</template>

<script>
import NavBar from './NavBar.vue';
import { getAlbums } from '@/services/api';

export default {
  name: 'AlbumList',
  components: { NavBar },
  data() {
    return {
      albums: [],
      searchTerm: '',
      sortKey: 'title',
      genreFilter: '',
    };
  },
  async created() {
    const response = await getAlbums();
    this.albums = response.data;
  },
  methods: {
    onSearch(term) { this.searchTerm = term.toLowerCase(); },
    onSort(key) { this.sortKey = key; },
    onFilter(genre) { this.genreFilter = genre.toLowerCase(); },
    goToDetail(id) { this.$router.push({ name: 'AlbumDetail', params: { id } }); },
  },
  computed: {
    filteredAlbums() {
      let result = this.albums;

      if (this.genreFilter) {
        result = result.filter(a => a.genre?.toLowerCase().includes(this.genreFilter));
      }

      if (this.searchTerm) {
        result = result.filter(a =>
          a.title?.toLowerCase().includes(this.searchTerm) ||
          a.artist?.toLowerCase().includes(this.searchTerm)
        );
      }

      switch (this.sortKey) {
        case 'year':
          result = [...result].sort((a, b) => (b.year || 0) - (a.year || 0));
          break;
        case 'price':
          result = [...result].sort((a, b) => (a.price || 0) - (b.price || 0));
          break;
        default:
          result = [...result].sort((a, b) =>
            (a.title || '').toLowerCase().localeCompare((b.title || '').toLowerCase())
          );
      }

      return result;
    },
  },
};
</script>

<style scoped>
div {
  margin: 2rem auto;
  width: 90%;
  max-width: 1200px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}

ul {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  padding: 0;
  list-style: none;
}

li {
  display: flex;
  flex-direction: column;
  flex: 1 1 220px;
  max-width: 300px;
  background: #eeeeee;
  border-radius: 10px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

li:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 0.8rem;
}

h3 {
  font-size: 1.2rem;
  margin: 0.5rem 0 0.3rem;
  color: #34495e;
}

p {
  margin: 0.2rem 0;
  font-size: 0.9rem;
  color: #666;
}

p {
  font-weight: 600;
  color: #2980b9;
}

@media (max-width: 600px) {
  ul {
    grid-template-columns: 1fr;
  }

  li {
    padding: 1rem 0.8rem;
  }
}
</style>
