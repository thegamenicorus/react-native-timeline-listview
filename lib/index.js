'use strict';

import React, {Component} from 'react'

import {
  Animated,
  Easing,
  StyleSheet,
  ListView,
  Image,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'

import _ from 'lodash'

let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
});

let defaultCircleSize = 16
let defaultCircleColor = '#007AFF'
let defaultLineWidth = 2
let defaultLineColor = '#007AFF'
let defaultTimeTextColor = 'black'
let defaultDotColor = 'white'

export default class Timeline extends Component {
  constructor(props, context) {
    super(props, context);
    
    this._renderRow = this._renderRow.bind(this)
    
    this.renderTime = this.props.renderTime?this.props.renderTime:this._renderTime.bind(this)
    this.renderEvent = this.props.renderEvent?this.props.renderEvent:this._renderEvent.bind(this)
    this.renderIcon = this.props.renderIcon?this.props.renderIcon:this._renderCircle.bind(this)
    this.isRenderSeparator = this.props.separator != null?this.props.separator:true
    this.onTimelinePress = this.props.onTimelinePress
    this.state = {
      data: this.props.data,
      dataSource: ds.cloneWithRows(this.props.data),
      x: 0
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      data: this.props.data,
      dataSource: ds.cloneWithRows(this.props.data)
    })
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <ListView
          ref='listView'
          style={[styles.listview]}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          automaticallyAdjustContentInsets={false} 
          {...this.props.options}
          />
      </View>
    );
  }

  _renderRow(rowData, sectionID, rowID) {
    var lineWidth = rowData.lineWidth?rowData.lineWidth:this.props.lineWidth
    var isLast = this.state.data.slice(-1)[0] === rowData
    var lineColor = isLast?('rgba(0,0,0,0)'):(rowData.lineColor?rowData.lineColor:this.props.lineColor)
    let content = (
      <View style={[styles.rowContainer, this.props.rowContainerStyle]}>
        {this.renderTime(rowData, sectionID, rowID)}     
        <TouchableOpacity disabled={this.props.onTimelinePress == null} style={[styles.descriptionContainer, {borderColor: lineColor, borderLeftWidth: lineWidth}, this.props.descriptionContainerStyle]}
          onLayout={(evt)=> {if(this.state.x == 0)this.setState({x: evt.nativeEvent.layout.x})}}
          onPress={() => this.props.onTimelinePress?this.props.onTimelinePress(rowData):null}
        >    
          <View style={{paddingTop:10, paddingBottom:10}}>
            {this.renderEvent(rowData, sectionID, rowID)}
          </View>
          {this._renderSeparator()}
        </TouchableOpacity>
        {this.renderIcon(rowData)}
      </View>
    )  
      return (
        <View key={rowID}>
            {content}
        </View>
      )
  }

  _renderTime(rowData, sectionID, rowID) {
      return (
        <View style={[styles.timeContainer, this.props.timeContainerStyle]}>
          <Text style={[styles.time, this.props.timeStyle]}>{rowData.time}</Text>
        </View>
      )
  }

  _renderEvent(rowData, sectionID, rowID) {
    let title = <Text style={[styles.title, this.props.titleStyle]}>{rowData.title}</Text>
    if(rowData.description)
      title = (
        <View>
          <Text style={[styles.title, this.props.titleStyle]}>{rowData.title}</Text>
          <Text style={[styles.description, this.props.descriptionStyle]}>{rowData.description}</Text>
        </View>
      )
    return (
      <View style={styles.container}>
        {title}
      </View>
    )
  }

  _renderCircle(rowData){
      var circleSize = rowData.circleSize?rowData.circleSize:this.props.circleSize?this.props.circleSize:defaultCircleSize
      var circleColor = rowData.circleColor?rowData.circleColor:this.props.circleColor?this.props.circleColor:defaultCircleColor
      var lineWidth = rowData.lineWidth?rowData.lineWidth:this.props.lineWidth?this.props.lineWidth:defaultLineWidth

      let circleStyle = {
        width: this.state.x?circleSize:0,
        height: this.state.x?circleSize:0,
        borderRadius: circleSize/2,
        backgroundColor: circleColor,        
        left: this.state.x - (circleSize/2) + ((lineWidth-1)/2),       
      };
      var innerCircle = null
      switch(this.props.innerCircle){        
        case 'icon':
          let iconSource = rowData.icon?rowData.icon:this.props.icon
          let iconStyle = {
            height: circleSize,
            width: circleSize,
          }
          innerCircle = (<Image source={iconSource} style={[iconStyle, this.props.iconStyle]} />)
        break;
        case 'dot':
          let dotStyle = {
            height: circleSize / 2,
            width: circleSize / 2,
            borderRadius: circleSize / 4,
            backgroundColor: rowData.dotColor?rowData.dotColor:this.props.dotColor?this.props.dotColor:defaultDotColor
          }
          innerCircle = (<View style={[styles.dot, dotStyle]}/>)
        break;
      }
      return (
        <View style={[styles.circle, circleStyle, this.props.circleStyle]}>
          {innerCircle}
        </View>
      )
  }

  _renderSeparator(){
      if(this.isRenderSeparator)
        return (
            <View style={[styles.separator, this.props.separatorStyle]}></View>
        )
      else
        return null
  }
}

Timeline.defaultProps = {
    circleSize: defaultCircleSize,
    circleColor: defaultCircleColor,
    lineWidth: defaultLineWidth,
    lineColor: defaultLineColor,
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listview: {
    flex: 1,
  },
  sectionHeader: {
    marginBottom: 15,
    backgroundColor: '#007AFF',
    height: 30,
    justifyContent: 'center'
  },
  sectionHeaderText: {
    color: '#FFF',
    fontSize: 18,
    alignSelf: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  timeContainer: {    
    minWidth: 45
  },
  time: {
    textAlign: 'right',
    color: defaultTimeTextColor,
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 10,
    position: 'absolute',
    left: -8,
    alignItems: 'center',
	  justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: defaultDotColor,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  descriptionContainer: {
    borderLeftWidth: defaultLineWidth,
    flexDirection: 'column',
    flex: 1,
    marginLeft: 20,
    paddingLeft: 20,
  },
  description:{
    marginTop: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#aaa',
    marginTop: 10,
    marginBottom: 10
  }
});