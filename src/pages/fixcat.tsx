import { useUser } from "@clerk/nextjs";
import React, { useState } from "react";
import { read, utils } from "xlsx";
import Header from "~/components/Header";
import { userVerification } from "~/utils/userVerification";

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
                        {items.map((item, index) => (
                            <div
                                key={index} 
                                className="flex"
                            >
                                <p className="mr-2">{item.title ? item.title : "Unreadable"}</p>

                                <p>${item.price}</p>
                            </div>
                        ))}
                    </div>

                    <p className="italic text-xs">Total: ${Math.round(itemsTotal * 100) / 100}</p>
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
    const [fileName, setFileName] = useState("");
    const [salesData, setSalesData] = useState<SalesFile[]>([]);
    const [counter, setCounter] = useState(0);

    setTimeout(() => {
        if(counter < 1) {
            setCounter(1);
        }
    }, 2000);

    const user = useUser();

    let userEmail = "";

    if (user.user?.primaryEmailAddress) {
        userEmail = user.user.primaryEmailAddress.toString();
    }

    const readUploadFile = (e: Event<HTMLInputElement>) => {
        if (e.target.files?.[0]?.name.includes(".xlsx") === false) return console.log("Not a .xlsx file.");

        if (e.target.files) {
            const fileName = e.target.files?.[0]?.name || "";
            const reader = new FileReader();

            reader.onload = (e) => {
                const data = e.target?.result;
                const workbook = read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0] || "";
                const worksheet = workbook.Sheets[sheetName];
                setSalesData(utils.sheet_to_json(worksheet!));
            };

            reader.readAsArrayBuffer(e.target.files[0] as File);

            setFileName(fileName);
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

            {userVerification(userEmail, "fixcat") ? (
                <div className="flex flex-col justify-center items-center space-y-6 p-4 pb-10">
                    <div className="flex flex-col justify-center items-center space-y-4 mb-2 font-light text-sm">
                        <p>
                            Upload an unbalanced Legacy sales file to <span className="text-68e2f4 font-normal">Fixcat</span> and it will return all unbalanced sales.
                        </p>

                        <div className="flex flex-col justify-start items-start">
                            <p>
                                <span className="text-68e2f4 font-normal">Fixcat</span> will complete the following checks on the sales file:
                            </p>

                            <div className="flex items-center space-x-1">
                                <span className="border border-ffffff rounded-full h-1 w-1 bg-ffffff">{" "}</span>

                                <p>If the <span className="font-medium">payment</span> total is lower than the sale subtotal.</p>
                            </div>

                            <div className="flex items-center space-x-1">
                                <span className="border border-ffffff rounded-full h-1 w-1 bg-ffffff">{" "}</span>

                                <p>If the sale <span className="font-medium">subtotal</span> doesn&apos;t match the total value of all items.</p>
                            </div>

                            <div className="flex items-center space-x-1">
                                <span className="border border-ffffff rounded-full h-1 w-1 bg-ffffff">{" "}</span>

                                <p>If the <span className="font-medium">payment</span> total is lower than the total value of all items.</p>
                            </div>

                            <div className="flex items-center space-x-1">
                                <span className="border border-ffffff rounded-full h-1 w-1 bg-ffffff">{" "}</span>

                                <p>If the <span className="font-medium">payment</span> total + <span className="font-medium">tips</span> is lower than the sale subtotal + tips.</p>
                            </div>


                            <div className="flex items-center space-x-1">
                                <span className="border border-ffffff rounded-full h-1 w-1 bg-ffffff">{" "}</span>

                                <p>If the <span className="font-medium">tips</span> subtotal doesn't match the tips payment.</p>
                            </div>

                        </div>

                        <div className="flex flex-col justify-center items-center text-xs">
                            <p>
                                You will need to save the sales file as an excel &ldquo;<span className="italic">xlsx</span>&ldquo; file and format the first row to help <span className="text-68e2f4 font-normal">Fixcat</span> apply it&apos;s logic.
                            </p>

                            <p>
                                Read more: 

                                {" "}

                                <a 
                                    href="https://excalidraw.com/#json=2uY4FeJxgt7I8DBbDZ9I4,GVtGUYguIVwkCj9VQFwwiw"
                                    className="hover:text-ffffff/70 italic" 
                                    target="_blank"
                                >
                                    https://excalidraw.com/#json=2uY4FeJxgt7I8DBbDZ9I4,GVtGUYguIVwkCj9VQFwwiw
                                </a>
                            </p>
                        </div>

                    </div>

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
                            accept=".xlsx"
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
                                        message={`The payment total is lower than the sale subtotal for SaleID: ${saleId}.`}
                                    />
                                );
                            }
        
                            if (Line === 3 && SaleID === saleId && saleTotal !== Math.round(itemsTotal * 100) / 100) {
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
                                        message={`The sale subtotal doesn't match the total value of all items for SaleID: ${saleId}.`}
                                    />
                                );
                            }
        
                            if (Line === 3 && SaleID === saleId && paymentTotal < Math.round(itemsTotal * 100) / 100) {
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
                                        message={`The payment total is lower than the total value of all items for SaleID: ${saleId}.`}
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
                                        message={`The payment total + tips is lower than the sale subtotal + tips for SaleID: ${saleId}.`}
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
                                        message={`The tips subtotal doesn't match the tips payment for SaleID: ${saleId}.`}
                                    />
                                );
                            }

                            if (index === salesData.length - 1) {
                                return (
                                    <p className="text-xs font-light" key={index}>
                                        Fixcat has completed checking <span className="italic">{fileName}</span>
                                    </p>
                                )
                            }

                        }
                    })}
                </div>
            ) : (
                <div className="text-center mt-[2rem]">
                    {counter === 1 && (
                        <p className={`transition duration-1000 transform ${counter !== 1 && "opacity-0" || "opacity-100" }`}>
                            YOU AREN&apos;T AUTHORIZED TO VIEW THIS PAGE.
                        </p>
                    )}
                </div>
            )}
        </>

    );
};

export default Fixcat;