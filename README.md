# React Native Timeline Listview
Timeline component for React Native App work for Android and iOS



|![simulator screen shot mar 23 2560 be 4 47 08 pm](https://cloud.githubusercontent.com/assets/21040043/24242008/190fa2f8-0fe9-11e7-87b6-bffe2252dffb.png)
|![simulator screen shot mar 23 2560 be 4 47 12 pm](https://cloud.githubusercontent.com/assets/21040043/24242012/1b6c45c4-0fe9-11e7-8703-c2042988cabc.png)
|![simulator screen shot mar 23 2560 be 4 47 27 pm](https://cloud.githubusercontent.com/assets/21040043/24242021/211c7bb0-0fe9-11e7-8c6d-061edf0a4d5d.png)
|
|----------|----------|----------|

## Installation
```
npm i react-native-timeline-listview --save
```

## Basic Usage
![simulator screen shot mar 23 2560 be 4 47 03 pm](https://cloud.githubusercontent.com/assets/21040043/24268525/9c716634-1040-11e7-9496-3cfae0a959ee.png)
```jsx
import Timeline from 'react-native-timeline-listview'

constructor(){
    super()
    this.data = [
      {time: '09:00', title: 'Event 1', description: 'Event 1 Description'},
      {time: '10:45', title: 'Event 2', description: 'Event 2 Description'},
      {time: '12:00', title: 'Event 3', description: 'Event 3 Description'},
      {time: '14:00', title: 'Event 4', description: 'Event 4 Description'},
      {time: '16:30', title: 'Event 5', description: 'Event 5 Description'}
    ]
  } 

render(){
    return(
        <Timeline 
          data={this.data}
        />
    )
}
```
[see full basic example](https://github.com/thegamenicorus/react-native-timeline-listview/blob/master/examples/Example/pages/basicExample.js)

## Custom
![simulator screen shot mar 23 2560 be 4 47 08 pm](https://cloud.githubusercontent.com/assets/21040043/24242008/190fa2f8-0fe9-11e7-87b6-bffe2252dffb.png)
```jsx
render(){
    return(
        <Timeline 
          //..other props
          circleSize={20}
          circleColor='rgb(45,156,219)'
          lineColor='rgb(45,156,219)'
          timeContainerStyle={{minWidth:52, marginTop: -5}}
          timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
          descriptionStyle={{color:'gray'}}
          options={{
            style:{paddingTop:5}
          }}
        />
    )
}
```
[see full custom example](https://github.com/thegamenicorus/react-native-timeline-listview/blob/master/examples/Example/pages/customExample.js)

## Circle Dot
![simulator screen shot mar 23 2560 be 4 47 12 pm](https://cloud.githubusercontent.com/assets/21040043/24242012/1b6c45c4-0fe9-11e7-8703-c2042988cabc.png)
```jsx
render(){
    return(
        <Timeline 
          //..other props
          innerCircle={'dot'}
        />
    )
}
```
[see full circle dot example](https://github.com/thegamenicorus/react-native-timeline-listview/blob/master/examples/Example/pages/dotExample.js)

## Icon
![simulator screen shot mar 23 2560 be 4 47 16 pm](https://cloud.githubusercontent.com/assets/21040043/24269056/6772109e-1042-11e7-9462-b9ecdc3e05c6.png)
```jsx
constructor(){
    super()
    this.data = [
      {time: '09:00', title: 'Archery Training', description: 'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ',lineColor:'#009688', icon: require('../img/archery.png')},
      {time: '10:45', title: 'Play Badminton', description: 'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.', icon: require('../img/badminton.png')},
      {time: '12:00', title: 'Lunch', icon: require('../img/lunch.png')},
      {time: '14:00', title: 'Watch Soccer', description: 'Team sport played between two teams of eleven players with a spherical ball. ',lineColor:'#009688', icon: require('../img/soccer.png')},
      {time: '16:30', title: 'Go to Fitness center', description: 'Look out for the Best Gym & Fitness Centers around me :)', icon: require('../img/dumbbell.png')}
    ]
  } 
render(){
    return(
        <Timeline 
          //..other props
          innerCircle={'icon'}
        />
    )
}
```
[see full icon example](https://github.com/thegamenicorus/react-native-timeline-listview/blob/master/examples/Example/pages/iconExample.js)

More info ... Coming Soon :D
