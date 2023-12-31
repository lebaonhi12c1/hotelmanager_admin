import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./store";
import { Provider } from "react-redux";
import ModalCheckInContext from "./context/check_in_out/ModalCheckInContext";
import ModalCheckOutContext from "./context/check_in_out/ModalCheckOutContext.jsx";
import FilterStatusContext from "./context/check_in_out/FilterStatus.jsx";
import BookingContext from "./context/booking/BookingContext.jsx";
import BookingChangeContext from "./context/booking_change/BookingChangeContext.jsx";
import FilterContext from "./context/home/FilterReport.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <ModalCheckInContext>
                <ModalCheckOutContext>
                    <FilterStatusContext>
                        <BookingContext>
                            <FilterContext>
                                <BookingChangeContext>
                                    <App />
                                </BookingChangeContext>
                            </FilterContext>
                        </BookingContext>
                    </FilterStatusContext>
                </ModalCheckOutContext>
            </ModalCheckInContext>
        </Provider>
    </React.StrictMode>
);
