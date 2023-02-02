import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

export const style = StyleSheet.create({
  containerMain: {
    height: Dimensions.get("window").height,
    backgroundColor: "#012626",
    justifyContent: "space-around",
  },
  containerOne: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 25,
    marginBottom: 25,
  },
  containerTwo: {
    marginHorizontal: 25,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-between",
    height: 150,
    backgroundColor: "#027368",
    marginBottom: 25,
  },
  boxValuecontainerTwo: {
    flexGrow: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  containerThree: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 25,
    marginBottom: 8,
  },
  boxtypeofspentcontainerThree: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  containerFour: {
    marginHorizontal: 25,
    marginBottom: 25,
  },
  card: {
    borderRadius: 8,
    padding: 5,
    paddingHorizontal: 15,
    marginRight: 12,
    backgroundColor: "#027368",
  },
});
