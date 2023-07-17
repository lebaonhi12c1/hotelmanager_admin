import DefaultLayout from "../layout/DefaultLayout"
import Home from "../page/home/Home"
import Login from "../page/login/Login"

const router = [
    {
        path: '/',
        element: Home,
        layout: DefaultLayout,
    },
    {
        path: '/login',
        element: Login,
        layout: null,
    },
]
export {router}