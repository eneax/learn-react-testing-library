import * as React from "react";

import "./App.css";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

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
