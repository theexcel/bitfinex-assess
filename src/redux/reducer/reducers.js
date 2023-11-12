
import { ADD_BID, REMOVE_BID, ADD_ASK, REMOVE_ASK } from '../actions/actions';

const initialState = {
  bids: {},
  asks: {},
};

const orderBookReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BID:
      return {
        ...state,
        bids: {
          ...state.bids,
          [action.payload.price]: action.payload,
        },
      };

    case REMOVE_BID:
      const { [action.payload]: removedBid, ...bidsWithoutRemoved } = state.bids;
      return {
        ...state,
        bids: bidsWithoutRemoved,
      };

    case ADD_ASK:
      return {
        ...state,
        asks: {
          ...state.asks,
          [action.payload.price]: action.payload,
        },
      };

    case REMOVE_ASK:
      const { [action.payload]: removedAsk, ...asksWithoutRemoved } = state.asks;
      return {
        ...state,
        asks: asksWithoutRemoved,
      };

    default:
      return state;
  }
};

export default orderBookReducer;
