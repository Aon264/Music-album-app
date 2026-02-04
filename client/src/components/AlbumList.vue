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
          result = [...result].sort((a, b) => (b.price || 0) - (a.price || 0));
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
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes imageZoom {
  from {
    transform: scale(1.1);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes hoverGlow {
  0%, 100% {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }
  50% {
    box-shadow: 0 15px 30px rgba(77, 182, 255, 0.2);
  }
}

@keyframes textSlideIn {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

div {
  margin: 2rem auto;
  width: 90%;
  max-width: 1200px;
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
  transition: all 0.3s ease;
  cursor: pointer;
  animation: fadeInUp 0.6s ease-out backwards;
}

li:nth-child(1) { animation-delay: 0.1s; }
li:nth-child(2) { animation-delay: 0.2s; }
li:nth-child(3) { animation-delay: 0.3s; }
li:nth-child(4) { animation-delay: 0.4s; }
li:nth-child(5) { animation-delay: 0.1s; }
li:nth-child(6) { animation-delay: 0.2s; }
li:nth-child(7) { animation-delay: 0.3s; }
li:nth-child(8) { animation-delay: 0.4s; }
li:nth-child(n+9) { animation-delay: 0.1s; }

li:hover {
  transform: translateY(-8px);
}

img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 0.8rem;
  animation: imageZoom 0.8s ease-out;
  transition: transform 0.3s ease;
}

li:hover img {
  transform: scale(1.05);
}

h3 {
  font-size: 1.2rem;
  margin: 0.5rem 0 0.3rem;
  color: #34495e;
  animation: textSlideIn 0.6s ease-out 0.2s backwards;
}

p {
  margin: 0.2rem 0;
  font-size: 0.9rem;
  color: #666;
  animation: textSlideIn 0.6s ease-out backwards;
  transition: color 0.3s ease;
}

p:nth-of-type(1) { animation-delay: 0.3s; }
p:nth-of-type(2) { animation-delay: 0.4s; }
p:nth-of-type(3) { animation-delay: 0.5s; }
p:nth-of-type(4) { animation-delay: 0.6s; }
p:nth-of-type(5) { animation-delay: 0.7s; }

p {
  font-weight: 600;
  color: #2980b9;
} 
</style>
