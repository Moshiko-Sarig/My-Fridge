

export default function tokenReducer(state = { token: "" }, action: { type: string, token: string }) {
    const TOKEN_KEY: string = "token";
    const EXPIRATION_TIME_KEY: string = "expiration_time";
    const EXPIRATION_TIME = 30 * 60 * 1000; // 30 minutes, in milli-seconds
    switch (action.type) {
        case "SET_TOKEN": {
            const expirationTime = Date.now() + EXPIRATION_TIME;
            localStorage.setItem(TOKEN_KEY, action.token);
            localStorage.setItem(EXPIRATION_TIME_KEY, expirationTime.toString());
            console.log("Token Saved");
        }
        case "GET_TOKEN": {
            const expirationTime = Number(localStorage.getItem(EXPIRATION_TIME_KEY));
            if (expirationTime && expirationTime > Date.now()) {
                return localStorage.getItem(TOKEN_KEY);
            }
            else {
                localStorage.removeItem(TOKEN_KEY);
                localStorage.removeItem(EXPIRATION_TIME_KEY);
                console.warn("Token not found or expired, Please login.");
                return null;
            }
        }
        default:
            return (state);
    }
}