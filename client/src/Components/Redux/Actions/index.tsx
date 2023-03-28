import UserModel from "../../../Models/UserModel";



export const userLogin = (userInfo: UserModel) => {
    return {type: "LOGIN", userInfo}
};

export const userSignOut = () => {
    return {type: "SIGN_OUT"}
}

export const getToken = () => {
    return {type: "GET_TOKEN"}
}

export const setToken = (token: string) => {
    return {type: "SET_TOKEN", token}
}