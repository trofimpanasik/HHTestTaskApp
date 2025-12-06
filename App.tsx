/**
 * Banking App with Bottom Tab Navigation
 *
 * @format
 */

import React from 'react';
import { Platform, StatusBar } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import MainScreen from './src/screens/MainScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';
import AddCardScreen from './src/screens/AddCardScreen';
import PaymentsScreen from './src/screens/PaymentsScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import AnalyticsScreen from './src/screens/AnalyticsScreen';
import ChatsScreen from './src/screens/ChatsScreen';

import { ThemeProvider, useTheme } from './src/theme';

import HomeTabIcon from './assets/icons/tab/home.svg';
import PaymentsTabIcon from './assets/icons/tab/payments.svg';
import AnalyticsTabIcon from './assets/icons/tab/analytics.svg';
import ChatsTabIcon from './assets/icons/tab/chats.svg';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const PaymentStack = createNativeStackNavigator();

const HomeIcon = ({ color }: { color: string }) => (
  <HomeTabIcon width={22} height={22} color={color} />
);

const PaymentsIcon = ({ color }: { color: string }) => (
  <PaymentsTabIcon width={22} height={22} color={color} />
);

const HistoryIcon = ({ color }: { color: string }) => (
  <MaterialIcon name="clock-time-three" size={22} color={color} />
);

const AnalyticsIcon = ({ color }: { color: string }) => (
  <AnalyticsTabIcon width={22} height={22} color={color} />
);

const ChatsIcon = ({ color }: { color: string }) => (
  <ChatsTabIcon width={22} height={22} color={color} />
);

function HomeStackScreen() {
  const { theme } = useTheme();

  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.background },
        animation: 'slide_from_right',
      }}
    >
      <HomeStack.Screen name="MainScreen" component={MainScreen} />
      <HomeStack.Screen name="Notifications" component={NotificationsScreen} />
      <HomeStack.Screen name="AddCard" component={AddCardScreen} />
    </HomeStack.Navigator>
  );
}

function PaymentStackScreen() {
  const { theme } = useTheme();

  return (
    <PaymentStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.background },
        animation: 'slide_from_right',
      }}
    >
      <PaymentStack.Screen name="PaymentScreen" component={PaymentsScreen} />
      <PaymentStack.Screen
        name="Notifications"
        component={NotificationsScreen}
      />
    </PaymentStack.Navigator>
  );
}

function AppContent() {
  const { theme, isDark } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              backgroundColor: theme.tabBar,
              borderTopWidth: 0,
              height: 80,
              marginBottom: Platform.select({
                ios: 0,
                android: insets.bottom,
              }),
              paddingTop: 10,
            },
            tabBarActiveTintColor: theme.accent,
            tabBarInactiveTintColor: theme.inactive,
            tabBarLabelStyle: {
              fontSize: 11,
              fontWeight: '500',
            },
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeStackScreen}
            options={{
              tabBarIcon: HomeIcon,
            }}
          />
          <Tab.Screen
            name="Payments"
            component={PaymentStackScreen}
            options={{
              tabBarIcon: PaymentsIcon,
            }}
          />
          <Tab.Screen
            name="History"
            component={HistoryScreen}
            options={{
              tabBarIcon: HistoryIcon,
            }}
          />
          <Tab.Screen
            name="Analytics"
            component={AnalyticsScreen}
            options={{
              tabBarIcon: AnalyticsIcon,
            }}
          />
          <Tab.Screen
            name="Chats"
            component={ChatsScreen}
            options={{
              tabBarIcon: ChatsIcon,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider initialTheme="dark">
        <SafeAreaProvider>
          <AppContent />
        </SafeAreaProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
