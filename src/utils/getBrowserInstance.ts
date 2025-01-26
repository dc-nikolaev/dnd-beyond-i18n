// https://stackoverflow.com/a/64440752/2973464
const getBrowserInstance = (): typeof chrome => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const instance = window.chrome ?? (window as any)['browser'];
    if (!instance) {
        throw new Error("browser instance is falsy");
    }

    return instance;
};

export default getBrowserInstance;
