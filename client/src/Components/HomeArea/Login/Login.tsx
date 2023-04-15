import { useCookie } from '../../../hooks/useCookie';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import { logUserIn } from '../../../Services/authService';
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
                <div>
                    <input
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder='E-mail'
                    />
                </div>
                <div>
                    <input
                        type='text'
                        name='password'
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder='Password'
                    />
                </div>
                <div>
                    <input type='submit' value='Log in' />
                </div>
                <div>
                    <span>Don't have an account yet?</span> &nbsp;
                    <NavLink to='/create-account'>
                        <u className='semiLink'>Create an account</u>
                    </NavLink>
                </div>
            </form>
        </div>
    );
};

export default Login;
