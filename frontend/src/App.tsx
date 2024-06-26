import { Route, Routes } from "react-router-dom"
import { HomePage } from "./components/HomePage"
import { Status } from "./components/Status/Status"
import { StatusViewer } from "./components/Status/StatusViewer"
import { SignIn } from "./components/Auth/SignIn"
import { SignUp } from "./components/Auth/SignUp"

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/status" element={<Status />}></Route>
                <Route
                    path="/status/:userId"
                    element={<StatusViewer />}
                ></Route>
                <Route path="/signin" element={<SignIn />}></Route>
                <Route path="/signup" element={<SignUp />}></Route>
            </Routes>
        </div>
    )
}

export default App
