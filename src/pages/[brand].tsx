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

    const response: unknown = await fetch(`https://${brand}.redcatcloud.com.au/api/v1/stores`).then(res => res.json());

    return {
        props: {
            response
        },
    };
}; 