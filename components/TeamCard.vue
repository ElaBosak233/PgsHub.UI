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
					color="surface-variant"
					image="http://mao.ctf.homes/assets/879d1104df34a02a092a6eb2dc6cb14cafc6cce5bc6fe6d1a9eef78583e769ef/avatar"
					size="56"
				/>
				<div class="ml-3 font-weight-bold text-h6">灵曄兮</div>
			</div>
			<v-divider class="my-3" />
			<div class="d-flex justify-space-between align-center mx-10 mb-3">
				<div class="d-flex flex-column align-center">
					<v-chip color="yellow-darken-4"> 队长 </v-chip>
					<div class="text-caption">个人身份</div>
				</div>
				<div class="d-flex flex-column align-center">
					<div class="d-flex" style="margin-left: -15px">
						<v-tooltip text="Ela" location="top center">
							<template #activator="{ props: tooltip }">
								<v-avatar
									color="surface-variant"
									image="http://mao.ctf.homes/assets/8e42d3d92556589795fd4e5f6081b264bee1f39f32e77c010ecbff4556d27c30/avatar"
									class="avatar-group-item"
									size="30"
									v-bind="tooltip"
								></v-avatar>
							</template>
						</v-tooltip>
						<v-tooltip text="Hibara" location="top center">
							<template #activator="{ props: tooltip }">
								<v-avatar
									color="surface-variant"
									image="http://mao.ctf.homes/assets/2fa009e44a49b8533ccb3bcd8c1aaa42fb50c27edb720b713623b32b18767b18/avatar"
									class="avatar-group-item"
									size="30"
									v-bind="tooltip"
								></v-avatar>
							</template>
						</v-tooltip>
						<v-tooltip text="Epk" location="top center">
							<template #activator="{ props: tooltip }">
								<v-avatar
									color="surface-variant"
									image="http://mao.ctf.homes/assets/6c7f0ae7c0a275c0712a9664e174b4aa7f0c0de8ff193f2fde8b284413fdd90d/avatar"
									class="avatar-group-item"
									size="30"
									v-bind="tooltip"
								></v-avatar>
							</template>
						</v-tooltip>
					</div>
					<div class="text-caption">团队成员</div>
				</div>
			</div>
		</div>
		<v-tooltip text="管理员" location="top center">
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
<script setup lang="ts"></script>
