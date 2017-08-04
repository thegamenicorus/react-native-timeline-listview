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
let defaultInnerCircle = 'none'

export default class Timeline extends Component {
  constructor(props, context) {
    super(props, context);

    this._renderRow = this._renderRow.bind(this)

    this.renderTime = (this.props.renderTime?this.props.renderTime:this._renderTime).bind(this)
    this.renderDetail = (this.props.renderDetail?this.props.renderDetail:this._renderDetail).bind(this)
    this.renderCircle = (this.props.renderCircle?this.props.renderCircle:this._renderCircle).bind(this)
    this.renderEvent = this._renderEvent.bind(this)
    this.isRenderSeparator = this.props.separator != null?this.props.separator:true
    this.onEventPress = this.props.onEventPress

    this.state = {
      data: this.props.data,
      dataSource: ds.cloneWithRows(this.props.data),
      x: 0,
      width: 0
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      data: nextProps.data,
      dataSource: ds.cloneWithRows(nextProps.data)
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
    var content = null

    switch(this.props.columnFormat){
      case 'single-column-left':
        content = (
          <View style={[styles.rowContainer, this.props.rowContainerStyle]}>
            {this.renderTime(rowData, sectionID, rowID)}
            {this.renderEvent(rowData, sectionID, rowID)}
            {this.renderCircle(rowData, sectionID, rowID)}
          </View>
        )
      break
      case 'single-column-right':
        content = (
          <View style={[styles.rowContainer, this.props.rowContainerStyle]}>
            {this.renderEvent(rowData, sectionID, rowID)}
            {this.renderTime(rowData, sectionID, rowID)}
            {this.renderCircle(rowData, sectionID, rowID)}
          </View>
        )
      break
      case 'two-column':
        content = rowID%2==0?(
          <View style={[styles.rowContainer, this.props.rowContainerStyle]}>
            {this.renderTime(rowData, sectionID, rowID)}
            {this.renderEvent(rowData, sectionID, rowID)}
            {this.renderCircle(rowData, sectionID, rowID)}
          </View>
        ):(
          <View style={[styles.rowContainer, this.props.rowContainerStyle]}>
            {this.renderEvent(rowData, sectionID, rowID)}
            {this.renderTime(rowData, sectionID, rowID)}
            {this.renderCircle(rowData, sectionID, rowID)}
          </View>
        )
      break
    }
      return (
        <View key={rowID}>
            {content}
        </View>
      )
  }

  _renderTime(rowData, sectionID, rowID) {
      var timeWrapper = null
      switch(this.props.columnFormat){
        case 'single-column-left':
          timeWrapper = {
            alignItems: 'flex-end'
          }
        break
        case 'single-column-right':
          timeWrapper = {
            alignItems: 'flex-start'
          }
        break
        case 'two-column':
          timeWrapper = {
            flex:1,
            alignItems: rowID%2==0?'flex-end':'flex-start'
          }
        break
      }
      return (
        <View style={timeWrapper}>
        <View style={[styles.timeContainer, this.props.timeContainerStyle]}>
          <Text style={[styles.time, this.props.timeStyle]}>{rowData.time}</Text>
        </View>
        </View>
      )
  }

  _renderEvent(rowData, sectionID, rowID){
    let lineWidth = rowData.lineWidth?rowData.lineWidth:this.props.lineWidth
    let isLast = this.props.renderFullLine?this.props.renderFullLine:this.state.data.slice(-1)[0] === rowData
    let lineColor = isLast?('rgba(0,0,0,0)'):(rowData.lineColor?rowData.lineColor:this.props.lineColor)
    var opStyle = null

    switch(this.props.columnFormat){
      case 'single-column-left':
        opStyle = {
          borderColor: lineColor,
          borderLeftWidth: lineWidth,
          borderRightWidth: 0,
          marginLeft: 20,
          paddingLeft: 20,
        }
      break
      case 'single-column-right':
        opStyle = {
          borderColor: lineColor,
          borderLeftWidth: 0,
          borderRightWidth: lineWidth,
          marginRight: 20,
          paddingRight: 20,
        }
      break
      case 'two-column':
        opStyle = rowID%2==0?{
          borderColor: lineColor,
          borderLeftWidth: lineWidth,
          borderRightWidth: 0,
          marginLeft: 20,
          paddingLeft: 20,
        }:{
          borderColor: lineColor,
          borderLeftWidth: 0,
          borderRightWidth: lineWidth,
          marginRight: 20,
          paddingRight: 20,
        }
      break
    }

    return (
      <View style={[styles.details, opStyle]} onLayout={(evt)=> { if(!this.state.x && !this.state.width){var {x,width} = evt.nativeEvent.layout;this.setState({x, width})}}}>
      <TouchableOpacity disabled={this.props.onEventPress == null}
        style={[ this.props.detailContainerStyle]}

        onPress={() => this.props.onEventPress?this.props.onEventPress(rowData):null}
      >
        <View style={{paddingTop:10, paddingBottom:10}}>
          {this.renderDetail(rowData, sectionID, rowID)}
        </View>
        {this._renderSeparator()}
      </TouchableOpacity>
      </View>
    )
  }

  _renderDetail(rowData, sectionID, rowID) {
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

  _renderCircle(rowData, sectionID, rowID){
      var circleSize = rowData.circleSize?rowData.circleSize:this.props.circleSize?this.props.circleSize:defaultCircleSize
      var circleColor = rowData.circleColor?rowData.circleColor:this.props.circleColor?this.props.circleColor:defaultCircleColor
      var lineWidth = rowData.lineWidth?rowData.lineWidth:this.props.lineWidth?this.props.lineWidth:defaultLineWidth

      var circleStyle = null

      switch(this.props.columnFormat){
      case 'single-column-left':
        circleStyle = {
          width: this.state.x?circleSize:0,
          height: this.state.x?circleSize:0,
          borderRadius: circleSize/2,
          backgroundColor: circleColor,
          left: this.state.x - (circleSize/2) + ((lineWidth-1)/2),
        }
      break
      case 'single-column-right':
        circleStyle = {
          width: this.state.width?circleSize:0,
          height: this.state.width?circleSize:0,
          borderRadius: circleSize/2,
          backgroundColor: circleColor,
          left: this.state.width - (circleSize/2) - ((lineWidth-1)/2),
        }
      break
      case 'two-column':
        circleStyle = {
          width: this.state.width?circleSize:0,
          height: this.state.width?circleSize:0,
          borderRadius: circleSize/2,
          backgroundColor: circleColor,
          left: this.state.width - (circleSize/2) - ((lineWidth-1)/2),
        }

      break
    }

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
    innerCircle: defaultInnerCircle,
    columnFormat: 'single-column-left'
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
    //alignItems: 'stretch',
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
  details: {
    borderLeftWidth: defaultLineWidth,
    flexDirection: 'column',
    flex: 1,
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
