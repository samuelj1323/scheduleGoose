import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Upload } from "./pages/Upload";

function App() {
  return (
    <div className="dark:bg-gray-900 dark:text-white">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/upload" element={<Upload />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
