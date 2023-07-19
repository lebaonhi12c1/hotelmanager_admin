import React, { memo, useContext } from 'react';
import { uid } from 'uid';
import { filter_status_context } from '../../context/check_in_out/FilterStatus';

const HeaderControl = memo(() => {

    const { set_filter_status } = useContext( filter_status_context )
    const buttons =
    [
        {
            lablel: 'Đang chờ nhận phòng',
            value: 'confirmed',
            color: 'blue'

        },
        {
            lablel: 'Đang ở',
            value: 'checkedIn',
            color: 'green'

        },
        {
            lablel: 'Đã trả phòng',
            value: 'checkedOut',
            color: 'red'

        },
        {
            lablel: 'Tất cả',
            value: 'all',
            color: 'blue'

        },
    ]
    return (
        <div
            className=' flex items-center gap-4 justify-between'
        >
            <div
                className=' flex items-center gap-2'
            >
                {
                    buttons.map(

                        item =>
                        {
                            return(
                                <button type="button"
                                    className={
                                        `
                                        text-white bg-gradient-to-r from-${item.color}-500 via-${item.color}-600 to-${item.color}-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-${item.color}-300 dark:focus:ring-${item.color}-800 shadow-lg shadow-${item.color}-500/50 dark:shadow-lg dark:shadow-${item.color}-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2     
                                       `
                                    }

                                    key={ uid(10) }
                                    onClick={
                                        () => set_filter_status( item.value )
                                    }
                                >
                                    {
                                        item.lablel
                                    }
                                </button>
                            )
                        }
                    )
                }
            </div>
        </div>
    );
});


HeaderControl.displayName = 'HeaderControl'
export default HeaderControl;