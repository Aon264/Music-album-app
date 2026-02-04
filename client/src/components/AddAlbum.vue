<template>
    <div class="add-album-container">
        <button class="back-btn" @click="$router.push('/')">⬅ Back</button>
        <h2>Add New Album</h2>

        <form @submit.prevent="addAlbum">
            <input v-model="album.title" type="text" placeholder="Title" required />
            <input v-model="album.artist" type="text" placeholder="Artist" required />
            <input v-model="album.year" type="text" placeholder="Year" required />
            <input v-model="album.genre" type="text" placeholder="Genre" />
            <input v-model="album.price" type="number" placeholder="Price" />
            <input v-model="album.cover" type="text" placeholder="Cover Image URL" />
            <textarea v-model="tracksInput" placeholder="Tracks (comma separated)"></textarea>
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
                score: "",
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
                this.album = { title: "", artist: "", year: "", genre: "", price: "", cover: "", score: "" };
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
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideInLeft {
    from {
        opacity: 0;
        transform: translateX(-20px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes buttonClick {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(0.95);
    }
}

.add-album-container {
    max-width: 500px;
    margin: 2rem auto;
    background: #111;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
    color: #fff;
    animation: fadeInUp 0.6s ease-out;
}

.add-album-container h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    font-weight: bold;
    color: #ffffff;
    animation: slideInLeft 0.5s ease-out;
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
    transition: all 0.3s ease-in-out;
    animation: fadeInUp 0.6s ease-out backwards;
}

.add-album-container input:nth-child(1) {
    animation-delay: 0.1s;
}

.add-album-container input:nth-child(2) {
    animation-delay: 0.2s;
}

.add-album-container input:nth-child(3) {
    animation-delay: 0.3s;
}

.add-album-container input:nth-child(4) {
    animation-delay: 0.4s;
}

.add-album-container input:nth-child(5) {
    animation-delay: 0.5s;
}

.add-album-container input:nth-child(6) {
    animation-delay: 0.6s;
}

.add-album-container textarea {
    animation-delay: 0.7s;
}

.add-album-container input:nth-child(8) {
    animation-delay: 0.8s;
}

.add-album-container input:focus,
.add-album-container textarea:focus {
    outline: none;
    border-color: #4db6ff;
}

.add-album-container button {
    background: #4db6ff;
    color: #111;
    font-weight: bold;
    padding: 0.75rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    margin-top: 0.5rem;
    animation: fadeInUp 0.6s ease-out 0.8s backwards;
}

.add-album-container button:hover {
    background: #1e90ff;
}

.back-btn {
    background: #444;
    color: #fff;
    animation: slideInLeft 0.5s ease-out;
}

.back-btn:hover {
    background: #666;
}

.message {
    margin-top: 1rem;
    font-weight: bold;
    text-align: center;
    animation: messageFadeIn 0.5s ease-out;
}
</style>
