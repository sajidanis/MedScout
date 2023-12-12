import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
    return (
    <>
        <ToastContainer />
        <main>
            <Container>
                <Outlet />
            </Container>
        </main>
    </>
    );
};
export default App;
