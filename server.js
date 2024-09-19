const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'static')));

// Serve the homepage or index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Handle any other routes, like the homepage
app.get('/homepage', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'homepage.html'));
    res.sendFile(path.join(__dirname, 'views', 'course.html'));
    res.sendFile(path.join(__dirname, 'views', 'lessons.html'));

});

// Handle any other routes, like the homepage
app.get('/course', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'course.html'));

});


// Handle any other routes, like the homepage
app.get('/lessons', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'lessons.html'));

});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
