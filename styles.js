import { StyleSheet } from "react-native";

const essentialstyles = StyleSheet.create({
  container: {
    gap: 15,
    backgroundColor: "#F0F3F4",
    paddingHorizontal: 15,
    height: "100%",
    marginBottom: 50,
  },
  h1: {
    fontSize: 44,
    fontWeight: "700",
    color: "#1A3053",
  },
  h2: {
    fontSize: 22,
    fontWeight: "600",
    color: "#1A3053",
  },
  text: {
    fontSize: 18,
    color: "#1a3053",
  },

  iconInput: {
    color: "#ccc",
  },
  inputBar: {
    gap: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 7,
    paddingLeft: 6,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
  },
  input: {
    flex: 1,
    fontSize: 18,
    height: 30,
    color: "#111",
  },

  pressMeBtn: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    flexDirection: "row-reverse",
    backgroundColor: "#E8EBF1",
    borderRadius: 20,
    borderColor: "1.5px solid rgba(80, 134, 231, 0.5)",
    borderWidth: 3,
  },
  pressMeText: {
    color: "#01222A",
  },
});

export default essentialstyles;
