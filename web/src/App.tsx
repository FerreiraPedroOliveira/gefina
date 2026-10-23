import{
    BrowserRouter,
    Routes,
    Route,
    NavLink
} from 'react-router';

import DashboardPage from './DashBoardPage.tsx';
import InvoicePage from './InvoicePage.tsx';

export default function App(){
    return <BrowserRouter>
         <aside className='sidebar'>
            <header className='brand'>Gefina</header>
            <nav className='menu'>
                <ul>
                    <li>
                        <NavLink to='/'>Pinel inicial</NavLink>
                    </li>
                    <li>
                        <NavLink to='/Faturas'>Faturas</NavLink>
                    </li>
                </ul>    
            </nav>
        </aside>
        <main className='content'>
        <Routes>
            <Route path='/' element={<DashboardPage/>}/>
            <Route path='/Faturas' element={<InvoicePage/>}/>
        </Routes>
        </main>
    </BrowserRouter>;
}