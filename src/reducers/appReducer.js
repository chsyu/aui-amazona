import actionType from "../constants";

const initialAppState = {
  aside: {
    open: false,
  },
  products: {
    items: [],
    loading: false,
    error: "",
  },
  product: {
    item: {},
    loadingg: false,
    error: "",
  },
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  userSignin: {
    loading: false,
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
    error: "",
  },
  userRegister: {
    loading: false,
    userInfo: null,
    error: "",
  },
};

let cartItems = {};

const appReducer = (state, action) => {
  switch (action.type) {
    case actionType.OPEN_ASIDE:
      return { ...state, aside: { ...state.aside, open: true } };
    case actionType.CLOSE_ASIDE:
      return { ...state, aside: { ...state.aside, open: false } };

    case actionType.PRODUCT_LIST_REQUEST:
      return { ...state, products: { ...state.products, loading: true } };
    case actionType.PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        products: { ...state.products, items: action.payload, loading: false },
      };
    case actionType.PRODUCT_LIST_FAIL:
      return {
        ...state,
        products: { ...state.products, error: action.payload, loading: false },
      };

    case actionType.PRODUCT_DETAILS_REQUEST:
      return { ...state, product: { ...state.product, loading: true } };
    case actionType.PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        product: { ...state.product, item: action.payload, loading: false },
      };
    case actionType.PRODUCT_DETAILS_FAIL:
      return {
        ...state,
        product: { ...state.product, error: action.payload, loading: false },
      };

    case actionType.CART_INIT_ITEMS:
      cartItems = action.payload || [];
      return { ...state, cartItems };
    case actionType.CART_ADD_ITEM:
      const item = action.payload;
      const product = state.cartItems.find((x) => x.product === item.product);
      if (product) {
        cartItems = state.cartItems.map((x) =>
          x.product === product.product ? item : x
        );
        return { ...state, cartItems };
      }
      cartItems = [...state.cartItems, item];
      return { ...state, cartItems };
    case actionType.CART_REMOVE_ITEM:
      cartItems = state.cartItems.filter((x) => x.product !== action.payload);
      return { ...state, cartItems };

    case actionType.USER_INIT_INFO:
      return {
        ...state,
        userSignin: {
          ...state.userSignin,
          userInfo: action.payload,
        },
      };
    case actionType.USER_SIGNIN_REQUEST:
      return { ...state, userSignin: { ...state.userSignin, loading: true } };
    case actionType.USER_SIGNIN_SUCCESS:
      return {
        ...state,
        userSignin: {
          ...state.userSignin,
          loading: false,
          userInfo: action.payload,
        },
      };
    case actionType.USER_SIGNIN_FAIL:
      return {
        ...state,
        userSignin: {
          ...state.userSignin,
          loading: false,
          error: action.payload,
        },
      };

    case actionType.USER_UPDATE_PROFILE_REQUEST:
      return { ...state, userSignin: { ...state.userSignin, loading: true } };
    case actionType.USER_UPDATE_PROFILE_SUCCESS:
      return { ...state, userSignin: { ...state.userSignin, loading: false } };
    case actionType.USER_UPDATE_PROFILE_FAIL:
      return {
        ...state,
        userSignin: {
          ...state.userSignin,
          loading: false,
          error: action.payload,
        },
      };
    case actionType.USER_LOGOUT:
      cartItems = [];
      return {
        ...state,
        cartItems,
        userSignin: {
          ...state.userSignin,
          userInfo: null,
        },
      };

    case actionType.USER_REGISTER_REQUEST:
      return {
        ...state,
        userRegister: { ...state.userRegister, loading: true },
      };

    case actionType.USER_REGISTER_SUCCESS:
      return {
        ...state,
        userSignin: {
          ...state.userSignin,
          userInfo: action.payload,
        },
        userRegister: {
          ...state.userRegister,
          loading: false,
          userInfo: action.payload,
        },
      };
    case actionType.USER_REGISTER_FAIL:
      return {
        ...state,
        userRegister: {
          ...state.userRegister,
          loading: false,
          error: action.payload,
        },
      };
    default:
      return state;
  }
};

export { initialAppState, appReducer };
