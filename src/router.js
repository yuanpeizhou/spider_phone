import React from "react";
import {
  Switch,
  Route
} from "react-router-dom";

import Imgs from '../src/components/pages/Imgs/list'
import ImgsInfo from '../src/components/pages/ImgsInfo/index'
import ImgsHome from "../src/components/pages/imgsHome/index";
import YankongImgsList from "./components/pages/YankongImgs/list";
import YankongImgsInfo from "./components/pages/YankongImgs/info";


// Each logical "route" has two components, one for
// the sidebar and one for the main area. We want to
// render both of them in different places when the
// path matches the current URL.

// We are going to use this route config in 2
// spots: once for the sidebar and once in the main
// content section. All routes are in the same
// order they would appear in a <Switch>.
const routes = [
	{
		path: '/',
		component : ImgsHome,
		routes: [
			{
				path: '/yankong_imgs/list/:page',
				component : YankongImgsList,
			},
			{
				path: '/yankong_imgs/info/:id',
				component : YankongImgsInfo,
			}

		]
	},
	{
		path: '/imgs/list/:page',
		component : Imgs,
		routes : [
			{
				path: "/imgs/info/:id",
				component: ImgsInfo,
			}
		]
	},
];

/**渲染路由组件 */
export default function RouteConfigExample() {
	return (
		<Switch>
			{RouteWithSubRoutes(routes)}
		</Switch>
	);
}

/**
 * 递归生成路由结构
 * @param {路由树} routes 
 */
function RouteWithSubRoutes(routes) {
	let res = []
	routes.forEach((item, index) => {
		res.push(<Route key={Date.parse(new Date()) + index}  exact path={item.path} component={item.component} />)

		if(item.routes){
			res.push(RouteWithSubRoutes(item.routes)) 
		}
	});

	return (res)
}


