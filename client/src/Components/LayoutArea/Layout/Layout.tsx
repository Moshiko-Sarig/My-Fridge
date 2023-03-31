import UserModel from '../../../Models/UserModel'
import Routing from '../../Routing/Routing'
import Header from '../Header/Header'

import './Layout.css'

export interface ReduxState {
    logged: { isLogged: boolean, userInfo: UserModel },
    tokenCommands: { token: string }
}

export default function Layout(): JSX.Element {
    return (
        <div className='Layout'>
            <header>
                <Header />
            </header>
            <main>
                <Routing />
            </main>
        </div>
    )
}