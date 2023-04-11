import axios from 'axios';
import api_endpoints from '../Utils/api.endpoints';
import { useDispatch } from 'react-redux';
import { userLogin, userSignOut } from '../Components/Redux/Actions';
import jwt_decode from 'jwt-decode';
import UserModel from '../Models/UserModel';
import { toast } from 'react-hot-toast';
import { Dispatch } from 'react';
import { AnyAction } from 'redux';

interface DecodedToken {
    exp: number;
    iat: number;
    user: UserModel;
}

export async function logUserIn(
    email: string,
    password: string,
    setAuthToken: Function,
    dispatch: Dispatch<AnyAction>
) {
    try {
        const response = await axios.post(api_endpoints.LOGIN, { email, password });
        const token = response.data.token;
        setAuthToken(token, 30);
        const decodedTokenData = jwt_decode(token) as DecodedToken;
        const userData = decodedTokenData.user;
        dispatch(userLogin(userData));
        setTimeout(() => {
            dispatch(userSignOut());
        }, 30 * 60 * 1000);
        return {
            token,
            first_name: userData.first_name,
            last_name: userData.last_name,
        };
    } catch (error) {
        console.log(error);
        toast.error("Something happened, please try again");
    }
}
