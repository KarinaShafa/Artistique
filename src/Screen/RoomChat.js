import { useCallback, useContext, useState } from "react";
import { Box, Text, Center } from "native-base";
import colors from "../component/theme";
import { ThemeContext } from "../component/themeContext";
import {
  Bubble,
  GiftedChat,
  InputToolbar,
  Send,
} from "react-native-gifted-chat";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useRoute } from "@react-navigation/native";


const RoomChatScreen = () => {
  // const theme = { mode: "dark" };
  const { theme, updateTheme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];

  const route = useRoute();
  const initialMessageText = route.params ? route.params.messageText : "";
  const initialUserImg = route.params ? route.params.userImg : null;

  // menyimpan isi pesan (isi pesan MUA yang dimunculkan)
  const [messages, setMessages] = useState([
    {
      _id: 1,
      text: "Hello",
      createdAt: new Date(),
      user: {
        _id: 2,
        name: "Teks",
        avatar: initialUserImg,
      },
    },
    {
      _id: 2,
      text: initialMessageText,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: "Teks2",
        avatar: initialUserImg,
      },
    },
    
  ]);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  // scroll down
  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color={"#000000"} />;
  };

  // balon pesan
  const renderBubble = (props) => {
    return (
      // right=MUA, left=user
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#A01437",
          },
          left: {
            backgroundColor: "#cd5c5c",
          },
        }}
        textStyle={{
          right: {
            color: "#fff",
          },
          left: {
            color: "#fff",
          },
        }}
      />
    );
  };

  // button send di input teks
  const renderSend = (props) => {
    return (
      <Send {...props}>
        <Box>
          <MaterialCommunityIcons
            name="send-circle"
            size={32}
            color={"#A01437"}
            style={{ marginBottom: 5, marginRight: 5 }}
          />
        </Box>
      </Send>
    );
  };

  const sortedMessages = messages.sort((a, b) => b._id - a._id);

  const renderInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          margin: 3,
          marginHorizontal: 15,
          backgroundColor: "#F8F0E5",
          borderRadius: 30,
          borderTopWidth: 0,
          borderColor: "black",
        }}
      />
    );
  };

  // teks keterangan waktu di buble
	const renderTime = (timeProps) => {
		const createdAt = new Date(timeProps.currentMessage.createdAt);
		const hours = createdAt.getHours();
		const minutes = createdAt.getMinutes();
		const amOrPm = hours >= 12 ? 'PM' : 'AM';
		const formattedTime = `${hours % 12}:${minutes} ${amOrPm}`;
	
		return (
			<Text
				style={{
					paddingLeft: 8,
					paddingBottom: 4,
					fontSize: 10,
					color: '#fff', // warna teks waktu menjadi putih
				}}
			>
				{formattedTime}
			</Text>
		);
	};

  return (
    
      <Box flex={1} backgroundColor={"#fff"}>
        <GiftedChat flex={1}
          messages={sortedMessages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: 1,
          }}
          renderBubble={renderBubble}
          alwaysShowSend
          renderSend={renderSend}
          scrollToBottom
          scrollToBottomComponent={scrollToBottomComponent}
          messagesContainerStyle={{
            paddingBottom: 100,
            paddingTop:10,
            backgroundColor: activeColors.secondary,
          }}
          renderInputToolbar={renderInputToolbar}
          renderTime={renderTime}
        />
      </Box>
    
  );
};

export default RoomChatScreen;