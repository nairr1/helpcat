import type { GetServerSideProps } from "next";
import React from 'react';

const StoreStatus = () => {
    return (
        <div>
            hey
        </div>
    );
};

export default StoreStatus;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const brand = context?.query.brand as string;

    return {
        props: {
            brand
        },
    };
}; 