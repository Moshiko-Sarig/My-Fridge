import { NavLink } from 'react-router-dom'
import './ControlPanel.css'

export default function ControlPanel(): JSX.Element {



    return (
        <div className='ControlPanel'>
            <button>
                <NavLink to='/landing-page'>Home</NavLink>
            </button> &nbsp;
            <button>
                <NavLink to='/browse-items'>Browse items</NavLink>
            </button> &nbsp;
            <button>
                <NavLink to='/create-qr'>Create QR</NavLink>
            </button> &nbsp;
            <button>
                <NavLink to='/login'>Login</NavLink>
            </button> &nbsp;
            <button>
                <NavLink to='/create-account'>Create account</NavLink>
            </button> &nbsp;
        </div>
    )
}