import { useContext } from "react";
import { AppContext } from "../../AppProvider";
import "./Galery.css";
import { Link } from "react-router-dom";
function Galery() {
  const { galery, title } = useContext(AppContext);
  return (
    <div className="center">
      <h1>{title}</h1>
      <div className="galery center">
        {galery.map((item) => (
          <Link key={item.id} to={`galery/${title}`}>
            <img
              className=""
              key={item.id}
              src={item.url}
              alt={item.nameOfImage}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Galery;
