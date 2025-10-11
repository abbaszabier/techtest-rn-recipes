import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, StyleSheet } from 'react-native';
import {
  Home,
  Bookmark,
  User,
  LayoutDashboard,
  Newspaper,
  Plus,
} from 'lucide-react-native';
import HomeScreen from '../screens/HomeScreen';
import BookmarkScreen from '../screens/BookmarkScreen';
import BlogScreen from '../screens/BlogScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const tabBarIcon = ({ route, focused }) => {
  let IconComponent;

  switch (route.name) {
    case 'Home':
      IconComponent = LayoutDashboard;
      break;
    case 'Bookmark':
      IconComponent = Bookmark;
      break;
    case 'Blog':
      IconComponent = Newspaper;
      break;
    case 'Profile':
      IconComponent = User;
      break;
    default:
      IconComponent = Home;
  }

  return (
    <IconComponent
      size={22}
      color={focused ? '#007bff' : '#999'}
      strokeWidth={focused ? 2.4 : 1.8}
    />
  );
};

const tabsIconAdd = () => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.fabButton}>
      <Plus color="#fff" size={24} strokeWidth={2.5} />
    </TouchableOpacity>
  );
};

const TabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#007bff',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { height: 65, paddingHorizontal: 8, paddingTop: 4 },
        tabBarIcon: props => tabBarIcon({ ...props, route }),
      })}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Bookmark"
        component={BookmarkScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Add"
        component={HomeScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: tabsIconAdd,
        }}
      />
      <Tab.Screen
        name="Blog"
        component={BlogScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  fabButton: {
    top: -20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 5,
  },
});

export default TabsNavigator;
