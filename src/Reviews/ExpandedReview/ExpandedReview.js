import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import ReviewForm from '../ReviewForm/ReviewForm'
import ReviewApiService from '../../services/reviews-api-service'
import './ExpandedReview.css'
export default class ExpandedReview extends Component {
    state = {
        review: [],
        editing: false,
        error: null,
        deleting: false,
        redirect: false
    }

    setReview = review => {
        this.setState({
            review,
            error: null
        })
    }

    handleEditClick = () => {
        this.setState({
            editing: true,
        })
    }

    renderExpandedReview = () => {
        let { review } = this.state
        return (
            <section className="expanded_review_box">
                <section className="expanded_buttons">
                    <Link to='/reviews'><button className="return_button">Return</button></Link>
                    <button className="edit_button" onClick={this.handleEditClick}>Edit</button>
                </section>
                <ul className='expanded_review'>
                    <li id='review_title'>{review.title}</li>
                    <li id="review_rating_header">Rating: ${review.rating}.00</li>
                    <li id="review_time_played_header">{review.time_played} hours played</li>
                    <li id="review_box"><strong>Your thoughts...</strong> <br/>{review.review}</li>
                </ul>
                <button onClick={this.handleToggleDelete} id='delete_button'>Delete</button>
            </section>
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
            <ReviewForm
                review={this.state.review}
                editing={true}
            />
        )
    }

    deleteReview = () => {
        ReviewApiService.deleteReview(this.state.review.id)
        .then(() => {
            this.setState({
                redirect: true
            })
        })
    }

    renderDeleteForm = () => {
        return (
            <section className='delete_confirmation'>
                <p>Are you sure you want to delete this review?</p>
                <p>"{this.state.review.title}"</p>
                <button onClick={this.handleToggleDelete} id="no_button">No</button>
                <button onClick={this.deleteReview} id="yes_button">Yes</button>
            </section>
        )
    }

    componentDidMount() {
        const reviewId = this.props.match.params.id
        ReviewApiService.getReview(reviewId)
        .then(this.changeImportanceFromNumToString)
        .then(this.setReview)
    }
    

    render() {
        if(this.state.redirect) {
            return <Redirect to='/reviews'/>
        }
        return (
            <>
                <div className='expanded_review'>
                    {this.state.editing 
                        ? this.renderEditForm()
                        : this.state.deleting 
                        ? this.renderDeleteForm()
                        : this.renderExpandedReview()
                    }
                </div>
            </>
        )

    }
}