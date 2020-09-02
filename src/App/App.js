import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NoteListNav from "../NoteListNav/NoteListNav";
import NotePageNav from "../NotePageNav/NotePageNav";
import NoteListMain from "../NoteListMain/NoteListMain";
import NotePageMain from "../NotePageMain/NotePageMain";
import "./App.css";
import Context from "../Context/Context";

class App extends Component {
  state = {
    notes: [],
    folders: [],
  };

  componentDidMount() {
    Promise.all([
      fetch("http://localhost:9090/folders"),
      fetch("http://localhost:9090/notes"),
    ])
      .then(([foldersRes, notesRes]) => {
        /*  if (!notesRes.ok || !foldersRes.ok) {
               Promise.reject(notesRes.statusText) 
            } else { */
        return Promise.all([foldersRes.json(), notesRes.json()]);
        //}
      })
      .then(([folders, notes]) => {
        this.setState({ folders, notes });
      })
      .catch((error) => {
        console.log(`${error}`);
      });

    // fake date loading from API call
    //setTimeout(() => this.setState(dummyStore), 600);
  }

  renderNavRoutes() {
    return (
      <>
        {["/", "/folder/:folderId"].map((path) => (
          <Route exact key={path} path={path} component={NoteListNav} />
        ))}
        <Route path="/note/:noteId" component={NotePageNav} />
        <Route path="/add-folder" component={NotePageNav} />
        <Route path="/add-note" component={NotePageNav} />
      </>
    );
  }

  renderMainRoutes() {
    return (
      <>
        {["/", "/folder/:folderId"].map((path) => (
          <Route exact key={path} path={path} component={NoteListMain} />
        ))}
        <Route path="/note/:noteId" component={NotePageMain} />
      </>
    );
  }

  deleteNote = (noteId) => {
     console.log(`http://localhost:9090/notes/${noteId}`)
        fetch(`http://localhost:9090/notes/${noteId}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      }).then(() => {
        this.componentDidMount();
      })
    //   .then((notesRes) => {
    //     /*  if (!notesRes.ok || !foldersRes.ok) {
    //            Promise.reject(notesRes.statusText) 
    //         } else { */
    //     return notesRes.json();
    //     //}
    //   })
    //   .then((notes) => {
    //     this.setState({ notes });
    //     console.log(this.state.notes)
    //   })
      .catch((error) => {
        console.log(`${error}`);
      });
  };

  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.deleteNote,
      addNote: () => {},
      addFolder: () => {},
    };
    return (
      <Context.Provider value={contextValue}>
        <div className="App">
          <nav className="App__nav">{this.renderNavRoutes()}</nav>
          <header className="App__header">
            <h1>
              <Link to="/">Noteful</Link>{" "}
              <FontAwesomeIcon icon="check-double" />
            </h1>
          </header>
          <main className="App__main">{this.renderMainRoutes()}</main>
        </div>
      </Context.Provider>
    );
  }
}

export default App;
