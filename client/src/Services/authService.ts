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
    dispatch: Dispatch<AnyAction>
) {
    try {
        const response = await axios.post(api_endpoints.LOGIN, { email, password });
        const decodedTokenData = jwt_decode(response.data.token) as DecodedToken;
        const userData = decodedTokenData.user;

        dispatch(userLogin(userData));
        setTimeout(() => {
            dispatch(userSignOut());
        }, 30 * 60 * 1000);
        return userData;
    } catch (error) {
        console.log(error);
        toast.error("Something happened, please try again");
    }
}

export async function checkToken(token: string, dispatch: Dispatch<AnyAction>) {
    try {
        const decodedTokenData = jwt_decode(token) as DecodedToken;
        const userData = decodedTokenData.user;
        const currentTime = new Date().getTime();
        const tokenExpiration = decodedTokenData.exp * 1000;

        if (currentTime < tokenExpiration) {
            dispatch(userLogin(userData));
            setTimeout(() => {
                dispatch(userSignOut());
            }, tokenExpiration - currentTime);
            return true;
        } else {
            dispatch(userSignOut());
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const sendPasswordResetEmail = async (email: string) => {
    try {
        const response = await axios.post('http://localhost:4000/api/v1/send-reset-password-email', { email });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data;
        } else {
            console.log(error);
            throw error;
        }
    }
};

