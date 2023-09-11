import React, {useEffect} from 'react';
import { View, StatusBar,ImageBackground, StyleSheet} from 'react-native';
import {AuthRoutes} from '../../constants/routes';
const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace(AuthRoutes.SignInScreen)
    }, 3000);
  }, []);
  return (
    <View style={styles.container} >
        <ImageBackground
            resizeMode={"stretch"} 
            style={styles.image}
            source={require("../../assets/images/splash.png")} 
          >
           
        </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
});

export default SplashScreen;
