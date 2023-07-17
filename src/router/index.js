import DefaultLayout from "../layout/DefaultLayout"
import Booking from "../page/booking/Booking"
import Home from "../page/home/Home"
import Room from "../page/room/Room"
import RoomType from "../page/room_type/RoomType"
import Create from "../page/room_type/create/Create"
import Update from "../page/room_type/update/Update"

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
    {
        path: '/room-types/:id',
        element: Update,
        layout: DefaultLayout,
    },
    {
        path: '/room-types/create',
        element: Create,
        layout: DefaultLayout,
    },
]
export {router}