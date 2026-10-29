// Dictionnaire de traduction des impacts GTFS-RT
export const effectTranslate = {
    STOP_MOVED: "Arrêt déplacé",
    DETOUR: "Déviation",
    DIVERSION: "Déviation",
    SIGNIFICANT_DELAYS: "Retard",
    REDUCED_SERVICE: "Service réduit",
    NO_SERVICE: "Aucun service",
    ADDITIONAL_SERVICE: "Service additionnel",
    OTHER_EFFECT: "Information"
};

// Couleurs associées selon la gravité
export const effectColors = {
    SIGNIFICANT_DELAYS: "#bb2124",
    NO_SERVICE: "#bb2124",
    DIVERSION: "#ff9300",
    DETOUR: "#ff9300",
    STOP_MOVED: "#ff9300",
    ADDITIONAL_SERVICE: "#005894",
    DEFAULT: "#005894"
};

// Couleurs des lignes
export const lineColors = {
    "T1": "#0077C8",
    "T2": "#FFE400",
    "4": "#EA5701",
    "5": "#651F82",
    "6": "#007738",
    "7": "#A25100",
    "8": "#E5007B",
    "12" : "#F5A300",
    "17" : "#00ACE7",
    "DEFAULT": "#001e32" // Couleur de secours
};