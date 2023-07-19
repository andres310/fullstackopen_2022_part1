const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	return blogs.map(blog => blog.likes)
		.reduce((x, y) => x + y, 0)
}

const favoriteBlog = (blogs) => {
	if (blogs.length  <= 0) {
		return {}
	}
	let favorite = blogs[0];
	for (let i = 1, len = blogs.length; i < len; i++) {
		if (blogs[i].likes > favorite.likes) {
			favorite = blogs[i]
		}
	}
	return favorite
}

const mostBlogs = blogs => {
	if (blogs.length <= 0) {
		return {}
	}
	// find author who has the most published blogs
	const authors = blogs.map(blog => blog.author).sort()
	let modeAuthor = '', mode = 0, incidences = 0;
	for (author of authors) {
		incidences = authors.filter(auth => auth === author).length
		if (incidences > mode) {
			mode = incidences
			modeAuthor = author
		}
	}
	return { 'author': modeAuthor, 'blogs': mode }
}

const mostLikes = blogs => {
	if (blogs.length <= 0) {
		return {}
	}
	// find author whose blogs have the most likes
	let likes = 0, currentLikes = 0, author = '';
	for (blog of blogs) {
		currentLikes = blogs.filter(b => b.author === blog.author)
			.map(b => b.likes)
			.reduce((x, y) => x + y, 0)
		if (currentLikes > likes) {
			likes = currentLikes
			author = blog.author
		}
	}
	return { 'author': author, 'likes': likes }
}

module.exports = {
	dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}