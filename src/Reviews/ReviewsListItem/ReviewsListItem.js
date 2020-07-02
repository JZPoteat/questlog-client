import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './ReviewsListItem.css'
export default class ReviewsListItem extends Component {
    render() {
        return (
            <Link to={`/reviews/${this.props.id}`} className='review_list_link'>
            <li className='review_list_item'>
                <div className='review_title'>{this.props.title}</div>
                <div>${this.props.rating}</div>
                <div>{this.props.date_created}</div>
            </li>
            </Link>
        )
    }
}