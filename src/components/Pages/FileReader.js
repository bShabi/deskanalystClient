import React , { Fragment, useState } from 'react';
import { Redirect } from 'react-router'
import Papa from 'papaparse';
import ShowPlayers from './ShowPlayers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class FileReader extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        gameInformation:  {
          game:  this.props.gameInformation
        },
        csvfile: undefined,
        data: undefined,
        isLoad: false,
        redirect: false,
        errormsg: ""
        
      };
      this.updateData = this.updateData.bind(this);
    }
    componentDidMount() {
      console.log(this.state.gameInformation.game)
      toast.configure();
    }
    handleChange = e => {
      this.setState({
        csvfile: e.target.files[0],
        isLoad: true
      });
    };
  
    importCSV = () => {
      const { csvfile } = this.state;
      Papa.parse(csvfile, {
        complete: this.updateData,
        header: true
      });
  };
  
    updateData(result) {
      var data = result.data;
      var players = data.filter(elm => elm["Team or Player"] === "Player");
      if (players.length > 1 ){
        debugger;
       this.setState({data: players,redirect: true })
      }else {
        this.setState({errormsg: "csv not valid"});
        toast.warning("Csv not valid")
      } 
    }
 

    render() {
      const { redirect } = this.state;
      // console.log(this.state.csvfile);
      if (redirect) 
        return <Redirect to={{
          pathname: '/ShowPlayers',
          state: { playersInGame: this.state.data,gameInformation: this.state.gameInformation.game}
      }}
/>
      return (
        <Fragment>
     <div className="App">
          <h2>Import CSV File!</h2>
          <input
            className="csv-input"
            type="file"
            ref={input => {
              this.filesInput = input;
            }}
            name="file"
            placeholder={null}
            onChange={this.handleChange}
          />
          <button onClick={this.importCSV}> {this.state.isLoad ? `Upload Now!` : ` `} </button>
          <span>{this.state.errormsg} </span>
        </div>  
        </Fragment>
   
      );

          }
        }
  
  
  export default FileReader;


  