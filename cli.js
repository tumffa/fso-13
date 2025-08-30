require('dotenv').config()
const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL)

const Blog = sequelize.define('blog', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	author: DataTypes.STRING,
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
	timestamps: false,
	tableName: 'blogs'
})

const main = async () => {
	try {
		await sequelize.authenticate()
		const blogs = await Blog.findAll()
		blogs.forEach(blog => {
			console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`)
		})
		await sequelize.close()
	} catch (error) {
		console.error('Error fetching blogs:', error)
		await sequelize.close()
	}
}

main()