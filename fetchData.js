const mongoose = require('mongoose');

// Connect to MongoDB (replace connection string and database name)
mongoose.connect(
	'mongodb+srv://meelenych:Trsd1583-@e-commerce-store.jmz1jj6.mongodb.net/',
);

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notified of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Bind connection to open event (to get notified when the connection is open)
db.once('open', async () => {
	try {
		// Define a Product schema
		const productSchema = new mongoose.Schema({
			_id: {
				$oid: String,
			},
			id: String,
			name: String,
			price: String,
			quantity: String,
			imagePath: String,
		});

		// Create a Product model based on the schema
		const Product = mongoose.model('Product', productSchema, 'products');

		// Insert dummy data into the products collection
		await Product.insertMany([
			{ name: 'Tomatoes', price: '5.05', quantity: '100' },
			{ name: 'Potatoes', price: '5.05', quantity: '100' },
			{ name: 'Onions', price: '5.05', quantity: '100' },
		]);

		// Retrieve all products from the database
		const products = await Product.find();
		console.log(products);
	} catch (error) {
		console.error(error);
	} finally {
		mongoose.connection.close(); // Close the connection after querying
	}
});
