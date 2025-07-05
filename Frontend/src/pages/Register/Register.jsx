import { useForm } from "react-hook-form";
import axios from "axios";
import styles from './RegisterStyle.module.css';

const Register = () => {

  const { register, handleSubmit } = useForm();

  const registerUser = (data) => {
    console.log(data);
    if (data.password !== data.conformPass) {
      alert("Passwords do not match");
      return;
    }

    axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/register`, data, { withCredentials: true })
      .then((response) => {
        console.log("Registration successful: ", response.data);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      })
      .catch((error) => {
        console.error("Registration failed: ", error.response ? error.response.data : error.message);
      });
  }

  return (
  
 <div className={`${styles.main} ${styles.registerCard}`}>
  <div className={styles.container}>
    <h2 className={styles.heading}>Registration</h2>
    <form className={styles.registerForm} onSubmit={handleSubmit(registerUser)}>
      <div className={styles.inp}>
        <label htmlFor="name">Name</label>
        <input {...register("name", { required: true })} type="text" />
      </div>
      <div className={styles.inp}>
        <label htmlFor="email">Email</label>
        <input {...register("email", { required: true })} type="text" />
      </div>
      <div className={styles.inp}>
        <label htmlFor="password">Password</label>
        <input {...register("password", { required: true })} type="password" />
      </div>
      <div className={styles.inp}>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input {...register("conformPass", { required: true })} type="password" />
      </div>
      <div className={styles.inp}>
        <label htmlFor="number">Number</label>
        <input {...register("number", { required: true })} type="text" />
      </div>
      <button type="submit" className={styles.submit}>Submit</button>
    </form>
  </div>
</div>
);
}

export default Register;