import * as React from "react";

import "./App.css";
import UserForm from "./UserForm";
import UserList from "./UserList";

export default function App() {
  const [users, setUsers] = React.useState([]);

  const onUserAdd = (user) => {
    setUsers([...users, user]);
  };

  return (
    <main>
      <UserForm onUserAdd={onUserAdd} />
      <hr />
      <UserList users={users} />
    </main>
  );
}
