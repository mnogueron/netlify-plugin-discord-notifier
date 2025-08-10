import { EventConfig } from "./types.js";
export declare const getEmbed: (statusConfig: EventConfig) => {
    url: string;
    color: number;
    title: string;
    description: string;
    fields: (false | {
        name: string;
        value: string | undefined;
    })[];
};
