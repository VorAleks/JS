const express = require('express');
const fs = require('fs');
const app = express();
const router = require('./cartRouter');

app.use(express.json());
app.use('/', express.static('public'));
app.use('/api/cart', router);

app.get('/api/goodsList', (req, res) => {
    fs.readFile('server/data/products.json', 'utf8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
        } else {
            res.send(data);
        }
    })
});

app.listen(3000, function () {
    console.log('server is running on port 3000!');
});






// app.get('/api/products', (req, res) => {
//     fs.readFile('server/db/products.json', 'utf8', (err, data) => {
//         if (err) {
//             res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
//         } else {
//             res.send(data);
//         }
//     })
// });

// app.listen(3000, () => console.log('Listen on port 3000...'));