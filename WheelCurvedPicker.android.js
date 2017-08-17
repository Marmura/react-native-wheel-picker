'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ColorPropType,
  requireNativeComponent,
} from 'react-native';

class WheelCurvedPicker extends Component {
  static propTypes = {
    ...View.propTypes,
    data: PropTypes.array,
    
    textColor: ColorPropType,
    
    textSize: PropTypes.number,
    
    itemStyle: PropTypes.object,
    
    itemSpace: PropTypes.number,
    
    onValueChange: PropTypes.func,
    
    selectedValue: PropTypes.any,
    
    selectedIndex: PropTypes.number,
  };
  
  static defaultProps = {
    itemStyle: {color: 'white', fontSize: 26},
    itemSpace: 20,
  };
  
  constructor(props) {
    super(props);
    this.state = this._stateFromProps(this.props);
    this._onValueChange = this._onValueChange.bind(this);
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState(this._stateFromProps(nextProps));
  }
  
  _stateFromProps(props) {
    let selectedIndex = 0;
    let items = [];
    
    React.Children.forEach(props.children, (child, index) => {
      if (child.props.value === props.selectedValue) {
        selectedIndex = index;
      }
      items.push({value: child.props.value, label: child.props.label});
    });
    
    const textSize = props.itemStyle.fontSize;
    const textColor = props.itemStyle.color;
    
    return {selectedIndex, items, textSize, textColor};
  }
  
  _onValueChange(e) {
    if (this.props.onValueChange) {
      this.props.onValueChange(e.nativeEvent.data);
    }
  }
  
  render() {
    return (
      <WheelCurvedPickerNative {...this.props}
                               onValueChange={this._onValueChange}
                               data={this.state.items}
                               textColor={this.state.textColor}
                               textSize={this.state.textSize}
                               selectedIndex={parseInt(
                                 this.state.selectedIndex)}
      />
    );
  }
}

const WheelCurvedPickerNative = requireNativeComponent('WheelCurvedPicker',
  WheelCurvedPicker);

class Item extends Component {
  static propTypes = {
    value: PropTypes.any,
    label: PropTypes.string,
  };
  
  render() {
    return null;
  }
}

export default {WheelCurvedPicker, Item};