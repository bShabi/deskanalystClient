import React, { Component,Fragment } from 'react';
import { Redirect } from 'react-router'
import '../css/ShowPlayers.css'


class ShowPlayers extends Component {


  constructor(props){
    super(props)
    // console.log(this.props.location.state.gameInformation)
    if(!this.props.location.state)
      return
    this.state = {
      players : this.props.location.state.playersInGame,
      game: this.props.location.state.gameInformation
    }
  }

  render() {
    if(!this.state)
    {       
      return <Redirect to={{ 
        pathname: '/',
    }}
/>
    }
    var { players } = this.state
    // players = players.filter(elm => elm["Team or Player"] === "Player");
    // console.log(this.state.gameInformation.game)
    const { name,opponentTeam,gameDate ,anotherFinalScore,myTeamFinalScore} = this.state.game
    return (
      <Fragment>
      <div>
        <h1>{name} - {opponentTeam} </h1> <h3>Date: {gameDate} score: {myTeamFinalScore} - {anotherFinalScore}</h3>
        <p>

          

        </p>
      </div>
        <table>
        <thead>
        <th>Player Name</th>
          <th>Last Name</th>
          <th>Total Time</th>
          <th>Distance (km)</th>
          <th>Sprint Distance</th>
          <th> Total Sprints</th>
          <th>Sprints Avg(MP/H).</th>
        </thead>
      {players.map((player) => (
        <tbody>
        <tr  key={player["Tracker"]}>
          <td className="tooltip" >{ player["First Name"]}</td>
          <td className="tooltip" > {player["Last Name"]}</td>
          <td className="tooltip" > {player["Time on Pitch (mins)"]}</td>
          <td className="tooltip" > {player["Distance (km)"]} <span className="tooltiptext" > Half(1): {player["Distance 1st Half (km)"] } Half(2) {player["Distance 2nd Half (km)"]}</span></td>  
          <td className="tooltip" > {player["Progressive Sprints"]}<span className="tooltiptext" >Half(1): {player["Progressive Sprints 1st Half"] }  Half(2) {player["Progressive Sprints 2nd Half"]}</span></td>
          <td className="tooltip" > {player["Sprints"]} <span className="tooltiptext" > Half(1): {player["Sprints 1st Half"] } Half(2) {player["Sprints 2nd Half"]}</span></td>
          <td className="tooltip" > {player["Top Speed (km/h)"]}</td>
        </tr>


        </tbody>
      ))}
        </table>
      </Fragment>
    )
  }
}
export default ShowPlayers;
