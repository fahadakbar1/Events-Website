import Navbar from "./components/Navbar";
import EventsPage from "./pages/EventsPage";
import { Provider } from "react-redux";
import store from "./redux/store/store";
const App = () => {
  return (
    <Provider store={store}>
      <div className="custom-container">
        <Navbar />
        <EventsPage />
      </div>
    </Provider>
  );
};

export default App;
