import { useOrderBookWebSocket } from "../api/api";
import { Table, Row, Rows } from "react-native-table-component";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import React from "react";

const OrderBooks = () => {
  const { isConnected, connectWebSocket, disconnectWebSocket } =
    useOrderBookWebSocket();
  const [tableScale, setTableScale] = React.useState(1);
  const [pricePrecision, setPricePrecision] = React.useState(2); 
  const orderBook = useSelector((state) => state.orderBook);

  const bids = Object.values(orderBook.bids);
  const asks = Object.values(orderBook.asks);

  const formatPrice = (price, precision = 2) => {
    return parseFloat(price).toFixed(precision);
  };

  const calculateTotal = (price, amount) => {
    return (parseFloat(price) * parseFloat(amount)).toFixed(8);
  };

  const tableHeader = ["Price", "Count", "Amount"];

  const handleZoomIn = () => {
    setTableScale((prevScale) => prevScale + 0.1);
  };

  const handleZoomOut = () => {
    setTableScale((prevScale) =>
      prevScale > 0.1 ? prevScale - 0.1 : prevScale
    );
  };

  const handlePrecisionChange = () => {
   
    setPricePrecision((prevPrecision) =>
      prevPrecision < 5 ? prevPrecision + 1 : prevPrecision
    );
  };

  return (
    <SafeAreaView >
      <ScrollView style={styles.container}>
        <View style = {{marginTop: 30}}>
          <Text
            style={{
              padding: 10,
              flex: 1,
              textAlign: "center",
              color: "#fff",
              fontSize: 16,
            }}
          >
            Status: {isConnected ? "Connected" : "Disconnected"}
          </Text>
          <TouchableOpacity onPress={connectWebSocket} disabled={isConnected}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Connect</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={disconnectWebSocket}
            disabled={!isConnected}
          >
            <View style={[styles.button, { backgroundColor: "red" }]}>
              <Text style={styles.buttonText}>Disconnect</Text>
            </View>
          </TouchableOpacity>

          {/* Zoom buttons */}
          <View style={styles.zoomContainer}>
            <TouchableOpacity
              onPress={handleZoomIn}
              style={styles.zoomButtonContainer}
            >
              <Text style={styles.zoomButtonText}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleZoomOut}
              style={styles.zoomButtonContainer}
            >
              <Text style={styles.zoomButtonText}>-</Text>
            </TouchableOpacity>
          </View>

          {/* Precision button */}
          <TouchableOpacity
            onPress={handlePrecisionChange}
            style={styles.precisionButton}
          >
            <Text
              style={styles.precisionButtonText}
            >{`Precision: ${pricePrecision}`}</Text>
          </TouchableOpacity>

          <View style={{ transform: [{ scale: tableScale }] }}>
            <Text
              style={{
                flex: 1,
                textAlign: "center",
                color: "#fff",
                fontSize: 16,
              }}
            >
              Bids
            </Text>
            <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
              <Row data={["Price", "Total"]} textStyle={styles.header} />
              <Rows
                data={bids.map((bid) => [
                  formatPrice(bid.price, pricePrecision),
                  calculateTotal(bid.price, bid.amount),
                ])}
                textStyle={styles.text}
              />
            </Table>
          </View>

          <View style={{ transform: [{ scale: tableScale }] }}>
            <Text
              style={{
                marginTop: 20,
                flex: 1,
                textAlign: "center",
                color: "#fff",
                fontSize: 16,
              }}
            >
              Asks
            </Text>
            <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
              <Row data={["Price", "Total"]} textStyle={styles.header} />
              <Rows
                data={asks.map((ask) => [
                  formatPrice(ask.price, pricePrecision),
                  calculateTotal(ask.price, ask.amount),
                ])}
                textStyle={styles.text}
              />
            </Table>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#112331",
    color: "#fff",
  },
  column: {
    flex: 1,
    textAlign: "center",
  },
  header: {
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
  },
  text: {
    flex: 1,
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
  },
  button: {
    backgroundColor: "green",
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },

  zoomContainer: {
    flexDirection: "row",
    justifyContent: "flex-end", 
    marginTop: 10,
    marginRight: 10, 
  },
  zoomButtonContainer: {
    
    overflow: "hidden",
    marginRight: 15,
  },
  zoomButton: {
    backgroundColor: "blue",
    padding: 15, 
    width: 20,
    height: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  zoomButtonText: {
    color: "white",
    textAlign: "center",
    color: "#fff",
    fontSize: 20,

  },
  precisionButton: {
    backgroundColor: "purple",
    padding: 8,
    width: 100,
    borderRadius: 5,
    marginVertical: 10,
    position: "absolute",
    top: 135,
    left: 14,
  },
  precisionButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});

export default OrderBooks;
