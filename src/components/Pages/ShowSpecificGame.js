import React, { Component, Fragment } from 'react'
import axios from 'axios'
import {
    DataGrid,
} from "@material-ui/data-grid";

export default class ShowSpecificGame extends Component {
    constructor(props) {
        super(props)
        this.state = {
            gameID: this.props.SelecetGameID,
            myTeam: "",
            players: [],
            game: []
        }
        this.getPlayers = this.getPlayers.bind(this)
        this.setIDPlayer = this.setIDPlayer.bind(this)
    }
    componentDidMount() {
        const { gameID, players } = this.state

        this.getPlayers(gameID).then((result) => {
            if (result) {
                this.setState({ players: result.data })
            }
        })

    }
    getPlayers(gameID) {
        return axios.get('http://localhost:5000/players/find/' + gameID)
    }

    setIDPlayer(players) {
        players.forEach(player => (
            player.id = player._id
        ))
    }
    render() {
        const { players, game } = this.state
        this.setIDPlayer(players)


        return (
            <>
                <Fragment>

                    <table>
                        <thead>
                            <tr>
                                <th>Player Name</th>
                                <th>Last Name</th>
                                <th>Position</th>
                                <th>Total Time</th>
                                <th>Distance (km)</th>
                                <th>Sprint Distance</th>
                                <th> Total Sprints</th>
                                <th>Sprints Avg(MP/H).</th>
                                <th>Goals</th>

                            </tr>

                        </thead>
                        <tbody>
                            {players.map((player) => (

                                <tr key={player["Tracker"]}>
                                    <td className="tooltip" >{player["firstName"]}</td>
                                    <td className="tooltip" > {player["lastName"]}</td>
                                    <td className="tooltip" > {player["position"]}

                                    </td>
                                    <td className="tooltip" > {player["timeOnPitch"]}</td>
                                    <td className="tooltip" > {player["distance"]} <span className="tooltiptext" > Half(1): {player["distanceHalfOne"]} Half(2) {player["distanceHalfTwo"]}</span></td>
                                    <td className="tooltip" > {player["progressiveSprints"]}<span className="tooltiptext" >Half(1): {player["progressiveSprintsHalfOne"]}  Half(2) {player["progressiveSprintsHalfTwo"]}</span></td>
                                    <td className="tooltip" > {player["sprints"]} <span className="tooltiptext" > Half(1): {player["sprintsHalfOne"]} Half(2) {player["sprintsHalfTwo"]}</span></td>
                                    <td className="tooltip" > {player["topSpeed"]}</td>
                                    <td className="tooltip" > {player["goals"]}</td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Fragment>
            </>

        )
    }
}

