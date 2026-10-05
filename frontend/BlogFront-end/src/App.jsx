import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import CreatePost from "./components/CreatePost"
import EditPost from "./components/EditPost"
import Navbar from "./components/Navbar"

function App()
{
    return(
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}> </Route>
        <Route path="/create" element={<CreatePost/>}></Route>
        <Route path="/edit/:id" element={<EditPost/>}></Route>

      </Routes>
      </BrowserRouter>
    )
}

export default App;