export type VideoProviderI = {
    name: string;
    id: string;
    website: string;
    api: string;
    queries?: string[];
    active?: boolean;
}