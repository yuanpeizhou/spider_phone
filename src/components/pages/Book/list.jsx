import React from "react";
import { Pagination,Input,Button } from 'antd';
import {getBookList} from '../../../api';

const { Search } = Input;
export default class BookList extends React.Component {
  constructor(props) {

    super(props);
    const storePage = localStorage.getItem('book_page')
    const storeKeyword = localStorage.getItem('book_keyword')
    const current_page = storePage ? storePage : this.props.match.params.page

    console.log('接收页码',current_page)

    this.state = {
      list: [],
      current: current_page ? current_page : 1,
      pageSize : 10,
      total : 1,
      searchData: {
        keyword : storeKeyword ? storeKeyword : ''
      }
    };

    localStorage.removeItem('book_page')
    localStorage.removeItem('book_keyword')

    this.loadData = this.loadData.bind(this);
    this.changePage = this.changePage.bind(this)
    this.onSearch = this.onSearch.bind(this)
  }
  componentDidMount(){
    console.log('当前页',this.state.current)
    this.loadData(this.state.current ? this.state.current : 1)
  }
  /**翻页 */
  changePage(current){
    console.log('跳转到',current)
    this.props.history.push({pathname:'/book/list/' + current ,query:{page: current}})
    this.setState({
      current : current
    },function(){
      this.loadData(current)
    })
  }
  goChapter(book_id){
    localStorage.setItem('book_page',this.state.current)
    localStorage.setItem('book_keyword',this.state.searchData.keyword)
    localStorage.setItem('book_id', book_id)
    localStorage.removeItem('chapter_page')
    this.props.history.push({pathname:'/book/chapter/list/' + book_id ,query:{book_id: book_id}})
  }
  goBack(){
    this.props.history.push({pathname:'/'})
  }
  setCollect() {
    localStorage.setItem('book_collect',localStorage.getItem('book_collect') == 1 ? 2 : 1)
    this.loadData()
  }
  /*加载数据*/
  loadData(current = 1,pageSize = 10,isInit = true){
    const _this = this 
    const params = {
      page: current,
      limit : pageSize,
      keyword: this.state.searchData.keyword,
      collect: localStorage.getItem('book_collect'),
      website_id: localStorage.getItem('website_id')
    }
    getBookList(params,function(res){
      const data = res.data.map((item , index) => {
        var temp = []
        temp['key'] = item.id
        temp['book_name'] = item.book_name
        temp['author_name'] = item.author_name
        temp['book_words'] = item.book_words
        temp['collect'] = item.collect
        temp['last_update_date'] = item.last_update_date
        return temp
      })
      _this.setState({
        list : data,
        current : res.current_page,
        pageSize : res.per_page,
        total: res.total
      });
    })
  }
  onSearch(e){
    this.loadData()
  }
  changeInput(e){
    const field = e.target
    const searchData = this.state.searchData
    searchData[field.name] = field.value
    this.setState({
      searchData 
    })
  }
  render() {
    return  <div style={{ margin: '32px 0' }}>
        <div>
          <Button className="collect_button" onClick={this.setCollect.bind(this)}>只看收藏</Button>
          <Button className="return_button" onClick={this.goBack.bind(this)}>返回</Button>
        </div>
        <div className="imgs_head">
          <Search
            name="keyword"
            placeholder="请输入搜索内容"
            allowClear
            enterButton="搜索"
            size="large"
            onSearch={this.onSearch}
            value={this.state.searchData.keyword}
            onChange={this.changeInput.bind(this)}
          />
        </div>
        {this.state.list.map((item,index) => {
          return <div key={index} className="book_list">
            <div className="book_box" onClick={this.goChapter.bind(this,item.key)}>
              <div className="book_box_header">
                <span className="book_name">{item.book_name}</span>
                <span className="book_last_update_date">{item.last_update_date}</span>                
              </div>
              <div className="book_box_foot">
                <span className="book_author">作者：{item.author_name}</span>
                <span className="book_words">字数：{item.book_words}</span>
                <span className="book_collect">{item.collect == 2 ? '已收藏' : ''}</span>
              </div>
            </div>
          </div>
        })}
        <Pagination className="imgs_paginate" current={this.state.current} total={this.state.total} onChange={(current) => this.changePage(current)}/>
    </div>
  }
};