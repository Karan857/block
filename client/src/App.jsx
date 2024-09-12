import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Index from "./pages/Index";
import Layout from "./components/Layout";
import MyBlock from "./pages/MyBlock";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />

        <Route element={<Layout />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/index" element={<Index />} />
          <Route path="/index/:user_ID" element={<MyBlock />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:post_ID" element={<Edit />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
