import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";

import AuthService from "../services/auth.service";


export default function Article() {
    const params = useParams();

    const [articleById, setArticleById] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    
    useEffect(() => {
        const fetchArticle = async () => {
            const id = parseInt(params.id, 10); 
            const article =  await AuthService.getArticleById(id);
            if (article.status === "success") {
                setArticleById(article)
            } else {
                setSuccessful(false);
                setMessage(article.error)
            }
        }
        fetchArticle();
    }, [params]);
    
    return (
        <article className="blog-post" >
          {Object.values(articleById).map(obj => (
        <div key={`article_${obj.id}`}>
        <strong className="d-inline-block mb-2 text-primary-emphasis">{obj.category}</strong>
        <h2 className="display-5 link-body-emphasis mb-1">{obj.title}</h2>
        <p className="blog-post-meta">{obj.created_on?.substring(0, 10)}</p>
        <p style={{ wordWrap: "break-word" }}>{obj.article}</p><hr />
        </div>
        ))}

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
      </article>
    )
};


