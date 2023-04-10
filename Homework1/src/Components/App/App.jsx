import { Routes, Route } from "react-router-dom";
import { Homepage, Auth, AuthContextProvider } from "../../features";
import { Nav, NotFound } from "../";
import "./App.css";

export function App() {
  return (
    <AuthContextProvider>
      <Nav />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/posts" element={<NotFound />} />
        <Route path="/logIn" element={<Auth />} />
        <Route path="/singUp" element={<Auth />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthContextProvider>
  );
}
