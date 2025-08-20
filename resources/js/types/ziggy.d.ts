// resources/js/ziggy.d.ts
export interface Ziggy {
    url: string;
    port: number | null;
    defaults: Record<string, any>;
    routes: Record<string, { uri: string; methods: string[] }>;
}