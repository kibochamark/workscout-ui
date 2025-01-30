import React, { ReactNode } from 'react'

const Wrapcomponent = ({ children }: { children: ReactNode }) => {
    return (
        <div className='md:px:10 px-2 py-8 md:py-4'>{
            children}</div>
    )
}

export default Wrapcomponent