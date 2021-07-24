export default function Form(Props) {
  return (
    <div className="form">
      <Input
        type={Props.type}
        name={Props.name}
        // required={true}
        placeholder=" "
        title={Props.title}
        // pattern={Props.pattern}
      />
      <Label for={Props.name} name={Props.value} />
    </div>
  );
}

export const Label = (Props) => {
  return (
    <label htmlFor={Props.for} className="label">
      {Props.name}
    </label>
  );
};

export const Input = (Props) => {
  return (
    <input
      type={Props.type}
      id={Props.name}
      name={Props.name}
      required={Props.required}
      autoComplete="off"
      title={Props.title}
      className="input"
      placeholder={Props.placeholder}
      pattern={Props.pattern}
    />
  );
};
