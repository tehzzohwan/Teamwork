import React, { useState, useEffect } from 'react'
import{ Link } from "react-router-dom";
import Form from "react-validation/build/form";
import { Tab, Nav } from 'react-bootstrap';
import { useParams } from "react-router-dom";

import AuthService from "../../services/auth.service";

const User = () => {
  const params = useParams();


  const [inputs, setInputs] = useState({});
  const [inputsII, setInputsII] = useState({});
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [articles, setArticles]  = useState([]);
  const [gifs, setGifs] = useState([]);
  const [selectedFile, setSelectedFile] = useState({});
  const [fileType, setFileType] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        _handleReaderLoaded(e);
      }
      reader.readAsBinaryString(file);
      setFileType(file.type);
    }
  };

  const _handleReaderLoaded = (e) => {
    let binaryString = e.target.result;
    setSelectedFile(btoa(binaryString));
    
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleChangeII = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputsII(values => ({...values, [name]: value}))
  }

  const handleArticlePost = async (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    const response = await AuthService.postArticle(inputs)
        if (response.status === "success") {
         setMessage(response.data.message);
         setSuccessful(true);
         setInputs({});

         window.location.reload();

        } else {
            setMessage(response.data.error);
        }
  };

  const delArticlePost = async (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    const id = parseInt(params.id, 10);
    const response = await AuthService.deleteArticleById(id)
        if (response.status === "success") {
         setMessage(response.data.message);
         setSuccessful(true);
         setInputs({});

         window.location.reload();

        } else {
            setMessage(response.data.error);
        }
  };

  const handleGifPost = async (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    inputsII.image = `data:${fileType};base64,${selectedFile}`;

    const response = await AuthService.postGif(inputsII)
        if (response.status === "success") {
         setMessage(response.data.message);
         setSuccessful(true);
         setInputsII({});

         window.location.reload();

        } else {
          // setMessage(response.error.message);
        }
  };

  useEffect(() => {
    getAllGifs();
    getArticles();
  }, []);

 

  const getArticles = async () => {
    const articlez =  await AuthService.getAllArticlesById();
    if (articlez.status === "success") {
      setArticles(articlez.data)
    } else {
      setMessage(articlez.error.message)
    }
  };

  const getAllGifs = async () => {
    const gifz =  await AuthService.getAllGifsById();
    if (gifz.status === "success") {
      setGifs(gifz.data)
    } else {
      setMessage(gifz.error.message)
    }
  };

  return (
    <div className="container mt-4">
      <Tab.Container id="myTab" defaultActiveKey="articles">
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link eventKey="articles">Articles</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="gifs">Gifs</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey="articles">
          <div className="card shadow-2-strong card-registration p-4 p-md-5 d-flex mr-auto rounded" style={{width: "50rem"}}>
          <h1>Post an article.</h1>
          <div className="card-body">
            <Form onSubmit={handleArticlePost} className="needs-validaton" noValidate>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Title</span>
                <input 
                  type="text" 
                  id="title"
                  name="title"
                  value={inputs.title}
                  className="form-control" 
                  onChange={handleChange}
                  placeholder="Your article title here" 
                  aria-label="title" 
                  aria-describedby="basic-addon1"
                  required />
              </div>

              <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="category">Category</label>
                <select className="form-select" name="category" value={inputs.category} onChange={handleChange} id="category" required>
                  <option defaultValue>Choose...</option>
                  <option value="Tech">Tech</option>
                  <option value="News">News</option>
                  <option value="Sport">Sport</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Entertainment">Entertainment</option>
                </select>
              </div>

              <div className="input-group mb-3 form-check">
                <span className="input-group-text">Article</span>
                <textarea
                  className="form-control form-check-textarea" 
                  id="article"
                  name="article"
                  value={inputs.article} 
                  onChange={handleChange}
                  aria-label="With textarea"
                  placeholder="Write here..."
                  required
                ></textarea>
              </div>

              <div className="invalid-feedback">
                Article can't be empty!
              </div> 

              <button className="btn btn-primary" type="submit">Post</button>

              {message && (
                <div className="form-group">
                  <div 
                    className={
                      successful ? "alert alert-success" : "alert alert-danger"
                    }
                  >
                    {message}
                  </div>
                </div>
              )}
            </Form>
          </div>
        </div><hr />
        {articles.map(obj => (
          <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative col-md-8" key={`article_${obj.id}`}>
              <div className="col p-4 d-flex flex-column position-static">
                <strong className="d-inline-block mb-2 text-primary-emphasis">{obj.category}</strong>
                <h3 className="mb-0"> {obj.title}</h3>
                <div className="mb-1 text-body-secondary">
                  <p className="card-text mb-auto">{obj.article.substring(0, 50)}...</p>
                  <p className="card-text mb-auto">{obj.created_on.substring(0, 10)}</p>
                  <Link to= {`/feed/${obj.id}`} className="gap-1 icon-link-hover mb-5" >
                    Continue reading
                  </Link>
                  <span className="d-flex gap-3 ml-auto">
                    <Link to={`/del/${obj.id}`}>
                      <div  className="btn btn-outline-danger ml-auto">Delete</div>
                    </Link>
                    <button type="button" className="btn btn-outline-warning">Edit</button>
                  </span>
                </div>
              </div>
            </div>
        ))}   
          </Tab.Pane>

          <Tab.Pane eventKey="gifs">
          <div className="card shadow-2-strong card-registration p-4 p-md-5 d-flex mr-auto rounded" style={{width: "50rem"}}>
          <h1>Post a gif.</h1>
          <div className="card-body">
            <Form onSubmit={handleGifPost} className="needs-validaton" noValidate>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Title</span>
                <input 
                  type="text" 
                  id="title"
                  name="title"
                  value={inputsII.title}
                  className="form-control" 
                  onChange={handleChangeII}
                  placeholder="Your gif title here" 
                  aria-label="title" 
                  aria-describedby="basic-addon1"
                  required />
              </div>

              <div className="mb-3">
                <input 
                  className="form-control form-control" 
                  name="image"
                  value={selectedFile.name}
                  onChange={handleFileChange}
                  id="formFile" 
                  accept=".jpg, .jpeg, .png"
                  type="file" 
                  required />
                  
              </div>

              <button className="btn btn-primary" type="submit">Post</button>

                {message && (
                  <div className="form-group">
                    <div 
                      className={
                        successful ? "alert alert-success" : "alert alert-danger"
                      }
                    >
                      {message}
                    </div>
                  </div>
                )}
            </Form>
          </div>
        </div><hr />
        {gifs.map(obj => (
          <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative col-md-4" key={`image_${obj.id}`}>
              <div className="col p-4 d-flex flex-column position-static">
                <h3 className="mb-0"> {obj.title}</h3>
                <div className="mb-1 text-body-secondary">
                   <img src={obj.image} className="card-img-top rounded" style={{ maxWidth: '150px', maxHeight: '150px' }}alt='...'/> 
                  <p className="card-text mb-auto">{obj.created_on.substring(0, 10)}</p>
                </div>
                <div className="card-body">
                  <Link to={`/gif/${obj.id}`} className="card-link">
                    View
                  </Link>
                  <span className="d-flex gap-3 ml-auto">
                    <button type="button" className="btn btn-outline-danger ml-auto">Delete</button>
                    <button type="button" className="btn btn-outline-warning">Edit</button>
                  </span>
                </div>
                
              </div>
            </div>
        ))}
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  )
}

export default User