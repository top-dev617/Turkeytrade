import { useRouter } from 'next/router';
import React from 'react';

const ErrorPage = () => {
    const router = useRouter();

    setTimeout(() => {
        router.push("/");
    }, 3000);
    return (
        <div>
            <div>
                <img
                    src="https://www.pngkey.com/png/detail/147-1473883_404-error-404-not-found-png.png"
                    alt=""
                    width="100%"
                />
            </div>
        </div>
    );
};

export default ErrorPage;