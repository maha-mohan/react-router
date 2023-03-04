import React from 'react'
import {useRouteError} from "react-router-dom"

function ErrorPages() {
    const error =useRouteError();
    console.error(error);

    
  return (
    <div id="error-pages">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occured.</p>
        <p>
            <i>{error.statusText  || error.messsage}</i>
        </p>
    </div>
  )
}

export default ErrorPages