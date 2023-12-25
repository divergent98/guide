const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

require("dotenv/config");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "mern-guide",
  })
  .then(() => {
    console.log("Database Connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });
app.get("/", (req, res) => {
  res.send("Express is here");
});
//--------------------------------------------------------------------------------------guide schema

const guideSchema = new mongoose.Schema({
  guideFirstName: { type: String, required: true },
  guideLastName: { type: String, required: true },
  guideUsername: { type: String },
  guidePhone: { type: String, required: true },
  guideEmail: { type: String },
  guidePassword: { type: String, required: true },
  guideProfileImage: { type: String, required: true },
  guideLocation: { type: String, required: true },
  guideBirthDate: { type: String },
  guideInterests: { type: [String] },
  guideAbout: { type: String, required: true },
});
const Guide = mongoose.model("Guide", guideSchema);
//--------------------------------------------------------------------------------------user schema
const userSchema = new mongoose.Schema({
  userFirstName: { type: String, required: true },
  userLastName: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  userEmail: { type: String, required: true, unique: true },
  userPhone: { type: String, required: true },
  userPassword: { type: String, required: true },
  userProfileImage: { type: String, required: true },
  userBirthDate: { type: String, required: true },
  userInterests: { type: [String] },
  userAbout: { type: String, required: true },
});
const User = mongoose.model("User", userSchema);
//--------------------------------------------------------------------------------------trip schema
const tripSchema = new mongoose.Schema({
  userIds: { type: [mongoose.Types.ObjectId] },
  guideId: { type: mongoose.Types.ObjectId, required: true },
  capacity: { type: Number, required: true },
  description: { type: String, required: true },
  longDescription: { type: String, required: true },
  duration: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: String, required: true },
  tags: { type: [String], required: true },
  transportation: { type: String, required: true },
  photographs: { type: [String] },
  coverPhotograph: { type: String, required: true },
  cost: { type: Number, required: true },
});
const Trip = mongoose.model("Trip", tripSchema);
//--------------------------------------------------------------------------------------blog schema
const blogSchema = new mongoose.Schema({
  guideId: { type: mongoose.Types.ObjectId, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  tags: { type: [String], required: true },
  shortDescription: { type: String, required: true },
  photographs: { type: [String] },
  coverPhotograph: { type: String, required: true },
});
const Blog = mongoose.model("Blog", blogSchema);
//--------------------------------------------------------------------------------------Guides

// Create a new guide
app.post("/createGuide", async (req, res) => {
  try {
    const newGuide = await Guide.create(req.body);
    console.log("Guide created successfully:", newGuide);
    res.json(newGuide);
  } catch (err) {
    console.error("Error creating guide:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Get all guides
app.get("/guides", async (req, res) => {
  try {
    const guides = await Guide.find();
    res.json(guides);
  } catch (err) {
    console.error("Error fetching guides:", err);
    res.status(500).send("Internal Server Error");
  }
});
// Get single guide
app.get("/guide/:id", async (req, res) => {
  try {
    const guide = await Guide.findById(req.params.id);
    
    if (!guide) {
      console.log("Guide not found");
      return res.status(404).json({ error: "Guide not found" });
    }

    console.log("Guide found:", guide);
    res.json(guide);
  } catch (err) {
    console.error("Error fetching guide by ID:", err);
    res.status(500).send("Internal Server Error");
  }
});
// Delete a guide by ID
app.delete("/deleteGuide/:id", async (req, res) => {
  try {
    const deletedGuide = await Guide.findByIdAndDelete(req.params.id);
    console.log("Guide deleted successfully:", deletedGuide);
    res.json(deletedGuide);
  } catch (err) {
    console.error("Error deleting guide:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Update a guide by ID
app.put("/updateGuide/:id", async (req, res) => {
  try {
    const updatedGuide = await Guide.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    console.log("Guide updated successfully:", updatedGuide);
    res.json(updatedGuide);
  } catch (err) {
    console.error("Error updating guide:", err);
    res.status(500).send("Internal Server Error");
  }
});
//--------------------------------------------------------------------------------------Users
app.post("/createUser", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    console.log("User created successfully:", newUser);
    res.json(newUser);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Get all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).send("Internal Server Error");
  }
});
// Get users by id
app.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ error: "User not found" });
    }

    console.log("User found:", user);
    res.json(user);
  } catch (err) {
    console.error("Error fetching user by ID:", err);
    res.status(500).send("Internal Server Error");
  }
});
// Delete a user by ID
app.delete("/deleteUser/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    console.log("User deleted successfully:", deletedUser);
    res.json(deletedUser);
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Update a user by ID
app.put("/updateUser/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    console.log("User updated successfully:", updatedUser);
    res.json(updatedUser);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).send("Internal Server Error");
  }
});

//-----------------------------------------------------------------------------------------------blogs
// Create a new blog
app.post('/createBlog', async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    console.log('Blog created successfully:', newBlog);
    res.json(newBlog);
  } catch (err) {
    console.error('Error creating blog:', err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

// Get all blogs
app.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    console.error('Error fetching blogs:', err);
    res.status(500).send('Internal Server Error');
  }
});
// Get blog by id
app.get("/blog/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      console.log("Blog not found");
      return res.status(404).json({ error: "Blog not found" });
    }

    console.log("Blog found:", blog);
    res.json(blog);
  } catch (err) {
    console.error("Error fetching blog by ID:", err);
    res.status(500).send("Internal Server Error");
  }
});
// Get blogs by guideId
app.get('/blogs/:guideId', async (req, res) => {
  try {
    const { guideId } = req.params;
    const blogs = await Blog.find({ guideId });
    res.json(blogs);
  } catch (err) {
    console.error('Error fetching blogs by guideId:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Delete a blog by ID
app.delete('/deleteBlog/:id', async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    console.log('Blog deleted successfully:', deletedBlog);
    res.json(deletedBlog);
  } catch (err) {
    console.error('Error deleting blog:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Update a blog by ID
app.put('/updateBlog/:id', async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    console.log('Blog updated successfully:', updatedBlog);
    res.json(updatedBlog);
  } catch (err) {
    console.error('Error updating blog:', err);
    res.status(500).send('Internal Server Error');
  }
});
//----------------------------------------------------------------------------------------------trips
// Create a new trip
app.post('/createTrip', async (req, res) => {
  try {
    const newTrip = await Trip.create(req.body);
    console.log('Trip created successfully:', newTrip);
    res.json(newTrip);
  } catch (err) {
    console.error('Error creating trip:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Get all trips
app.get('/trips', async (req, res) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (err) {
    console.error('Error fetching trips:', err);
    res.status(500).send('Internal Server Error');
  }
});
// Get trip by id
app.get("/trip/:id", async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    
    if (!trip) {
      console.log("Trip not found");
      return res.status(404).json({ error: "Trip not found" });
    }

    console.log("Trip found:", trip);
    res.json(trip);
  } catch (err) {
    console.error("Error fetching trip by ID:", err);
    res.status(500).send("Internal Server Error");
  }
});
// Get trips by guideId
app.get('/trips/:guideId', async (req, res) => {
  try {
    const { guideId } = req.params;
    const trips = await Trip.find({ guideId });
    res.json(trips);
  } catch (err) {
    console.error('Error fetching trips by guideId:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Delete a trip by ID
app.delete('/deleteTrip/:id', async (req, res) => {
  try {
    const deletedTrip = await Trip.findByIdAndDelete(req.params.id);
    console.log('Trip deleted successfully:', deletedTrip);
    res.json(deletedTrip);
  } catch (err) {
    console.error('Error deleting trip:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Update a trip by ID
app.put('/updateTrip/:id', async (req, res) => {
  try {
    const updatedTrip = await Trip.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    console.log('Trip updated successfully:', updatedTrip);
    res.json(updatedTrip);
  } catch (err) {
    console.error('Error updating trip:', err);
    res.status(500).send('Internal Server Error');
  }
});


//---------------------------------------------------------------------------------------------------
app.listen(3001, function () {
  console.log("Server is running");
});
