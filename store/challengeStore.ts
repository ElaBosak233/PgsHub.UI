import { useAuthFetch } from "@/composables/useAuthFetch";

export interface Challenge {
	id: string;
	title: string;
	description: string;
	category: string;
	has_attachment: boolean;
	is_practicable: boolean;
	is_dynamic: boolean;
	practice_pts: boolean;
	difficulty: number;
	duration: number;
}

export interface ChallengeWinners {
	firstBlood: string;
	secondBlood: string;
	thirdBlood: string;
}

export interface ChallengeState {
	challenges: Array<Challenge>;
	challengeWinners: Record<string, ChallengeWinners>
	pages: number;
	currentPage: number;
	lastFilters: string;
}

export const useChallengeStore = defineStore("challenge", {
	state: (): ChallengeState => ({
		challenges: [],
		challengeWinners: {},
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
			this.getWinners();
		},
		async getWinners() {
			interface Response {
				code: number;
				data: Record<string, Array<Record<string, any>>>;
			}
			const challengeIds = this.challenges.map(challenge => challenge.id);
			const queryString = challengeIds.map(function(id) {
				return "challenge_ids=" + id;
			}).join("&");
			const { data: res } = await useAuthFetch(
				`/submissions/?${queryString}&status=1&page=1&size=3&is_ascend=true?game_id=0`,
				{
					method: "GET"
				});
			const resObj = res.value as Response;
			if (resObj.data) {
				for (const challengeId in resObj.data) {
					if (!this.challengeWinners[challengeId]) {
						this.challengeWinners[challengeId] = {} as ChallengeWinners;
					}
					let counter = 1;
					if (Array.isArray(resObj.data[challengeId])) {
						for (const item of resObj.data[challengeId]) {
							const userObj = item?.user
							if (userObj?.name) {
								if (counter === 1) {
									this.challengeWinners[challengeId].firstBlood = userObj?.name;
								} else if (counter === 2) {
									this.challengeWinners[challengeId].secondBlood = userObj?.name;
								} else if (counter === 3) {
									this.challengeWinners[challengeId].thirdBlood = userObj?.name;
								}
							}
							counter++;
						}
					}
				}
			}
		}
	}
});
