
import { uid } from 'uid';
import {router} from './router'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './page/login/Login';
function App() {
  const [isLogin, setIsLogin] = useState(localStorage.getItem('user') ? true : false);
  
  return (
      <div className="app">
        <Router>
          <Routes>
            {router.map(route =>{
              var Layout = route.layout
              if(route.layout == null){
                Layout = 'div'
              }
              const Page = route.element
              return (
                <Route 
                  key={ uid( 10 ) } 
                  path={route.path}
                  element = {isLogin?(<Layout><Page/></Layout>) : <Navigate to="/login" replace={true} />}
                >
                </Route>
              )
            })}
            <Route path="/login" element={<Login/>}/>
      
          </Routes>
        </Router>
      </div>
  );
}

export default App;