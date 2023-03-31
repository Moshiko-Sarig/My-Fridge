import UserModel from "../../../Models/UserModel";


export const userLogin = (userInfo: UserModel) => {
    return {type: "LOGIN", userInfo}
};

export const userSignOut = () => {
    return {type: "SIGN_OUT"}
}

