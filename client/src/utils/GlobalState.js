import React, { createContext, useContext } from "react";

const UserIdContext = createContext();
// const { Provider } = UserIdContext;

const UserIdProvider = ({ userId, children}) => {
  return (
    <UserIdContext.Provider 
      value={userId}>
      {children}
    </UserIdContext.Provider>
  );
}

const useUserIdContext = () => {
  return useContext(UserIdContext)
};

export { UserIdProvider, useUserIdContext};


// import { useProductReducer } from './reducers'

// const StoreContext = createContext();
// const { Provider } = StoreContext;

// const StoreProvider = ({ value = [], ...props }) => {
//   const [state, dispatch] = useProductReducer({
//     products: [],
//     cart: [],
//     cartOpen: false,
//     categories: [],
//     currentCategory: '',
//   });

//   return <Provider value={[state, dispatch]} {...props} />;
// };

// const useStoreContext = () => {
//   return useContext(StoreContext);
// };

// export { StoreProvider, useStoreContext };
