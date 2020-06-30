import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './GameListItem.css'
export default class GameListItem extends Component {
    render() {
        return (
            <Link to={`/games/${this.props.id}`}>
            <li className='game_list_item'>
                <div>Title: {this.props.title}</div>
                <div>Priority: {this.props.importance}</div>
                <div>Estimated time: {this.props.est_time} hours</div>
            </li>
            </Link>
        )
    }
}