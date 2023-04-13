import { useEffect, useState } from 'react'
import ControlPanel from '../ControlPanel/ControlPanel';
import './Header.css'

export default function Header(): JSX.Element {
    let [state, setState] = useState({ showMenu: false });

    function toggleMenu() {
        setState(prevState => ({ showMenu: !prevState.showMenu }));
    }

    return (
        <div className='Header'>
            <div className='siteTitle'>
                <span>My fridge</span>
            </div>
            <div className='menuToggle'>
                {!state.showMenu ?
                    <button onClick={toggleMenu}>Show menu</button>
                    :
                    <button onClick={toggleMenu}>Hide menu</button>
                }
            </div>
            <div className='menuOptions'>
                {state.showMenu ?
                    <ControlPanel />
                    :
                    null
                }
            </div>
            <div className='userSearch'>
                <span>search goes here</span>
            </div>
        </div>
    )
}