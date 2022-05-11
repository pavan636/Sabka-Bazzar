const express = require('express');
const banners = require('./dataservice/banners/index.get.json');
const categories = require('./dataservice/categories/index.get.json');
const products = require('./dataservice/products/index.get.json');
const user = require('./dataservice/user/user.json');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => console.log(`Server running on port ${port}`));

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods", "GET,POST,DELETE");
    next();
});

app.get('/banners', (req, res) => {
    res.status(200).json(banners);
});

app.get('/categories', (req, res) => {
    res.status(200).json(categories);
});


app.get('/products', (req, res) => {
    res.status(200).json(products);
});

app.post('/login', (req, res) => {
    const { Email, Password } = req.body
    const isuser = user.filter(usercred => usercred.email === Email && usercred.password === Password);
    if (isuser.length > 0) {
        res.status(200).json({ message: "success" });
    }else{
        res.status(401).json({ message: "Wrong Email or Password" });
    }
});


app.post('/register', (req, res) => {
    const { firstName, lastName, Email, Password } = req.body
    const newUser = {
        firstname: firstName,
        lastname: lastName,
        email: Email,
        password: Password
    }
    if (user.filter(checkuser => checkuser.email === newUser.email).length !== 0) {
        res.status(403).json({ status: 403, message: "Email is already taken" });
    } else {
        user.push(newUser);
        const stream = fs.createWriteStream('./server/dataservice/user/user.json');
        // console.log(user);
        stream.once('open', (fd) => {
            stream.write(JSON.stringify(user));
            stream.end();
        });
        stream.on('error', err => console.log(err));
        res.status(201).json({ status: 201, message: "Added user successfully" });
    }
});

app.get('/filterproduct/:name', (req, res) => {
    const category = categories.filter(category => category.name === req.params.name || category.key === req.params.name)[0]
    const productFilter = products.filter(product => product.category === category.id);
    res.status(200).json(productFilter);
});


app.post('/addtocart', (req, res) => {

});

