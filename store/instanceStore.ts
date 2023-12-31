import { useAuthFetch } from "@/composables/useAuthFetch";

export interface InstanceState {
	existInstances: Record<string, Record<string, any>>
}

export const useInstanceStore = defineStore("instance", {
	state: (): InstanceState => ({
		existInstances: {}
	}),
	actions: {
		async loadExistInstances() {
			interface Instance {
				id: string;
				entry: string;
				challenge_id: string;
				status: string;
				removed_at: number;
			}
			interface Response {
				code: number;
				data: Array<Instance>
			}
			const { data: res } = await useAuthFetch(
				`/instances/?is_available=1`,
				{
					method: "GET",
				}
			)
			const resObj = res.value as Response;
			if (resObj?.code === 200) {
				if (resObj?.data) {
					resObj.data.forEach((instance) => {
						if (instance.status === "running") {
							this.existInstances[instance.challenge_id] = instance;
						}
					});
				}
			}
		}
	}
});
