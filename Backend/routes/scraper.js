const express = require('express');
const router = express.Router();
const axios = require('axios');
const puppeteer = require('puppeteer');

// Function to search books from OpenLibrary
async function searchBook(bookName) {
  try {
    const response = await axios.get(`https://openlibrary.org/search.json?q=${bookName}`);
    const books = response.data.docs.slice(0, 10).map(book => ({
      title: book.title,
      author: book.author_name?.[0] || 'Unknown',
      cover: book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : 'https://media.istockphoto.com/id/508545844/photo/question-mark-from-books-searching-information-or-faq-edication.jpg?s=612x612&w=0&k=20&c=-RTL7PuuaYZWifHcE4lvNFjqPY_J9VpqMNegcc3sdgA='
    }));
    return books;
  } catch (error) {
    console.error('Error fetching book details:', error.message);
    return [];
  }
}

// Route: Search books from OpenLibrary
router.post('/book', async (req, res) => {
  const productName = req.body.name;
  if (!productName) {
    return res.status(400).json({ error: 'Book name is required.' });
  }
  const products = await searchBook(productName);
  return res.json(products);
});

// Function to fetch Reddit reviews
async function scrapeReddit(bookTitle) {
  const query = encodeURIComponent(`${bookTitle} book review`);
  const url = `https://www.reddit.com/search.json?q=${query}&type=link&sort=hot`;

  const reviews = [];

  try {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });

    const posts = data.data.children;

    posts.forEach(post => {
      const postData = post.data;
      reviews.push({
        source: 'Reddit',
        title: postData.title,
        snippet: postData.selftext?.slice(0, 300) || 'No content available.',
        url: `https://www.reddit.com${postData.permalink}`
      });
    });

    return reviews;

  } catch (err) {
    console.error('Reddit JSON API error:', err.message);
    return [{ source: 'Reddit', error: err.message }];
  }
}

// Route: Get Reddit + Google Blog reviews
router.post('/review', async (req, res) => {
  const { bookTitle } = req.body;

  if (!bookTitle) {
    return res.status(400).json({ error: 'bookTitle is required' });
  }

  const redditReviews = await scrapeReddit(bookTitle);

  res.json({ book: bookTitle, reviews: redditReviews });
});

module.exports = router;