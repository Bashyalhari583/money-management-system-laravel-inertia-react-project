import type { route as routeFn } from 'ziggy-js';

declare global {
    const route: typeof routeFn;
}

import { PageProps as InertiaPageProps } from '@inertiajs/core';

// ziggy's route() helper (loose type is OK)
declare function route(name?: string, params?: any, absolute?: boolean, config?: any): string;

export type User = {
  id: number;
  name: string;
  email: string;
};

export type AppPageProps = InertiaPageProps & {
  auth?: { user?: User };
};

export type Pagination<T> = {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};
