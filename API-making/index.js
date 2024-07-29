const express = require('express');
const fs = require('fs');
const users = require('./MOCK_DATA.json');

const app = express();
const PORT = 8002;

// Plugin - middleware
app.use(express.urlencoded({extended: false})); //middleware that parsed the data

// custom middleware
app.use((req, res, next) => {
    console.log('hello from middleware1')
    next();    //without next it wont execute the other lines
})

app.use((req, res, next) => {
    fs.appendFile('log.txt', `${Date.now()}`, (err, data) => {
        console.log('middleware 2')
        next();    //without next it wont execute the other lines
    })
})


// Routes
app.get('/api/users', (req, res) => {
    return res.json(users)
})

app.get('/users', (req, res) => {
    const html = `
        <ul>
            ${users.map((user) => `<li>${user.first_name}</li>`).join('')}
        </ul>
    `;
    res.send(html)
});

// app.get('/api/users/:id', (req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find(user => user.id === id)
//     return res.json(user)
// });

// app.post('/api/users/:id', (req, res) => {
//     res.json({status: 'pending'})
// });

// app.patch('/api/users/:id', (req, res) => {
//     res.json({status: 'pending'})
// });

// app.delete('api/users/:id', (req, res) => {
//     return res.json({status: 'pending'})
// });

app
    .route('/api/users/:id').get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find(user => user.id === id)
        if (!user) return res.status(404).json({error: 'user not found'})
        return res.json(user)
    }).patch((req, res) => {
        const id = Number(req.params.id);
        users.find((eachid) => eachid === id).first_name = 'akku';
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
            return res.json({status: 'success'})
        })
    })
    .delete((req, res) => {
        return res.json({status: 'pending'})
    })

app.post('/api/users/', (req, res) => {
    const body = req.body;
    if (!body || !body.first_name || !body.email || !body.gender || !body.job_title){
        return res.status(400).json({error: 'incomplete data'})
    }
    users.push({ ...body, id: users.length + 1 })
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        return res.json({status: 'success', id: users.length + 1})
    })
});

app.listen(PORT, () => console.log(`server started at PORT: ${PORT}`))