import { Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Formgroup(props) {
  const { name, func, type, as, value, label, placeholder, disabled } = { ...props };

  return (
    <Form.Group controlId={name}>
      {label && <Form.Label >{label}</Form.Label>}

      {as === "editor" ? (
        <ReactQuill
          theme="snow"
          value={value || ""}
          onChange={(content) => func({ target: { value: content } })} // 👈 simulamos un evento estándar
          placeholder={placeholder}
          modules={{
            toolbar: [
              ["bold", "italic", "underline"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link"],
              ["clean"],
            ],
          }}
          className="bg-white rounded"
        />
      ) : (
        <Form.Control
          as={as}
          type={type}
          value={value || ""}
          placeholder={placeholder}
          onChange={func}
          className="form-control"
          disabled={disabled}
        />
      )}
    </Form.Group>
  );
}

export default Formgroup;
