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

More info ... Coming Soon :D
