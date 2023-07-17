import DefaultLayout from "../layout/DefaultLayout"
import Home from "../page/home/Home"
import Login from "../page/login/Login"
import Room from "../page/room/Room"

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
    {
        path: '/rooms',
        element: Room,
        layout: DefaultLayout,
    },
]
export {router}