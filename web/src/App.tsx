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
        <aside>
            <header>Gefina</header>
            <nav>
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
        <main>
        <Routes>
            <Route path='/' element={<DashboardPage/>}/>
            <Route path='/Faturas' element={<InvoicePage/>}/>
        </Routes>
        </main>
    </BrowserRouter>;
}