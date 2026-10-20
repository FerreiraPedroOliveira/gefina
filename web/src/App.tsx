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
        <nav>
            <Link to='/'>Pinel inicial</Link>
            <Link to='/Faturas'>Faturas</Link>
        </nav>
        <Routes>
            <Route path='/' element={<DashboardPage/>}/>
            <Route path='/Faturas' element={<DashboardPage/>}/>
        </Routes>
    </BrowserRouter>;
}