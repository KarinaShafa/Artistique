import {React, useContext} from "react";
import { ScrollView } from "react-native";
import { Box, Text, Image } from "native-base";
import { useRoute } from "@react-navigation/core";
import colors from "../component/theme";
import { ThemeContext } from "../component/themeContext";

const ArticleDetail = () => {
  const { theme, updateTheme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];
	const route = useRoute();

  const initialImage = route.params ? route.params.image : null;
  const initialTitle = route.params ? route.params.title : "";
  const initialContent = route.params ? route.params.content : "";

  const addSpacesToBeginning = (text) => {
    return text.replace(/([.!?])\s*(\w)/g, "$1  $2");
  };
  
  return (
    <ScrollView backgroundColor={activeColors.primary}>
      {/* Gambar Full */}
      <Box>
        <Image
          source={initialImage}
          alt="Article Image"
          resizeMode="cover"
          height={200}
          width="100%"
        />
      </Box>

      {/* Judul */}
      <Box p={4} mb={-10}>
        <Text fontSize="xl" fontWeight="bold" color={activeColors.tertiary}>
          {initialTitle}
        </Text>
      </Box>

      {/* Konten */}
      <Box p={4}>
        <Text textAlign="justify" color={activeColors.tint}>{addSpacesToBeginning(initialContent)}</Text>
      </Box>
    </ScrollView>
  );
};

export default ArticleDetail;