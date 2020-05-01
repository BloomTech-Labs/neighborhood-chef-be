const server = require('./src/server');
require('dotenv-safe').config({
    allowEmptyValues: true
});

const PORT = process.env.PORT || 5100;



server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});