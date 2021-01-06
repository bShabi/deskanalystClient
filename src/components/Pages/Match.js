
import React, { Component } from 'react'
import { withRouter } from "react-router";
import axios from 'axios'

class _Match extends Component {
    constructor(props) {
        super(props)
        const user = JSON.parse(sessionStorage.getItem("loginUser"))
        const team = user ? user.teamName : ""
        if (!user) {
            this.props.history.push('/')
        }
        this.state = {
            games: [],
            myTeam: team
        }
    }
    componentDidMount() {
        axios.get('http://localhost:5000/games/' + this.state.myTeam).then((result) => {
            if (result.data != null) {
                this.setState({ games: result.data })
            }
        })
    }
    render() {
        const { games } = this.state
        return (
            <div>
                <table>
                    <thead>
                        <th>Data</th>
                        <th>Home</th>
                        <th>Away</th>
                        <th>Half Score</th>
                        <th>Final Score</th>
                    </thead>
                    <tbody>
                        {games.map((game) => (
                            <tr>
                                <td>{game.gameDate}</td>
                                <td>{game.myTeam}</td>
                                <td>{game.opponentTeam}</td>
                                <td>{game.myTeamHalfScore}</td>
                                <td>{game.shotOnTargetHalfTwo}</td>
                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}
export const Match = withRouter(_Match);


