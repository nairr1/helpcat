export const formatTradingTime = (time: string) => {
    const hour = time.slice(0, 2);

    const formatHour = Number(hour) - 12;

    const formatTime = `${formatHour.toString()}${time.slice(2)}`;

    if(Number(hour) > 12) {
        return `${formatTime}PM`;
    } else if(Number(hour) === 12) {
        return `${time}PM`;
    } else if (Number(hour) === 0) {
        return `${time}AM`
    } else {
        return `${time.replace(/^0+/, "")}AM`;
    }
};