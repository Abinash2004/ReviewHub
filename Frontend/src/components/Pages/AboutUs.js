import React from 'react';

const AboutUs = () => {
  return (
    <section className="bg-secondary-dark min-h-screen px-6 py-12 sm:px-12 md:px-20 text-slate-300">
      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-white">About Review Hub</h1>
          <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto">
            Your go-to platform for transparent and crowd-sourced book reviews from across the internet.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-primary-dark p-6 sm:p-10 rounded-2xl shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">📚 Our Mission</h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            In a world overflowing with opinions, ReadRadar is on a mission to cut through the noise. We aggregate book reviews from trusted sources like Reddit, Goodreads, and top blogs to give you an honest, crowd-sourced view of what people really think about a book — before you invest your time.
          </p>
        </div>

        {/* Why We Exist */}
        <div className="bg-primary-dark p-6 sm:p-10 rounded-2xl shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">💡 Why We Exist</h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            We noticed a problem — many review sites are biased, incomplete, or just too commercial. ReadRadar was created to bring together real voices, real thoughts, and real reviews from communities who read passionately and share honestly.
          </p>
        </div>

        {/* How It Works */}
        <div className="bg-primary-dark p-6 sm:p-10 rounded-2xl shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">⚙️ How It Works</h2>
          <ul className="list-disc ml-5 text-slate-400 text-base sm:text-lg space-y-2">
            <li>Search for any book using the title or ISBN.</li>
            <li>We fetch real-time reviews from platforms like Reddit, Goodreads, Quora, and more.</li>
            <li>Sentiment analysis summarizes the collective mood.</li>
            <li>You get an unbiased, comprehensive view — all in one place.</li>
          </ul>
        </div>

        {/* Our Vision */}
        <div className="bg-primary-dark p-6 sm:p-10 rounded-2xl shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">🚀 Our Vision</h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            We envision a world where choosing your next read is as smart and intuitive as possible — backed by the collective wisdom of the internet. With ReadRadar, your reading journey is more informed, more meaningful, and completely authentic.
          </p>
        </div>

        {/* Footer Message */}
        <div className="text-center mt-10 text-slate-500 text-sm sm:text-base">
          Made with 💙 by passionate bookworm & developer.
        </div>
      </div>
    </section>
  );
};

export default AboutUs;