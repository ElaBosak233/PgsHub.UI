// plugins/vuetify.js
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import "@mdi/font/css/materialdesignicons.css";

export default defineNuxtPlugin((nuxtApp) => {
	const Vuetify = createVuetify({
		ssr: true,
		theme: {
			defaultTheme: "customTheme",
			themes: {
				customTheme: {
					dark: false,
					colors: {
						primary: "#3B82F6",
					},
				},
			},
		},
		components,
		directives,
		icons: {
			defaultSet: "mdi",
			aliases,
			sets: {
				mdi,
			},
		},
	});
	nuxtApp.vueApp.use(Vuetify);
});
