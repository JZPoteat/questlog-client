import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import config from '../config'
import TokenService from '../services/TokenService'
import GameForm from '../GameForm/GameForm'
import GameApiService from '../services/game-api-service'

export default class ExpandedGame extends Component {
    state = {
        game: [],
        editing: false,
        error: null,
        deleting: false,
        redirect: false
    }

    changeImportanceFromNumToString = (game) => {
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
    }

    setGame = game => {
        console.log('setting state');
        this.setState({
            game,
            error: null
        })
    }

    handleEditClick = () => {
        this.setState({
            editing: true,
        })
    }

    renderExpandedGame = () => {
        let { game } = this.state
        return (
            <>
                <Link to='/games'><button>Return</button></Link>
                <button className='edit_game_button' onClick={this.handleEditClick}>Edit</button>
                <ul className='expanded_game'>
                    <li>Title: {game.title}</li>
                    <li>Priority: {game.importance}</li>
                    <li>Estimated time: {game.est_time}</li>
                    <li>Location: {game.loc}</li>
                    <li>Notes: {game.notes}</li>
                </ul>
                <button onClick={this.handleToggleDelete}>Delete</button>
            </>
        )
    }

    handleToggleDelete = () => {
        const newDeleteState = !this.state.deleting
        this.setState({
            deleting: newDeleteState
        })
    }

    renderEditForm = () => {
        return (
            <GameForm
                game={this.state.game}
                editing={true}
            />
        )
    }

    deleteGame = () => {
        GameApiService.deleteGame(this.state.game.id)
        .then(() => {
            this.setState({
                redirect: true
            })
        })
    }

    renderDeleteForm = () => {
        return (
            <section className='delete_confirmation'>
                <p>Are you sure you want to delete this quest?</p>
                <button onClick={this.handleToggleDelete}>No</button>
                <button onClick={this.deleteGame}>Yes</button>
            </section>
        )
    }

    componentDidMount() {
        const gameId = this.props.match.params.id
        console.log(gameId)
        GameApiService.getGame(gameId)
        .then(this.changeImportanceFromNumToString)
        .then(this.setGame)
    }
    

    render() {
        if(this.state.redirect) {
            return <Redirect to='/games'/>
        }
        return (
            <>
                <div className='expanded_game'>
                    {this.state.editing 
                        ? this.renderEditForm()
                        : this.renderExpandedGame()
                    }
                </div>
                <div className='delete_confirmation_container'>
                    {this.state.deleting
                        ? this.renderDeleteForm()
                        : ''
                    }
                </div>
            </>
        )

    }
}