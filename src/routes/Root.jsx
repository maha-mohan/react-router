import React from 'react'
import { Outlet, NavLink, Link, useLoaderData, Form, redirect, useNavigation, useSubmit} from 'react-router-dom';
import { useEffect } from 'react';
import { getContacts, createContact } from "./../contacts";


export async function action() {
  const contacts = await createContact();
  return redirect(`/contacts/${contacts.id}/edit`);
}

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return { contacts, q };
}

export default function Root() {
  const navigation = useNavigation();
  const submit = useSubmit();
  const { contacts, q } = useLoaderData();

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has(
      "q"
    );

  useEffect(() => { document.getElementById("q").value = q; }, [q]);

  return (
    <>
      <div id="sidebar">
        <h1> React Router contacts</h1>
        <div>

          <Form id='search-form' role="search">
            <input
              id='q'
              className={searching ? "loading" : ""}
              aria-label='search contacts'
              placeholder='search'
              type='search'
              name="q"
              defaultValue={q}
              onChange={(event) => {
                const isFirstSearch = q == null;
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                });
                submit(event.currentTarget.form);
              }}

            />
            <div
              id='search-spinner'
              aria-hidden
              hidden={!searching}
            />
            <div
              className='sr-only'
              aria-live='polite'
            ></div>

          </Form>
          {/* <form method="post">
                    <button type="submit"> New</button>
                </form> */}
          <Form method="post">
            <button type="submit">New</button>
          </Form>

        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>

                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                          ? "pending"
                          : ""
                    }
                  >

                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>

      </div>
      < div
        id="detail"
        className={
          navigation.state === "loading" ? "loading" : ""
        }
      >
        <Outlet />
      </div>

    </>

  );
}




