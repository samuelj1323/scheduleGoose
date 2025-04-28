import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Upload } from "./pages/Upload";
import { Settings } from "./pages/Settings";
import Schedule from "./pages/Schedule";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/schedule" element={<Schedule />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
