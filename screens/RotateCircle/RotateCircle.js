import { View, Text } from "react-native";
import React from "react";
import { Animated } from "react-native";
import { useEffect } from "react";
import { Easing } from "react-native";

export default function RotateCircle() {
  const spinValue = new Animated.Value(0);
  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });
  const spin = () => {
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => spin());
  };
  useEffect(() => {
    // playSound();
    spin();
  }, []);
  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <Animated.View
        style={{
          transform: [{ rotate }],
          backgroundColor: "red",
          width: 100,
          height: 100,
        }}
      ></Animated.View>
    </View>
  );
}
