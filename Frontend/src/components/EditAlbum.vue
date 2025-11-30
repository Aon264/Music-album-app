<template>
  <div class="edit-album-container">
    <button class="back-btn" @click="$router.back()">← Back</button>

    <h2>Edit Album</h2>

    <form @submit.prevent="updateAlbum">
      <input v-model="album.title" type="text" placeholder="Title" required />
      <input v-model="album.artist" type="text" placeholder="Artist" required />
      <input v-model="album.year" type="text" placeholder="Year" required />
      <input v-model="album.genre" type="text" placeholder="Genre" />
      <input v-model="album.price" type="number" placeholder="Price" />
      <input v-model="album.coverUrl" type="text" placeholder="Cover Image URL" />
      <textarea v-model="tracksInput" placeholder="Tracks (comma separated)"></textarea>
      <input v-model="album.score" type="number" placeholder="Score">
      <button type="submit">Confirm</button>
    </form>

    <p v-if="message" class="message">{{ message }}</p>
  </div>
</template>

<script>
import { getAlbumById, updateAlbumById } from "@/services/api";

export default {
  name: "EditAlbum",
  props: ["id"],
  data() {
    return {
      album: {},
      tracksInput: "",
      message: "",
    };
  },
  async created() {
    try {
      const response = await getAlbumById(this.id);
      this.album = response.data;

      this.tracksInput = this.album.tracks?.join(", ") || "";
    } catch (error) {
      console.error(error);
      this.message = "Failed to load album data.";
    }
  },
  methods: {
    async updateAlbum() {
      try {
        const updatedAlbum = {
          ...this.album,
          tracks: this.tracksInput
            .split(",")
            .map((t) => t.trim())
            .filter((t) => t),
        };

        await updateAlbumById(this.id, updatedAlbum);

        this.message = "Album updated successfully!";
        this.$router.push(`/album/${this.id}`);
      } catch (error) {
        console.error(error);
        this.message = "Failed to update album.";
      }
    },
  },
};
</script>

<style scoped>
.edit-album-container {
  max-width: 500px;
  margin: 2rem auto;
  background: #111;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  color: #fff;
}

.edit-album-container h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: bold;
  color: #ffffff;
}

.edit-album-container form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.edit-album-container input,
.edit-album-container textarea {
  background: #222;
  border: 1px solid #444;
  color: #fff;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 1rem;
}

.edit-album-container input:focus,
.edit-album-container textarea:focus {
  outline: none;
  border-color: #4db6ff;
  box-shadow: 0 0 4px #4db6ff;
}

.edit-album-container button {
  background: #4db6ff;
  color: #111;
  font-weight: bold;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease-in-out;
  margin-top: 0.5rem;
}

.edit-album-container button:hover {
  background: #1e90ff;
}

.back-btn {
  background: #444;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 1rem;
}

.back-btn:hover {
  background: #666;
}

.message {
  margin-top: 1rem;
  font-weight: bold;
  text-align: center;
}
</style>
