import { useConfigStore } from "@/store/configStore";
import { useSnackBarStore } from "@/store/snackBarStore";

export interface AuthState {
	id: string;
	pgsToken: string | null;
}

export const useAuthStore = defineStore("auth", {
	state: (): AuthState => ({
		id: "",
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
		async verifyToken() {
			interface Response {
				code: number;
				msg: string;
				id: string;
			}
			const { data: res } = await useFetch(
				useRuntimeConfig().public.apiUrl +
					"/users/token/" +
					this.pgsToken,
				{
					method: "GET",
				}
			);
			const resObj = res.value as Response;
			this.id = resObj?.id;
			return resObj?.id !== "" && resObj?.code === 200;
		},
		async login(username: string, password: string) {
			interface Response {
				code: number;
				msg: string;
				token: string;
			}
			const configStore = useConfigStore();
			const snackBarStore = useSnackBarStore();
			const router = useRouter();
			const { data: res } = await useFetch(configStore.apiUrl + "/users/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username,
					password,
				}),
			});
			const resObj = res.value as Response;
			if (resObj && resObj.code === 200) {
				this.setPgsToken(resObj?.token);
				await router.push("/");
			} else {
				snackBarStore.showSnackbar(
					resObj ? resObj.msg : "无法连接到服务器",
					"error"
				);
			}
		},
		logout() {
			this.pgsToken = null;
			const pgsToken = useCookie("PgsToken");
			pgsToken.value = null;
			window.location.reload();
		},
		async getCurrentUser() {
			interface User {
				id: string;
				username: string;
				name: string;
			}
			interface Response {
				code: number;
				data: User;
			}
			const configStore = useConfigStore();
			const { data: res } = await useFetch(
				configStore.apiUrl + "/users/?id=" + this.id,
				{
					method: "GET"
				}
			)
			const resObj = res.value as Response;
			return resObj?.data
		}
	},
});
