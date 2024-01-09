import React from "react";
import { TouchableOpacity} from "react-native";
import { Box, Input, Flex } from "native-base";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";

const Header = (props) => {
  return (
    <SafeAreaView>
      <Box >
        <Flex direction="row">
          {/* input search */}
          <Input
            value={props.search}
            onChangeText={(text) => props.setSearch(text)}
            placeholder="Search..."
            backgroundColor={"#FFFFFF"}
            // mt={5}
            pl={3}
            rounded={1}
            flex={1}
          />
          {/* tombol search */}
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#A01437",
              // marginTop: 20,
              paddingHorizontal: 20,
              borderRadius: 5,
              marginLeft: 10,
              elevation: 3,
            }}
          >
            <Icon name="search" size={25} color="#FFFFFF" />
          </TouchableOpacity>
        </Flex>
      </Box>
    </SafeAreaView>
  );
};

export default Header;
