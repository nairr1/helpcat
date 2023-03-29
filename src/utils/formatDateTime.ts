export const formatDateTime = (timestamp: string) => {
    const formattedTimestamp = timestamp.replace("T", ", ");

    return formattedTimestamp;
};