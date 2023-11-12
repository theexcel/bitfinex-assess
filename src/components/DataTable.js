// import React, {useEffect} from 'react';
// import {View, Text} from 'react-native';
// import {useDispatch, useSelector} from 'react-redux';
// import {updateOrderBook, updateTradeHistory} from '../redux/actions/actions';
// // import WebSocket from 'react-native-websocket';

// const DataTable = () => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const ws = new WebSocket('wss://api-pub.bitfinex.com/ws/2');

//     // Listen for messages
//     ws.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//     };

//     // Subscribe to the 'trades' channel when the WebSocket connection is open
//     ws.onopen = () => {
//       const subscribeMsg = {
//         event: 'subscribe',
//         channel: 'trades',
//         symbol: 'tBTCUSD',
//       };
//       ws.send(JSON.stringify(subscribeMsg));
//     };

//     // Clean up WebSocket connection when the component unmounts
//     return () => {
//       ws.close();
//     };
//   }, []);

//   console.log('hi');

//   return (
//     <View>
//       <Text>Heddddddll from here</Text>
//     </View>
//   );
// };

// export default DataTable;
