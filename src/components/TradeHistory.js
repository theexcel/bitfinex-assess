// import React, { useEffect, useState } from "react";
// import { View, Text, FlatList, StyleSheet, SafeAreaView } from "react-native";
// import { useSelector, useDispatch } from "react-redux";
// import { useTradeHistoryWebSocket } from "../api/api";
// import { Table, Row, Rows } from 'react-native-table-component';
// const TradeHistory = () => {
//     const tradeHistory = useSelector((state) => state.tradeHistory);
//     const [table, setTable] = useState([
//         tradeHistory
//     ])
//     const tableHeader =  ['id', 'Price', 'Amunt', 'Count',]
//   // Use the useSelector hook to access the order book data from the Redux store
  
//   console.log('it coming', tradeHistory)
//   const ws = useTradeHistoryWebSocket();

// // useEffect(() => {
// //     // Use the existing data in the table state and add new data
// //     setTable((prevTable) => [[...prevTable, ...tradeHistory]]);
// //   }, [tradeHistory]);
//   return (
//  <SafeAreaView>
//        {/* <FlatList
//       data={tradeHistory}
//       keyExtractor={(item, index) => `${item[0]}-${index}`} // Use a unique key
//       renderItem={renderItem}
//       ListHeaderComponent={
//         <View style={styles.row}>
//           <Text style={styles.header}>Price</Text>
//           <Text style={styles.header}>Amunt</Text>
//           <Text style={styles.header}>Count</Text>
//         </View>
//       }
//     /> */}
//          <View style={styles.container}>
//         <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
//           <Row data={tableHeader} style={styles.head} textStyle={styles.text}/>
//           <Rows data={table} textStyle={styles.text}/>
//         </Table>
//       </View>
//  </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     padding: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//   },
//   column: {
//     flex: 1,
//     textAlign: "center",
//   },
//   header: {
//     fontWeight: "bold",
//     flex: 1,
//     textAlign: "center",
//   },
// });

// export default TradeHistory;