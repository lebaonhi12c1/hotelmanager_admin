import DefaultLayout from "../layout/DefaultLayout"
import Booking from "../page/booking/Booking"
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
    {
        path: '/bookings',
        element: Booking,
        layout: DefaultLayout,
    },
]
export {router}