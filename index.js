const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB using the environment variable set on Heroku
// mongoose.connect(process.env.MONGODB_URI);
mongoose.connect(
	'mongodb+srv://meelenych:rRWkw3cXs5lHCSfO@e-store-base.lnycmzy.mongodb.net/',
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
	console.log('Connected to MongoDB');
});

const productSchema = new mongoose.Schema({
	_id: String,
	name: String,
	price: String,
	quantity: String,
	imagePath: String,
});

const Product = mongoose.model('Product', productSchema, 'products');

app.get('/api/e-store/products', async (req, res) => {
	try {
		res.set('Cache-Control', 'no-store');
		const products = await Product.find();
		console.log(products);
		res.json(products);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
