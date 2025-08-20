import '../css/app.css';
import { route } from 'ziggy-js';
import { Ziggy } from './ziggy';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => title ? `${title} - ${appName}` : appName,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        const AppWithLink = () => (
            <>
                <a href={route('relations.index', {}, false, Ziggy as any)}>Relations</a>
                <App {...props} />
            </>
        );

        root.render(<AppWithLink />);
    },
    progress: {
        color: '#4B5563',
    },
});

// Set light/dark mode
initializeTheme();
