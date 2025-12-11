import React from 'react'

const NewsItem = (props) => {
  
   let {title, description,imageUrl,newsUrl,author,date,source} = props;
    return (
      <div className="my-3">
        <div className="card h-100" style={{ width: "18rem", objectFit: "cover" }}>
     <img src={imageUrl ? imageUrl : "https://via.placeholder.com/200"} className="card-img-top" alt="News" onError={(e) => e.target.src = "https://via.placeholder.com/300x200?text=Image+Not+Available"}/>
     <div className="card-body">
     <h5 className="card-title">{title+"..."}<span class ="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{source}</span></h5>
     <p className="card-text">{description+"..."}</p>
     <p class="card-text"><small class="text-body-secondary">By {author} on {new Date(date).toGMTString()}</small></p>
     <a href={newsUrl} className="btn btn-sm btn-primary">Read More</a>
  </div>
</div>
      </div>
    )
  }


export default NewsItem
