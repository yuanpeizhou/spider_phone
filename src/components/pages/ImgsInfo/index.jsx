import React from "react";

import {getImgsInfo, img_host} from '../../../api';


export default class ImgsInfo extends React.Component {
  constructor(props) {

    super(props);

    this.state = {
      list: []
    };

    this.loadData = this.loadData.bind(this);

  }
  componentDidMount(){
    this.loadData()
  }

  /*加载数据*/
  loadData(current = 1,pageSize = 10,isInit = true){
    const _this = this 

    const params = {
      id : _this.props.match.params.id
    }

    getImgsInfo('imgs/info','get',params,function(res){

      const data = res.img_list.map((item , index) => {
        var temp = []
        temp['key'] = item.id
        temp['url'] = img_host + item.img_local_url
        return temp
      })

      _this.setState({
        list : data,
        rose_name: res.rose_name
      });
    })
  }
  render() {
    return <div>
      <p className="rose_title">{this.state.rose_name}</p>
      {this.state.list.map((item,index) => {
        return <div key={index} style={{display:"flex", justifyContent:"center"}}>
          <img style={{ margin: '16px 0',width : '90%', }} src={item.url} ></img>
        </div>
      })}
    </div>
  }
};

