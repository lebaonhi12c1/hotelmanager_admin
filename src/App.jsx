
import { uid } from 'uid';
import {router} from './router'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
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
                  element = {<Layout><Page/></Layout>}
                >
                </Route>
              )
            })}
          </Routes>
        </Router>
      </div>
  );
}

export default App;