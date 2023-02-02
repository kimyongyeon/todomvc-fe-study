import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

const config: UserConfig = {
	plugins: [
		sveltekit(),
		VitePWA({
			injectRegister: 'auto',
			registerType: 'autoUpdate',
			devOptions: {
				enabled: true
			}
		})
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
};

export default config;
