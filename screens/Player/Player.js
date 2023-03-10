import {
  Animated,
  Easing,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import Header, { HeaderDetail } from "./../../components/Header/Header";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";
import Slider from "@react-native-community/slider";
import { Audio } from "expo-av";
// import Slider from "react-native-slider";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const Player = ({ route }) => {
  const { item } = route.params;
  const [value, setValue] = useState(0);
  const [pause, setPause] = useState(true);
  const [sound, setSound] = useState();

  const spinValue = new Animated.Value(0);
  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });
  const pad = (n, width, z = 0) => {
    n = n + "";
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  };
  const minutesAndSeconds = (position) => [
    pad(Math.floor(position / 60), 2),
    pad(position % 60, 2),
  ];
  const format = (time) => {
    return `${parseInt(time / 60)}:${
      time % 60 === 0 ? "00" : pad(time % 60, 2)
    }`;
  };
  // const elapsed = minutesAndSeconds(value);
  // const remaining = minutesAndSeconds(item.time - value);
  // console.log({ elapsed, remaining });

  const playPauseAudio = async () => {
    if (pause) {
      await sound.playAsync();
    } else {
      await sound.pauseAsync();
    }
  };
  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      {
        uri: item.url,
      },
      { shouldPlay: true },
      (status) => {
        setValue(status.positionMillis);
      }
    );
    // console.log(sound);
    setSound(sound);
    setPause(false);
    await sound.playAsync();
  }
  const spin = () => {
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 4000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => spin());
  };

  useEffect(() => {
    spin();
    playSound();
  }, []);

  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
  const image = {
    uri: item.image.toString(),
  };
  const sliderChange = async (sliderValue) => {
    // await sound.playFromPositionAsync(sliderValue);
    // setValue(sliderValue);
  };
  const renderPlayButton = () => {
    if (pause) {
      return (
        <TouchableOpacity
          style={{
            marginHorizontal: 20,
            backgroundColor: "#00be48",
            borderRadius: 50,
          }}
          onPress={() => {
            playPauseAudio();
            setPause(false);
          }}
        >
          <Image
            source={require("../../assets/icon/ic_play_arrow_white_48pt.png")}
          />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={{
            marginHorizontal: 20,
            backgroundColor: "#00be48",
            borderRadius: "50%",
          }}
          onPress={() => {
            playPauseAudio();
            setPause(true);
          }}
        >
          <Image
            source={require("../../assets/icon/ic_pause_white_48pt.png")}
          />
        </TouchableOpacity>
      );
    }
  };
  return (
    <View style={{ backgroundColor: "#272c2f", width: "100%", height: "100%" }}>
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={{
          position: "relative",
          height: windowHeight,
        }}
      >
        <HeaderDetail name={item.nameSong} />
        <View
          style={{
            position: "absolute",
            top: 0,
            backgroundColor: "black",
            width: "100%",
            height: windowHeight,
            opacity: 0.3,
          }}
        />
        <LinearGradient
          colors={["#00000000", "black"]}
          style={{
            height: "100%",
            width: "100%",
            position: "relative",
            alignItems: "center",
          }}
        >
          <Animated.View
            style={{
              transform: [{ rotate }],
              width: 250,
              height: 250,
              backgroundColor: "black",
              position: "absolute",
              bottom: "40%",
              borderRadius: 300,
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <ImageBackground
              source={image}
              resizeMode="cover"
              style={{ width: "100%", height: "100%", opacity: 0.8 }}
            />
            <View
              style={{
                position: "absolute",
                backgroundColor: "black",
                width: 80,
                height: 80,
                borderRadius: 80,
              }}
            />
          </Animated.View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default Player;

const styles = StyleSheet.create({});
