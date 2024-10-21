import { StyleSheet } from "react-native";

const essentialstyles = StyleSheet.create({
  container: {
    gap: 15,
    backgroundColor: "#fff",
    padding: 15,
    height: "100%",
  },

  h1: {
    fontSize: 44,
    fontWeight: "700",
    marginBottom: 20,
    color: "#1A3053",
  },
  h2: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
    color: "#1A3053",
  },
  text: {
    fontSize: 18,
    color: "#1a3053",
  },

  iconInput: {
    color: "#111",
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
    borderRadius: 5,
  },
  input: {
    flex: 1,
    fontSize: 18,
    height: 30,
  },

  pressMeBtn: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    flexDirection: "row-reverse",
    backgroundColor: "#E8EBF1",
    borderRadius: 10,
    borderColor: "1.5px solid rgba(80, 134, 231, 0.5)",
    borderWidth: 3,
  },
  pressMeText: {
    color: "#01222A",
  },
});

export default essentialstyles;
