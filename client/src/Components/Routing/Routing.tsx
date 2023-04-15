import { Route, Routes, Navigate } from "react-router";
import BrowseItems from "../HomeArea/BrowseItems/BrowseItems";
import CreateAccount from "../HomeArea/CreateAccount/CreateAccount";
import CreateQr from "../HomeArea/CreateQr/CreateQr";
import LandingPage from "../HomeArea/LandingPage/LandingPage";
import Login from "../HomeArea/Login/Login";
import PageNotFound from "../HomeArea/PageNotFound/PageNotFound";
import MyItems from "../HomeArea/MyItems/MyItems";
import Authenticated from '../../middlewares/Authenticated';
import EmailVerified from "../EmailVerified/EmailVerified";

export default function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                <Route path='/' element={<Navigate to="/landing-page" />} />
                <Route path='/landing-page' element={<LandingPage />} />
                <Route path='/login' element={<Login />} />
                <Route path='/create-account' element={<CreateAccount />} />
                <Route path='/browse-items' element={<BrowseItems />} />
                <Route path="/email-verified" element={<EmailVerified/>} />
                <Route path='/my-items' element={<Authenticated><MyItems /></Authenticated>} />
                <Route path='/create-qr' element={<Authenticated><CreateQr /></Authenticated>} />
                <Route path='*' element={<PageNotFound />} />
            </Routes>
        </div>
    )
}
