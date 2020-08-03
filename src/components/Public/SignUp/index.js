import React, {useState} from "react";
import {Link, useHistory} from 'react-router-dom';

const SignUp = (props) => {
	const history = useHistory();
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [age, setAge] = useState("");
    const [telephones, setTelephone] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
	
	
	
    const handleClick = () => {
        if(password === passwordConfirmation){
			
			const telephone = telephones.split(',');
			
			var error = false;
			
			if(name == ''){
				error = true;
			}else if(username == ''){
				error = true;
			}else if(password == ''){
				error = true;
			}else if(email == ''){
				error = true;
			}else if(birthdate == ''){
				error = true;
			}else if(age == ''){
				error = true;
			}else if(telephone == ''){
				error = true;
			}
			
			if(error){
				alert('Digite todos los campos');
				return false;
			}
			

            const user = {
                name,
                username,
                password,
				email,
				birthdate,
				age,
				telephone
            };
			
			
			const api = process.env.REACT_APP_API_URL;
			const url = `${api}/users`;
			fetch(url, {
				method: "POST",
				headers:{
					"content-Type": "application/json"
				},
				body: JSON.stringify(user)
			})
			.then(res=>res.json())
			.then(json=>{
				console.log(json);
				const user = {
					id: json.id,
					name: json.name,
					username: json.username
				};
				localStorage.setItem("user", JSON.stringify(user));
				localStorage.setItem('token', json.token);
				props.setIsAuth(true);
				history.push("/");
			})
			
			
        }else{
			alert('Password no coincide');
		}
    };

    return (
        <div>
        <h1>Sign Up</h1>
            <form>
                <p> 
                    <label>Name</label><br />
                    <input 
                        type="text" 
                        name="name"
                        value={name}
                        onChange={event=>{setName(event.target.value)}}
                         />
                </p>
                <p> 
                    <label>Username</label><br />
                    <input 
                        type="text" 
                        name="username"
                        value={username}
                        onChange={event=>{setUsername(event.target.value)}}
                         />
                </p>
				<p> 
                    <label>Email</label><br />
                    <input 
                        type="text" 
                        name="email"
                        value={email}
                        onChange={event=>{setEmail(event.target.value)}}
                         />
                </p>
				<p> 
                    <label>Birthdate</label><br />
                    <input 
						placeholder="AAAA-MM-DD"
                        type="text" 
                        name="birthdate"
                        value={birthdate}
                        onChange={event=>{setBirthdate(event.target.value)}}
                         />
                </p>
				<p> 
                    <label>Telephone</label><br />
                    <input 
						placeholder="3013032553,30154425"
                        type="text" 
                        name="telephones"
                        value={telephones}
                        onChange={event=>{setTelephone(event.target.value)}}
                         />
                </p>
				<p> 
                    <label>Age</label><br />
                    <input 
                        type="number" 
                        name="age"
                        value={age}
                        onChange={event=>{setAge(event.target.value)}}
                         />
                </p>
                <p> 
                    <label>Password</label><br />
                    <input 
                        type="password" 
                        name="password"
                        value={password}
                        onChange={event=>{setPassword(event.target.value)}}
                        />
                </p>
                <p> 
                    <label>Password Confirmation</label><br />
                    <input 
                        type="password" 
                        name="passwordConfirmation"
                        value={passwordConfirmation}
                        onChange={event=>{setPasswordConfirmation(event.target.value)}}
                        />
                </p>
                <p><button
                    onClick={()=>{ handleClick() }} 
                    type="button"
                    >SignUp</button></p>


                <p><Link to="/">Home</Link> or <Link to="/login">Sign In</Link></p>
            </form>
        </div>
    )
};

export default SignUp;