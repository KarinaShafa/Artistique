import { useContext } from "react";
import { Text, Box, ScrollView, Center } from "native-base";
import { ThemeContext } from "../component/themeContext";
import colors from "../component/theme";

const BookedDetail = () => {
  const { theme, updateTheme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];

  return (
    <Box flex={1} backgroundColor={"#EBB9BB"}>
      <ScrollView flex={1} backgroundColor={activeColors.primary}>
        <Box mt={100} marginLeft={140} marginRight={140}>
          <Center>
            <Text color={activeColors.tint}>Booked Detail Page Here!</Text>
          </Center>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default BookedDetail;
