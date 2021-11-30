import React, { Component } from 'react'

export class NewsItem extends Component {
    
    render() {
        let {title, description, imageUrl, newsUrl, author, date, source} = this.props

        return (
            <div>
                <div className="card my-3">
                    <div style={{display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0'}}>
                    <span className="badge rounded-pull bg-danger">{source}</span>
                    </div>
                    <img src={imageUrl?imageUrl:"https://th.thgim.com/news/national/7nvfwi/article37679863.ece/ALTERNATES/FREE_660/85cd67c4-50e1-4b55-968a-8f742dfd7e95jpg"} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">By {author? author : "Unknown"} on {(new Date(date)).toGMTString()}</small></p>
                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem;
