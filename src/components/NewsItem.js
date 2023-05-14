import React, { Component } from 'react'

export default class NewsItem extends Component {
    // constructor() {
    //     super();
    // }
    render() {
        let { title, description, imgUrl, newUrl, author, date, source } = this.props;
        return (
            <div className='my-3'>
                <div className="card" >
                    <img src={imgUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}..</p>
                        <a href={newUrl} className="btn btn-warning btn-sm">Read More</a>
                        <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ zIndex: 1, left: '90%' }}>
                            {source}
                        </span>
                    </div>
                    <div className="card-footer">
                        <small className="text-body-secondary">Last updated by {author} on {new Date(date).toGMTString()}</small>
                    </div>
                </div>
            </div>
        )
    }
}
