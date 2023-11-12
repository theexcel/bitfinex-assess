
export const ADD_BID = 'ADD_BID';
export const REMOVE_BID = 'REMOVE_BID';
export const ADD_ASK = 'ADD_ASK';
export const REMOVE_ASK = 'REMOVE_ASK';


export const addBid = (price, count, amount) => ({
  type: ADD_BID,
  payload: { price, count, amount },
});

export const removeBid = (price) => ({
  type: REMOVE_BID,
  payload: price,
});

export const addAsk = (price, count, amount) => ({
  type: ADD_ASK,
  payload: { price, count, amount },
});

export const removeAsk = (price) => ({
  type: REMOVE_ASK,
  payload: price,
});
