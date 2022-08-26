import React from 'react'
import SaveForm from '../Form/save/SaveForm';
import ViewForm from '../Form/viewForm/ViewForm';
import ViewParticipants from '../Form/viewParticipants/ViewParticipants';
import ViewParticipantsCarrera from '../Form/viewParticipants/ViewPorCarrera';
import ViewParticipantsEdad from '../Form/viewParticipants/ViewPorEdad';
import ViewParticipantsPoesia from '../Form/viewParticipants/ViewPorPoesia';
import ViewParticipantsFecha from '../Form/viewParticipants/ViewPorFecha';
import Navigation from '../Navigation/Navigation';

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
  } from "react-router-dom";

export const Main = () => {
  return (
    <>
    <Router>
    <Routes>
      <Route exact path="/saveForm" element={<SaveForm />}/>
      <Route path="/viewForm" element={<ViewForm />}/>
      <Route path="/viewParticipants" element={<ViewParticipants />}/>
      <Route path="/viewParticipantsCarrera" element={<ViewParticipantsCarrera />}/>
      <Route path="/viewParticipantsEdad" element={<ViewParticipantsEdad />}/>
      <Route path="/viewParticipantsPoesia" element={<ViewParticipantsPoesia />}/>
      <Route path="/viewParticipantsDeclamacion" element={<ViewParticipantsFecha />}/>
      <Route path="*" element={<Navigate to='/saveForm' replace />}/>
    </Routes>
    </Router>
    </>
  )
}


export default Main;