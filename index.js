require("dotenv").config();
const { Sequelize, Model, DataTypes } = require("sequelize");
const express = require("express");
const app = express();
app.use(express.json());

// Database setup
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {},
});

// Blog model definition
class Blog extends Model {}
Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "blog",
    tableName: "blogs",
  }
);

// Endpoints
// List all blogs
app.get("/api/blogs", async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

// Add a new blog
app.post("/api/blogs", async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    return res.json(blog);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

// Delete a blog
app.delete("/api/blogs/:id", async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findByPk(blogId);
    if (blog) {
      await blog.destroy();
      return res.status(204).end();
    } else {
      return res.status(404).json({ error: "Blog not found" });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});

// Server setup
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Sync the model with the database
sequelize.sync();
