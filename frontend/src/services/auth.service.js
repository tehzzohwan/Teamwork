const API_URL = "http://localhost:4000/api/v1/";

const register = async (inputs) => {

  try {
    const token = getCurrentUser().token;
    const response = await fetch(API_URL + "users", {
      method: "POST",
      mode: "cors",
      headers: {
        "x-access-token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify( inputs ),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const login = async (email, password) => {

  try {
    const response = await fetch(API_URL + "auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

const getFeed = async () => {

  try {
    const token = getCurrentUser().token;
    const feed = await fetch(API_URL + "feed", {
      method: "GET",
      headers: {
        "x-access-token": token
      }
    });

    const data = await feed.json();
    return data;
  } catch (err) {
    return err;
  }
};

const postArticle = async (inputs) => {

  try {
    const token = getCurrentUser().token;
    const feed = await fetch(API_URL + "articles", {
      method: "POST",
      headers: {
        "x-access-token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(inputs)
    });

    const data = await feed.json();
    return data;
  } catch (err) {
    return err;
  }
};

const deleteArticleById = async (id) => {
  
  try {
    const token = getCurrentUser().token;
    const feed = await fetch(API_URL + `articles/${id}`, {
      method: "DELETE",
      headers: {
        "x-access-token": token,
      },
    });

    const data = await feed.json();
    return data;
  } catch (err) {
    return err;
  }
};

const postGif = async (inputs) => {

  try {
    const token = getCurrentUser().token;
    const feed = await fetch(API_URL + "gifs", {
      method: "POST",
      headers: {
        "x-access-token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(inputs)
    });

    const data = await feed.json();
    return data;
  } catch (err) {
    return err;
  }
};
 
const getArticleById = async (id) => {
  
  try {
    const token = getCurrentUser().token;
    const feed = await fetch(API_URL + `articles/${id}`, {
      method: "GET",
      headers: {
        "x-access-token": token
      }
    });

    const data = await feed.json();
    return data;
  } catch (err) {
    return err;
  }
};

const getGifById = async (id) => {
  
  try {
    const token = getCurrentUser().token;
    const feed = await fetch(API_URL + `gifs/${id}`, {
      method: "GET",
      headers: {
        "x-access-token": token
      }
    });

    const data = await feed.json();
    return data;
  } catch (err) {
    return err;
  }
};

const getAllGifs = async () => {
  
  try {
    const token = getCurrentUser().token;
    const feed = await fetch(API_URL + `gifs`, {
      method: "GET",
      headers: {
        "x-access-token": token
      }
    });

    const data = await feed.json();
    return data;
  } catch (err) {
    return err;
  }
};

const getAllGifsById = async () => {
  
  try {
    const token = getCurrentUser().token;
    const feed = await fetch(API_URL + `gifs/user`, {
      method: "GET",
      headers: {
        "x-access-token": token
      }
    });
    const data = await feed.json();
    return data;
  } catch (err) {
    return err;
  }
};

const getAllArticles = async () => {
  
  try {
    const token = getCurrentUser().token;
    const feed = await fetch(API_URL + `articles`, {
      method: "GET",
      headers: {
        "x-access-token": token
      }
    });

    const data = await feed.json();
    return data;
  } catch (err) {
    return err;
  }
};

const getAllArticlesById = async () => {
  
  try {
    const token = getCurrentUser().token;
    const feed = await fetch(API_URL + `articles/user`, {
      method: "GET",
      headers: {
        "x-access-token": token
      }
    });
    
    const data = await feed.json();
    return data;
  } catch (err) {
    return err;
  }
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  postArticle,
  postGif,
  getFeed,
  getArticleById,
  getGifById,
  deleteArticleById,
  getAllGifs,
  getAllArticles,
  getAllArticlesById,
  logout,
  getCurrentUser,
  getAllGifsById
};

export default AuthService;
