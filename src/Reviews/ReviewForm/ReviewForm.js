import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import ReviewApiService from '../../services/reviews-api-service'
import './ReviewForm.css'
export default class ReviewForm extends Component {
    state = {
        title: '',
        rating: '',
        time_played: '',
        review: '',
        error: null,
        editing: false,
        redirect: false
    }
    
    setTitle = e => {
        this.setState({
            title: e.target.value,    
        })
    }

    setRating = e => {
        this.setState({
            rating: e.target.value,     
        })
    }

    setTimePlayed = e => {
        this.setState({
            time_played: e.target.value,     
        })
    }

    setReview = e => {
        this.setState({
            review: e.target.value,   
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        const { title, rating, time_played, review } = this.state
        if(!this.validateNumber(time_played)) {
            this.setState({
                error: 'Please enter a valid "time_played" in hours'
            })
        }
        else if(!this.validateNumber(rating)) {
            this.setState({
                error: 'Please enter a valid "rating" in dollars'
            })
        }
        else if(this.props.editing) {
            ReviewApiService.updateReview(this.props.review.id, title, rating, time_played, review)
            .then(() => {
                this.setState({
                    title: '',
                    rating: '',
                    time_played: '',
                    review: '',
                    redirect: true
                })
            })
            .catch(error => console.log(error))
        }
        else {
            ReviewApiService.postReview(title, rating, time_played, review)
            .then(() => {
                this.setState({
                    title: '',
                    rating: '',
                    time_played: '',
                    review: '',
                    redirect: true
                })
            })
            .catch(error => {console.log(error)})
        }
        
    }

    validateNumber(maybeNum) {
        if(isNaN(Number(maybeNum))) {
            return false
        }
        return true
    }

    checkProps = () => {
        if(this.props.review) {
            this.setState({
                title: this.props.review.title,
                rating: this.props.review.rating,
                time_played: this.props.review.time_played,
                review: this.props.review.review
            })
        }
    }
    componentDidMount() {
        this.checkProps()
    }


    render() {
        const { error } = this.state
        if(this.state.redirect) {
            return <Redirect to='/reviews' />
        }
        return (
            <form 
            className='add_review_form'
            onSubmit={this.handleSubmit}
            >
                <p role='alert'>{error}</p>
                <div className='add_review_text_area'>
                    <label htmlFor='add_review_title'>
                        Title
                    </label>
                    <input required type='text' value={this.state.title} name='title' className='text_box' id='add_review_title' onChange={this.setTitle} />
                </div>
                <div className='add_review_text_area'>
                    <label htmlFor='add_review_rating'>
                        Rating:
                    </label>
                <input required type='text' name='rating' value={this.state.rating} id='add_review_rating' className='text_box' onChange={this.setRating}/>
                </div>
                <div className='add_review_text_area'>
                    <label htmlFor='add_review_time_played'>
                        Time Played 
                    </label>
                <input required type='text' name='time_played' value={this.state.time_played} id='add_review_time_played' className='text_box' onChange={this.setTimePlayed}/>
                </div>
                <div className='add_review_text_area'>
                    <label htmlFor='add_review_review' id='notes_label'>
                        Thoughts... 
                    </label>
                <textarea required type='text' name='review' id='add_review_review' value={this.state.review} className='text_box' onChange={this.setReview}/>
                </div>
                <div className='add_review_buttons'>
                <Link to='/reviews'><button type='button' id='cancel_button'>Cancel</button> </Link>
                <button type='submit' id='submit_button'>Submit</button> 
                </div>   
            </form>
        )
    }
}

ReviewForm.defaultProps = {
        title: '',
        priority: '1',
        est_time: '',
        loc: '',
        notes: ''
}
