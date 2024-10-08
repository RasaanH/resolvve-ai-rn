import { Appbar } from "react-native-paper";
import { getHeaderTitle } from "@react-navigation/elements";
import { Drawer } from "react-native-paper";
import { useState } from "react";
import { router } from "expo-router";

export const CustomNavigationBar = ({
  route,
  options,
  navigation,
  back,
}: any) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const toggleDrawer = () => setShowDrawer(!showDrawer);
  const title = getHeaderTitle(options, route.name);
  const navigateToRoute = (route: any) => {
    setShowDrawer(false);
    router.navigate(route);
  };

  return (
    <Appbar.Header>
      {!back && <Appbar.Action icon="menu" onPress={() => toggleDrawer()} />}
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      {showDrawer && (
        <Drawer.Section title="Some title">
          <Drawer.Item
            label="Sign Up"
            active={false}
            onPress={() => navigateToRoute("/signup")}
          />
          <Drawer.Item
            label="Login"
            active={false}
            onPress={() => navigateToRoute("/signup")} // later change this
          />
          <Drawer.Item
            label="About"
            active={false}
            onPress={() => navigateToRoute("/about")}
          />
        </Drawer.Section>
      )}
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
};
