import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ViewStyle,
  Animated,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import ActionButton from './ActionButton';

const AnimatedTab = Animatable.createAnimatableComponent(TouchableOpacity);

interface TabBarType {
  tabItemStyle?: ViewStyle;
  labelStyle?: ViewStyle;
  labelPosition?: 'below-icon' | 'beside-icon';
  actionButtonVisible?: boolean;
  actionButtonPosition?: 'middle' | number;
  actionButtonComponent?: React.ReactChild;
  actionButtonIcon?: React.ReactChild;
  actionButtonPress?: () => void;
  backgroundColor?: string;
  focusAnimation?: string;
  type?: 'top-line' | 'bottom-line' | 'simple';
  [x: string]: any;
}

export default function MyTabBar({
  state,
  descriptors,
  navigation,
  activeTintColor,
  inactiveTintColor,
  // activeBackgroundColor,
  // inactiveBackgroundColor,
  showLabel = true,
  labelPosition,
  labelStyle,
  // renderIcon = true,
  backgroundColor,
  focusAnimation,
  tabItemStyle,
  actionButtonVisible = true,
  actionButtonPosition = 2,
  actionButtonComponent,
  actionButtonIcon,
  actionButtonPress,
  inSafeArea = true,
  type = 'top-line',
}: TabBarType) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const [tabbarDims, settabbarDims] = useState({ width: 0, height: 0 });
  const [animation] = useState(new Animated.Value(0));

  const routes = state.routes;
  // const tabItemWith = tabbarDims.width / routes.length;
  const tabItemWith =
    tabbarDims.width /
    (actionButtonVisible ? routes.length + 1 : routes.length);

  const position =
    actionButtonPosition === 'middle'
      ? Math.round(routes.length / 2)
      : actionButtonPosition;

  const animatedTab = (index: number, duration = 500) => {
    Animated.timing(animation, {
      toValue: tabItemWith * (index >= position ? index + 1 : index),
      duration,
      useNativeDriver: true,
    }).start();
  };

  // useEffect(() => {
  //   animatedTab(state.index, 0);
  // }, [tabbarDims]);

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  const moving_line = (
    <Animated.View
      style={{
        height: 2,
        backgroundColor: activeTintColor,
        width: tabItemWith,
        transform: [{ translateX: animation }],
      }}
    />
  );

  const content = (
    <>
      {type === 'top-line' && moving_line}
      <View
        style={[
          { flexDirection: 'row' },
          backgroundColor !== undefined && { backgroundColor },
        ]}
        onLayout={(event) => settabbarDims(event.nativeEvent.layout)}
      >
        {routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const Icon = options?.tabBarIcon;

          const isFocused = state.index === index;

          const onPress = () => {
            animatedTab(index);
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const tab = (
            <AnimatedTab
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              animation={isFocused ? focusAnimation : undefined}
              style={[
                {
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 5,
                },
                labelPosition === 'beside-icon' && { flexDirection: 'row' },
                tabItemStyle,
              ]}
            >
              {options?.tabBarIcon && (
                <Icon
                  color={isFocused ? activeTintColor : inactiveTintColor}
                  size={25}
                />
              )}
              {showLabel && (
                <Text
                  style={[
                    { color: isFocused ? activeTintColor : inactiveTintColor },
                    labelStyle,
                  ]}
                >
                  {label}
                </Text>
              )}
            </AnimatedTab>
          );

          if (position === index) {
            return (
              <>
                {actionButtonVisible && (
                  <View
                    style={{
                      flex: 1,
                      // position: 'absolute',
                      marginTop: tabbarDims.height * -0.5,
                      // marginLeft: tabItemWith * position + tabItemWith * 0.25,
                      // marginLeft: tabbarDims.width / 2 - 30,
                      // zIndex: 2,
                      // flexDirection: 'row',
                      // backgroundColor: 'red',
                      // justifyContent: 'center',
                    }}
                  >
                    {actionButtonComponent === undefined ? (
                      <ActionButton
                        onPress={actionButtonPress}
                        iconComponent={actionButtonIcon}
                      />
                    ) : (
                      actionButtonComponent
                    )}
                  </View>
                )}
                {tab}
              </>
            );
          } else {
            return tab;
          }
        })}
      </View>
      {type === 'bottom-line' && moving_line}
    </>
  );

  if (inSafeArea) {
    return <SafeAreaView>{content}</SafeAreaView>;
  } else {
    return content;
  }
}
