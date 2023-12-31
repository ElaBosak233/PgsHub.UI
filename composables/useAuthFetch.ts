import { useFetch, type UseFetchOptions } from "#app";
import { defu } from 'defu'
import { useAuthStore } from "@/store/authStore";
import { useConfigStore } from "@/store/configStore";

export function useAuthFetch<T> (url: string, options: UseFetchOptions<T> = {}) {
	const configStore = useConfigStore();
	const authStore = useAuthStore();
	const defaults: UseFetchOptions<T> = {
		baseURL: configStore.apiUrl,
		key: url,
		headers: {
			PgsToken: authStore.pgsToken
		} as HeadersInit,

		onResponse (_ctx) {
			// _ctx.response._data = new myBusinessResponse(_ctx.response._data)
		},

		onResponseError (_ctx) {
			// throw new myBusinessError()
		}
	}

	// for nice deep defaults, please use unjs/defu
	const params = defu(options, defaults)

	return useFetch(url, params)
}
