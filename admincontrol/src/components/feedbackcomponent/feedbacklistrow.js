import Axios from "axios";
import { Link } from "react-router-dom";

function FeedbackListRow(props) {
  const { _id, username, feedback, time } = props.obj;
  return (
    <tr>
      <td>{username}</td>
      <td>{feedback}</td>
      <td>{time}</td>
    </tr>
  );
}

export default FeedbackListRow;
