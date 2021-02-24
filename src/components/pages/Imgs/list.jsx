import React from "react";
import { Pagination,Input,Button } from 'antd';
import {getImgsList} from '../../../api';

const { Search } = Input;
export default class ImgsList extends React.Component {
  constructor(props) {

    super(props);
    const storePage = localStorage.getItem('img_page')
    const storeKeyword = localStorage.getItem('img_keyword')
    const img_id = storePage ? storePage : this.props.match.params.page

    localStorage.removeItem('img_page')

    console.log('接收页码',img_id)

    this.state = {
      list: [],
      current: img_id ? img_id : 1,
      pageSize : 10,
      total : 1,
      searchData: {
        keyword : storeKeyword ? storeKeyword : ''
      }
    };

    localStorage.removeItem('img_keyword')

    // console.log(this.state.current)
    this.loadData = this.loadData.bind(this);
    this.changePage = this.changePage.bind(this)
    this.changePage = this.changePage.bind(this)
    this.onSearch = this.onSearch.bind(this)
    // this.goInfo = this.goInfo.bind(this)
  }
  componentDidMount(){
    console.log('当前页',this.state.current)
    this.loadData(this.state.current ? this.state.current : 1)
  }
  /**翻页 */
  changePage(current){
    console.log('跳转到',current)
    this.props.history.push({pathname:'/imgs/list/' + current ,query:{page: current}})
    this.setState({
      current : current
    },function(){
      this.loadData(current)
    })
  }
  goInfo(id){
    localStorage.setItem('img_page',this.state.current)
    localStorage.setItem('img_keyword',this.state.searchData.keyword)
    this.props.history.push({pathname:'/imgs/info' + '/' + id ,query:{id: id}})
  }
  goBack(){
    this.props.history.push({pathname:'/'})
  }
  /*加载数据*/
  loadData(current = 1,pageSize = 10,isInit = true){
    const _this = this 
    const params = {
      page: current,
      limit : pageSize,
      keyword: this.state.searchData.keyword
    }
    getImgsList(params,function(res){
      const data = res.data.map((item , index) => {
        var temp = []
        temp['key'] = item.id
        temp['name'] = item.name
        temp['number'] = item.number
        temp['img_list'] = item.img_list
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
          return <div key={index}>
            <h1 onClick={this.goInfo.bind(this,item.key)} style={{ margin: '10px 0' }}>{item.name}({item.number})</h1>
            <div className="imgs_img_list">
              {
                item.img_list.map((img_item,img_index) => {
                  return <div key={index + img_index}>
                    <img style={{width : '100px', margin : "5px 10px"}} src={'http://192.168.6.98/book_spider/' + img_item.local_url}></img>
                  </div>
                })
              }
            </div>
          </div>
        })}
        <Pagination className="imgs_paginate" current={this.state.current} total={this.state.total} onChange={(current) => this.changePage(current)}/>
    </div>
  }
};