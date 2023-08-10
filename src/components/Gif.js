import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";

import AuthService from "../services/auth.service";


export default function Gif() {
    const params = useParams();

    const [gifById, setGifById] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    
    useEffect(() => {
        const fetchGif = async () => {
            const id = parseInt(params.id, 10); 
            const gif =  await AuthService.getGifById(id);
            if (gif.status === "success") {
                setGifById(gif)
            } else {
                setSuccessful(false);
                setMessage(gif.error)
            }
        }
        fetchGif();
    }, [params]);
    
    return (
        <div>
            <gif className="blog-post d-flex aligns-items-center">
                {Object.values(gifById).map(obj => (
                    obj.image ? 
                        <div key={`image_${obj.id}`}>
                            <img src={obj.image} className=" d-flex card-img-top rounded justify-content-center" style={{width: "50%", height: "50%"}} alt='...'/>
                            <strong className="d-inline-block mb-2 text-primary-emphasis">{obj.title}</strong>
                            <p className="blog-post-meta">{obj.created_on?.substring(0, 10)}</p>
                        </div>
                    :
                    <></>
                ))}   
            </gif>

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
        </div>
        
    )
};

