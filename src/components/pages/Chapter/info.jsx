import React from "react";
import { Button,message } from 'antd';
import {getChapterInfo} from '../../../api';
// 

export default class ChapterInfo extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      last_id: 0,
      next_id: 0,
      content: "加载中..."
    };

    this.loadData = this.loadData.bind(this);
  }
  componentDidMount(){
    this.loadData(this.props.match.params.chapter_id)
  }
  goBack() {
    const book_id = localStorage.getItem('book_id')
    this.props.history.push({pathname:'/book/chapter/list/' + book_id})
  }
  goLast() {
    if (this.state.last_id == 0) {
      message.config({top: 150});
      message.info('已经到顶了');
      return false
    }
    this.props.history.push({pathname:'/book/chapter/info/' + this.state.last_id})

    // 重置滚动条
    window.scrollTo({top: 0});
    this.loadData(this.state.last_id)
  }
  goNext() {
    if (this.state.next_id == 0) {
      message.config({top: 150});
      message.info('已经到底了');
      return false
    }
    this.props.history.push({pathname:'/book/chapter/info/' + this.state.next_id})

    // 重置滚动条
    window.scrollTo({top: 0});
    this.loadData(this.state.next_id)
  }
  goBookList() {
    const page = localStorage.getItem('book_page')
    this.props.history.push({pathname:'/book/list/' + page})
  }

  /*加载数据*/
  loadData(chapter_id = 1){
    const _this = this 
    const params = {
      id : chapter_id
    }
    getChapterInfo(params,function(res){
      _this.setState({
        next_id: res.next_id,
        last_id: res.last_id,
        chapter_name: res.chapter_name,
        content: res.content != "" ? res.content : "没有数据...",
      });
    })
  }
  render() {
    return <div className="chaptper_page">
        <div className="chaptper_tool">
            <Button className="chapter_return" onClick={this.goLast.bind(this)}>上一章</Button>
            <Button className="chapter_return" onClick={this.goNext.bind(this)}>下一章</Button>
            <Button className="chapter_return" onClick={this.goBack.bind(this)}>返回章节</Button>
            <Button className="chapter_return" onClick={this.goBookList.bind(this)}>返回书籍</Button>
        </div>
        <pre className="chpater_content">
            <p className="chapter_content_name">{this.state.chapter_name}</p>
            <div dangerouslySetInnerHTML={{__html:this.state.content}} style={{whiteSpace: 'pre-wrap', fontSize: '18px'}}></div>
        </pre>
        <div className="chaptper_tool">
            <Button className="chapter_return" onClick={this.goLast.bind(this)}>上一章</Button>
            <Button className="chapter_return" onClick={this.goNext.bind(this)}>下一章</Button>
            <Button className="chapter_return" onClick={this.goBack.bind(this)}>返回章节</Button>
            <Button className="chapter_return" onClick={this.goBookList.bind(this)}>返回书籍</Button>
        </div>
    </div>
  }
};

