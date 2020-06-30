import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Game from '../GameListItem/GameListItem'
import GameApiService from '../services/game-api-service'

export default class GamesList extends Component {


    state = {
        games: [],
        sort: '',
        error: null,
    }

    setGames = games => {
        this.setState({
            games,
            error: null
        })
    }

    setSort = e => {
       this.setState({
           sort: e.target.value,
       })
    }

    sortOptions = () => {
        return (
            <div className='sort_box'>
                <p>Sort by:  </p>
                <select className='sort_options' id='sort_options' onChange={this.setSort}>
                    <option value='0'>N/A</option>
                    <option value='1'>Priority (Low to High)</option>
                    <option value='2'>Priority (High to Low)</option>
                    <option value='3'>Estimated Time (Low to High)</option>
                    <option value='4'>Estimated Time (High to Low)</option> 
                </select>
            </div>

        )
    }

    sortGames = () => {
        let sort = Number(this.state.sort)
        let sortedGames = []
        if( sort === 0 ) {
            sortedGames = this.state.games.sort((a, b) => a.est_time > b.est_time ? -1 : 1 )
        }
        if( sort === 1 ) {
            sortedGames = this.state.games.sort((a, b) => a.importance > b.importance ? -1 : 1 )
        }
        else if( sort === 2 ) {
            sortedGames = this.state.games.sort((a, b) => a.importance > b.importance ? 1 : -1 )
        }
        else if( sort === 3 ) {
            sortedGames = this.state.games.sort((a, b) => a.est_time > b.est_time ? -1 : 1 )
        }
        else if( sort === 4 ) {
            sortedGames = this.state.games.sort((a, b) => a.est_time > b.est_time ? 1 : -1 )
        }
        console.log(sort)
        console.log(sortedGames)
    }

    changeImportanceFromNumToString = (games) => {
        return games.map(game => {
            if(Number(game.importance) === 1) {
                game.importance = 'Low';
            }
            else if(Number(game.importance) === 2) {
                game.importance = 'Medium';
            }
            else if(Number(game.importance) === 3) {
                game.importance = 'High';
            }
            return game;
        })
    }

    componentDidMount() {
        GameApiService.getGames()
        .then(this.changeImportanceFromNumToString)
        .then(this.setGames)
        .catch(error => this.setState({ error: error }))
    }

    render() {  
        this.sortGames()
        return (
            <>
                <h1>My Quests</h1>
                <p role='alert' className='red'>{this.state.error}</p>
                {this.sortOptions()}
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