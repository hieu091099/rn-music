import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import React from "react";
import Header from "../../components/Header/Header";
import ListSong from "../../components/ListSong/ListSong";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const Artist = () => {
  const listSong = [
    {
      nameSong: "Vùng Ký Ức",
      stream: 23651241,
      url: "https://res.cloudinary.com/dkriyz2uh/video/upload/v1676011961/music-app/HO%C3%80NG_DUY%C3%8AN_x_OBITO_-_m%C6%B0a_h%E1%BB%93ng_GEN_Z_V%C3%80_TR%E1%BB%8ANH_-_l%E1%BA%A5y_c%E1%BA%A3m_h%E1%BB%A9ng_t%E1%BB%AB_Tr%E1%BB%8Bnh_C%C3%B4ng_S%C6%A1n_Em_V%C3%A0_Tr%E1%BB%8Bnh_fpoiy4.mp3",
      time: 242,
      image:
        "https://i.pinimg.com/originals/2e/86/66/2e86666a00bcf5a030353c8b9a8463b6.jpg",
    },

    {
      nameSong: "Nếu Ngày Mai Không Đến",
      stream: 16542321,
      url: "https://res.cloudinary.com/dkriyz2uh/video/upload/v1676011974/music-app/Nh%E1%BA%AFm_M%E1%BA%AFt_Th%E1%BA%A5y_M%C3%B9a_H%C3%A8_-_H%C3%A0_Anh_Tu%E1%BA%A5n_-_-Lyric_Video-_cngwiq.mp3",
      time: 244,
      image:
        "https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2021/5/23/912309/135598684_2399922074.jpg",
    },
    {
      nameSong: "Và Thế Là Hết",
      stream: 11251632,
      url: "https://res.cloudinary.com/dkriyz2uh/video/upload/v1676011970/music-app/Ng%E1%BB%8Dt_-_Th%E1%BA%A5y_Ch%C6%B0a_zvtuif.mp3",
      time: 234,
      image:
        "https://vcdn1-giaitri.vnecdn.net/2021/06/23/batchchillies-1624419107-2794-1624419183.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=F0z5OcIL1U1u7iTMKcDHdg",
    },
    {
      nameSong: "Bao Nhiêu",
      stream: 9652365,
      url: "https://res.cloudinary.com/dkriyz2uh/video/upload/v1676011962/music-app/Ng%E1%BB%8Dt_-_%C4%90%E1%BB%91t_x52tur.mp3",
      time: 235,
      image:
        "https://image.phunuonline.com.vn/fckeditor/upload/2021/20210520/images/ca-hoi-hoang-chillies-va-_321621528129.jpg",
    },
    {
      nameSong: "Mộng Du",
      stream: 2365412,
      url: "https://res.cloudinary.com/dkriyz2uh/video/upload/v1676011962/music-app/Ng%E1%BB%8Dt_-_Em_Trang_Tr%C3%AD_re4ji9.mp3",
      time: 208,
      image:
        "https://35express.org/wp-content/uploads/2021/05/su-nghiep-cua-nhom-nhac-indie-noi-tieng-chillies-35express.jpg",
    },
  ];
  const image = {
    uri: "https://avatar-ex-swe.nixcdn.com/singer/avatar/2022/04/21/d/5/0/5/1650534373203_600.jpg",
  };
  return (
    <SafeAreaProvider>
      <StatusBar hidden={true} />
      <View
        // #272c2f
        style={{ backgroundColor: "black", width: "100%", height: "100%" }}
      >
        <ImageBackground
          source={image}
          resizeMode="cover"
          style={{
            paddingVertical: 40,
            position: "relative",
            height: windowHeight / 2,
          }}
        >
          <Header />

          <View
            style={{
              position: "absolute",
              top: 0,
              backgroundColor: "black",
              width: "100%",
              height: windowHeight / 2,
              opacity: 0.6,
            }}
          />
          <LinearGradient
            colors={["#00000000", "black"]}
            style={{ height: windowHeight / 2, width: "100%" }}
          >
            <View style={{ marginTop: 20, alignItems: "center" }}>
              <Text
                style={{
                  color: "white",
                  fontSize: 40,
                  fontWeight: "bold",
                  marginTop: 120,
                }}
              >
                Chillies
              </Text>
              <Text
                style={{ color: "#84868a", fontWeight: "bold", marginTop: 10 }}
              >
                489.400 LISTENERS THIS MONTH
              </Text>
              <TouchableOpacity
                style={{
                  marginTop: 30,
                  paddingHorizontal: 30,
                  paddingVertical: 20,
                  backgroundColor: "#00be48",
                  borderRadius: 50,
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  Play Randomly
                </Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </ImageBackground>

        <ListSong listSong={listSong} />
      </View>
    </SafeAreaProvider>
  );
};

export default Artist;
