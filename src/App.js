// Import dependencies, other components
import Header from "./my-components/Header"; //Header component
import Footer from "./my-components/Footer";//Footer Component
import Home from "./my-components/Home";// Home component
import AdvancedJS from "./my-components/AdvancedJS";// Advanced JS
import { BrowserRouter as BrowserRouter, HashRouter as HashRouter, Routes, Route } from "react-router-dom";
import FAQ from './my-components/FAQ';//import FAQ Component
import Invoice from './my-components/Invoice';//import Invoice Component

// Functional component "App"
function App() {

  // UI component: HTML rendering
  return (
    <> {/* React Fragment: serves as parent component in JSX */}

      {/* <BrowserRouter basename='/React-Project2'> */}
      <HashRouter>
        <Header /> {/* Include Header component */}
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home component*/}
          <Route path="/advancedJS" element={<AdvancedJS />} /> {/* AdvancedJS component*/}
          <Route path="/faq" element={<FAQ />} />
          <Route path="/invoice" element={<Invoice />} />
        </Routes>
        <Footer /> {/*Include Footer component */}
      </HashRouter>
      { /*</BrowserRouter> */}
    </>
  );
}

// Export this component to the entire app
export default App;