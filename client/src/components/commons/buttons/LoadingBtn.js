import React from 'react';

const LoadingBtn = ({ className }) => {
    return (
        <button className={`buttonload w-fit ${className && className}`}><i class="fa fa-spinner fa-spin"></i>Loading</button>
    );
};

export default LoadingBtn;