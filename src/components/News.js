import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  


  // for class based code 
  // constructor(props) {
  //   super(props);
  //   console.log("Hello i am a constructor from news component");
  //   this.state = {
  //     articles: [],
  //     loading: false,
  //     page: 1,
  //     totalResults: 0
  //   }

  // }

  const updateNews = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json()
    props.setProgress(70);
    console.log(parsedData);
    setArticles(parsedData.articles);
    setLoading(false);
    setTotalResults(parsedData.totalResults);
    props.setProgress(100);

  }

  useEffect(() => {
    updateNews();
    document.title = `NewsTop - ${props.category}`
  }, [])

  // async componentDidMount() {
  //   this.updateNews();
  //   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=1344ccd2a4744fb6986c673ef5b6e9ba&page=1&pageSize=${props.pageSize}`;
  //   this.setState({loading: true});
  //   let data =  await fetch(url);
  //  let parsedData = await data.json()
  //  console.log(parsedData);
  //  this.setState({articles: parsedData.articles,
  //   totalResults: parsedData.totalResults,
  //   loading: false
  // })


  const fetchMoreData = async () => {

    
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1);
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);

  }








  return (
    <>

      <h1 className="text-center " style={{margin: '60px 0px 0px 0px '  }}>NewsToday - Top {props.category} Headlines</h1>
      {loading && <Spinner/>}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className='container my-3'>
          <div className="row">
            {
              articles.map((element) => {
                return <div className="col-md-4" key={element.url}>
                  <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              })}

          </div>
        </div>
      </InfiniteScroll>

    </>
  )

 


}
News.defaultProps = {
  country: 'in',
  pageSize: 9,
  category: 'general',
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,

}
export default News