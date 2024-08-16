import { Form } from "react-bootstrap";

function Formgroup(props) {
  const { name, func, type, label, as, value } = { ...props };

  return (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as={as}
        type={type}
        value={value} // Pasa el valor al componente
        placeholder={label} // Usa label para el placeholder
        onChange={func} // Maneja el cambio
        maxLength={type === "textarea" ? "120" : undefined} // Max length solo para textarea
      />
    </Form.Group>
  );
}

export default Formgroup;
