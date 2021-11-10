const formStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "10rem",
  margin: "1rem",
};

export default function Form(props) {
  const { onChange, onSubmit, disabled, form } = props;

  return (
    <form onSubmit={onSubmit} style={formStyle}>
      <label>
        Name:
        <input
          value={form.name}
          onChange={onChange}
          name="name"
          type="text"
        ></input>
      </label>
      <label>
        E-Mail:
        <input
          value={form.email}
          onChange={onChange}
          name="email"
          type="text"
        ></input>
      </label>
      <label>
        Password:
        <input
          value={form.password}
          onChange={onChange}
          name="password"
          type="text"
        ></input>
      </label>
      <label>
        Terms of Service:
        <input
          checked={form.terms}
          onChange={onChange}
          name="terms"
          type="Checkbox"
        ></input>
      </label>
      <button disabled={disabled} type="submit">
        Submit
      </button>
    </form>
  );
}
