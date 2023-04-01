export const cssDisplay = (index: number, activeIndex: number) => {
    const cssDisplay = `
        ${Math.abs(index - activeIndex) >= 3 ? 'none' : 'block'}
    `;

    return cssDisplay;
};