# React Native Timeline Listview
Timeline component for React Native App work for Android and iOS

![untitled-1](https://cloud.githubusercontent.com/assets/21040043/24750025/8c8d044e-1aef-11e7-8fd7-7d64431af7e4.png)

**Table of Contents**
- [Installation](#installation)
- Usage
  - [Basic usage](#basic-usage)
  - [Custom example](#custom)
  - [Circle dot example](#circle-dot)
  - [Icon example](#icon)
  - [Override render example](#override-render)
  - [Pull to refresh and load more example](#pull-to-refresh-and-load-more)
- Column Format (in v.0.2.0)
  - [Single column right](#single-column-right)
  - [Two column](#two-column)
  - [Time container hiding](#hide-time)
- Configuration
  - [Data Object](#data-object)
  - [Timeline](#timeline)
- [Shift problem](#shift-problem)

## Installation
```
npm i react-native-timeline-listview --save
```

## Basic Usage
![image2](https://cloud.githubusercontent.com/assets/21040043/24320617/6a7494ea-116b-11e7-9cf5-12244f5eec58.png)
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
![image3](https://cloud.githubusercontent.com/assets/21040043/24320631/9df21a86-116b-11e7-8865-2631d35bc640.png)
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
![image4](https://cloud.githubusercontent.com/assets/21040043/24320644/f5bc5b0a-116b-11e7-9252-2c9fc2361dc9.png)
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
![image5](https://cloud.githubusercontent.com/assets/21040043/24320654/1c5de27e-116c-11e7-95cc-750d55e001b8.png)
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
![image6](https://cloud.githubusercontent.com/assets/21040043/24320661/36fe76e8-116c-11e7-950f-2968aef312bb.png)
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

renderDetail(rowData, sectionID, rowID) {
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

## Pull to refresh and load more
![rflm](https://cloud.githubusercontent.com/assets/21040043/26756369/304d2e7a-48cb-11e7-816d-66e8d40a97ee.png)
```jsx

onRefresh(){
  //set initial data
}

onEndReached() {
  //fetch next data
}

renderFooter() {
    //show loading indicator
    if (this.state.waiting) {
        return <ActivityIndicator />;
    } else {
        return <Text>~</Text>;
    }
}

render(){
    return(
        <Timeline
          //..other props
          options={{
            refreshControl: (
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this.onRefresh}
              />
            ),
            renderFooter: this.renderFooter,
            onEndReached: this.onEndReached
          }}
        />
    )
}
```
[see full refresh and load more example](https://github.com/thegamenicorus/react-native-timeline-listview/blob/master/examples/Example/pages/refreshLoadMoreExample.js)

## Column Format
### Single Column Right
![simulator screen shot apr 6 2560 be 5 19 51 pm](https://cloud.githubusercontent.com/assets/21040043/24749469/60a7869e-1aed-11e7-9c41-f87f866b2d8d.png)
```jsx
render(){
    return(
        <Timeline
          //..other props
          columnFormat='single-column-right'
        />
    )
}
```
[see full single column right example](https://github.com/thegamenicorus/react-native-timeline-listview/blob/master/examples/Example/pages/singleRightExample.js)

### Two Column
![simulator screen shot apr 6 2560 be 5 05 32 pm](https://cloud.githubusercontent.com/assets/21040043/24749638/0515f210-1aee-11e7-82af-082d93efb618.png)
```jsx
render(){
    return(
        <Timeline
          //..other props
          columnFormat='two-column'
        />
    )
}
```
[see full two column example](https://github.com/thegamenicorus/react-native-timeline-listview/blob/master/examples/Example/pages/twoColumnExample.js)

### Time container hiding
![showTime](https://user-images.githubusercontent.com/6987730/35145888-fae0f1e2-fd3b-11e7-9571-2143342512c8.png)
```jsx
render(){
    return(
        <Timeline
          //..other props
          showTime={false}
        />
    )
}
```


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
| innerCircle | string | null | timeline mode : 'none', 'dot', 'icon' |
| separator | bool | true | render separator line of events |
| columnFormat | string | 'single-left' | can be 'single-column-left', 'single-column-right', 'two-column' |
| lineWidth | int | 2 | timeline line width  |
| lineColor | string | '#007AFF' | timeline line color |
| circleSize | int | 16 | timeline circle size |
| circleColor | string | '#007AFF' | timeline circle color |
| dotColor | string | 'white' | timeline dot color (innerCircle = 'dot') |
| icon | obj(image source) | null | timeline icon (innerCircle = 'color') |
| style | object | null | custom styles of Timeline container |
| listViewStyle | object | null | custom styles of inner ListView |
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
| renderFullLine | bool | false | render event border on last timeline item |
| options | object | null | ListView properties|
| showTime | boolean | true | Time container options|


## Shift problem

Text width of event time may not be the same.

![untitled-1](https://cloud.githubusercontent.com/assets/21040043/24321589/78d0c77c-1182-11e7-9c0f-69ebe591cb14.png)

fix by add 'minWidth' in 'timeContainerStyle' to appropriate value

```jsx
render(){
    return(
        <Timeline
          //..other props
          timeContainerStyle={{minWidth:72}}
        />
    )
}
```

## Timeline is rendered, but not displayed until scroll

fix by add removeClippedSubviews: false into options

```jsx
render(){
    return(
        <Timeline
          //..other props
          options={{
            removeClippedSubviews: false
          }}
        />
    )
}
```
