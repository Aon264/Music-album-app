const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

const app = express();

app.use(cors());
app.use(express.json());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Get all albums
app.get('/albums', async (req, res) => {
  try {
    const snapshot = await db.collection('albums').get();
    const albums = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(albums);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

// Get album by ID
app.get('/albums/:id', async (req, res) => {
  try {
    const doc = await db.collection('albums').doc(req.params.id).get();
    if (!doc.exists) return res.status(404).send('Album not found');
    res.json({ id: doc.id, ...doc.data() });
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});


//Add album
app.post('/albums', async (req, res) => {
  try {
    const newAlbum = req.body;
    const docRef = await db.collection('albums').add(newAlbum);
    res.json({ id: docRef.id, ...newAlbum });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update album by ID
app.put("/albums/:id", async (req, res) => {
  try {
    const data = req.body;
    const docRef = db.collection("albums").doc(req.params.id);
    await docRef.update(data);
    res.json({ id: req.params.id, ...data });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete album by ID
app.delete("/albums/:id", async (req, res) => {
  try {
    const docRef = db.collection("albums").doc(req.params.id);
    await docRef.delete();
    res.json({ message: "Album deleted successfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
