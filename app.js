const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

const publicPath = path.join(__dirname, 'app');
app.use(express.static(publicPath));

app.listen(PORT, () => {
    console.log(`Sever is running on http://localhost:${PORT}`);
});

app.get('/', (req, res)=> {
    res.sendFile(path.join(publicPath, 'index.html'));
})
