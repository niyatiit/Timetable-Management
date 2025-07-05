/* eslint-disable no-unused-vars */
import './LoginStyle.css';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api.js';

const Login = () => {

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const toggleActive = (e) => {
    let btn = e.target;
    if (!btn.classList.contains("active")) {
      btn.classList.add("active");
      const button2 = btn.id == "butt1" ? document.getElementById("butt2") : document.getElementById("butt1");

      button2.classList.remove("active");
    }
  }

  const loginUser = async (data) => {
    const admin = document.getElementById("butt2").classList.contains("active") ? 1 : 0;

    const res = await login({ ...data, admin });
    if (res) {
      navigate("/");
    }
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