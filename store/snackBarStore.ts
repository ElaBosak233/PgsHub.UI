export interface SnackBarStoreState {
	snackbar: boolean;
	text: string;
	type: "error" | "success" | "warning" | "info" | undefined;
}

export const useSnackBarStore = defineStore("snackbar", {
	state: (): SnackBarStoreState => ({
		snackbar: false,
		text: "",
		type: undefined,
	}),
	actions: {
		showSnackbar(
			text: string,
			type: "error" | "success" | "warning" | "info" | undefined
		) {
			this.snackbar = true;
			this.text = text;
			this.type = type;
		},
	},
});
