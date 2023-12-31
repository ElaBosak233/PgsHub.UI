<template>
	<v-card class="no-select rounded-lg">
		<v-sheet color="blue-darken-3" class="mx-auto d-flex justify-center align-center py-4">
			<div class="mx-2">
				<v-avatar
					v-if="!avatarExists"
					color="blue-darken-3"
					icon="mdi-account"
				/>
				<v-avatar
					v-if="avatarExists"
					:image="`${configStore.apiUrl}/assets/users/avatar/${user?.id}`"
				/>
			</div>
			<v-chip
				:label="true"
			>
				<span
					style="
					max-width: 100px;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
					font-size: 0.85rem;
				"
				>{{ user?.name }}</span>
			</v-chip>
		</v-sheet>
		<v-divider />
		<div class="mx-auto text-center px-3 py-2">
			<div class="d-flex justify-center">
				<v-btn
					rounded
					variant="text"
					class="mx-2"
					prepend-icon="mdi-cog"
					color="blue-darken-3"
				>
					设置
				</v-btn>
				<v-divider :vertical="true" />
				<v-btn
					rounded
					variant="text"
					class="mx-2"
					prepend-icon="mdi-logout"
					color="error"
					@click="authStore.logout()"
				>
					退出
				</v-btn>
			</div>
		</div>
	</v-card>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/store/authStore";
import { useConfigStore } from "@/store/configStore";

const authStore = useAuthStore();
const configStore = useConfigStore();

const user = ref();
const avatarExists = ref(false);

onMounted(async () => {
	user.value = await authStore.getCurrentUser();
	await checkUserAvatarExists();
});

async function checkUserAvatarExists() {
	interface Response {
		code: number;
	}
	const { data: res } = await useFetch(
		configStore.apiUrl + "/assets/users/avatar/" + user.value?.id + "/exists",
	)
	const resObj = res.value as Response;
	if (resObj?.code === 200) {
		avatarExists.value = true;
	}
}
</script>