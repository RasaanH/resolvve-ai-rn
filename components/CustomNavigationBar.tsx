import { Appbar } from "react-native-paper";
import { getHeaderTitle } from "@react-navigation/elements";

export const CustomNavigationBar = ({
  route,
  options,
  navigation,
  back,
}: any) => {
  const title = getHeaderTitle(options, route.name);
  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
};
