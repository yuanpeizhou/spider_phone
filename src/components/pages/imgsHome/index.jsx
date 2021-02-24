import React from "react";

export default class ImgsHome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list : [
        {
          name: '24fa',
          path: '/imgs/list/1'
        },
        {
          name: '颜控网',
          path: '/yankong_imgs/list/1'
        }
        // ,{
        //   name : '1',
        //   path: ''
        // },{
        //   name : '1',
        //   path: ''
        // },{
        //   name : '1',
        //   path: ''
        // }
      ]
    };
  }
  componentDidMount(){

  }
  goModel(path){
    if(path){
      this.props.history.push({pathname: path,query:{page: 1}})
    }
  }

  render() {
    return  <div style={{ margin: '32px 0' }}>
      <div className="imgs_model_list">
        {
          this.state.list.map((item,index) => {
            return <div className="imgs_model_item" key={index} onClick={this.goModel.bind(this,item.path)}>{item.name}</div>
          })
        }
      </div>
    </div>
  }
};