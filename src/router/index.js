import DefaultLayout from "../layout/DefaultLayout"
import Availble from "../page/availbleRoom/AvailbleRoom"
import Booking from "../page/booking/Booking"
import BookingRoomPage from "../page/bookingroom/BookingRoomPage"
import CheckInOut from "../page/check_in_out/CheckInOut"
import Customer from "../page/customer/Customer"
import Employee from "../page/employee/Employee"
import Home from "../page/home/Home"
import Payment from "../page/payment/Payment"
import Room from "../page/room/Room"
import RoomType from "../page/room_type/RoomType"
import Create from "../page/room_type/create/Create"
import Update from "../page/room_type/update/Update"
import Service from "../page/service/Service"

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

        path: '/service',
        element: Service,
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
    {

        path: '/payments',
        element: Payment,
        layout: DefaultLayout,
    },

    {

        path: '/employees',
        element: Employee,
        layout: DefaultLayout,
    },

    {

        path: '/customers',
        element: Customer,
        layout: DefaultLayout,
    },

    {

        path: '/availble-room',
        element: Availble,
        layout: DefaultLayout,
    },
    {

        path: '/check',
        element: CheckInOut,
        layout: DefaultLayout,
    },
    {

        path: '/bookingroom',
        element: BookingRoomPage,
        layout: DefaultLayout,
    },
]
export { router }