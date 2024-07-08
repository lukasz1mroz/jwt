import express from 'express';
import jwt from 'jsonwebtoken';

const app = express();

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        res.json({"error": "missing token"}).status(401)
    }

    jwt.verify(token, 'secret', (err, decoded) => {
        if(err) {
            res.json({"error": "wrong token"}).status(401)
        } else {
            next()
        }
    })
}

app.get('/token', (req, res) => {
    const token = jwt.sign({user: 'test'}, 'secret')
    res.json({"token": token}).status(200)
})

app.get('/secured', authMiddleware, (req, res) => {
    res.json({"data": "Success"}).status(200)
})


app.listen(3000, () => {
    console.log('Server is running on port 3000');
})