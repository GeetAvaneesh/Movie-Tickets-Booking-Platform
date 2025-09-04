import { useParams } from "react-router-dom";
import Theaterform from "./theaterform";
import { useEffect, useState } from "react";
import Axios from "axios";

function EditTheater() {
  const { id } = useParams();
  const [initialValue, setInitialValue] = useState({
    name: "",
    city: "",
    movie: "",
  });
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    Axios.get(
      "https://movie-ticket-booking-pzhg.onrender.com/theatres/update-theatre/" +
        id
    )
      .then((res) => {
        if (res.status === 200) {
          const { name, city, movie } = res.data;
          setInitialValue({ name, city, movie });
        } else Promise.reject();
      })
      .catch((err) => alert(err));
  }, [id]);

  const getChild = (childData) => {
    setNewData(childData);
  };

  const handleSubmit = () => {
    const data = { name: newData[0], city: newData[1], movie: newData[2] };
    Axios.put(
      "https://movie-ticket-booking-pzhg.onrender.com/theatres/update-theatre/" +
        id,
      data
    )
      .then((res) => {
        if (res.status === 200) alert("Record updated successfully");
        else Promise.reject();
      })
      .catch((err) => alert(err));
  };
  return (
    <form onSubmit={handleSubmit}>
      <Theaterform
        getChild={getChild}
        nameValue={initialValue.name}
        cityValue={initialValue.city}
        movieValue={initialValue.movie}
      >
        Update Theater
      </Theaterform>
    </form>
  );
}
export default EditTheater;
