import React, { memo } from 'react';
import { uid } from 'uid';
import CardFilterRoom from './CardFilterRoom';

const ListFilter = memo(( { value }) => {
    return (
        <div>
            <div
                className='grid grid-cols-4 gap-4'
            >
                {
                    value?.map(
                        item =>
                        {
                            return (
                                <div className="" key={ uid(10) }>
                                    
                                    <CardFilterRoom
                                        value = { item }
                                    />

                                </div>
                            )
                        }
                    )
                }
            </div>
        </div>
    );
});

ListFilter.displayName = 'ListFilter'
export default ListFilter;