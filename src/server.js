const express = require('express');
const cors = require('cors');
require('./database/mongoose');

const bookRoutes = require('./routes/book.routes');

let app = express();
app.use(express.json());
app.use(cors());

/**
 * Endpoints
 */
app.use(bookRoutes);


let port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log('API started on port: ', port);
});


