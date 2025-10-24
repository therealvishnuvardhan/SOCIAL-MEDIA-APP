// color design tokens export
export const colorTokens = {
  grey: {
    0: "#FFFFFF",
    10: "#F6F6F6",
    50: "#F0F0F0",
    100: "#E0E0E0",
    200: "#C2C2C2",
    300: "#A3A3A3",
    400: "#858585",
    500: "#666666",
    600: "#4D4D4D",
    700: "#333333",
    800: "#1A1A1A",
    900: "#0A0A0A",
    1000: "#000000",
  },

  // Midnight Orchid (Dark)
  midnightOrchid: {
    background: "#11041B", // deep purple base
    surface: "#140627",    // surface cards/navbars
    primary: "#9A4DFF",    // bright violet
    accent: "#E4C7FA",     // pink highlight
    textMain: "#E3DAF9",   // main text
    textSecondary: "#B69FD8", // muted text
  },

  // Arctic Night (Light)
  arcticNight: {
    background: "#E8F0F7", // very light blue-gray
    surface: "#D1DEE9",    // cards/navbars
    primary: "#3C6E71",    // teal-green accent
    accent: "#284B63",     // deep teal
    textMain: "#1E1E1E",   // main text
    textSecondary: "#4A4A4A", // secondary text
  },
};

// MUI theme settings
export const themeSettings = (mode) => {
  const colors = colorTokens;
  const isDark = mode === "dark";

  return {
    palette: {
      mode,
      ...(isDark
        ? {
            // 🌙 Midnight Orchid
            primary: {
              dark: colors.midnightOrchid.accent,
              main: colors.midnightOrchid.primary,
              light: colors.midnightOrchid.surface,
            },
            neutral: {
              dark: colors.midnightOrchid.textMain,
              main: colors.midnightOrchid.textSecondary,
              mediumMain: colors.midnightOrchid.primary,
              medium: colors.midnightOrchid.accent,
              light: colors.midnightOrchid.surface,
            },
            background: {
              default: colors.midnightOrchid.background,
              alt: colors.midnightOrchid.surface,
            },
            text: {
              primary: colors.midnightOrchid.textMain,
              secondary: colors.midnightOrchid.textSecondary,
            },
          }
        : {
            // ❄️ Arctic Night
            primary: {
              dark: colors.arcticNight.accent,
              main: colors.arcticNight.primary,
              light: colors.arcticNight.surface,
            },
            neutral: {
              dark: colors.arcticNight.textMain,
              main: colors.arcticNight.textSecondary,
              mediumMain: colors.arcticNight.primary,
              medium: colors.arcticNight.accent,
              light: colors.arcticNight.surface,
            },
            background: {
              default: colors.arcticNight.background,
              alt: colors.arcticNight.surface,
            },
            text: {
              primary: colors.arcticNight.textMain,
              secondary: colors.arcticNight.textSecondary,
            },
          }),
    },
    typography: {
      fontFamily: ["Rubik", "sans-serif"].join(","),
      fontSize: 12,
      h1: { fontSize: 40 },
      h2: { fontSize: 32 },
      h3: { fontSize: 24 },
      h4: { fontSize: 20 },
      h5: { fontSize: 16 },
      h6: { fontSize: 14 },
    },
  };
};
