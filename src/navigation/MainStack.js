import React from 'react';
import { createNativeStackNavigator, } from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer'
import HomeScreen from '../screens/HomeScreen/index';
import EditProfileScreen from '../screens/EditProfileScreen'

// TimeSheet
import TimeSheetListScreen from '../screens/TimeSheetScreen';
import DetailsSheetScreen from '../screens/TimeSheetScreen/DetailsTimeSheetScreen';
import UnApprovedTimeSheetListScreen from '../screens/TimeSheetScreen/UnApprovedTimeSheets';

// Expenses screen
import ExpensesListScreen from '../screens/ExpensesScreen';
import ExpenseDetailsScreen from '../screens/ExpensesScreen/ExpansesDetails';
import UnApprovedExpansesScreen from '../screens/ExpensesScreen/UnApprovedExpansesScreen';
import Preview from '../screens/ExpensesScreen/Preview'

// Leaves Screen
import AllLeavesScreen from '../screens/Leaves';
import UnApprovedLeavesScreen from '../screens/Leaves/UnApprovedLeavesScreen';

import DrawerContent from './DrawerContent';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const MainStack = () => {
    return(
        <Stack.Navigator
            initialRouteName='HomeScreen'
        >
            <Stack.Screen 
                name="HomeScreen" 
                component={HomeScreen} 
                options={{
                    headerShown:false
                }}
            />

            <Stack.Screen 
                name="EditProfileScreen" 
                component={EditProfileScreen} 
                options={{
                    headerShown:false
                }}
            />
            

            <Stack.Screen 
                name="TimeSheetListScreen" 
                component={TimeSheetListScreen} 
                options={{
                    headerShown:false
                }}
            />
            <Stack.Screen 
                name="DetailsSheetScreen" 
                component={DetailsSheetScreen} 
                options={{
                    headerShown:false
                }}
            />

            <Stack.Screen 
                name="UnApprovedExpansesScreen" 
                component={UnApprovedExpansesScreen} 
                options={{
                    headerShown:false
                }}
            />

            <Stack.Screen 
                name="UnApprovedTimeSheetListScreen" 
                component={UnApprovedTimeSheetListScreen} 
                options={{
                    headerShown:false
                }}
            />



            <Stack.Screen 
                name="ExpensesListScreen" 
                component={ExpensesListScreen} 
                options={{
                    headerShown:false
                }}
            />
            <Stack.Screen 
                name="ExpenseDetailsScreen" 
                component={ExpenseDetailsScreen} 
                options={{
                    headerShown:false
                }}
            />
               <Stack.Screen 
                name="Preview" 
                component={Preview} 
                options={{
                    headerShown: true
                }}
            />

            <Stack.Screen 
                name="AllLeavesScreen" 
                component={AllLeavesScreen} 
                options={{
                    headerShown:false
                }}
            />
            <Stack.Screen 
                name="UnApprovedLeavesScreen" 
                component={UnApprovedLeavesScreen} 
                options={{
                    headerShown:false
                }}
            />
            
        </Stack.Navigator>
    )
}
const StackNavigator = () => (
    <Drawer.Navigator
      gestureEnabled={false}
      screenOptions={{
        swipeEnabled:true,
        headerShown:false
      }}
        drawerContent={(props) => <DrawerContent {...props} />}>
            <Drawer.Screen name ="MainStack" headerShown={false}>
                {props => <MainStack {...props} />}
            </Drawer.Screen>
    </Drawer.Navigator>
)

export default StackNavigator;