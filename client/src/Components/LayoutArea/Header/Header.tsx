import { useEffect, useState } from 'react'
import ControlPanel from '../ControlPanel/ControlPanel';
import './Header.css'

export default function Header(): JSX.Element {
    return (
        <div className='Header'>
            <div className='siteTitle'>
                <h1 className="title">MY <span>FRIDGE</span></h1>
            </div>
            <div className='menuToggle'>
                <ControlPanel />
            </div>
        </div>
    )
}