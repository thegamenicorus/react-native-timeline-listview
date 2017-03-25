# React Native Timeline Listview
Timeline component for React Native App work for Android and iOS



|![simulator screen shot mar 23 2560 be 4 47 08 pm](https://cloud.githubusercontent.com/assets/21040043/24242008/190fa2f8-0fe9-11e7-87b6-bffe2252dffb.png)
|![simulator screen shot mar 23 2560 be 4 47 12 pm](https://cloud.githubusercontent.com/assets/21040043/24242012/1b6c45c4-0fe9-11e7-8703-c2042988cabc.png)
|![simulator screen shot mar 23 2560 be 4 47 27 pm](https://cloud.githubusercontent.com/assets/21040043/24242021/211c7bb0-0fe9-11e7-8c6d-061edf0a4d5d.png)
|
|----------|----------|----------|

**Table of Contents**
- [Installation](#installation)
- Usage
  - [Basic usage](#basic-usage)
  - [Custom example](#custom)
  - [Circle dot example](#circle-dot)
  - [Icon example](#icon)
  - [Override render example](#override-render)
- [Configuration](#configuration)
  - [Data Object](#data-object)
  - [Timeline](#timeline)

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

## Override Render
![simulator screen shot mar 23 2560 be 4 47 27 pm](https://cloud.githubusercontent.com/assets/21040043/24242021/211c7bb0-0fe9-11e7-8c6d-061edf0a4d5d.png)
```jsx
constructor(){
    super()
    this.renderEvent = this.renderEvent.bind(this)

    this.data = [
      {
        time: '09:00', 
        title: 'Archery Training', 
        description: 'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ',
        lineColor:'#009688', 
        icon: require('../img/archery.png'),
        imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240340/c0f96b3a-0fe3-11e7-8964-fe66e4d9be7a.jpg'
      },
      {
        time: '10:45', 
        title: 'Play Badminton', 
        description: 'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.', 
        icon: require('../img/badminton.png'),
        imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240405/0ba41234-0fe4-11e7-919b-c3f88ced349c.jpg'
      },
      {
        time: '12:00', 
        title: 'Lunch', 
        icon: require('../img/lunch.png'),
      },
      {
        time: '14:00', 
        title: 'Watch Soccer', 
        description: 'Team sport played between two teams of eleven players with a spherical ball. ',
        lineColor:'#009688', 
        icon: require('../img/soccer.png'),
        imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240419/1f553dee-0fe4-11e7-8638-6025682232b1.jpg'
      },
      {
        time: '16:30', 
        title: 'Go to Fitness center', 
        description: 'Look out for the Best Gym & Fitness Centers around me :)', 
        icon: require('../img/dumbbell.png'),
        imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240422/20d84f6c-0fe4-11e7-8f1d-9dbc594d0cfa.jpg'
      }
    ]
  } 
  
renderEvent(rowData, sectionID, rowID) {
    let title = <Text style={[styles.title]}>{rowData.title}</Text>
    var desc = null
    if(rowData.description && rowData.imageUrl)
      desc = (
        <View style={styles.descriptionContainer}>   
          <Image source={{uri: rowData.imageUrl}} style={styles.image}/>
          <Text style={[styles.textDescription]}>{rowData.description}</Text>
        </View>
      )
    
    return (
      <View style={{flex:1}}>
        {title}
        {desc}
      </View>
    )
  }

render(){
    return(
        <Timeline 
          //..other props
          renderEvent={this.renderEvent}
        />
    )
}
```
[see full override render example](https://github.com/thegamenicorus/react-native-timeline-listview/blob/master/examples/Example/pages/overrideRenderExample.js)

## Configuration
#### Data Object:
| Property | Type | Default | Description |
|---------------|----------|-------------|----------------------------------------------------------------|
| time | string | null | event time |
| title | string | null | event title |
| description | string | null | event description |
| lineWidth | int | same as lineWidth of 'Timeline' | event line width  |
| lineColor | string | same as lineColor of 'Timeline' | event line color |
| circleSize | int | same as circleSize of 'Timeline' | event circle size |
| circleColor | string | same as circleColor of 'Timeline' | event circle color |
| dotColor | string | same as dotColor of 'Timeline' | event dot color (innerCircle = 'dot') |
| icon | obj(image source) | same as icon of 'Timeline' | event icon (innerCircle = 'color') |

#### Timeline:
| Property | Type | Default | Description |
|---------------|----------|-------------|----------------------------------------------------------------|
| data | data object | null | timeline data |
| innerCircle | string | null | timeline mode canbe 'none', 'dot', 'icon' |
| isRenderSeparator | bool | true | render separator line of events |
| lineWidth | int | 2 | timeline line width  |
| lineColor | string | '#007AFF' | timeline line color |
| circleSize | int | 16 | timeline circle size |
| circleColor | string | '#007AFF' | timeline circle color |
| dotColor | string | 'white' | timeline dot color (innerCircle = 'dot') |
| icon | obj(image source) | null | timeline icon (innerCircle = 'color') |
| style | object | null | custom styles of Timeline |
| timeStyle | object | null | custom styles of event time |
| titleStyle | object | null | custom styles of event title |
| descriptionStyle | object | null | custom styles of event description |
| iconStyle | object | null | custom styles of event icon |
| separatorStyle | object | null | custom styles of separator |
| rowContainerStyle | object | null | custom styles of event container |
| timeContainerStyle | object | null | custom styles of container of event time  |
| detailContainerStyle| object | null | custom styles of container of event title and event description |
| onEventPress | function(event) | null | function to be invoked when event was pressed |
| renderTime | function(rowData, sectionID, rowID) | null | custom render event time |
| renderDetail | function(rowData, sectionID, rowID) | null | custom render event title and event description |
| renderCircle | function(rowData, sectionID, rowID) | null | custom render circle |

