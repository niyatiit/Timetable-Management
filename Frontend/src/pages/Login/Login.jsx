/* eslint-disable no-unused-vars */
import './LoginStyle.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const Login = () => {

  const { register, handleSubmit } = useForm();

  const toggleActive = (e) => {
    let btn = e.target;
    if (!btn.classList.contains("active")) {
      btn.classList.add("active");
      const button2 = btn.id == "butt1" ? document.getElementById("butt2") : document.getElementById("butt1");

      button2.classList.remove("active");
    }
  }

  const loginUser = (data) => {
    console.log(data);
    const admin = document.getElementById("butt2").classList.contains("active") ? 1 : 0;

    axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/login`, {...data, admin }, { withCredentials: true })
      .then((response) => {
        console.log("Login successful: ", response.data);
        localStorage.setItem("user", JSON.stringify(response.data.data));
      })
      .catch((error) => {
        console.error("Login failed: ", error.response ? error.response.data : error.message);
      });
  }

  return (
    <div className="main">
      <div className="container"> 
        <h2 className='heading'>
          Login
        </h2>
        <div className="buttons">
          <button id='butt1' className='butt1 active' onClick={toggleActive}>Trainer</button>
          <button id="butt2" className='butt2' onClick={toggleActive}>Admin</button>
        </div>
        <form className='loginForm' onSubmit={handleSubmit(loginUser)}>
          <div className='inp'>
            <label htmlFor="email">Email</label>
            <input {...register("email", { required: true })} type="text" />
          </div>
          <div className='inp'>
            <label htmlFor="password">Password</label>
            <input {...register("password", { required: true })} type="password" />
          </div>
          <button type="submit" className='submit'>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;