# 📚 Review Hub – Your Bookish BFF for Real-Time Reviews

**Review Hub** is your trusty book scout that digs through the depths of Google Books, Reddit, Goodreads, and more — so you don’t have to. Whether you're a bibliophile, casual reader, or just trying to fake being well-read on a first date, Review Hub has you covered.

🚀 **Live (and hopefully awake):** [https://reviewhub-v62d.onrender.com/](https://reviewhub-v62d.onrender.com/)

---

## 🔍 What It Does

- 🔎 Search any book by title or author
- 💬 See reviews from multiple platforms — aggregated like a buffet of opinions
- ✍️ Allows users who purchased books offline to submit their own reviews directly
- 📄 View metadata like author, publisher, ratings, etc.
- ⚡ Blazing-fast API responses (<1000ms, unless your WiFi is feeling shy)
- 🔄 Fallback logic for API failures — because some APIs just ghost us
- 🧠 Fuzzy search support — typo-friendly!
- 📊 Efficiently handles 1,200+ daily API calls like a caffeinated librarian

---

## 🛠 Built With

🖥 **Frontend:** React.js, Tailwind CSS  
⚙️ **Backend:** Node.js, Express.js  
💾 **Database:** MongoDB  
🔌 **APIs:** Google Books, Open Library, Reddit, Goodreads (unofficial)  
🚀 **Hosting:** Render (yes, it may nap on cold start 😴)

---

## 🚦 How It Works

1. 🔍 You search for a book (spelling doesn’t have to be perfect — we’re chill).
2. 🚀 The backend fetches data and reviews from multiple sources.
3. 🧼 Results are cleaned, formatted, and served with love.
4. 📝 **Want to share your own review?** Go to the “Write a Review” page — perfect for those who read offline but want to contribute online.
5. 👀 Your submitted review will be visible to others when they search for the same book.
6. 💡 If any API throws a tantrum, fallback APIs keep things running.

---

## 💻 Local Setup

So you're brave enough to run this locally? Here’s your quest guide:

```bash
# 1. Clone the repo
git clone https://github.com/Abinash2004/ReviewHub.git
cd ReviewHub

# 2. Install frontend dependencies
npm install

# 3. Setup backend
cd backend
npm install

# 4. Go back and launch both frontend & backend together
cd ..
npm run both
