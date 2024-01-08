import { useAuthFetch } from "@/composables/useAuthFetch";
interface User {
	id: string;
	username: string;
	name: string;
	role: number;
}

export interface UserState {
	cache_users: Record<string, User>;
}

export const useUserStore = defineStore("user", {
	state: (): UserState => ({
		cache_users: {}
	}),
	actions: {
		async getUser(id: string) {
			if (!this.cache_users[id]) {
				interface Response {
					code: number;
					data: User;
				}
				const { data: res } = await useAuthFetch(`/users/?id=${id}`, {
					method: "GET"
				});
				const resObj = res.value as Response;
				if (resObj?.code === 200) {
					this.cache_users[id] = resObj.data;
				}
			}
			return this.cache_users[id];
		}
	}
});
