export interface ConfigState {
	categoryIcons: Record<string, string>;
	categoryColors: Record<string, string>;
}

export const useConfigStore = defineStore("config", {
	state: (): ConfigState => ({
		categoryIcons: {
			misc: "mdi-fingerprint",
			web: "mdi-web",
			crypto: "mdi-pound",
			reverse: "mdi-chevron-triple-left",
			pwn: "mdi-matrix",
		},
		categoryColors: {
			misc: "indigo",
			web: "teal",
			crypto: "blue-grey",
			reverse: "brown",
			pwn: "deep-purple",
		},
	}),
});
