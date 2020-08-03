import React, { useState, useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';
import Tweet from './../Tweet';

const Profile = (props) => {
    const params = useParams();
	const [tweets, setTweets] = useState([]);
	
	const getTweets = () => {
        const token = localStorage.getItem('token');
        const api = process.env.REACT_APP_API_URL;
        const url = `${api}/tweets/tweetsUser`;
		
        fetch(url, {
            method: 'POST',
            headers: {
                "x-access-token":token,
				'Content-Type': 'application/json'
            },
			body: JSON.stringify({id: params.id})
        })
        .then(res=>res.json())
        .then(json=>{
            setTweets(json);
        });
		
    }
	
	useEffect(()=>{
        getTweets();
    },[]); 
	
    return (
        <>
            <h2>Tweets @{params.username}</h2>
			
			{
                tweets ? 
                    tweets.map(tweet=>
                        <Tweet key={tweet._id} tweet={tweet} />
                    )
                : 
                    <p>No hay elementos</p>
            }
			
            <p><Link to="/">Return to home</Link></p>
        </>
    );
}

export default Profile;