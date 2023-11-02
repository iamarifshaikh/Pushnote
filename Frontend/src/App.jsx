import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Authentication from "./pages/Authentication/Authentication.jsx";
import Workspace from "./pages/Workspace/Workspace.jsx";
import Home from "./pages/Home/Home.jsx";
import "./App.css";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/authenticate" element={<Authentication />} />
          <Route path="/workspace" element={<Workspace />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
