import { Appbar } from "react-native-paper";
import { getHeaderTitle } from "@react-navigation/elements";

export const CustomNavigationBar = ({ route, options }: any) => {
  const title = getHeaderTitle(options, route.name);
  return (
    <Appbar.Header>
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
};
