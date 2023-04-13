import UserModel from "../../../Models/UserModel";



export default function userLoginReducer(state = { isLogged: false, userInfo: {} }, action: { type: string, userInfo: UserModel }) {
    switch (action.type) {
        case "LOGIN":
            return { isLogged: true, userInfo: action.userInfo };
        case "SIGN_OUT":
            return { isLogged: false, userInfo: {} };
        default:
            return (state);
    }
}
