import * as React from "react";

export default function UserForm({ onUserAdd }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onUserAdd({ name, email });
    setName("");
    setEmail("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <button>Add User</button>
    </form>
  );
}
