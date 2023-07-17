import DefaultLayout from "../layout/DefaultLayout"
import Home from "../page/home/Home"
import Login from "../page/login/Login"
import Room from "../page/room/Room"
import RoomType from "../page/room_type/RoomType"

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
    {
        path: '/room-types',
        element: RoomType,
        layout: DefaultLayout,
    },
]
export {router}