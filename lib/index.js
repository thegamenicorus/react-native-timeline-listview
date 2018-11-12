"use strict";

import React, { Component } from "react";
import {
  StyleSheet,
  FlatList,
  Image,
  View,
  Text,
  TouchableOpacity
} from "react-native";

const defaultCircleSize = 16;
const defaultCircleColor = "#007AFF";
const defaultLineWidth = 2;
const defaultLineColor = "#007AFF";
const defaultTimeTextColor = "black";
const defaultDotColor = "white";
const defaultInnerCircle = "none";

export default class Timeline extends Component {
  constructor(props, context) {
    super(props, context);

    this._renderRow = this._renderRow.bind(this);
    this.renderTime = (this.props.renderTime
      ? this.props.renderTime
      : this._renderTime
    ).bind(this);
    this.renderDetail = (this.props.renderDetail
      ? this.props.renderDetail
      : this._renderDetail
    ).bind(this);
    this.renderCircle = (this.props.renderCircle
      ? this.props.renderCircle
      : this._renderCircle
    ).bind(this);
    this.renderEvent = this._renderEvent.bind(this);

    this.state = {
      data: this.props.data,
      dataSource: this.props.data,
      x: 0,
      width: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data,
      dataSource: nextProps.data
    });
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <FlatList
          ref="listView"
          style={[styles.listview, this.props.listViewStyle]}
          data={this.state.dataSource}
          renderItem={this._renderRow}
          automaticallyAdjustContentInsets={false}
          keyExtractor={item => "element-" + item.index}
          {...this.props.options}
        />
      </View>
    );
  }

  _renderRow(rowData) {
    let content = null;

    switch (this.props.columnFormat) {
      case "single-column-left":
        content = (
          <View style={[styles.rowContainer, this.props.rowContainerStyle]}>
            {this.renderTime(rowData)}
            {this.renderEvent(rowData)}
            {this.renderCircle(rowData)}
          </View>
        );
        break;
      case "single-column-right":
        content = (
          <View style={[styles.rowContainer, this.props.rowContainerStyle]}>
            {this.renderEvent(rowData)}
            {this.renderTime(rowData)}
            {this.renderCircle(rowData)}
          </View>
        );
        break;
      case "two-column":
        content =
          rowData.index % 2 == 0 ? (
            <View style={[styles.rowContainer, this.props.rowContainerStyle]}>
              {this.renderTime(rowData)}
              {this.renderEvent(rowData)}
              {this.renderCircle(rowData)}
            </View>
          ) : (
            <View style={[styles.rowContainer, this.props.rowContainerStyle]}>
              {this.renderEvent(rowData)}
              {this.renderTime(rowData)}
              {this.renderCircle(rowData)}
            </View>
          );
        break;
    }
    return <View key={rowData.index}>{content}</View>;
  }

  _renderTime(rowData) {
    if (!this.props.showTime) {
      return null;
    }
    var timeWrapper = null;
    switch (this.props.columnFormat) {
      case "single-column-left":
        timeWrapper = {
          alignItems: "flex-end"
        };
        break;
      case "single-column-right":
        timeWrapper = {
          alignItems: "flex-start"
        };
        break;
      case "two-column":
        timeWrapper = {
          flex: 1,
          alignItems: rowData.index % 2 == 0 ? "flex-end" : "flex-start"
        };
        break;
    }
    return (
      <View style={timeWrapper}>
        <View style={[styles.timeContainer, this.props.timeContainerStyle]}>
          <Text style={[styles.time, this.props.timeStyle]}>
            {rowData.item.time}
          </Text>
        </View>
      </View>
    );
  }

  _renderEvent(rowData) {
    const lineWidth = rowData.item.lineWidth
      ? rowData.item.lineWidth
      : this.props.lineWidth;
    const isLast = this.props.renderFullLine
      ? !this.props.renderFullLine
      : this.state.data.slice(-1)[0] === rowData.item;
    const lineColor = isLast
      ? "rgba(0,0,0,0)"
      : rowData.item.lineColor
      ? rowData.item.lineColor
      : this.props.lineColor;
    let opStyle = null;

    switch (this.props.columnFormat) {
      case "single-column-left":
        opStyle = {
          borderColor: lineColor,
          borderLeftWidth: lineWidth,
          borderRightWidth: 0,
          marginLeft: 20,
          paddingLeft: 20
        };
        break;
      case "single-column-right":
        opStyle = {
          borderColor: lineColor,
          borderLeftWidth: 0,
          borderRightWidth: lineWidth,
          marginRight: 20,
          paddingRight: 20
        };
        break;
      case "two-column":
        opStyle =
          rowData.index % 2 == 0
            ? {
                borderColor: lineColor,
                borderLeftWidth: lineWidth,
                borderRightWidth: 0,
                marginLeft: 20,
                paddingLeft: 20
              }
            : {
                borderColor: lineColor,
                borderLeftWidth: 0,
                borderRightWidth: lineWidth,
                marginRight: 20,
                paddingRight: 20
              };
        break;
    }

    return (
      <View
        style={[styles.details, opStyle]}
        onLayout={evt => {
          if (!this.state.x && !this.state.width) {
            const { x, width } = evt.nativeEvent.layout;
            this.setState({ x, width });
          }
        }}
      >
        <TouchableOpacity
          disabled={this.props.onEventPress == null}
          style={[this.props.detailContainerStyle]}
          onPress={() =>
            this.props.onEventPress ? this.props.onEventPress(rowData) : null
          }
        >
          <View style={styles.detail}>{this.renderDetail(rowData)}</View>
          {this._renderSeparator()}
        </TouchableOpacity>
      </View>
    );
  }

  _renderDetail(rowData) {
    let title = rowData.item.description ? (
      <View>
        <Text style={[styles.title, this.props.titleStyle]}>
          {rowData.item.title}
        </Text>
        <Text style={[styles.description, this.props.descriptionStyle]}>
          {rowData.item.description}
        </Text>
      </View>
    ) : (
      <Text style={[styles.title, this.props.titleStyle]}>
        {rowData.item.title}
      </Text>
    );
    return <View style={styles.container}>{title}</View>;
  }

  _renderCircle(rowData) {
    var circleSize = rowData.item.circleSize
      ? rowData.item.circleSize
      : this.props.circleSize
      ? this.props.circleSize
      : defaultCircleSize;
    var circleColor = rowData.item.circleColor
      ? rowData.item.circleColor
      : this.props.circleColor
      ? this.props.circleColor
      : defaultCircleColor;
    var lineWidth = rowData.item.lineWidth
      ? rowData.item.lineWidth
      : this.props.lineWidth
      ? this.props.lineWidth
      : defaultLineWidth;

    var circleStyle = null;

    switch (this.props.columnFormat) {
      case "single-column-left":
        circleStyle = {
          width: this.state.x ? circleSize : 0,
          height: this.state.x ? circleSize : 0,
          borderRadius: circleSize / 2,
          backgroundColor: circleColor,
          left: this.state.x - circleSize / 2 + (lineWidth - 1) / 2
        };
        break;
      case "single-column-right":
        circleStyle = {
          width: this.state.width ? circleSize : 0,
          height: this.state.width ? circleSize : 0,
          borderRadius: circleSize / 2,
          backgroundColor: circleColor,
          left: this.state.width - circleSize / 2 - (lineWidth - 1) / 2
        };
        break;
      case "two-column":
        circleStyle = {
          width: this.state.width ? circleSize : 0,
          height: this.state.width ? circleSize : 0,
          borderRadius: circleSize / 2,
          backgroundColor: circleColor,
          left: this.state.width - circleSize / 2 - (lineWidth - 1) / 2
        };
        break;
    }

    var innerCircle = null;
    switch (this.props.innerCircle) {
      case "icon-color":
        let iconColorSource = rowData.item.icon
          ? rowData.item.icon
          : this.props.icon;
        let iconColorStyle = {
          height: circleSize,
          width: circleSize,
          tintColor: rowData.item.color
        };
        innerCircle = (
          <Image
            source={iconColorSource}
            style={[iconColorStyle, this.props.iconStyle]}
          />
        );
        break;
      case "icon":
        let iconSource = rowData.item.icon
          ? rowData.item.icon
          : this.props.icon;
        let iconStyle = {
          height: circleSize,
          width: circleSize
        };
        innerCircle = (
          <Image
            source={iconSource}
            style={[iconStyle, this.props.iconStyle]}
          />
        );
        break;
      case "dot":
        let dotStyle = {
          height: circleSize / 2,
          width: circleSize / 2,
          borderRadius: circleSize / 4,
          backgroundColor: rowData.item.dotColor
            ? rowData.item.dotColor
            : this.props.dotColor
            ? this.props.dotColor
            : defaultDotColor
        };
        innerCircle = <View style={[styles.dot, dotStyle]} />;
        break;
    }
    return (
      <View style={[styles.circle, circleStyle, this.props.circleStyle]}>
        {innerCircle}
      </View>
    );
  }

  _renderSeparator() {
    if (!this.props.separator) {
      return null;
    }
    return <View style={[styles.separator, this.props.separatorStyle]} />;
  }
}

Timeline.defaultProps = {
  circleSize: defaultCircleSize,
  circleColor: defaultCircleColor,
  lineWidth: defaultLineWidth,
  lineColor: defaultLineColor,
  innerCircle: defaultInnerCircle,
  columnFormat: "single-column-left",
  separator: false,
  showTime: true
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listview: {
    flex: 1
  },
  sectionHeader: {
    marginBottom: 15,
    backgroundColor: "#007AFF",
    height: 30,
    justifyContent: "center"
  },
  sectionHeaderText: {
    color: "#FFF",
    fontSize: 18,
    alignSelf: "center"
  },
  rowContainer: {
    flexDirection: "row",
    flex: 1,
    //alignItems: 'stretch',
    justifyContent: "center"
  },
  timeContainer: {
    minWidth: 45
  },
  time: {
    textAlign: "right",
    color: defaultTimeTextColor
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 10,
    position: "absolute",
    left: -8,
    alignItems: "center",
    justifyContent: "center"
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: defaultDotColor
  },
  title: {
    fontSize: 16,
    fontWeight: "bold"
  },
  details: {
    borderLeftWidth: defaultLineWidth,
    flexDirection: "column",
    flex: 1
  },
  detail: { paddingTop: 10, paddingBottom: 10 },
  description: {
    marginTop: 10
  },
  separator: {
    height: 1,
    backgroundColor: "#aaa",
    marginTop: 10,
    marginBottom: 10
  }
});
