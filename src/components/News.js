import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'
    }

    static propTypes ={
        country: PropTypes.string,
        pageSize: PropTypes.number,
    }

    constructor(props){
        super(props)
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 5
        }
        document.title = `NewsApp - ${this.props.category}`
    }

    async updateNews(){
        this.props.setProgress(10)
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e63c9253799c47d9908d8c8dbd47a7b9&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({loading: true})
        let data = await fetch(url);
        this.props.setProgress(50)
        let parseData = await data.json()
        this.props.setProgress(70)
        this.setState({articles: parseData.articles, totalResults: parseData.totalResults, loading: false})
        this.props.setProgress(100)
    
    }
    async componentDidMount(){
        this.props.setProgress(10)
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`
        this.setState({loading: true})
        let data = await fetch(url);
        this.props.setProgress(50)
        let parseData = await data.json()
        this.props.setProgress(70)
        this.setState({articles: parseData.articles, totalResults: parseData.totalResults, loading: false})
        this.props.setProgress(100)
    }

    handlePrev = async ()=>{
        // console.log("prev")
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e63c9253799c47d9908d8c8dbd47a7b9&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
        this.setState({loading: true})
        let data = await fetch(url)
        let parseData = await data.json()
        this.setState({
            page: this.state.page - 1,
            articles: parseData.articles,
            loading: false 
        })

    }
    handleNext =async ()=>{
        console.log("Next")
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e63c9253799c47d9908d8c8dbd47a7b9&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
        this.setState({loading: true})
        let data = await fetch(url)
        let parseData = await data.json()
        this.setState({
            articles: parseData.articles,
            page: this.state.page + 1,
            loading: false
        })
    }
    handleNext1 = async ()=>{
        this.setState({page: this.state.page + 1})
        this.updateNews()
    }
    fetchMoreData = async()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
        this.setState({
            page: this.state.page + 1
        })
        this.setState({loading: true})
        let data = await fetch(url);
        let parseData = await data.json()
        this.setState({articles: this.state.articles.concat(parseData.articles), totalResults: parseData.totalResults, loading: false})
    }
    render() {
        return (
            <>
                <h2 className="text-center" style={{marginTop: '85px'}}>NewsApp - Top {this.props.category} HeadLines</h2>
                {/* {this.state.loading?<Spinner/> : ""} */}
                {/* <div className="container d-flex justify-content-between">
                <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrev}>&larr; Previous</button>
                <button type="button" disabled={this.state.page * this.props.pageSize > this.state.totalResults} className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
                </div> */}
                <InfiniteScroll dataLength={this.state.articles.length} next={this.fetchMoreData} hasMore={this.state.articles.length!==this.state.totalResults} loader={<Spinner/>}>
                <div className="container">
                <div className="row">
                { this.state.articles.map((element)=>{
                    return <div className="col-md-4" key={element.url}>
                        <NewsItem title={element.title?element.title:""} source={element.source.name} description={element.description?element.description:""} author={element.author} date={element.publishedAt} newsUrl={element.url} imageUrl={element.urlToImage}/>
                    </div>
                })}
                </div>
                </div>
                </InfiniteScroll>  
            </>
        )
    }
}

export default News;
