import { View, Text, TouchableOpacity ,Image, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Svg, { G, Path } from "react-native-svg";

const Onboarding = () => {
  const navigation = useNavigation<any>();
  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("../../assets/onboarding.png")} resizeMode="cover" style={styles.backgroundImage}/>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.replace("Login")}>
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>Get Started</Text>
            <Svg viewBox="0 0 24 24" fill="none" width={35} height={35} stroke="#ffffff">
              <G strokeWidth="0" />
              <G strokeLinecap="round" strokeLinejoin="round" />
              <G> 
                <Path d="M4 12H20M20 12L16 8M20 12L16 16" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /> 
              </G>
            </Svg>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom:60,
    paddingBottom: 50,
  },
  button: {
    backgroundColor: '#ff6347',
    padding: 15,
    borderRadius: 10,
    minWidth: 270, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
})