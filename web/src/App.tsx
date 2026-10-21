import{
    BrowserRouter,
    Routes,
    Route,
    Link
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
                        <Link to='/'>Pinel inicial</Link>
                    </li>
                    <li>
                        <Link to='/Faturas'>Faturas</Link>
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