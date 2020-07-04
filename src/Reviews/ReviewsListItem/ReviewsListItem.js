import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './ReviewsListItem.css'
export default class ReviewsListItem extends Component {

    formatDate = date => {
        let splitDate = date.split('-')
        let formatDate = `${splitDate[1]} - ${splitDate[2]} - ${splitDate[0]}`
        return formatDate
    }
    render() {
        const dateReviewCreated = this.formatDate(this.props.date_created.split('T')[0])


        return (
            <Link to={`/reviews/${this.props.id}`} className='review_list_link'>
            <li className='review_list_item'>
                <div className='review_title'>{this.props.title}</div>
                <div>${this.props.rating}</div>
                <div>{dateReviewCreated}</div>
            </li>
            </Link>
        )
    }
}