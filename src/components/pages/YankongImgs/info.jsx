import React from "react";

import {getYankongImgsInfo,img_host} from '../../../api';


export default class YankongImgsInfo extends React.Component {
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

    getYankongImgsInfo(params,function(res){

      const data = res.map((item , index) => {
        var temp = []
        temp['key'] = item.id
        temp['url'] = img_host + item.local_url
        return temp
      })

      _this.setState({
        list : data,
      });
    })
  }
  render() {
    return <div>
        {this.state.list.map((item,index) => {
          return <div key={index}>
            <img style={{ margin: '16px 0',width : '100%' }} src={item.url}></img>
          </div>
        })}
    </div>
  }
};

