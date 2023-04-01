export const cssOpacity = (index: number, activeIndex: number) => {
    const cssOpacity = `
        ${Math.abs(index - activeIndex) >= 3 ? '0' : '1'}
    `;

    return cssOpacity;
};