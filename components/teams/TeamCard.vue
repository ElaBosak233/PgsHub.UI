<template>
	<v-card
		width="20rem"
		height="11rem"
		elevation="3"
		class="rounded-lg no-select"
		@click="$router.push('/teams/')"
	>
		<div class="pa-5">
			<div class="d-flex align-center">
				<v-avatar
					v-if = "!hasTeamAvatar"
					color="blue-darken-3"
					icon="mdi-account-multiple"
					size="56"
				/>
				<v-avatar
					v-if = "hasTeamAvatar"
					color="blue-darken-3"
					:image="`${configStore.apiUrl}/assets/teams/avatar/${teamId}`"
					size="56"
				/>
				<div class="ml-3 font-weight-bold text-h6">{{ name }}</div>
			</div>
			<v-divider class="my-3" />
			<div class="d-flex justify-space-between align-center mx-10 mb-3">
				<div class="d-flex flex-column align-center">
					<v-chip :color="isCaptain ? 'yellow-darken-4' : 'secondary'"> {{ isCaptain ? "队长" : "队员" }} </v-chip>
					<div class="text-caption">个人身份</div>
				</div>
				<div class="d-flex flex-column align-center">
					<div class="d-flex" style="margin-left: -15px; min-height: 30px">
						<div v-for="user in validUsers" :key="user?.id">
							<v-tooltip :text="user?.name" location="top center">
								<template #activator="{ props: tooltip }">
									<v-avatar
										v-if="!user?.hasAvatar"
										color="blue-darken-3"
										class="avatar-group-item"
										size="30"
										v-bind="tooltip"
									>
										<v-icon icon="mdi-account" size="20" />
									</v-avatar>
									<v-avatar
										v-if="user?.hasAvatar"
										color="surface-variant"
										:image="`${configStore.apiUrl}/assets/users/avatar/${user?.id}`"
										class="avatar-group-item"
										size="30"
										v-bind="tooltip"
									></v-avatar>
								</template>
							</v-tooltip>
						</div>
					</div>
					<div class="text-caption">团队成员</div>
				</div>
			</div>
		</div>
		<v-tooltip v-if="isCaptain" text="管理员" location="top center">
			<template #activator="{ props: tooltip }">
				<v-icon
					color="yellow-darken-3"
					style="position: absolute; right: 15px; top: 15px"
					icon="mdi-star"
					v-bind="tooltip"
				/>
			</template>
		</v-tooltip>
		<v-icon
			size="200"
			style="
				position: absolute;
				right: 10px;
				bottom: -25px;
				z-index: -1;
				opacity: 0.05;
			"
			icon="mdi-account-group"
		/>
	</v-card>
</template>

<script setup lang="ts">
import { useConfigStore } from "@/store/configStore";
const configStore = useConfigStore();

interface Props {
	name?: string;
	isCaptain?: boolean;
	userIds?: any;
	teamId?: string;
}

const props = withDefaults(defineProps<Props>(), {
	name: "团队",
	is_captain: false,
	userIds: [],
	teamId: ""
});

interface User {
	id: string;
	name: string;
	hasAvatar: boolean;
}

const validUsers = ref(Array<User>());
const hasTeamAvatar = ref(false);

checkTeamAvatar();
getTop3Users();

async function checkTeamAvatar() {
	interface Response {
		code: number;
		data: Array<string>;
	}
	const { data: res } = await useFetch(
		configStore.apiUrl + "/assets/teams/avatar",
		{
			method: "GET",
		}
	)
	const resObj = res.value as Response;
	if (resObj?.data) {
		if (resObj?.data.includes(props.teamId)) {
			hasTeamAvatar.value = true;
		}
	}
}

async function getTop3Users() {
	interface Response {
		code: number;
		data: Array<string>
	}
	const { data: res } = await useFetch(
		configStore.apiUrl +
		"/assets/users/avatar",
		{
			method: "GET",
		}
	);
	const resObj = res.value as Response;
	const preUserIds = resObj?.data;
	let counter = 0;
	for (const userId of props.userIds) {
		if (counter < 3) {
			if (preUserIds.includes(userId)) {
				validUsers.value.push({
					id: userId,
					name: await getNameByUserId(userId),
					hasAvatar: true,
				});
			} else {
				validUsers.value.push({
					id: userId,
					name: await getNameByUserId(userId),
					hasAvatar: false,
				})
			}
			counter += 1;
		}
	}
}

async function getNameByUserId(userId: string) {
	interface Response {
		code: number;
		data: User
	}
	const { data: res } = await useAuthFetch(
		"/users/?id=" + userId,
		{
			method: "GET",
		}
	);
	const resObj = res.value as Response;
	const user = resObj?.data;
	return user?.name;
}

</script>
