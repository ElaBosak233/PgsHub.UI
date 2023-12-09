import { process } from "std-env";

export interface AuthState {
	pgsToken: string | null;
}

export const useAuthStore = defineStore("auth", {
	state: (): AuthState => ({
		pgsToken: null,
	}),
	actions: {
		setPgsToken(token: string) {
			this.pgsToken = token;
			const pgsToken = useCookie("PgsToken");
			pgsToken.value = token;
		},
		loadPgsTokenFromCookies() {
			const pgsToken = useCookie("PgsToken");
			if (pgsToken.value) {
				this.setPgsToken(pgsToken.value);
			}
		},
		clear() {
			this.pgsToken = null;
			const pgsToken = useCookie("PgsToken");
			pgsToken.value = null;
		},
		async verifyToken() {
			interface Response {
				code: number;
				msg: string;
				id: string;
			}
			const { data: res } = await useFetch(
				useRuntimeConfig().public.apiUrl +
					"/user/verifyToken/" +
					this.pgsToken,
				{
					method: "GET",
				}
			);
			const resObj = res.value as Response;
			return resObj?.id !== "" && resObj?.code === 200;
		},
	},
});
