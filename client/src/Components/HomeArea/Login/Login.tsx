import { useCookie } from '../../../hooks/useCookie';
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { userLogin, userSignOut } from '../../Redux/Actions';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import UserModel from '../../../Models/UserModel';
import api_endpoints from '../../../Utils/api.endpoints';
import './Login.css'

interface DecodedToken {
    exp: number;
    iat: number;
    user: UserModel;
}

const Login = () => {
    const dispatch = useDispatch();
    const [authToken, setAuthToken,] = useCookie('authToken');
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    async function logUserIn() {
        event.preventDefault();
        const response = await axios.post(api_endpoints.LOGIN, formData);
        const token = response.data.token;
        setAuthToken(token, 30);
        const decodedTokenData = jwt_decode(token) as DecodedToken;
        const userData = decodedTokenData.user;
        dispatch(userLogin(userData));

        setTimeout(() => {
            dispatch(userSignOut());
        }, 30 * 60 * 1000);
    }



    return (
        <div className='Login'>
            <form onSubmit={logUserIn}>
                <div>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange}
                        placeholder="E-mail" />
                </div>
                <div>
                    <input type="text" name="password" value={formData.password} onChange={handleInputChange}
                        placeholder="Password" />
                </div>
                <div>
                    <input type="submit" value="Log in" />
                </div>
                <div>
                    <span>Dont have an account yet ?</span> &nbsp;
                    <NavLink to="/create-account"><u className='semiLink'>Create an account</u></NavLink>

                </div>
            </form>
        </div>
    )
}


export default Login;