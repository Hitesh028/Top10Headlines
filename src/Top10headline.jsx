import React, { useState, useEffect } from 'react';

const API_KEY = 'YOUR_API_KEY'; // Replace 'YOUR_API_KEY' with your actual API key

const top10headlines = () => {
  const [category, setCategory] = useState('general');
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://gnews.io/api/v4/top-headlines?category=${category}&apikey=${API_KEY}&max=10&lang=en`);
        const data = await response.json();
        setNews(data.articles);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setLoading(false);
      }
    };

    fetchNews();
  }, [category]);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  return (
    <div>
      <h1 className="heading">Top 10 {category} news</h1>
      <p className="loader">{loading && 'Loading...'}</p>
      <ul>
        {news.map((article, index) => (
          <li key={index}>
            <img src={article.image} alt={article.title} />
            <div>
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <p>{article.source.name}</p>
            </div>
          </li>
        ))}
      </ul>
      <select value={category} onChange={(e) => handleCategoryChange(e.target.value)}>
        <option value="general">General</option>
        <option value="business">Business</option>
        <option value="entertainment">Entertainment</option>
        <option value="health">Health</option>
        <option value="science">Science</option>
        <option value="sports">Sports</option>
        <option value="technology">Technology</option>
      </select>
    </div>
  );
};

export default top10headlines;
