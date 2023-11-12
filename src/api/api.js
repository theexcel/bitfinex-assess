import { addBid, removeBid, addAsk, removeAsk } from "../redux/actions/actions";
import { useDispatch } from "react-redux";
import { useRef, useEffect, useState } from "react";

export const useOrderBookWebSocket = () => {
  const dispatch = useDispatch();
  const [isConnected, setConnected] = useState(false);
  const ws = useRef(null);

  const connectWebSocket = () => {
    if (!isConnected) {
      ws.current = new WebSocket("wss://api-pub.bitfinex.com/ws/2");

      ws.current.onopen = () => {
        setConnected(true);
        ws.current.send(
          JSON.stringify({
            event: 'subscribe', 
            channel: 'book', 
            symbol: 'tBTCUSD',
            prec: "P0",
            freq: "F1",
            len: "25",
            subId: 123
          })
        );
      };

      ws.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (Array.isArray(data[1]) && data[1].length === 3) {
            handleUpdate(data[1], dispatch);
          } else {
            if (data[1] !== 'hb') {
              handleSnapshot(data[1], dispatch);
            } else if (data[1] === 'hb') {
              return;
            }
          }
        } catch (error) {
          console.error("Failed to parse WebSocket message:", error);
        }
      };
    }
  };

  const disconnectWebSocket = () => {
    if (ws.current) {
      ws.current.close();
      setConnected(false);
    }
  };

  useEffect(() => {
    return () => {
      disconnectWebSocket();
    };
  }, []);

  return { isConnected, connectWebSocket, disconnectWebSocket };
};

function handleUpdate(updateData, dispatch) {
  const [price, count, amount] = updateData;
  if (count > 0) {
    if (amount > 0) {
      dispatch(addBid(price, count, amount));
    } else if (amount < 0) {
      dispatch(addAsk(price, count, -amount));
    }
  } else {
    if (amount > 0) {
      dispatch(removeBid(price));
    } else if (amount < 0) {
      dispatch(removeAsk(price));
    }
  }
}

function handleSnapshot(snapshotData, dispatch) {
  if (snapshotData && Array.isArray(snapshotData)) {
  snapshotData.forEach((level) => {
    const [price, count, amount] = level;

    if (amount > 0) {
      dispatch(addBid(price, count, amount));
    } else if (amount < 0) {
      dispatch(addAsk(price, count, -amount));
    }
  });
}
}