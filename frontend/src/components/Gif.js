import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";

import AuthService from "../services/auth.service";


export default function Gif() {
    const params = useParams();

    const [gifById, setGifById] = useState({});
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
            <gif className="blog-post">
                {Object.values(gifById).map(obj => (
                    (`image_${obj.id}` ) ? 
                        <div key={`image_${obj.id}`}>
                            <img src={obj.image} className=" d-flex card-img-top rounded justify-content-center" style={{width: "50%", height: "50%"}} alt='...'/> 
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

