export const formatTradingTime = (time: string) => {
    const hour = time.slice(0, 2);

    const formatHour = Number(time.slice(0, 2)) - 12;

    const formatTime = `${formatHour.toString()}${time.slice(2)}`;

    if (Number(hour) > 11) {
        return `${formatTime}PM`;
    } else {
        return `${time.replace(/^0+/, "")}AM`;
    };
};