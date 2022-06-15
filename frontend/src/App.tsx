import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import Router from "./router";
import SocketsService from "./services/Sockets";
import store from "./store/store";

import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <SocketsService>
          <Router />
        </SocketsService>
        <ToastContainer />
      </Provider>
    </>
  );
};

export default App;
