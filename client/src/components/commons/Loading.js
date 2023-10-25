import React from 'react';
import { Circles } from 'react-loader-spinner';
const Loading = () => {
    return (
        <div className='flex justify-center items-center w-full h-full'>
            <Circles
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="circles-loading"
                className="mx-auto"
                wrapperStyle={{}} h
                wrapperClass=""
                visible={true}
            />
        </div>
    );
};

export default Loading;