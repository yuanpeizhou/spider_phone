import React from "react";
import { Pagination,Input,Button } from 'antd';
import {getVideoList, video_host} from '../../../api';
import Hls from 'hls.js';

const { Search } = Input;
export default class VideoList extends React.Component {
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
      pageSize : 5,
      total : 1,
      searchData: {
        keyword : storeKeyword ? storeKeyword : ''
      }
    };

    localStorage.removeItem('img_keyword')

    this.loadData = this.loadData.bind(this);
    this.changePage = this.changePage.bind(this)
    this.onSearch = this.onSearch.bind(this)
  }
  componentDidMount(){
    const _this = this 
    // 加载数据
    this.loadData(this.state.current ? this.state.current : 1)
  }
  /**翻页 */
  changePage(current){
    console.log('跳转到',current)
    this.props.history.push({pathname:'/video/list/' + current ,query:{page: current}})
    this.setState({
      current : current
    },function(){
      window.scrollTo({top: 0});
      this.loadData(current)
    })
  }
  goInfo(id){
    // localStorage.setItem('img_page',this.state.current)
    // localStorage.setItem('img_keyword',this.state.searchData.keyword)
    // this.props.history.push({pathname:'/imgs/info' + '/' + id ,query:{id: id}})
  }
  goBack(){
    this.props.history.push({pathname:'/'})
  }
  /*加载数据*/
  loadData(current = 1,pageSize = 5,isInit = true){
    const _this = this 
    const params = {
      page: current,
      limit : pageSize,
      website_id: localStorage.getItem('website_id'),
      keyword: this.state.searchData.keyword
    }
    getVideoList(params,function(res){
      const data = res.data.map((item , index) => {
        var temp = []
        temp['key'] = item.id
        temp['name'] = item.name
        temp['cover'] = item.web_cover
        temp['video_url'] = video_host + item.local_url
        return temp
      })

      
      _this.setState({
        list : data,
        current : res.current_page,
        pageSize : res.per_page,
        total: res.total
      }, () => {
        // 视频加载完后使用hls加载m3u8
        _this.state.list.map((item, index) => {
          _this.initHlsPlayer(item)
        })
      });
    })
  }
  initHlsPlayer(item) {
    const video = document.querySelector('#video' + item.key);
    const hls = new Hls();
    hls.loadSource(item.video_url);
    hls.attachMedia(video);
    // hls.on(Hls.Events.MANIFEST_PARSED, () => {
    //   video.play();
    // });
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
          return <div key={index} className="video_box" onClick={this.goInfo.bind(this,item.key)}>
            <h1 onClick={this.initHlsPlayer.bind(this, item)}>{item.name}</h1>
            <video  id={"video" + item.key} poster={item.cover}  className="video_item"  controls></video>
            {/* <div className="imgs_img_list">
              {
                item.img_list.map((img_item,img_index) => {
                  return <div key={index + img_index} >
                    <img style={{width : '100px', margin : "5px 10px"}} src={img_host + img_item.img_local_url}></img>
                  </div>
                })
              }
            </div> */}
          </div>
        })}
        <Pagination className="imgs_paginate" current={this.state.current} total={this.state.total} onChange={(current) => this.changePage(current)}/>
    </div>
  }
};