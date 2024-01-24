// Import required modules
const express = require('express');
const mongoose = require('mongoose');

// Create an Express application
const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB (replace connection string and database name)
mongoose.connect(
	'mongodb+srv://meelenych:Trsd1583-@e-commerce-store.jmz1jj6.mongodb.net/e-store',
);

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notified of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Bind connection to open event (to get notified when the connection is open)
db.once('open', () => {
	console.log('Connected to MongoDB');
});

// Define a Product schema
const productSchema = new mongoose.Schema({
	_id: String,
	name: String,
	price: String,
	quantity: String,
	imagePath: String,
});

// Create a Product model based on the schema
const Product = mongoose.model('Product', productSchema, 'products');

// Insert dummy data into the products collection
Product.insertMany([
	{
		name: 'Tomatoes',
		price: '5.05',
		quantity: '100',
		imagePath:
			'https://cdn.pixabay.com/photo/2016/03/26/16/44/tomatoes-1280859_1280.jpg',
	},
	{
		name: 'Potatoes',
		price: '5.05',
		quantity: '100',
		imagePath:
			'https://cdn.pixabay.com/photo/2016/08/11/08/49/potatoes-1585075_1280.jpg',
	},
	{
		name: 'Onions',
		price: '5.05',
		quantity: '100',
		imagePath:
			'https://cdn.pixabay.com/photo/2017/06/15/09/20/onion-2404583_1280.jpg',
	},
]);

// Endpoint to get all products
app.get('/api/e-store/products', async (req, res) => {
	try {
		// Set cache control header to disable caching
		res.set('Cache-Control', 'no-store');

		// Retrieve all products from the database
		const products = await Product.find();
		console.log(products);
		res.json(products);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
