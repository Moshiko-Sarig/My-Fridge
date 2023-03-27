import Routing from '../../Routing/Routing'
import Header from '../Header/Header'
import './Layout.css'


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