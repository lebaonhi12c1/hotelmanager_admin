import React, { memo, useEffect, useState } from 'react';
import CardWidget from './CardWidget';
import Fetch from '../../helpers/fetch';
import Toast from '../../helpers/Toast';
const ListWidget = memo(() => {

    const [ data, set_data ] = useState( null )
    const get_report = async () =>
    {
        const res = await Fetch.make().get(
            `${ import.meta.env.VITE_API_URL }/api/report/statistics`
        )
        if( !res.success )
        {
            Toast.getToastError( res.message )
        }
        set_data( res.data)

    }
    useEffect(
        () =>
        {
            get_report()
        },[]
    )
    return (
        <div
            className='grid grid-cols-4 gap-4'
        >
            <CardWidget
                value = {
                    {
                        heading: 'Phòng',
                        total: data?.room.total,
                        published: data?.room.roomPublish
                    }
                }
            />
            <CardWidget
                value = {
                    {
                        heading: 'Loại phòng',
                        total: data?.roomType.total,
                        published: data?.roomType.roomTypePublish
                    }
                }
            />
            <CardWidget
                value = {
                    {
                        heading: 'Dịch vụ',
                        total: data?.service.total,
                        published: data?.service.servicePublish
                    }
                }
            />
            <CardWidget
                value = {
                    {
                        heading: 'Nhân viên',
                        total: data?.employee.total,
                        published: data?.employee.activeEmployees
                    }
                }
            />
        </div>
    );
});


ListWidget.displayName = 'ListWidget'

export default ListWidget;