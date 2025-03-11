import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Component/Pages/Login";
import Layout from "./Component/Section/Layout";
import TestSched from "./Component/Pages/TestSched";
import Test from "./Component/Pages/Test";
// import TestPage from "./Component/Pages/TestPage";
import Result from "./Component/Pages/Result";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path ="/" element ={<Layout/>}>
        <Route path="/" element={<Login/>}/>
        <Route path="testschedule" element={<TestSched/>} /> 
        <Route path="test" element={<Test/>} />
        <Route path="/results" element={<Result/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
