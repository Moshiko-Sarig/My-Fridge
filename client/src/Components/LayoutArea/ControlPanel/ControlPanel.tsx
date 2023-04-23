import { useDispatch, useSelector } from 'react-redux';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { ReduxState } from '../Layout/Layout';
import { userSignOut } from '../../Redux/Actions';
import { useCookie } from '../../../hooks/useCookie';
import { useState } from 'react';
import './ControlPanel.css';



export default function ControlPanel(): JSX.Element {
    const logged = useSelector((state: ReduxState) => state.logged);
    const dispatch = useDispatch();
    const [cookieUpdate, setCookieUpdate] = useState(0);
    const [, , removeAuthToken] = useCookie('authToken', () => setCookieUpdate(cookieUpdate + 1));

    function logUserOut(): void {
        removeAuthToken();
        dispatch(userSignOut());
    }

    return (
        <div className='ControlPanel'>
            <div className="label">Menu</div>
            <div className="spacer"></div>
            <div className="item">
                <NavLink to='/landing-page' className="navLink"><span>Home</span></NavLink>
            </div>
            <div className="item">
                <NavLink to='/browse-items' className="navLink"><span>Browse items</span></NavLink>
            </div>
            {logged.isLogged ?
            <div className="item">
                <NavLink to='/my-items' className="navLink"><span>My items</span></NavLink>
            </div>
            :
                null
            }
            {logged.isLogged ?
                <div className="item">
                    <NavLink to='/create-qr' className="navLink"><span>Create QR</span></NavLink>
                </div>
                :
                null
            }
            {logged.isLogged ?
                <div className="item" onClick={logUserOut}>
                    <NavLink to='/landing-page' className="navLink"><span>Logout</span></NavLink>
                </div>
                :
                <div className="item">
                    <NavLink to='/login' className="navLink"><span>Login</span></NavLink>
                </div>
            }
            {!logged.isLogged ?
                <div className="item">
                    <NavLink to='/create-account' className="navLink"><span>Create account</span></NavLink>
                </div>
                :
                null
            }
        </div>
    )
}