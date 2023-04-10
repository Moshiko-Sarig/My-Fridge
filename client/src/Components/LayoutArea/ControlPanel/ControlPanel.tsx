import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { ReduxState } from '../Layout/Layout';
import { userSignOut } from '../../Redux/Actions';
import './ControlPanel.css'


export default function ControlPanel(): JSX.Element {
    const logged = useSelector((state: ReduxState) => state.logged);
    const dispatch = useDispatch();

    function logUserOut(): void {
        dispatch(userSignOut());
    }

    return (
        <div className='ControlPanel'>
            <button>
                <NavLink to='/landing-page'>Home</NavLink>
            </button>
            <button>
                <NavLink to='/browse-items'>Browse items</NavLink>
            </button>
            {logged.isLogged ?
            <button>
                <NavLink to='/my-items'>My items</NavLink>
            </button>
            :
                null
            }
            {logged.isLogged ?
                <button>
                    <NavLink to='/create-qr'>Create QR</NavLink>
                </button>
                :
                null
            }
            {logged.isLogged ?
                <button onClick={logUserOut}>
                    Logout
                </button>
                :
                <button>
                    <NavLink to='/login'>Login</NavLink>
                </button>
            }
            {!logged.isLogged ?
                <button>
                    <NavLink to='/create-account'>Create account</NavLink>
                </button>
                :
                null
            }
        </div>
    )
}