const express = require('express');
const router = express.Router();
const axios = require('axios');

// Function: Search books from OpenLibrary
async function searchBook(bookName) {
  try {
    const { data } = await axios.get(`https://openlibrary.org/search.json?q=${bookName}`);
    return data.docs.slice(0, 10).map(book => ({
      title: book.title,
      author: book.author_name?.[0] || 'Unknown',
      cover: book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : 'https://media.istockphoto.com/id/508545844/photo/question-mark-from-books-searching-information-or-faq-edication.jpg?s=612x612&w=0&k=20&c=-RTL7PuuaYZWifHcE4lvNFjqPY_J9VpqMNegcc3sdgA='
    }));
  } catch (error) {
    console.error('OpenLibrary error:', error.message);
    return [];
  }
}

// Route: Book Search
router.post('/book', async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Book name is required.' });

  const books = await searchBook(name);
  res.json(books);
});

// Function: Fetch Google Books review-like data
async function fetchGoogleBooksReviews(bookTitle) {
  try {
    const { data } = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(bookTitle)}`,
      { timeout: 10000 }
    );

    return (data.items || []).slice(0, 10).map(item => ({
      title: item.volumeInfo.title || bookTitle,
      body: item.volumeInfo.description || 'No description available',
      url: item.volumeInfo.infoLink || ''
    }));
  } catch (error) {
    console.error('Google Books API error:', error.message);
    throw new Error('Failed to fetch Google Books reviews');
  }
}

// Route: Get Book Reviews
router.post('/review', async (req, res) => {
  const { bookTitle } = req.body;
  if (!bookTitle) return res.status(400).json({ error: 'bookTitle is required.' });

  try {
    const reviews = await fetchGoogleBooksReviews(bookTitle);
    res.json({
      book: bookTitle,
      reviews,
      message: reviews.length === 0 ? 'No reviews found on Google Books' : undefined
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;