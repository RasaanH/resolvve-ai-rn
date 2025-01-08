import { Text } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { AppColors } from "@/constants/Colors";
import { Spaces } from "@/constants/Spacing";

export default function About() {
  return (
    <View style={styles.backgroundContainer}>
      <View style={styles.unitContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>About Balance GPT</Text>
        </View>
        <Text style={styles.pagragraphText}>
          Making AI better isn't about getting closer to the one true narrative.
          It's about providing people AI that align with their views and values.
        </Text>
      </View>
      <View style={styles.unitContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>What about confirmation bias?</Text>
        </View>
        <Text style={styles.pagragraphText}>
          An AI with opposing viewpoints is just a tap away. If you're not
          afraid of changing your mind, say hello!
        </Text>
      </View>
      <View style={styles.unitContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>How to contact our team</Text>
        </View>
        <Text style={styles.pagragraphText}>
          Email the founders directly at Rasaan@resolvedevs.com or
          Carlos@resolvedevs.com.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: AppColors.DarkGrey,
    paddingHorizontal: Spaces.L,
  },
  pagragraphText: {
    color: AppColors.White,
    paddingVertical: Spaces.M,
    fontSize: 15,
  },
  headerText: {
    color: AppColors.White,
    fontSize: 22,
    paddingVertical: Spaces.S,
  },
  headerContainer: {
    borderStyle: "solid",
    borderBottomWidth: Spaces.Xxs,
    borderColor: AppColors.White,
  },
  unitContainer: {
    marginVertical: Spaces.Xs,
  },
});
