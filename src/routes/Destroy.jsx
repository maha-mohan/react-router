import React from 'react'
import{redirect} from "react-router-dom"
import{deleteContact} from "./../contacts";


export async function action({ params }) {
    throw new Error("oh dang!");
    await deleteContact(params.contactId);
    return redirect("/");
  }



function Destroy() {
  return (
    <div>Destroy</div>
  )
}

export default Destroy