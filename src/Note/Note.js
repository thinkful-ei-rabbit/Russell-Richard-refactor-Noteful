import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Note.css";
import Context from '../Context/Context';


export default class Note extends React.Component {
  static contextType = Context;

  handleDelete = (id) => {
    const { deleteNote } = this.context
    deleteNote(id);
    window.location.href = '/';

  }

  render() {
    return (
      <div className="Note">
        <h2 className="Note__title">
          <Link to={`/note/${this.props.id}`}>{this.props.name}</Link>
        </h2>
        <button onClick={() => this.handleDelete(this.props.id)} className="Note__delete" type="button">
          <FontAwesomeIcon icon="trash-alt" /> remove
        </button>
        <div className="Note__dates">
          <div className="Note__dates-modified">
            Modified{" "}
            <span className="Date">
              {format(this.props.modified, "Do MMM YYYY")}
            </span>
          </div>
        </div>
      </div>
    );
  }
}
