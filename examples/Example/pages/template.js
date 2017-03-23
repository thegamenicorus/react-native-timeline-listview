/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Timeline from 'react-native-timeline-listview'

export default class Example extends Component {
  constructor(){
    super()
    this.data = [
      {time: '09:00', title: 'Archery Training', description: 'Event 1 Description', icon: require('../img/archery.png')},
      {time: '10:45', title: 'Event 2', description: 'Event 2 Description', icon: require('../img/badminton.png')},
      {time: '12:00', title: 'Event 3', description: 'Event 3 Description', icon: require('../img/lunch.png')},
      {time: '14:00', title: 'Event 4', description: 'Event 4 Description', icon: require('../img/soccer.png')},
      {time: '16:30', title: 'Event 5', description: 'Event 5 Description', icon: require('../img/dumbbell.png')}
    ]
  } 

  render() {
    //'rgb(45,156,219)'
    return (
      <View style={styles.container}>
        <Timeline 
          style={styles.list}
          data={this.data}
          //separator={true}
          circleSize={20}
          circleColor='rgba(0,0,0,0)'
          //circleStyle={{borderWidth:1}}
          //dotColor='yellow'
          //lineWidth={2}
          //lineColor='rgb(45,156,219)'
          //timeTextStyle={{color:'green'}}
          //timeContainerStyle={{minWidth: 65}}
          //titleStyle={{color:'green'}}
          //descriptionStyle={{color:'red'}}
          innerCircle={'icon'}
          //iconStyle={{backgroundColor:'white'}}
          //separatorStyle={{backgroundColor: 'green'}}
          //scrollEnabled={false}
          options={{
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
		paddingTop:65
  },
  list: {
    flex: 1,
    marginTop:20,
  },
});
