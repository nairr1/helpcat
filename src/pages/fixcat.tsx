import React, { useState } from "react";
import { read, utils } from "xlsx";
import Header from "~/components/Header";

interface Event<T = EventTarget> {
    target: T;
}

type SalesFile = {
    Line: number;
    SaleID: number;
    PaymentTypeOrPLUCode: string | number;
    ItemName: string | number;
    PLUPrice: number;
    SaleSubtotal: number;
    PaymentTotalOrPLUQuantity: number;
    SaleTipTotal: number;
    PaymentTipTotal: number; 
}

type Items = {
    plu: number;
    title: string;
    price: number;
}[]

type UnbalancedSaleProps = {
    saleId: number;
    saleTotal: number;
    items: Items;
    itemsTotal: number;
    paymentTotal: number;
    message: string;
    saleTip: number;
    paymentTipsTotal: number;
}

const UnbalancedSale = ({ saleId, saleTotal, items, itemsTotal, paymentTotal, saleTip, paymentTipsTotal, message }: UnbalancedSaleProps) => {
    return (
        <div className="text-center flex flex-col justify-center items-center text-sm font-light space-y-2">
            <p>{message}</p>

            <div className="w-[40rem] bg-20222e p-6 rounded-xl space-y-12">
                <div className="flex justify-start items-start space-x-4">
                    <div className="border-r pr-4">
                        <p className="font-medium text-68e2f4">SaleID</p>

                        <p>{saleId}</p>
                    </div>

                    <div className="border-r pr-4">
                        <p className="font-medium text-6caba0">Subtotal</p>

                        <p>${saleTotal}</p>
                    </div>

                    <div>
                        <p className="font-medium text-cf7b3c">Tips</p>

                        <p>${saleTip}</p>
                    </div>

                </div>

                <div className="flex flex-col items-center justify-center">
                    <p className="font-medium text-7072bc">Items</p>

                    <div className="mb-2">
                        {items.map((item) => (
                            <div className="flex">
                                <p className="mr-2">{item.title ? item.title : "Unreadable"}</p>

                                <p>${item.price}</p>
                            </div>
                        ))}
                    </div>

                    <p className="italic text-xs">Total: ${itemsTotal.toFixed(2)}</p>
                </div>

                <div className="flex items-end justify-end space-x-4">
                    <div className="border-r pr-4">
                        <p className="font-medium text-6caba0">Payment</p>
                    
                        <p>${paymentTotal}</p>
                    </div>

                    <div>
                        <p className="font-medium text-cf7b3c">Tips</p>

                        <p>${paymentTipsTotal}</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

const Fixcat = () => {
    const [salesData, setSalesData] = useState<SalesFile[]>([]);

    console.log(salesData)

    const readUploadFile = (e: Event<HTMLInputElement>) => {
        if (e.target.files) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const data = e.target?.result;
                const workbook = read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0] || "";
                const worksheet = workbook.Sheets[sheetName];
                setSalesData(utils.sheet_to_json(worksheet!));
            };

            reader.readAsArrayBuffer(e.target.files[0] as File);
        }
    };

    let saleId = 0;
    let saleTotal = 0;
    let itemsTotal = 0;
    let items: Items = [];
    let saleTip = 0;
    let paymentTipsArr: number[] = [];
    let paymentTipsTotal = 0;
    let paymentsArr: number[] = [];
    let paymentTotal = 0;

    return (
        <>
            <Header />

            <div className="flex flex-col justify-center items-center space-y-6 p-10">
                <label className="flex flex-col space-y-1 items-center p-4 bg-20222e rounded-lg shadow-lg tracking-wide uppercase cursor-pointer hover:bg-2f334a hover:border-5e4fb3/40 transition duration-500 border-282a36">
                    <svg className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                    </svg>

                    <span className="mt-1 text-sm leading-normal">Select a file</span>

                    <input type='file' className="file:hidden text-sm font-light cursor-pointer" onChange={readUploadFile} />
                </label>
                
                <label htmlFor="">
                    <input 
                        type="file" 
                        name="upload"
                        className="hidden"
                        onChange={readUploadFile}
                    />
                </label>

                {salesData.map(({
                    SaleID, 
                    Line, 
                    SaleSubtotal, 
                    PaymentTotalOrPLUQuantity, 
                    PLUPrice,
                    SaleTipTotal,
                    PaymentTipTotal,
                    PaymentTypeOrPLUCode,
                    ItemName
                }: SalesFile, index) => {
                    if (Line === 1) {
                        saleId = SaleID;
                        saleTotal = SaleSubtotal;
                        itemsTotal = 0;
                        paymentsArr = [];
                        paymentTipsTotal = 0;
                        saleTip = SaleTipTotal;
                        items = [];
                        paymentTipsArr = [];
                    }

                    if (Line === 2 && SaleID === saleId) {
                        itemsTotal += PaymentTotalOrPLUQuantity * PLUPrice;
                        items.push({plu: PaymentTypeOrPLUCode as number,title: ItemName as string, price: PLUPrice})
                    }

                    if (Line === 3 && SaleID === saleId) {
                        paymentsArr.push(PaymentTotalOrPLUQuantity);
                        paymentTipsArr.push(PaymentTipTotal);
                        paymentTipsTotal = paymentTipsArr.reduce((a, b) => a + b, 0);
                        paymentTotal = paymentsArr.reduce((a, b) => a + b, 0);
                    }

                    if (salesData[index + 1]?.Line !== 3) {
                        if (Line === 3 && SaleID === saleId && paymentTotal < saleTotal) {
                            return (
                                <UnbalancedSale  
                                    key={index}
                                    saleId={saleId}
                                    saleTotal={saleTotal}
                                    items={items}
                                    itemsTotal={itemsTotal}
                                    paymentTotal={paymentTotal}
                                    saleTip={saleTip}
                                    paymentTipsTotal={paymentTipsTotal}
                                    message="Theres a discrepancy between the subtotal and the payment amount."
                                />
                            );
                        }
    
                        if (Line === 3 && SaleID === saleId && saleTotal !== Math.round(itemsTotal * 10) / 10) {
                            return (
                                <UnbalancedSale  
                                    key={index}
                                    saleId={saleId}
                                    saleTotal={saleTotal}
                                    items={items}
                                    itemsTotal={itemsTotal}
                                    paymentTotal={paymentTotal}
                                    saleTip={saleTip}
                                    paymentTipsTotal={paymentTipsTotal}
                                    message="There's a discrepancy between the subtotal and the total price of all items."
                                />
                            );
                        }
    
                        if (Line === 3 && SaleID === saleId && paymentTotal < Math.round(itemsTotal * 10) / 10) {
                            return (
                                <UnbalancedSale 
                                    key={index} 
                                    saleId={saleId}
                                    saleTotal={saleTotal}
                                    items={items}
                                    itemsTotal={itemsTotal}
                                    paymentTotal={paymentTotal}
                                    saleTip={saleTip}
                                    paymentTipsTotal={paymentTipsTotal}
                                    message="There's a discrepancy between the payment amount and the total price of all items."
                                />
                            );
                        }
    
                        if (Line === 3 && SaleID === saleId && paymentTotal + paymentTipsTotal < saleTotal + saleTip) {
                            return (
                                <UnbalancedSale  
                                    key={index}
                                    saleId={saleId}
                                    saleTotal={saleTotal}
                                    items={items}
                                    itemsTotal={itemsTotal}
                                    paymentTotal={paymentTotal}
                                    saleTip={saleTip}
                                    paymentTipsTotal={paymentTipsTotal}
                                    message="There's a discrepancy between the subtotal + tips and the payment amount + tips."
                                />
                            );
                        }

                        if (Line === 3 && SaleID === saleId && paymentTipsTotal !== saleTip) {
                            return (
                                <UnbalancedSale  
                                    key={index}
                                    saleId={saleId}
                                    saleTotal={saleTotal}
                                    items={items}
                                    itemsTotal={itemsTotal}
                                    paymentTotal={paymentTotal}
                                    saleTip={saleTip}
                                    paymentTipsTotal={paymentTipsTotal}
                                    message="There's a discrepancy between the tips on line 1 and line 3."
                                />
                            );
                        }
                    }
                })}

            </div>
        </>

    );
};

export default Fixcat;