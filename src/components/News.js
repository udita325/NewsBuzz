import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const updateNews = async () => {
    props.setProgress(0);

    // Ensure 'page' is used correctly in the dependency array or in updateNews
    // A better approach is to use the state variable 'page' directly from the component scope
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=277f86f26bd14ebd88e37d259402d801&page=${page}&pageSize=${props.pageSize}`;

    setLoading(true);
    const data = await fetch(url);
    const parsedData = await data.json();

    // Check if the API returned articles and if the response was successful
    if (parsedData.status === 'ok' && parsedData.articles) {
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
    } else {
        // Handle API error case: keep articles as empty array
        console.error("API response error:", parsedData.message);
        setArticles([]);
    }
    
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    updateNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, props.category, props.country, props.pageSize]); // Added other props as dependencies

  const handlePrevClick = () => {
    setPage(page - 1);
  };

  const handleNextClick = () => {
    if (page + 1 <= Math.ceil(totalResults / props.pageSize)) {
      setPage(page + 1);
    }
  };

  return (
    <div className="container my-3">
      <h2 style={{margin: '35px 0px',marginTop:'90px'}}>NewsBuzz - Top {props.category.toUpperCase()} Headlines</h2>
        
        {/* You may want to show a loading spinner here */}
        {loading && <p>Loading...</p>}

      <div className="row">
        {/* 👇 THE FIX IS HERE: Only call .map() if articles is truthy (not null/undefined) */}
        { articles && articles.map((element) => (
            <div className="col-md-4" key={element.url}>
              <NewsItem
                title={element.title ? element.title.slice(0, 35) : 'No Title'}
                description={
                  element.description ? element.description.slice(0, 60) : 'No Description'
                }
                imageUrl={
                  element.urlToImage
                    ? element.urlToImage
                    : 'https://via.placeholder.com/300x200?text=No+Image'
                }
                newsUrl={element.url}
                author={element.author}
                date={element.publishedAt}
                source={element.source.name}
              />
            </div>
          ))}
      </div>

      <div className="container d-flex justify-content-between my-3">
        <button
          disabled={loading || page <= 1} // Disable while loading
          type="button"
          className="btn btn-dark"
          onClick={handlePrevClick}
        >
          &larr; Previous
        </button>

        <button
          disabled={loading || page + 1 > Math.ceil(totalResults / props.pageSize)} // Disable while loading
          type="button"
          className="btn btn-dark"
          onClick={handleNextClick}
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
};

export default News;