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

// GroupScoop initial group messages 
app.get('/user/:api_key/groups/:group_id/messages', (request, response) => {
    fetch(baseUrl + `/groups/${request.params.group_id}/messages?token=${request.params.api_key}&limit=100`).then(
        fetchResponse => fetchResponse.text()
    ).then(
        body => response.send(JSON.parse(body))
    );
})

// GroupScoop group messages
app.get('/user/:api_key/groups/:group_id/messages/:before_id', (request, response) => {
    fetch(baseUrl + `/groups/${request.params.group_id}/messages?token=${request.params.api_key}&limit=100&before_id=${request.params.before_id}`).then(
        fetchResponse => {
            if (fetchResponse.status === 304) {
                response.statusMessage = 'Fetched all messages';
                response.status(400).end();
            }
            return fetchResponse.text()
        }
    ).then(
        body => {
            let results = JSON.parse(body);
            if (results.response) {
                response.send(results);
            }
        }
    ).catch(
        error => console.log(error)
    )
});

app.listen(PORT, () => {
    console.log(__dirname);
    console.log(`listening on ${PORT}`)
})