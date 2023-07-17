import DefaultLayout from "../layout/DefaultLayout"
import Availble from "../page/availbleRoom/AvailbleRoom"
import Booking from "../page/booking/Booking"
import Customer from "../page/customer/Customer"
import Employee from "../page/employee/Employee"
import Home from "../page/home/Home"
import Payment from "../page/payment/Payment"
import Room from "../page/room/Room"
import RoomType from "../page/room_type/RoomType"
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
]
export { router }