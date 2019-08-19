const express = require('express');
const path = require('path');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 8080;

const baseUrl = 'https://api.groupme.com/v3';

app.use(express.static('public'));

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, './public/index.html'));
});

// GroupScoop user information
app.get('/user/:api_key', (request, response) => {
    fetch(baseUrl + `/users/me?token=${request.params.api_key}`).then(
        fetchResponse => {
            if (!fetchResponse.ok) {
                response.statusMessage = 'Invalid access token';
                response.status(400).end();
            }
            return fetchResponse.text();
        }
    ).then(
        body => {
            let results = JSON.parse(body);
            if (results.response) {
                response.send(results);
            }
        }
    )
});

// GroupScoop user's groups 
app.get('/user/:api_key/groups/page/:page_number', (request, response) => {
    fetch(baseUrl + `/groups?token=${request.params.api_key}&per_page=5&page=${request.params.page_number}`).then(
        fetchResponse => fetchResponse.text()
    ).then(
        body => response.send(JSON.parse(body))
    );
});

app.listen(PORT, () => {
    console.log(__dirname);
    console.log(`listening on ${PORT}`)
})