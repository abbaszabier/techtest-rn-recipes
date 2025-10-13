import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import {
  Home,
  Bookmark,
  User,
  LayoutDashboard,
  Plus,
  TvMinimalPlay,
  ChevronLeft,
} from 'lucide-react-native';
import HomeScreen from '../screens/HomeScreen';
import BookmarkScreen from '../screens/BookmarkScreen';
import ReelsScreen from '../screens/ReelsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AddRecipe from '../screens/AddRecipe';

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
    case 'Reels':
      IconComponent = TvMinimalPlay;
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

const tabsIconAdd = ({ navigations }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.fabButton}
      onPress={() => navigations.navigation.navigate('AddRecipe')}
    >
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
        name="Reels"
        component={ReelsScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="AddRecipe"
        component={AddRecipe}
        options={({ navigation }) => ({
          title: 'New Recipe',
          tabBarButton: () => tabsIconAdd({ navigations: { navigation } }),
          tabBarStyle: { display: 'none' },
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 15 }}
              onPress={() => navigation.goBack()}
            >
              <ChevronLeft opacity={0.9} size={24} strokeWidth={2} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 15 }}>
              <View style={styles.pill}>
                <Text style={styles.pillText}>Send</Text>
              </View>
            </TouchableOpacity>
          ),
          headerTitleStyle: { marginBottom: 0 },
        })}
      />
      <Tab.Screen
        name="Bookmark"
        component={BookmarkScreen}
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
  pill: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 30,
    backgroundColor: '#007bff',
  },
  pillText: { color: '#fff', fontWeight: '600' },
});

export default TabsNavigator;
