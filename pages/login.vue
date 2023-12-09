<template>
	<div>
		<v-sheet
			:height="200"
			min-width="100%"
			color="teal-darken-1"
			class="d-flex justify-center align-center"
			style="z-index: -1; background-size: cover"
		>
			<div class="text-h4">登录</div>
		</v-sheet>
		<div
			class="d-flex justify-center h-auto"
			style="padding-top: 5%; padding-bottom: 5%"
		>
			<v-sheet width="400" class="mx-auto" color="transparent">
				<v-divider class="mb-5" />
				<v-form :fast-fail="true" @submit.prevent="login">
					<v-text-field
						v-model="username"
						prepend-inner-icon="mdi-account"
						label="用户名"
					></v-text-field>
					<v-text-field
						v-model="password"
						prepend-inner-icon="mdi-pound"
						label="密码"
						:clearable="true"
						type="password"
					></v-text-field>
					<v-btn
						type="submit"
						size="large"
						color="primary"
						:block="true"
						class="mt-2"
						>登录</v-btn
					>
				</v-form>
			</v-sheet>
		</div>
	</div>
</template>
<script setup lang="ts">
import { useSnackBarStore } from "@/store/snackBarStore";
import { useConfigStore } from "@/store/configStore";
import { useAuthStore } from "@/store/authStore";

const snackBarStore = useSnackBarStore();
const configStore = useConfigStore();
const authStore = useAuthStore();

const router = useRouter();

const username = ref("");
const password = ref("");

interface Response {
	code: number;
	msg: string;
	token: string;
}
async function login() {
	const { data: res } = await useFetch(configStore.apiUrl + "/user/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username: username.value,
			password: password.value,
		}),
	});
	const resObj = res.value as Response;
	if (resObj && resObj.code === 200) {
		authStore.setPgsToken(resObj?.token);
		await router.push("/");
	} else {
		snackBarStore.showSnackbar(
			resObj ? resObj.msg : "无法连接到服务器",
			"error"
		);
	}
}
</script>
