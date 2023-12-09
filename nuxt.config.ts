// https://v3.nuxtjs.org/api/configuration/nuxt.config
import { process } from "std-env";

export default defineNuxtConfig({
	ssr: false,
	modules: ["@pinia/nuxt"],
	pinia: {
		autoImports: ["defineStore", ["defineStore", "definePiniaStore"]],
	},
	css: ["vuetify/lib/styles/main.sass", "@/assets/css/main.scss"],
	build: {
		transpile: ["vuetify"],
	},
	vite: {
		define: {
			"process.env.DEBUG": false,
		},
	},
	runtimeConfig: {
		public: {
			baseUrl: process.env.BASE_URL || "/",
			apiUrl: process.env.API_URL || "/api",
		},
	},
});
