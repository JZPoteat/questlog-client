import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Game from '../GameListItem/GameListItem'
import GameApiService from '../services/game-api-service'

export default class GamesList extends Component {


    state = {
        games: [],
        error: null,
    }

    setGames = games => {
        this.setState({
            games,
            error: null
        })
    }


    componentDidMount() {
        GameApiService.getGames()
        .then(this.setGames)
      }
    render() {
        console.log(this.state.games)
        return (
            <>
                <h1>My Quests</h1>
                <Link to='/quest-form'><button>Add quest</button></Link>
                <ul className='quest_list'>
                    {this.state.games.map(game => 
                        <Game
                        key={game.id}
                        {...game}
                        />
                    )}
                </ul>

            </>
        )
    }
}