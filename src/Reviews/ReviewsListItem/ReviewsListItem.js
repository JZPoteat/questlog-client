import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './ReviewsListItem.css'
export default class ReviewsListItem extends Component {
    render() {
        const dateReviewCreated = this.props.date_created.split('T')[0]

//         <p id="demo"></p>
// <script>
// let d = new Date("2020-07-02");
// document.getElementById("demo").innerHTML = d;
// </script>
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