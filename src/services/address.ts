export const isAddress = (address: string) => {
    return !!(address.length <= 34 && address.match(new RegExp('[Kk][a-zA-HJ-NP-Z0-9]{33}')));
};
