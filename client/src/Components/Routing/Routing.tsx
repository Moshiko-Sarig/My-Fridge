import { Route, Routes, Navigate } from "react-router";
import BrowseItems from "../HomeArea/BrowseItems/BrowseItems";
import CreateAccount from "../HomeArea/CreateAccount/CreateAccount";
import CreateQr from "../HomeArea/CreateQr/CreateQr";
import LandingPage from "../HomeArea/LandingPage/LandingPage";
import Login from "../HomeArea/Login/Login";


export default function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                <Route path='/' element={<Navigate to="/LandingPage" />} />
                <Route path='/landing-page' element={<LandingPage />} />
                <Route path='/login' element={<Login />} />
                <Route path='/create-account' element={<CreateAccount />} />
                <Route path='/browse-items' element={<BrowseItems />} />
                <Route path='/create-qr' element={<CreateQr />} />
            </Routes>
        </div>
    )
}