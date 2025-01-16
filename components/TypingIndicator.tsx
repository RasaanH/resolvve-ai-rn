import { TypingAnimation } from "react-native-typing-animation";
import { View } from "react-native";
export const TypingIndicator = () => {
  return (
    <View style={{ backgroundColor: "transparent", height: 55 }}>
      <TypingAnimation
        dotColor="white"
        dotMargin={8}
        dotAmplitude={2}
        dotSpeed={0.18}
        dotRadius={4}
        dotX={30}
        dotY={10}
      />
    </View>
  );
};
