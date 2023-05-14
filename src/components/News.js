import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";



export default class News extends Component {
    static defaultProps = {
        country: ' in',
        pageSize: 3,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    articles = []
    constructor(props) {
        super(props);
        this.state = {
            articles: this.articles,
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} - NewsChimps`;
    }
    //getting Date from news api
    async updateNews(pageNo) {
        this.props.setProgress(0);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&page=${this.state.page}&apiKey=bb7799dd22ec4d83abafc5eef098a574&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(30);

        let parsedData = await data.json();
        this.props.setProgress(50);

        this.setState(
            {
                articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false
            })
        this.props.setProgress(100);

    }
    async componentDidMount() {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bb7799dd22ec4d83abafc5eef098a574&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true });
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
        this.updateNews();
    }

    handlePrevious = async () => {
        // console.log("next")
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bb7799dd22ec4d83abafc5eef098a574&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true });
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // this.setState({ articles: parsedData.articles, page: this.state.page - 1, loading: false })
        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    }
    handleNext = async () => {
        // console.log("next"
        // if (this.state.page > Math.floor(this.state.totalResults / this.props.pageSize)) {

        // } else {
        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bb7799dd22ec4d83abafc5eef098a574&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        //     this.setState({ loading: true });
        //     let data = await fetch(url);
        //     let parsedData = await data.json();
        //     this.setState({ articles: parsedData.articles, page: this.state.page + 1, loading: false })
        this.setState({ page: this.state.page + 1 });
        this.updateNews();
    }

    fetchMoreData = async () => {
        this.setState({
            page: this.state.page + 1
        })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&page=${this.state.page}&apiKey=bb7799dd22ec4d83abafc5eef098a574&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState(
            {
                articles: this.state.articles.concat(parsedData.articles), totalResults: parsedData.totalResults, loading: false
            })
    }
    render() {
        return (
            <>
                <div className="row"><h1 className='text-center'>NewsChimps - Top {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} Head Lines</h1></div>

                {/* {this.state.loading && <Spinner />} */}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}>
                    <div className='container my-3'>
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return (
                                    <div div className="col-md-4" key={element.url} >
                                        <NewsItem title={!element.title ? "" : element.title.slice(0, 50)} description={!element.description ? "" : element.description.slice(0, 88)} imgUrl={!element.urlToImage ? "https://img.etimg.com/thumb/msid-100045625,width-1070,height-580,imgsize-185672,overlay-economictimes/photo.jpg" : element.urlToImage} newUrl={element.url} source={element.source.name} author={!element.author ? "unknown" : element.author} date={element.publishedAt}></NewsItem>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark mx-2" onClick={this.handlePrevious}>&larr; Previous</button>
                    <button disabled={this.state.page > Math.floor(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark mx-2" onClick={this.handleNext}>Next &rarr; </button>
                </div>; */}
            </ >
        )
    }
}
