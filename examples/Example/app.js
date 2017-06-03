/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator, 
  TouchableOpacity
} from 'react-native';

import Menu from './pages/menu'
import BasicExample from './pages/basicExample'
import CustomExample from './pages/customExample'
import DotExample from './pages/dotExample'
import IconExample from './pages/iconExample'
import PressExample from './pages/timelinePressExample'
import OverrideExample from './pages/overrideRenderExample'
import SingleRightExample from './pages/singleRightExample'
import TwoColumnExample from './pages/twoColumnExample'
import RefreshLoadMore from './pages/refreshLoadMoreExample'

export default class Example extends Component {
  constructor(){
    super()
    this.renderScene = this.renderScene.bind(this)
  }

  renderScene(route, nav){
    switch (route.name) {
			case 'menu':
				return <Menu navigator={nav}/>
			case 'basic':
				return <BasicExample navigator={nav}/>
			case 'custom':
				return <CustomExample navigator={nav}/>
			case 'dot':
				return <DotExample navigator={nav}/>
			case 'icon':
				return <IconExample navigator={nav}/>
      case 'press':
				return <PressExample navigator={nav}/>
      case 'override':
        return <OverrideExample navigator={nav}/>
      case 'single-right':
        return <SingleRightExample navigator={nav}/>
      case 'two-column':
        return <TwoColumnExample navigator={nav}/>
      case 'refresh-loadmore':
        return <RefreshLoadMore navigator={nav}/>
    }
  }

  render() {
		var NavigationBarRouteMapper = <Navigator.NavigationBar
						routeMapper={{
							LeftButton: (route, navigator, index, navState) =>
								{ 
									if (route.index === 0) {
										return null;
									} else {
										return (
											<TouchableOpacity onPress={() => navigator.pop()}>
												<Text style={styles.back}>Back</Text>
											</TouchableOpacity>
										);
									}
								},
							RightButton: (route, navigator, index, navState) =>
								{ return null },
							Title: (route, navigator, index, navState) =>
								{ return (<Text style={styles.title}>{route.title}</Text>); },
						}}
						style={{backgroundColor: '#009688'}}
					/>
    return (
      <Navigator
        initialRoute = {{name:'menu', title:"Timeline Listview", index: 0}}
        renderScene = {this.renderScene}
				navigationBar={NavigationBarRouteMapper}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white'
  },
	back: {
		paddingLeft:10,
		fontSize: 20,
		color: 'white',
    textAlign: 'center'
	},
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
