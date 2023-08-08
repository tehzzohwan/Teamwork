import React, { useState, useEffect } from "react";
import{ Link } from "react-router-dom";
import AuthService from "../../services/auth.service";

const Home =  () => {
  const [feedz, setFeedz] = useState([]);

  useEffect(() => {
    getFeed();
  }, []);

  const getFeed = async () => {
    const feed =  await AuthService.getFeed();
    if (feed.status === "success") {
      setFeedz(feed.data)
    } else {

    }
  };

  return (
    <div className="container p-5">
      <h3>Your feed</h3>
      <div className="col-md-6">
      {feedz.map(obj => (
         ('image' in obj) ? 
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative" key={`image_${obj.id}`}>
              <div className="col p-4 d-flex flex-column position-static">
                <h3 className="mb-0"> {obj.title}</h3>
                <div className="mb-1 text-body-secondary">
                   <img src={obj.image} className="card-img-top rounded" style={{width: "200px", height: "150px"}} alt='...'/> 
                  <p className="card-text mb-auto">{obj.created_on.substring(0, 10)}</p>
                </div>
                <div className="card-body">
                  <Link to= {`/gif/${obj.id}`} className="card-link">
                    View
                  </Link>
                </div>
              </div>
            </div>
        :
          <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative" key={`article_${obj.id}`}>
            <div className="col p-4 d-flex flex-column position-static">
              <strong className="d-inline-block mb-2 text-primary-emphasis">{obj.category}</strong>
              <h3 className="mb-0"> {obj.title}</h3>
              <div className="mb-1 text-body-secondary">
                <p className="card-text mb-auto">{obj.article.substring(0,25)}...</p>
                <p className="card-text mb-auto">{obj.created_on.substring(0, 10)}</p>
                <Link to= {`/feed/${obj.id}`} className="icon-link gap-1 icon-link-hover stretched-link" >
                  Continue reading
                </Link>
              </div>
            </div>
          </div>
      ))}   
    </div>
    {/* // show error */}
  </div>
  );
};

export default Home;
