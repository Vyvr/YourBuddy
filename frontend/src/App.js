/** @format */

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  /**Redirect,*/
  Switch,
} from "react-router-dom";

import Home from "./home/pages/Home";
import Login from "./home/pages/Login";
import Register from "./home/pages/Register";
import UsersList from "./user/pages/usersList";
import UserDashboard from "./user/pages/userDashboard";
import EditUser from "./user/pages/editUser";
import VetsList from "./vet/pages/vetsList";
import VetDashboard from "./vet/pages/vetDashboard";
import VisitList from "./visit/pages/visitList";
import VisitDetails from "./visit/pages/visitDetails";
import CreateVisit from "./visit/pages/createVisit";
import ClinicDashboard from "./clinic/pages/clinicDashboard";
import CreateClinic from "./clinic/pages/createClinic";
import AddWorker from "./clinic/pages/addWorker";
import CreatePet from "./pet/pages/createPet";
import PetDetails from "./pet/pages/petDetails";
import EditPet from "./pet/pages/editPet";
import Hello from "./user/pages/hello";

const App = () => {
  return (
    <Router>
      <main style={{ height: "100%", margin: "0" }}>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
          <Route path="/user/user-list" exact>
            <UsersList />
          </Route>
          <Route path="/user/dashboard" exact>
            <UserDashboard />
          </Route>
          <Route path="/user/edit-user" exact>
            <EditUser />
          </Route>
          <Route path="/vet/vet-list" exact>
            <VetsList />
          </Route>
          <Route path="/vet/dashboard" exact>
            <VetDashboard />
          </Route>
          <Route path="/vet/visit-list" exact>
            <VisitList />
          </Route>
          <Route path="/vet/visit-details/:id" exact>
            <VisitDetails />
          </Route>
          <Route path="/visit/create" exact>
            <CreateVisit />
          </Route>
          <Route path="/vet/clinic-dashboard" exact>
            <ClinicDashboard />
          </Route>
          <Route path="/vet/create-clinic" exact>
            <CreateClinic />
          </Route>
          <Route path="/vet/add-worker" exact>
            <AddWorker />
          </Route>
          <Route path="/user/create-pet" exact>
            <CreatePet />
          </Route>
          <Route path="/pet/pet-info" exact>
            <PetDetails />
          </Route>
          <Route path="/user/edit-pet" exact>
            <EditPet />
          </Route>
          <Route path="/user/hello" exact>
            <Hello />
          </Route>
        </Switch>
      </main>
    </Router>
  );
};

export default App;
