interface StoreStatusData {
    Address1: string;
    Adress2: string;
    AvgOrderTime: number;
    Country: string;
    HiddenStore: boolean;
    HolidayName: string | null;
    Latitude: number;
    LocationName: string;
    Longitude: number;
    OrderAfterHours: boolean;
    OrderingEnabled: boolean;
    Phone: string;
    PosType: string;
    Postcode: string;
    State: string;
    StoreID: number;
    StoreStatus: string;
    Suburb: string;
    Timezone: string;
    OrderingProviderMenus: string;
    SaleTypeMenus: string;
    OpeningHours: {
        Friday: {
            ClosingTime: string;
            OpeningTime: string;
        },
        Monday: {
            ClosingTime: string;
            OpeningTime: string;
        },
        Publicholiday: {
            ClosingTime: string;
            OpeningTime: string;
        },
        Saturday: {
            ClosingTime: string;
            OpeningTime: string;
        },
        Sunday: {
            ClosingTime: string;
            OpeningTime: string;
        },
        Thursday: {
            ClosingTime: string;
            OpeningTime: string;
        },
        Tuesday: {
            ClosingTime: string;
            OpeningTime: string;
        },
        Wednesday: {
            ClosingTime: string;
            OpeningTime: string;
        },
    };
};

interface StoreStatus {
    response: {
        data: StoreStatusData[];
    }
};