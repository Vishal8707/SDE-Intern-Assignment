// Import necessary packages and modules
import express from "express"; // Express framework for building APIs
import route from "./routes/routes.js"; // Routing for your API endpoints
import { startserver } from "./db/connection.js"; // Function to start the server
import dotenv from "dotenv"; // Environment variables management
dotenv.config(); // Load environment variables from a .env file (if available)

// Create an instance of the Express application
const app = express();

// Use JSON and URL-encoded middleware for handling requests
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests

// Define the server's port and the URL for the database
let PORT = process.env.PORT; // Port on which the server will run
let URL = process.env.DATABASE; // Database URL from environment variables

// Start the server and pass the Express app, port, and database URL
startserver(app, PORT, URL);

// Define the main route for your API
app.use("/", route);

// Start listening for incoming HTTP requests
// The server is now up and running