import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Game from '../GameListItem/GameListItem'
import GameApiService from '../../services/game-api-service'
import NavLink from '../../NavLink/NavLink'
import './GameList.css'
import AuthApiService from '../../services/auth-api-service'
export default class GamesList extends Component {


    state = {
        games: [],
        search: '',
        sort: '',
        user: '',
        error: null,
    }

    setGames = games => {
        this.setState({
            games,
            user: games[0].user_id,
            error: null
        })
    }

    setUser = user => {
        this.setState({
            user: user
        })
    }

    setSort = e => {
       this.setState({
           sort: e.target.value,
       })
    }
    setSearch = e => {
        this.setState({
            search: e.target.value,
        })
    }

    searchBar = () => {
        return (
            <div className='search_box'>
                <p id='search_label'>Search:</p>
                <input type='text' value={this.state.search} id='search_bar' onChange={this.setSearch} />
            </div>
        )
    }

    sortOptions = () => {
        return (
            <div className='sort_box'>
                <p id='sort_label'>Sort by:</p>
                <select className='sort_options' id='sort_options' onChange={this.setSort}>
                    <option value='0'>N/A</option>
                    <option value='1'>Priority (Low to High)</option>
                    <option value='2'>Priority (High to Low)</option>
                    <option value='3'>Estimated Time (Low to High)</option>
                    <option value='4'>Estimated Time (High to Low)</option>
                    <option value='5'>Title (A-Z)</option> 
                    <option value='6'>Title (Z-A)</option>
                </select>
            </div>

        )
    }

    sortGames = () => {
        let sort = Number(this.state.sort)
        if( sort === 0 ) {
            this.state.games.sort((a, b) => a.est_time > b.est_time ? 1 : -1 )
        }
        if( sort === 1 ) {
            this.state.games.sort((a, b) => a.importance > b.importance ? 1 : -1 )
        }
        else if( sort === 2 ) {
            this.state.games.sort((a, b) => a.importance > b.importance ? -1 : 1 )
        }
        else if( sort === 3 ) {
            this.state.games.sort((a, b) => a.est_time > b.est_time ? 1 : -1 )
        }
        else if( sort === 4 ) {
            this.state.games.sort((a, b) => a.est_time > b.est_time ? -1 : 1 )
        }
        else if( sort === 5 ) {
            this.state.games.sort((a, b) => a.title > b.title ? 1 : -1 )
        }
        else if( sort === 6 ) {
            this.state.games.sort((a, b) => a.title > b.title ? -1 : 1 )
        }
    }

    componentDidMount() {
        GameApiService.getGames()
        .then(this.setGames)
        .then(AuthApiService.getUserName(this.state.user))
        .then(this.setUser)
        .catch(error => this.setState({ error: error }))
    }

    render() {  
        this.sortGames()
        let { games } = this.state;
        if (this.state.search !== '') {
            games = games.filter(g => g.title.toLowerCase().includes(this.state.search.toLowerCase()));
        }
        return (
            <>
                <h1 className='welcome_statement'>Welcome back!</h1>
                <nav className='game_review_nav'>
                    <NavLink />
                </nav>
                <p role='alert' className='red'>{this.state.error}</p>
                <section className='sort_search_box'>
                    { this.searchBar() }
                    { this.sortOptions() }
                </section>
                <Link to='/quest-form'><button className='add_quest_button'> + Add Game</button></Link>
                <ul className='quest_list'>
                    {games.map((game, index) => 
                        <Game
                        key={game.id}
                        gameCount={index}
                        {...game}
                        />
                    )}
                </ul>
            </>
        )
    }
}