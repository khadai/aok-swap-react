export type History = {
    txid?: string;
    timestamp?: number;
    network?: string;
    amount?: number;
    type?: 'deposit' | 'withdrawal';
    icon?: string;
    confirmed?: string;
    height?: number;
};
