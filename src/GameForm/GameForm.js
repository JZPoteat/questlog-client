import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import GameApiService from '../services/game-api-service'
// import TokenService from '.././services/TokenService'
// import AuthApiService from '../services/auth-api-service'

export default class GameForm extends Component {
    state = {
        title: '',
        priority: '',
        est_time: '',
        loc: '',
        notes: '',
        error: null,
        editing: false,
        redirect: false
    }
    
    setTitle = e => {
        this.setState({
            title: e.target.value,    
        })
    }

    setPriority = e => {
        this.setState({
            priority: e.target.value,     
        })
    }

    setEstTime = e => {
        console.log(e.target.value)
        this.setState({
            est_time: e.target.value,     
        })
    }

    setLocation = e => {
        this.setState({
            loc: e.target.value,    
        })
    }

    setNotes = e => {
        console.log(e.target.value)
        this.setState({
            notes: e.target.value,   
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        const { title, priority, est_time, loc, notes } = this.state
        if(!this.validateEstTime(est_time)) {
            this.setState({
                error: 'Please enter a valid "estimated time" in hours'
            })
        }
        else if(this.props.editing) {
            GameApiService.updateGame(this.props.game.id, title, priority, est_time, loc, notes)
            .then(() => {
                this.setState({
                    title: '',
                    priority: '1',
                    est_time: '',
                    loc: '',
                    notes: '',
                    redirect: true
                })
            })
            .catch(error => console.log(error))
        }
        else {
            GameApiService.postGame(title, priority, est_time, loc, notes)
            .then(() => {
                this.setState({
                    title: '',
                    priority: '1',
                    est_time: '',
                    loc: '',
                    notes: '',
                    redirect: true
                })
            })
            .catch(error => {console.log(error)})
        }
        
    }

    validateEstTime(est_time) {
        if(isNaN(Number(est_time))) {
            return false
        }
        return true
    }

    checkProps = () => {
        if(this.props.game) {
            this.setState({
                title: this.props.game.title,
                priority: this.props.game.importance,
                est_time: this.props.game.est_time,
                loc: this.props.game.loc,
                notes: this.props.game.notes
            })
        }
    }
    componentDidMount() {
        this.checkProps()
    }


    render() {
        const { error } = this.state
        if(this.state.redirect) {
            return <Redirect to='/games' />
        }
        return (
            <form 
            className='add_game_form'
            onSubmit={this.handleSubmit}
            >
                <p role='alert'>{error}</p>
                <div className='add_game_text_title'>
                    <label htmlFor='add_game_title'>
                        Title
                    </label>
                    <input required type='text' value={this.state.title} name='title' id='add_game_title' onChange={this.setTitle} />
                </div>
                <div className='add_game_priority'>
                    <label htmlFor='add_game_priority'>
                        Priority 
                    </label>
                <select required name='priority' id='add_game_priority' onChange={this.setPriority} value={this.state.priority}>
                    <option value='1'>Low</option>
                    <option value='2'>Medium</option>
                    <option value='3'>High</option>
                </select>
                </div>
                <div className='add_game_est_time'>
                    <label htmlFor='add_game_est_time'>
                        Estimated time
                    </label>
                <input required type='text' name='est_time' value={this.state.est_time} id='add_game_est_time' onChange={this.setEstTime}/>hours
                </div>
                <div className='add_game_location'>
                    <label htmlFor='add_game_location'>
                        Location 
                    </label>
                <input required type='text' name='location' value={this.state.loc} id='add_game_location' onChange={this.setLocation}/>
                </div>
                <div className='add_game_notes'>
                    <label htmlFor='add_game_notes'>
                        Additional Notes 
                    </label>
                <input required type='text' name='notes' id='add_game_notes' value={this.state.notes} onChange={this.setNotes}/>
                </div>
                <div className='add_game_buttons'>
                <Link to='/games'><button type='button'>Cancel</button> </Link>
                <button type='submit'>Submit</button> 
                </div>   
            </form>
        )
    }
}

GameForm.defaultProps = {
    game: {
        title: '',
        priority: '1',
        est_time: '',
        loc: '',
        notes: ''
    }
}
