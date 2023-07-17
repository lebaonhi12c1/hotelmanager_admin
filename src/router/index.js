import DefaultLayout from "../layout/DefaultLayout"
import Home from "../page/home/Home"
import Room from "../page/room/Room"

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
]
export {router}