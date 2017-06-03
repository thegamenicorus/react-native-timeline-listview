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
  TouchableOpacity,
  StatusBar
} from 'react-native';

export default class Example extends Component {
  constructor(){
    super()

    this.goto = this.goto.bind(this)
  }

  goto(page){
    this.props.navigator.push(page)
  }

  render() {
    return (
			<View style={styles.container}>
        <StatusBar barStyle='light-content' />
        <TouchableOpacity style={styles.button} onPress={() => this.goto({name:'basic', title:'Basic Example'})}>
          <Text style={styles.menu}>Basic Example</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.goto({name:'custom', title:'Custom Example'})}>
          <Text style={styles.menu}>Custom Example</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.goto({name:'dot', title:'Circle Dot Example'})}>
          <Text style={styles.menu}>Circle Dot Example</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.goto({name:'icon', title:'Icon Example'})}>
          <Text style={styles.menu}>Icon Example</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.goto({name:'press', title:'Press Example'})}>
          <Text style={styles.menu}>Press Example</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.goto({name:'override', title:'Override Render Example'})}>
          <Text style={styles.menu}>Override Render Example</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.goto({name:'single-right', title:'Single Right Example'})}>
          <Text style={styles.menu}>Single Column Right Example</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.goto({name:'two-column', title:'Two Column Example'})}>
          <Text style={styles.menu}>Two Column Example</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.goto({name:'refresh-loadmore', title:'Refresh Load More'})}>
          <Text style={styles.menu}>Refresh and Loadmore</Text>
        </TouchableOpacity>
			</View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'white'
  },
  button:{
    padding:10,
  },
  menu: {
    fontSize: 20
  }
});
