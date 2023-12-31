<template>
	<div>
		<v-sheet
			:height="200"
			min-width="100%"
			color="teal-darken-1"
			class="d-flex justify-center align-center"
			style="z-index: -1; background-size: cover"
		>
			<div class="d-flex flex-column align-center">
				<div class="text-h4">团队</div>
			</div>
		</v-sheet>
		<div
			class="d-flex justify-space-between h-auto"
			style="padding: 3% 10%"
		>
			<div class="d-flex flex-wrap">
				<div v-for="team in teamStore.teams_by_user_id" :key="team?.team_id">
					<TeamCard :name="team?.team_name" :is-captain="authStore.id == team?.captain_id" :user-ids="team?.user_ids" :team-id="team?.team_id" class="ma-2 pa-2" />
				</div>
			</div>
			<v-spacer />
			<v-divider :vertical="true" class="mx-10" />
			<div style="min-width: 15rem">
				<v-btn
					:block="true"
					prepend-icon="mdi-account-multiple"
					color="blue-darken-3"
					variant="flat"
					class="my-2"
					>创建团队</v-btn
				>
				<v-btn
					:block="true"
					prepend-icon="mdi-account-multiple-plus"
					color="blue-darken-3"
					variant="flat"
					class="my-2"
					>加入团队</v-btn
				>
				<v-btn
					:block="true"
					prepend-icon="mdi-account-multiple-plus"
					color="blue-darken-3"
					variant="flat"
					class="my-2"
					>查看团队列表</v-btn
				>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import TeamCard from "@/components/teams/TeamCard.vue";
import { useTeamStore } from "@/store/teamStore";
import { useAuthStore } from "@/store/authStore";

const teamStore = useTeamStore();
const authStore = useAuthStore();

onMounted(async () => {
	await teamStore.getAllTeams();
	teamStore.loadTeamsByUserId();
});
</script>
