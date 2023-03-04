
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,  createRoutesFromElements,
    Route,
    RouterProvider,
  } from "react-router-dom";
import ErrorPages from './ErrorPages';
  import "./index.css";
import Root from './routes/Root';
import { Contact,loader as contactLoader,action as contactAction,}from './routes/Contact';
import {loader as rootLoader,action as rootAction} from "./routes/Root"
import {EditContact, action as editAction} from './routes/Edit';
import {action as destroyAction} from "./routes/Destroy";
import Main from './routes/Main';



  const router = createBrowserRouter(
    createRoutesFromElements(

    <Route
      path= "/"
      element= {<Root />}
      loader ={rootLoader}
      action ={rootAction}
      errorElement = {<ErrorPages/>}
      >

        <Route errorElement={<ErrorPages/>}>
        <Route MainElement ={<Main/>}/>

          <Route
          path="contacts/:contactId"
          element={<Contact />}
          loader={contactLoader}
          action={contactAction}
        />

        <Route
          path="contacts/:contactId/edit"
          element={<EditContact />}
          loader={contactLoader}
          action={editAction}
          />

          <Route
          path="contacts/:contactId/destroy"
          action={destroyAction}
        />

     </Route>
    </Route>
  )
);

   

  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );