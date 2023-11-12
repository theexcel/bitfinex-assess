import React, { useEffect } from "react";
import { View, Text } from "react-native";
import OrderBooks from "./src/components/OrderBooks";
import store from "./src/redux/store/store";
import { Provider } from "react-redux";

const App = () => {
  
  return (
    <Provider store={store}>
   <View style={{flex: 1,   backgroundColor: '#112331',}}>
<OrderBooks />
   </View>
    </Provider>
  );
};

export default App;