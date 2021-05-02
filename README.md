# react-native-custom-tabbar

react-native-custom-tabbar

## Installation

```sh
npm install react-native-custom-tabbar
```

## Usage

```js
import {
createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import CustomTabbar from "react-native-custom-tabbar";

// ...

const Tab = createBottomTabNavigator();

return <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}/>

```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
