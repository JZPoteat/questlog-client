import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../services/TokenService'
import './Home.css'
export default class Home extends Component {

    renderLoggedIn = () => {

        return(

            <section className='welcome_back_section'>
                <h2 id='welcome_statement'>Welcome back adventurer!</h2>
                <section id='game_review_selection_box'>
                    <p id='game_review_selection_title'>Please select one of the following</p>
                    <section id='game_review_options'>
                        <Link to='/games'><p id='games_tab'>Games</p></Link>
                        <Link to='/reviews'><p id='reviews_tab'>Reviews</p></Link>
                    </section>
                </section>
            </section>

        )

    }

    renderNotLoggedIn = () => {
        return (
            <section className='welcome_section'>
                <h1 id='welcome_statement'>Gaming to the next <i>level</i></h1>
                <section id='welcome_box'>
                    <p>Store your games in one place</p>
                    <p>Write and read reviews that <strong>actually make sense!</strong></p>
                    <Link to='/signup'><p id='here_button'>Start your journey here!</p></Link>
                    <p>To check out a demo account, use the following credentials.</p>
                    <p>Username: jacob</p>
                    <p>Password: Password1!</p>
                </section>
            </section>
        )
    }
    render() {
        return (
            <div className='Home_page'>
                {TokenService.hasAuthToken()
                    ? this.renderLoggedIn()
                    : this.renderNotLoggedIn()
                }
            </div>
        )
    }
}