import Item from '@/components/Item';
import Loading from '@/components/commons/Loading';
import React, { useEffect, useState } from 'react';

const Search = ({ products }) => {
    const [isLoading, setIsLoading] = useState(true)

    setTimeout(() => {
        setIsLoading(false)
    }, 2000);
    return (
        <div className='container mx-auto my-8'>
            {
                !isLoading ? <>
                    {
                        products?.length > 0 ? <Item items={products} /> :
                            <div className="d-flex" style={{ minHeight: "400px", justifyContent: "center", alignItems: "center" }}>
                                <h4 className='label' style={{ color: "rgb(3,125,65)" }}>No Products</h4>
                            </div>

                    }
                </> :
                    <Loading />
            }

        </div>
    );
};

export async function getServerSideProps(context) {
    const { params } = context;
    const { search } = params;

    const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/products/search/products?search=${search}`);
    const data = await response.json();
    return {
        props: {
            products: data.data,
        },
    };
}

export default Search;