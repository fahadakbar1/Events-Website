import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import Navbar from "./components/Navbar";
import EventsPage from "./pages/EventsPage";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="custom-container font-sans">
          <Navbar />
          <Routes>
            <Route path="/" Component={EventsPage} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
