import React from "react";
import { ScrollView } from "react-native";
import { Box, Text, Image } from "native-base";
import { useRoute } from "@react-navigation/core";

const RecomendationDetail = () => {
  //   const { title, content, image } = route.params;

	const route = useRoute();

  const initialImage = route.params ? route.params.image : null;
  const initialTitle = route.params ? route.params.title : "";
  const initialContent = route.params ? route.params.content : "";

  return (
    <ScrollView>
      {/* Gambar Full */}
      <Box>
        <Image
          source={initialImage}
          alt="Recomendation Image"
          resizeMode="cover"
          height={200}
          width="100%"
        />
      </Box>

      {/* Judul */}
      <Box p={4} mb={-10}>
        <Text fontSize="xl" fontWeight="bold">
          {initialTitle}
        </Text>
      </Box>

      {/* Konten */}
      <Box p={4}>
        <Text textAlign="justify">{initialContent}</Text>
      </Box>
    </ScrollView>
  );
};

export default RecomendationDetail;