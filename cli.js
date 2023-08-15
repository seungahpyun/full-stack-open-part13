require('dotenv').config()
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.CONNECTION_STRING);

const Blog = sequelize.define('blog', {
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    timestamps: false
});

async function fetchAndPrintBlogs() {
    try {
        await sequelize.authenticate();
        console.log('Connected to the database.');

        const blogs = await Blog.findAll();
        blogs.forEach(blog => {
            console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`);
        });

        await sequelize.close();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

fetchAndPrintBlogs();
