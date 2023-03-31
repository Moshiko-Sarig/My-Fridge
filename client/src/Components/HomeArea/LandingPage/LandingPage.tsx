import { useDispatch } from 'react-redux';
import UserModel from '../../../Models/UserModel';
import './LandingPage.css'



export interface ReduxState {
    logged: { isLogged: boolean, userInfo: UserModel },

}

export default function LandingPage(): JSX.Element {

    const dispatch = useDispatch();



    return (
        <div className='LandingPage'>
            <aside>
            </aside>
            <main>
                <p>
                    Welcome
                </p>
                <p>
                    This site was created by Moshiko Sarig and Yotam Amshalom, as a portfolio project. <br />
                    Here you can manage your inventory, and create a QR code for each item with its details: <br />
                    Name, expiration date, quantity and more.
                </p>
                <p>
                    As a guest you can browse existing items other people have already created, or create QR codes for items.
                    However, <br /> if you wish to have an inventory, you will need to create an account and sign in to have access to
                    your items, and <br /> be able to manage them accordingly.
                </p>
                <div>
                    If you wish to, you can contact us through our gitHub accounts: <br />
                    <ul>
                        <li>Moshiko - Moshiko-Sarig</li>
                        <li>Yotam - Trafalguy</li>
                    </ul>
                </div>
            </main>
        </div>
    )
}