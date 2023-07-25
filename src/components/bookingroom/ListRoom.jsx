import React, { memo } from 'react';
import { uid } from 'uid';
import CardRoomChild from './CardRoomChild';

const ListRoom = memo(( { value } ) => {
    return (
        <div
            className='flex flex-col gap-4'
        >
            {
                value?.map( 
                    item =>
                    {
                        return (
                            <div className="grid grid-cols-5 gap-4"
                                key={ uid( 10 ) }
                            >
                                <div
                                    
                                >
                                    <img 
                                        src={
                                            item?.ImageRoomTypes[0]?.value
                                        } 
                                        alt="image_room_type" 
                                        className=' object-cover'
                                    />
                                </div>
                                <div
                                    className=' col-span-4 flex items-center gap-4 overflow-auto'
                                >
                                    {
                                        item?.rooms?.map(
                                            room =>
                                            {
                                                return (
                                                    <div className=" flex-shrink-0 w-[320px]"
                                                        key={ uid( 10 ) }
                                                    >
                                                        <CardRoomChild
                                                            value = { room }
                                                        />
                                                    </div>
                                                )
                                            }
                                        )
                                    }
                                </div>
                            </div>
                        )
                    }
                )
            }
        </div>
    );
});

ListRoom.displayName = 'ListRoom'

export default ListRoom;