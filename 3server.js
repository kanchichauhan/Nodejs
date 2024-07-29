const http = require('http');
const fs = require('fs');
const url = require('url');
const express = require('express');

// managing everything with express
const app = express();

app.get('/', (req, res) => {
    return res.send('hello from homepage')
})

app.get('/about', (req, res) => {
    return res.send('hello from about page' + ' hey ' + req.query.name + ' ' + req.query.age);
});

app.listen(8000, () => console.log('server started!'))

// managing everything without express
const handlerFn = (req, res) => {
    if (req.url === '/favicon.ico') return res.end()
    const log = `${Date.now()}: ${req.method} ${req.url} new request received\n`;
    const myUrl = url.parse(req.url, true);
    console.log(myUrl);
    console.log(req.url);
    fs.appendFile('log.txt', log, (err, data) => {
        switch(myUrl.pathname) {
            case '/': res.end('homepage');
                break
            case '/signup': 
                if (req.method === 'GET') res.end('this is a signup page')
            case '/about':
                const username = myUrl.query.myname; 
                res.end(`Hi ${username}`)
                break
            default: res.end('404 not found')
                break
        }
    })
}

// const myServer = http.createServer(handlerFn); 

// myServer.listen(8001, () => console.log('server started'));
