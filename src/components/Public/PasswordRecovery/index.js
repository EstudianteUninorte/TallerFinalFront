import React, {useState} from "react";
import {Link} from 'react-router-dom';

const PasswordRecovery = () => {
    const [username, setUsername] = useState("");

    const handleClick = () => {
    };

    return (
        <div>
        <h1>Password Recovery</h1>
            <form>
                <p> 
                    <label>Username</label><br />
                    <input 
                        type="text" 
                        name="username"
                        value={username}
                        onChange={event=>{setUsername(event.target.value)}}
                         />
                </p>
                <p><button
                    onClick={()=>{ handleClick() }} 
                    type="button"
                    >Send</button></p>

                <p><Link to="/login">Sign In</Link></p>
       
            </form>
        </div>
    )
};

export default PasswordRecovery;