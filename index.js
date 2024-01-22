// Import required modules
const express = require('express');
const mongoose = require('mongoose');

// Create an Express application
const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB (replace connection string and database name)
mongoose.connect(
	'mongodb+srv://meelenych:Trsd1583-@e-commerce-store.jmz1jj6.mongodb.net/',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
);

// Define a Product schema
const productSchema = new mongoose.Schema({
	name: String,
	price: Number,
});

// Create a Product model based on the schema
const Product = mongoose.model('Product', productSchema);

// Endpoint to get all products
app.get('/api/products', async (req, res) => {
	try {
		// Retrieve all products from the database
		const products = await Product.find();
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
