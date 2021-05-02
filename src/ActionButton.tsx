import React from 'react';
import { View, TouchableOpacity, ViewStyle } from 'react-native';

interface ActionButtonType {
  onPress?: () => void;
  focused?: boolean;
  size?: number;
  color?: string;
  iconComponent?: React.ReactChild;
  //   iconFocused: boolean;
  style?: ViewStyle;
}

export default function ActionButton({
  onPress,
  focused,
  size = 60,
  color = 'cyan',
  iconComponent,
  style,
}: ActionButtonType) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          {
            width: size,
            height: size,
            borderRadius: size,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: focused ? 'gray' : color,
            // position: 'absolute',
            // marginTop: -20,
            alignSelf: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          },
          style,
        ]}
      >
        <View>{iconComponent}</View>
      </View>
    </TouchableOpacity>
  );
}
