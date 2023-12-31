import { useConfigStore } from "@/store/configStore";
import { useAuthStore } from "@/store/authStore";

interface Team {
	team_id: string;
	team_name: string;
	captain_id: string;
	user_ids: Array<string>;
	is_locked: number;
}

export interface ConfigState {
	teams: Array<Team>;
	teams_by_user_id: Array<Team>;
}

export const useTeamStore = defineStore("team", {
	state: (): ConfigState => ({
		teams: [],
		teams_by_user_id: []
	}),
	actions: {
		async getAllTeams() {
			const configStore = useConfigStore();
			interface Response {
				code: number;
				data: Array<Team>
			}
			const { data: res } = await useFetch(
				configStore.apiUrl +
				"/teams/",
				{
					method: "GET",
				}
			);
			const resObj = res.value as Response;
			this.teams = resObj?.data
		},
		loadTeamsByUserId() {
			const authStore = useAuthStore();
			this.teams_by_user_id = [];
			this.teams.forEach((team) => {
				if (team.user_ids.includes(authStore.id)) {
					this.teams_by_user_id.push(team)
				}
			});
		}
	}
});
