import { TextInput, Button } from "react-native-paper";
import { View } from "react-native";
export const MessageInput = () => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginBottom: 10,
      }}
    >
      <TextInput
        style={{
          width: "80%",
          borderTopRightRadius: 100,
          borderTopLeftRadius: 100,
          borderBottomRightRadius: 100,
          borderBottomLeftRadius: 100,
          margin: 5,
          height: 50,
        }}
        activeUnderlineColor="transparent"
        underlineColor="transparent"
        placeholder="Message"
      />
      <Button>Send</Button>
    </View>
  );
};
