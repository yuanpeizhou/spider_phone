import React from "react";

export default class ImgsHome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list : [
        {
          name: "taiav",
          path: "/video/list/1",
          website_id: 4
        },
        {
          name: '24fa',
          path: '/imgs/list/1',
          website_id: 5
        },
        {
          name: 'xchina',
          path: '/imgs/list/1',
          website_id: 3
        },
        {
          name: '第一版主',
          path: '/book/list/1',
          website_id: 1
        },
        {
          name: "第一版主2",
          path: '/book/list/1',
          website_id: 2
        }
      ]
    };
  }
  componentDidMount(){

  }
  goModel(item){
    localStorage.setItem('website_id', item.website_id)
    this.props.history.push({pathname: item.path,query:{page: 1}})
  }

  render() {
    return  <div style={{ margin: '32px 0' }}>
      <div className="imgs_model_list">
        {
          this.state.list.map((item,index) => {
            return <div className="imgs_model_item" key={index} onClick={this.goModel.bind(this,item)}>{item.name}</div>
          })
        }
      </div>
    </div>
  }
};