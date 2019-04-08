import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import HomeScreen from "./Home";
import SettingsScreen from "./Settings";

const TabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Settings: SettingsScreen
});

const Application = createAppContainer(TabNavigator);

export default Application;
