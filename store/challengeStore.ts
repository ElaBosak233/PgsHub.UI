import { useAuthFetch } from "@/composables/useAuthFetch";

export interface Challenge {
	id: string
	title: string
	description: string
	category: string
	has_attachment: boolean
	is_practicable: boolean
	is_dynamic: boolean
	practice_pts: boolean
	difficulty: number
	duration: number
}

export interface ChallengeState {
	challenges: Array<Challenge>
	pages: number
	currentPage: number
	lastFilters: string
}

export const useChallengeStore = defineStore("challenge", {
	state: (): ChallengeState => ({
		challenges: [],
		pages: 1,
		currentPage: 1,
		lastFilters: ""
	}),
	actions: {
		async loadChallenges(page?: number, filters?: string) {
			interface Response {
				code: number;
				data: Array<Challenge>;
				pages: number;
			}
			const url = filters ? `/challenges/?page=${page}&size=15&${filters}` : `/challenges/?page=${page}&size=15`;
			this.lastFilters = filters || "";
			const { data: res } = await useAuthFetch(
				url,
				{
					method: "GET"
				}
			);
			const resObj = res.value as Response;
			if (resObj?.code === 200) {
				this.challenges = resObj.data;
				this.pages = resObj.pages;
				this.currentPage = page || 1;
			}
		}
	}
});
