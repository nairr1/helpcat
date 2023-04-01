export const cssTransformProperties = (index: number, activeIndex: number) => {
    const offset = (index - activeIndex) / 4;
    const direction = Math.sign(index - activeIndex);
    const obsOffset = Math.abs(offset);

    const cssTransformProperties = `
        rotateY(calc(${offset} * 55deg))
        scaleY(calc(1 + ${obsOffset} * -0.5))
        translateX(calc(${direction} * -3.5rem))
        translateZ(calc(${obsOffset} * -35rem))
    `;

    return cssTransformProperties;
};