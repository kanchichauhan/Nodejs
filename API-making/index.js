const express = require('express');
const fs = require('fs');
const users = require('./MOCK_DATA.json');
const mongoose = require('mongoose');

const app = express();
const PORT = 8002;

// Connect mongoose

mongoose.connect('mongodb://127.0.0.1:27017/youtube-app-1')
.then(() => console.log('mongodb connected'))
.catch((err) => console.log('mongo error', err))

//  Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    jobTitle: {
        type: String,
    },
    gender: {
        type: String
    }
}, {timestamps: true})

// Model

const User = mongoose.model('user', userSchema);


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
app.get('/api/users', async (req, res) => {
    const allDbUsers = await User.find({})
    return res.json(allDbUsers)
})

app.get('/users', async (req, res) => {
    const allDbUsers = await User.find({})
    const html = `
        <ul>
            ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join('')}
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
    .route('/api/users/:id').get(async (req, res) => {
        const user = await User.findById(req.params.id)
        if (!user) return res.status(404).json({error: 'user not found'})
        return res.json(user)
    }).patch(async (req, res) => {
        await User.findByIdAndUpdate(req.params.id, { lastname: "changed" })
        return res.json({status: 'success'})
    })
    .delete(async (req, res) => {
        await User.findByIdAndDelete(req.params.id)
        return res.json({status: 'success'})
    })

app.post('/api/users/', async (req, res) => {
    const body = req.body;
    if (!body || !body.first_name || !body.email || !body.gender || !body.job_title){
        return res.status(400).json({error: 'incomplete data'})
    }
    const result = await User.create({
        firstName: body.first_name,
        lastname: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title,
    })
    console.log(result);
    return res.status(201).json({ msg: 'success' })
});

app.listen(PORT, () => console.log(`server started at PORT: ${PORT}`))