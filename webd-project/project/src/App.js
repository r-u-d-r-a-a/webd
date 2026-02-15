import logo from './logo.svg';
import './App.css';
import Layout from './components/layout';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from './redux/userSlice';


function App() {

   const dispatch = useDispatch();

  // dispatch(addUser(sessionStorage.getItem("user")));

  return (
    <div>
      
      <Layout></Layout>
      
    </div>
  );
}

export default App;
