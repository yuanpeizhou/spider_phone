import React from "react";

import { Layout } from 'antd';
import Router from '../../../router';
import 'antd/dist/antd.css';


const {Content} = Layout;

class Home extends React.Component {
  componentDidMount(){
    // console.log('我打印啦',this.props)
    // console.log('加载了')
    // console.log(addNameCreater('ceshi'))
    // axios.get('http://192.168.6.19/blog_server/public/api/article/list', {
    //   params: {
    //     // ID: 12345
    //   }
    // })
    // .then(function (response) {
    //   console.log(response);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
  }
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Layout className="site-layout">
          <Content>
            <Router /> 
          </Content>
          {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
        </Layout>
      </Layout>
    );

    {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
  }
};

export default Home;