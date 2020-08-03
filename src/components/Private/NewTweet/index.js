import React, {useState} from "react";

const NewTweet = (props) => {
    const [content, setContent] = useState("");

    const handleClick = () => {
        if(content){
            const token = localStorage.getItem("token");
            const tweet = {
                content
            };
            const api = process.env.REACT_APP_API_URL;
            const url = `${api}/tweets`;
            fetch(url, {
                method: "POST",
                headers:{
                    "x-access-token":token,
                    "content-Type":"application/json"
                },
                body: JSON.stringify(tweet)
            })
            .then(res=>res.json())
            .then(json=>{
                const user = JSON.parse(localStorage.getItem("user"));
				
                const jsonTWeet = {
                    content: json.content,
                    user: {
                        username: user.username,
						_id:user.id
                    },
                    createdAt: json.createdAt,
                    comments: json.comments,
                    _id: json._id
                }
                props.addTweet(
                    jsonTWeet
                );
                setContent("");
            })
            .catch(err=>console.log(err));
        } 

    };

    return (
        <div>
            <form>
                <p> 
                    <textarea  
                        name="content"
                        placeholder="¿En qué estás pensando?"
                        value={content}
                        onChange={event=>{setContent(event.target.value)}}
                    ></textarea>
                </p>
                <p><button
                    onClick={()=>{ handleClick() }} 
                    type="button"
                    >Send</button></p>
            </form>
        </div>
    )
};

export default NewTweet;