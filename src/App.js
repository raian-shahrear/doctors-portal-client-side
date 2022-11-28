import './App.css';
import {RouterProvider} from 'react-router-dom'
import routes from './Routes/basicRoutes';


function App() {
  return (
    <div className="App max-w-[1440px] mx-auto">
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
