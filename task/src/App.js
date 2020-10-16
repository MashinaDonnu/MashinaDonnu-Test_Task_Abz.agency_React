import React from 'react';
import {Navbar} from "./components/Navbar/Navbar";
import {Acquainted} from "./components/Acquainted/Acquainted";
import {Users} from "./components/Users/Users";
import {Register} from "./components/Register/Register";
import {Footer} from "./components/Footer/Footer";
import {Layout} from "./hoc/Layout";
import {BrowserRouter as Router} from "react-router-dom";
import {UserState} from "./context/user/userState";
import {Modal} from "./components/Modal/Modal";
import {ModalState} from "./context/modal/ModalState";
import {Header} from "./components/Header/Header"

function App() {
  return (
      <Router>
          <ModalState>
          <Modal/>
              <Navbar/>
              <Header/>
              <Layout>
                  <UserState>
                      <Acquainted/>
                      <Users/>
                      <Register/>
                      <Footer/>
                  </UserState>
              </Layout>
          </ModalState>
      </Router>
  );
}

export default App;
