import React from "react";
import { Pagination,Button,message } from 'antd';
import {getChapterList, collectAction} from '../../../api';

export default class ChapterList extends React.Component {
  constructor(props) {

    super(props);
    const storePage = localStorage.getItem('chapter_page')
    const current_page = storePage ? storePage : this.props.match.params.page
    this.state = {
      list: [],
      current: current_page ? current_page : 1,
      pageSize : 10,
      total : 1,
      book_id: 0,
      collect: 1
    };

    this.loadData = this.loadData.bind(this);
    this.changePage = this.changePage.bind(this)
  }
  componentDidMount(){
    this.loadData(this.state.current ? this.state.current : 1)
  }
  /**翻页 */
  changePage(current){
    console.log('触发翻页')
    this.props.history.push({pathname:'/book/chapter/list/' + this.props.match.params.book_id ,query:{page: current}})
    this.setState({
      current : current
    },function(){
      localStorage.setItem('chapter_page', current)
      this.loadData(current)
    })
  }
  /**查看章节详情 */
  goInfo(chapter_id){
    this.props.history.push({pathname:'/book/chapter/info/' + chapter_id})
  }
  goBookList() {
    const page = localStorage.getItem('book_page')
    this.props.history.push({pathname:'/book/list/' + page})
  }
  /**加入或取消收藏 */
  changeCollect(action) {
    const _this = this 
    const params = {
      type: 1,
      id: this.state.book_id,
      action: action
    }
    collectAction(params, function(res) {
      console.log(res)
      message.config({top: 150});
      if (res.code != 200) {
        message.error(res.message);
      } else {
        message.info(res.message);
        _this.setState({
          collect : action
        })
      }
    })
    return true
  }
  /*加载数据*/
  loadData(current = 1,pageSize = 10,isInit = true){
    const _this = this 
    const params = {
      page: current,
      limit : pageSize,
      id : _this.props.match.params.book_id
    }
    getChapterList(params,function(res){
      const data = res.chapter_list.data.map((item , index) => {
        var temp = []
        temp['key'] = item.id
        temp['chapter_name'] = item.chapter_name
        return temp
      })
      _this.setState({
        book_id: res.book.id,
        collect: res.book.collect,
        list : data,
        current : res.chapter_list.current_page,
        pageSize : res.chapter_list.per_page,
        total: res.chapter_list.total
      });
    })
  }
  render() {
    return  <div style={{ margin: '32px 0' }}>
        <div className="chaptper_tool">
          <Button type="primary" className="chapter_return" onClick={this.goBookList.bind(this)}>返回</Button>
          {
            this.state.collect == 1 ? <Button type="primary" className="chapter_return" onClick={this.changeCollect.bind(this, 2)}>收藏</Button> : <Button type="primary" className="chapter_return" onClick={this.changeCollect.bind(this, 1)}>取消收藏</Button>
          }
        </div>
        {this.state.list.map((item,index) => {
          return <div key={index} className="chapter_list">
            <div className="chapter_box" onClick={this.goInfo.bind(this,item.key)}>
              <span className="chapter_name">{item.chapter_name}</span>
            </div>
          </div>
        })}
        <Pagination className="imgs_paginate" current={this.state.current} total={this.state.total} onChange={(current) => this.changePage(current)}/>
    </div>
  }
};