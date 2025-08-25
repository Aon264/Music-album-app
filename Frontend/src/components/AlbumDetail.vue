<template>
  <div class="album-detail">
    <div class="card">
      <button class="back-btn" @click="$router.back()">← Back</button>
      
      <!-- Edit and delete buttons -->
      <div class="actions">
        <button class="edit-btn" @click="goToEdit">Edit</button>
        <button class="delete-btn" @click="deleteAlbum">Delete</button>
      </div>

      <div v-if="album && Object.keys(album).length" class="album-content">
        <!-- Album Cover -->
        <div class="cover">
          <img :src="album.coverUrl" alt="cover" />
        </div>

        <!-- Album Info -->
        <div class="info">
          <h1>{{ album.title }} ({{ album.year }})</h1>
          <p><span class="label">Artist:</span> {{ album.artist }}</p>
          <p><span class="label">Genre:</span> {{ album.genre }}</p>
          <p><span class="label">Price:</span> ${{ album.price }}</p>
          <p><span class="label">Score:</span> {{ album.score }}/10</p>
        </div>
      </div>

      <!-- Tracklist -->
      <div v-if="album.tracks?.length" class="tracklist">
        <h2>Tracklist</h2>
        <ul>
          <li v-for="(track, index) in album.tracks" :key="index">
            {{ index + 1 }}. {{ track }}
          </li>
        </ul>
      </div>

      <div v-else-if="album && !album.tracks?.length">
        <p>No tracks available.</p>
      </div>

      <div v-else class="loading">
        Loading album...
      </div>
    </div>
  </div>
</template>

<script>
import { getAlbumById, deleteAlbumById } from "@/services/api";

export default {
  name: "AlbumDetail",
  props: ["id"],
  data() {
    return { album: {} };
  },
  async created() {
    await this.fetchAlbum();
  },
  methods: {
    async fetchAlbum() {
      try {
        const response = await getAlbumById(this.id);
        this.album = response.data;
      } catch (error) {
        console.error("Failed to load album", error);
      }
    },
    goToEdit() {
      this.$router.push({ name: "EditAlbum", params: { id: this.id } });
    },
    async deleteAlbum() {
      if (!confirm("Are you sure you want to delete this album?")) return;

      try {
        await deleteAlbumById(this.id);
        alert("Album deleted successfully!");
        this.$router.push("/");
      } catch (error) {
        console.error("Failed to delete album", error);
        alert("Failed to delete album.");
      }
    },
  },
};
</script>

<style scoped>
.album-detail {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #eee;
}

.card {
  max-width: 1000px;
  width: 100%;
  background: #1c1c1c;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
}

.back-btn {
  background: #2980b9;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 1.5rem;
  transition: background 0.3s;
}

.back-btn:hover {
  background: #1c5980;
}

.album-content {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 2rem;
}

.cover img {
  max-width: 300px;
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5);
}

.info {
  flex: 1;
  min-width: 250px;
}

.info h1 {
  margin: 0 0 1rem;
  font-size: 2rem;
  color: #fff;
}

.label {
  font-weight: 600;
  color: #2980b9;
}

.actions {
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: flex;
  gap: 0.75rem;
}

.edit-btn {
  background: #4db6ff;
  color: #111;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}

.edit-btn:hover {
  background: #1e90ff;
}

.delete-btn {
  background: #e74c3c;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}

.delete-btn:hover {
  background: #c0392b;
}

.tracklist h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #fff;
}

.tracklist ul {
  list-style: none;
  padding: 0;
}

.tracklist li {
  background: #2a2a2a;
  margin-bottom: 0.8rem;
  padding: 0.8rem 1rem;
  border-radius: 8px;
}

.loading {
  text-align: center;
  font-size: 1.2rem;
  color: #aaa;
}

@media (max-width: 768px) {
  .album-content {
    flex-direction: column;
    align-items: center;
  }

  .cover img {
    max-width: 100%;
  }

  .info {
    text-align: center;
  }
}
</style>
