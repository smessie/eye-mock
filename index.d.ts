import { Quad } from '@rdfjs/types';

export interface IQueryOptions {
    /**
     * Whether or not to perform bnodeRelabeling
     * @default true
     */
    bnodeRelabeling?: boolean;
    outputType?: 'string' | 'quads';
    output?: 'derivations' | 'deductive_closure' | 'deductive_closure_plus_rules' | 'grounded_deductive_closure_plus_rules' | 'none';
}

declare module "eye-mock" {
    export function n3reasoner(data: Quad[] | string, query?: Quad[] | string | undefined, options?: IQueryOptions): Promise<Quad[] | string>;
}
