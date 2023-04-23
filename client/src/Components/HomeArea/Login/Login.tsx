import { useCookie } from '../../../hooks/useCookie';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import { logUserIn, sendPasswordResetEmail } from '../../../Services/authService';
import './Login.css';



const Login = () => {
    const dispatch = useDispatch();
    const [authToken, setAuthToken] = useCookie('authToken');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handlePasswordReset = async () => {
        if (!formData.email) {
            toast.error('Please enter your email address to reset your password.');
            return;
        }

        try {
            await sendPasswordResetEmail(formData.email);
            toast.success('Password reset email sent. Please check your inbox.');
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        }
    };

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            const { token, first_name, last_name } = await logUserIn(formData.email, formData.password, setAuthToken, dispatch);
            toast.success(`Welcome back, ${first_name} ${last_name}!`);
        } catch (error) {
            toast.error("An error occurred. Please check your email and password.");
        }
    }

    return (
        <div className='Login'>
            <Toaster position='top-center' reverseOrder={true} />
            <form onSubmit={handleSubmit}>
                <div className='gridRow'>
                    <div className="form__group field">
                        <input type="email" className="form__field" placeholder="E-mail" name="email" id="email"
                            value={formData.email} onChange={handleInputChange} required />
                        <label htmlFor="email" className="form__label">E-mail</label>
                    </div>
                </div>
                <div className='gridRow'>
                    <div className="form__group field">
                        <input type="password" className="form__field" placeholder="Password" name="password" id="password"
                            value={formData.password} onChange={handleInputChange} required />
                        <label htmlFor="password" className="form__label">Password</label>
                    </div>
                </div>
                <div className='gridRow'>
                    <input type='submit' value='Log in' />
                </div>
                <div className='gridRow'>
                    <span>Don't have an account yet?</span> &nbsp;
                    <NavLink to='/create-account'>
                        <u className='semiLink'>Create an account</u>
                    </NavLink>
                    <br />
                    <NavLink to='/email-validation-password' className="forgot-password">
                        Forgot password?
                    </NavLink>
                </div>
            </form>
        </div>
    );
};

export default Login;

// import React from 'react';
// import './Login.css'; // Replace with the actual CSS file you want to use

// const Login: React.FC = () => {
//   return (
//     <div className="container">
//       <div className="screen">
//         <div className="screen__content">
//           <form className="login">
//             <div className="login__field">
//               <i className="login__icon fas fa-user"></i>
//               <input type="text" className="login__input" placeholder="User name / Email" />
//             </div>
//             <div className="login__field">
//               <i className="login__icon fas fa-lock"></i>
//               <input type="password" className="login__input" placeholder="Password" />
//             </div>
//             <button className="button login__submit">
//               <span className="button__text">Log In Now</span>
//               <i className="button__icon fas fa-chevron-right"></i>
//             </button>
//           </form>
//           <div className="social-login">
//             <h3>log in via</h3>
//             <div className="social-icons">
//               <a href="#" className="social-login__icon fab fa-instagram"></a>
//               <a href="#" className="social-login__icon fab fa-facebook"></a>
//               <a href="#" className="social-login__icon fab fa-twitter"></a>
//             </div>
//           </div>
//         </div>
//         <div className="screen__background">
//           <span className="screen__background__shape screen__background__shape4"></span>
//           <span className="screen__background__shape screen__background__shape3"></span>
//           <span className="screen__background__shape screen__background__shape2"></span>
//           <span className="screen__background__shape screen__background__shape1"></span>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;
