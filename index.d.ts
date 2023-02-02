import { Quad } from '@rdfjs/types';

declare module "eye-mock" {
    export function n3reasoner(data: Quad[] | string, query: Quad[] | string, options: {}): Promise<Quad[] | string>;
}
