import DefaultLayout from "../layout/DefaultLayout"
import Home from "../page/home/Home"
import Room from "../page/room/Room"
import RoomType from "../page/room_type/RoomType"

const router = [
    {
        path: '/',
        element: Home,
        layout: DefaultLayout,
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