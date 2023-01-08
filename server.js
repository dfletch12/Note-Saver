const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

require('./routes/apiRoute')(app);
require('./routes/htmlRoute')(app);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
