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
    this.onEventPress = this.onEventPress.bind(this)
    this.renderSelected = this.renderSelected.bind(this)
    this.data = [
      {time: '09:00', title: 'Archery Training', description: 'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ',lineColor:'#009688', icon: require('../img/archery.png')},
      {time: '10:45', title: 'Play Badminton', description: 'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.', icon: require('../img/badminton.png')},
      {time: '12:00', title: 'Lunch', icon: require('../img/lunch.png')},
      {time: '14:00', title: 'Watch Soccer', description: 'Team sport played between two teams of eleven players with a spherical ball. ',lineColor:'#009688', icon: require('../img/soccer.png')},
      {time: '16:30', title: 'Go to Fitness center', description: 'Look out for the Best Gym & Fitness Centers around me :)', icon: require('../img/dumbbell.png')}
    ]
    this.state = {selected: null}
  } 

  onEventPress(data){
    this.setState({selected: data})
  }

  renderSelected(){
      if(this.state.selected)
        return <Text style={{marginTop:10}}>Selected event: {this.state.selected.title} at {this.state.selected.time}</Text>
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderSelected()}
        <Timeline 
          style={styles.list}
          data={this.data}
          circleSize={20}
          circleColor='rgba(0,0,0,0)'
          lineColor='rgb(45,156,219)'
          timeContainerStyle={{minWidth:52, marginTop: -5}}
          timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
          descriptionStyle={{color:'gray'}}
          options={{
            style:{paddingTop:5}
          }}
          innerCircle={'icon'}
          onEventPress={this.onEventPress}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
	paddingTop:65,
    backgroundColor:'white'
  },
  list: {
    flex: 1,
    marginTop:20,
  },
});
