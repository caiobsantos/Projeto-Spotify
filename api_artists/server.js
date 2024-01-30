const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Allow all origins (CORS)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Load JSON data from file
const jsonData = JSON.parse(fs.readFileSync('artists.json'));

// Example API route
app.get('/artists', (req, res) => {
  // Your logic to retrieve users from the loaded JSON data
  const { name_like } = req.query;

  // Filter artists based on the name_like parameter
  let filteredArtists = jsonData.artists;

  if (name_like) {
    const searchPattern = new RegExp(name_like, 'i');
    filteredArtists = jsonData.artists.filter(artist => searchPattern.test(artist.name));
  }

  res.json(filteredArtists);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
