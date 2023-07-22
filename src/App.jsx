
import { uid } from 'uid';
import {router} from './router'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux'

import Login from './page/login/Login';
import "tw-elements/dist/css/tw-elements.min.css";
function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLogin)
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
                  element = {isLoggedIn?(<Layout><Page/></Layout>) : <Navigate to="/login" replace={true} />}
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