// export const typography = {
//     screenTitle: { fontSize: 40, fontWeight: "800" as const },
//     h1: { fontSize: 26, fontWeight: "800" as const },
//     h2: { fontSize: 20, fontWeight: "700" as const },
//     h3: { fontSize: 16, fontWeight: "500" as const },
//     body: { fontSize: 14, fontWeight: "400" as const },
//     small: { fontSize: 12, fontWeight: "400" as const },
// };

export const fontFamilies = {
    screenTitle: "SpaceMono-Regular",
    headingBold: "Playfair-Bold",
    heading: "Playfair-SemiBold",
    headingRegular: "Playfair-Regular",
    body: "Varela-Regular",
};

export const typography = {
    screenTitle: {
        fontFamily: fontFamilies.headingBold,
        fontSize: 40,
        fontWeight: "800" as const,
    },
    h1: {
        fontFamily: fontFamilies.headingBold,
        fontSize: 26,
        lineHeight: 32,
    },
    h2: {
        fontFamily: fontFamilies.heading,
        fontSize: 20,
        lineHeight: 26,
    },
    h3: {
        fontFamily: fontFamilies.headingRegular,
        fontSize: 16,
        lineHeight: 22,
    },
    body: {
        fontFamily: fontFamilies.body,
        fontSize: 14,
        lineHeight: 20,
    },
    small: {
        fontFamily: fontFamilies.body,
        fontSize: 10,
        lineHeight: 16,
    },
};
