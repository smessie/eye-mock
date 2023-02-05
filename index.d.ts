import { Quad } from '@rdfjs/types';

export interface IQueryOptions {
    blogic?: boolean;
    outputType?: 'string' | 'quads'
    output?: undefined | 'derivations' | 'deductive_closure' | 'deductive_closure_plus_rules' | 'grounded_deductive_closure_plus_rules'
}

declare module "eye-mock" {
    export function n3reasoner(data: Quad[] | string, query?: Quad[] | string | undefined, options?: IQueryOptions): Promise<Quad[] | string>;
}
