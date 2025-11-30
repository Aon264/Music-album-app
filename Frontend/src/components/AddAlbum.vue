<template>
    <div class="add-album-container">
        <button class="back-btn" @click="$router.push('/')">⬅ Back</button>
        <h2>Add New Album</h2>

        <form @submit.prevent="addAlbum">

            <!-- Album Name -->
            <input v-model="album.title" type="text" placeholder="Title" required />

            <!-- Artist -->
            <input v-model="album.artist" type="text" placeholder="Artist" required />

            <!-- Year -->
            <input v-model="album.year" type="text" placeholder="Year" required />

            <!-- Genre -->
            <input v-model="album.genre" type="text" placeholder="Genre" />

            <!-- Price -->
            <input v-model="album.price" type="number" placeholder="Price" />

            <!-- Cover URL -->
            <input v-model="album.cover" type="text" placeholder="Cover Image URL" />

            <!-- Tracks (comma-separated) -->
            <textarea v-model="tracksInput" placeholder="Tracks (comma separated)"></textarea>

            <!-- Score -->
            <input v-model="album.score" type="number" placeholder="Score">

            <button type="submit">Confirm</button>
        </form>

        <p v-if="message" class="message">{{ message }}</p>

    </div>
</template>

<script>
import { addAlbum } from "@/services/api";

export default {
    name: "AddAlbum",
    data() {
        return {
            album: {
                title: "",
                artist: "",
                year: "",
                genre: "",
                price: "",
                cover: "",
            },
            tracksInput: "",
            message: "",
        };
    },
    methods: {
        async addAlbum() {
            try {
                const newAlbum = {
                    ...this.album,
                    tracks: this.tracksInput.split(",").map(t => t.trim()).filter(t => t),
                };
                
                await addAlbum(newAlbum);

                this.message = "Album added successfully!";
                this.album = { title: "", artist: "", year: "", genre: "", price: "", cover: "" };
                this.tracksInput = "";
            } catch (error) {
                console.error(error);
                this.message = "Failed to add album.";
            }
        },
    },
};
</script>

<style scoped>
.add-album-container {
    max-width: 500px;
    margin: 2rem auto;
    background: #111;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
    color: #fff;
}

.add-album-container h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    font-weight: bold;
    color: #ffffff;
}

.add-album-container form {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.add-album-container input,
.add-album-container textarea {
    background: #222;
    border: 1px solid #444;
    color: #fff;
    padding: 0.75rem;
    border-radius: 8px;
    font-size: 1rem;
}

.add-album-container input:focus,
.add-album-container textarea:focus {
    outline: none;
    border-color: #4db6ff;
    box-shadow: 0 0 4px #4db6ff;
}

.add-album-container button {
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

.add-album-container button:hover {
    background: #1e90ff;
}

.back-btn {
    background: #444;
    color: #fff;
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
