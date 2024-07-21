import { Form } from "react-bootstrap";

function Formgroup(props) {
  const { name, func, type, label } = { ...props };
  return (
    <>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>{label}</Form.Label>
        {type === "textarea" ? (
          <Form.Control
            as={type}
            placeholder={name}
            onChange={func}
            accept="image/*"
            maxlength="120"
          />
        ) : (
          <Form.Control
            type={type}
            placeholder={name}
            onChange={func}
            accept="image/*"
          />
        )}
      </Form.Group>
    </>
  );
}

export default Formgroup;
