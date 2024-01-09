import React, { useEffect, useState } from "react";
import { Dimensions, SafeAreaView, TouchableOpacity } from "react-native";
import { Box, Text, Center, HStack, Image } from "native-base";
import { useNavigation } from "@react-navigation/native";


const WelcomeScreen = () => {
	
	const navigation = useNavigation();
	const [windowDimensions, setWindowDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const updateDimensions = () => {
      setWindowDimensions(Dimensions.get('window')); //memberi dimensi awal layar perangkat pada saat aplikasi dimulai.
    };

    // Event listener untuk memantau perubahan dimensi layar
    Dimensions.addEventListener('change', updateDimensions);

    return () => {
      // Hapus event listener saat komponen unmount 
      Dimensions.removeEventListener('change', updateDimensions);
    };
  }, []); //menandakan useEffect hanya dijalankan sekali setelah komponen dipasang dan di-unmount ketika komponen tersebut dihapus.

  return (
    <SafeAreaView>
      {/* Komponen Image dari NativeBase untuk menampilkan gambar */}
      <Image
        source={require("../../assets/images/welcome.png")}
        alt="Welcome Image"
        mt={12}
        m={10}
        resizeMode="contain" //mengubah ukuran gambar agar dapat ditampilkan semua
				style={{ width: windowDimensions.width * 0.8, height: windowDimensions.height * 0.4 }} //menyesuaikan dengan ukuran layar
      />
      <Center>
        {/* Komponen Text dari NativeBase untuk menampilkan teks */}
        <Text
					fontWeight="500"
          textAlign="center"
          fontSize={35}
          color="#F45725"
          mx={4}
        >
          Sentuhan sempurna untuk kecantikanmu!
        </Text>
        <Text
          fontSize={24}
          color="black"
          textAlign="center"
          mt={1}
          p={6}
        >
          Temukan MUA terbaik versimu!
        </Text>
      </Center>
      {/* Komponen HStack dari NativeBase untuk menyusun komponen secara horizontal */}
      <HStack
        space={6}
        alignItems="center"
        justifyContent="center"
        mt={4}
        m={10}
      >
        
        {/* Komponen TouchableOpacity dari React Native untuk membuat button */}
        <TouchableOpacity
          onPress={() => navigation.replace("Login")}
          style={{
            backgroundColor: "#EDA99A",
            paddingVertical: 12,
            paddingHorizontal: 16,
            width: "48%",
            borderRadius: 10,
            shadowColor: "#EDA99A",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 4,
						elevation: 8
          }}
        >
          <Text
            color="white"
            fontSize="xl"
            textAlign="center"
          >
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.replace("Register")}
          style={{
            backgroundColor: "#F3D2CB",
            paddingVertical: 12,
            paddingHorizontal: 16,       
            width: "48%",
            borderRadius: 4,
          }}
        >
          <Text
            color="black"
            fontSize="xl"
            textAlign="center"
          >
            Register
          </Text>
        </TouchableOpacity>
      </HStack>
    </SafeAreaView>
  );
};
export default WelcomeScreen;