<template>
  <div class="album-detail">
    <div class="card">
      <button class="back-btn" @click="$router.push('/')">← Back</button>

      <div class="actions">
        <button class="edit-btn" @click="goToEdit">Edit</button>
        <button class="delete-btn" @click="deleteAlbum">Delete</button>
      </div>

      <div v-if="album" class="album-content">
        <div class="cover">
          <img :src="album.coverUrl" />
        </div>

        <div class="info">
          <h1>{{ album.title }} ({{ album.year }})</h1>
          <p><span class="label">Artist:</span> {{ album.artist }}</p>
          <p><span class="label">Genre:</span> {{ album.genre }}</p>
          <p><span class="label">Price:</span> ${{ album.price }}</p>
          <p><span class="label">Score:</span> {{ album.score }}/10</p>
        </div>
      </div>

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
        console.error(error);
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
        console.error(error);
        alert("Failed to delete album.");
      }
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

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes imageZoom {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes trackSlideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
.album-detail {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 2rem;
  color: #eee;
}

.card {
  max-width: 1000px;
  width: 100%;
  background: #1c1c1c;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
  animation: fadeInUp 0.7s ease-out;
}

.back-btn {
  background: #2980b9;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
  animation: slideInLeft 0.6s ease-out;
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

.cover {
  animation: slideInLeft 0.7s ease-out;
}

.cover img {
  max-width: 300px;
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5);
  animation: imageZoom 0.8s ease-out;
  transition: transform 0.3s ease;
}

.info {
  flex: 1;
  min-width: 250px;
  animation: slideInRight 0.7s ease-out;
}

.info h1 {
  margin: 0 0 1rem;
  font-size: 2rem;
  color: #fff;
  animation: fadeInUp 0.6s ease-out 0.3s backwards;
}

.info p {
  animation: fadeInUp 0.6s ease-out backwards;
  transition: transform 0.3s ease;
}

.info p:nth-child(2) { animation-delay: 0.4s; }
.info p:nth-child(3) { animation-delay: 0.5s; }
.info p:nth-child(4) { animation-delay: 0.6s; }
.info p:nth-child(5) { animation-delay: 0.7s; }

.label {
  font-weight: 600;
  color: #2980b9;
}

.actions {
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: flex;
  gap: 0.75rem;
  animation: slideInLeft 0.6s ease-out 0.1s backwards;
}

.edit-btn,
.delete-btn {
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
}

.edit-btn {
  background: #4db6ff;
  color: #111;
}

.edit-btn:hover {
  background: #1e90ff;
}

.delete-btn {
  background: #e74c3c;
  color: #fff;
}

.delete-btn:hover {
  background: #c0392b;
}

.tracklist {
  animation: fadeInUp 0.7s ease-out 0.4s backwards;
}

.tracklist h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #fff;
  animation: slideInLeft 0.6s ease-out 0.5s backwards;
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
  animation: trackSlideIn 0.5s ease-out backwards;
  transition: all 0.3s ease;
}

.tracklist li:nth-child(1) { animation-delay: 0.6s; }
.tracklist li:nth-child(2) { animation-delay: 0.65s; }
.tracklist li:nth-child(3) { animation-delay: 0.7s; }
.tracklist li:nth-child(4) { animation-delay: 0.75s; }
.tracklist li:nth-child(5) { animation-delay: 0.8s; }
.tracklist li:nth-child(n+6) { animation-delay: 0.85s; }

.loading {
  text-align: center;
  font-size: 1.2rem;
  color: #aaa;
}
</style>
