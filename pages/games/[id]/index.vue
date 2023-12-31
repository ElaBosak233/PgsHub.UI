<template>
	<div>
		<v-sheet
			:height="350"
			min-width="100%"
			color="teal-darken-1"
			class="d-flex justify-center align-center"
			style="z-index: -1; background-size: cover"
		>
			<div
				class="d-flex justify-center no-select"
				style="min-width: 100%"
			>
				<div class="game-cover-1 mr-5" />
				<div style="width: 30%">
					<div class="d-flex ma-2">
						<v-chip class="ma-1" density="compact">多人赛</v-chip>
						<v-chip class="ma-1" density="compact">8 小时</v-chip>
					</div>
					<p class="text-h4 font-weight-bold">
						第六届浙江省大学生网络与信息安全竞赛初赛
					</p>
					<p class="text-caption">13 支队伍已报名</p>
					<div class="d-flex justify-space-between mt-2">
						<div>
							<p class="text-caption">开始时间</p>
							<p class="font-weight-bold">
								18:22:58, November 04, 2023
							</p>
						</div>
						<div>
							<p class="text-caption">结束时间</p>
							<p class="font-weight-bold">
								18:22:58, November 04, 2023
							</p>
						</div>
					</div>
					<v-progress-linear
						model-value="10"
						color="white"
						height="10"
						:striped="true"
					/>
					<div class="d-flex mt-4">
						<v-btn
							color="teal"
							prepend-icon="mdi-account-check"
							variant="flat"
						>
							申请参赛
						</v-btn>
						<v-btn
							color="teal"
							class="ml-2"
							prepend-icon="mdi-clipboard-list-outline"
							variant="flat"
						>
							查看榜单
						</v-btn>
						<v-btn
							color="teal"
							class="ml-2"
							prepend-icon="mdi-flag"
							variant="flat"
							@click="
								$router.push(
									`/games/${$route.params.id}/challenges`
								)
							"
						>
							进入赛场
						</v-btn>
					</div>
				</div>
			</div>
		</v-sheet>
		<div class="d-flex justify-center">
			<v-sheet class="pt-5" width="60%">
				清华大学网络安全技术挑战赛（THUCTF）采用安全界常见的 CTF
				解题模式，持续时间为一周，题目难度梯度提升，在保证题目质量的同时，也有对新手循序渐进的引导。
				本届挑战赛 IoT 赛道的命题者为 清华大学学生网络安全技术协会组织的
				Redbud 战队 的 王宇轩 同学和 石贺天 同学。 比赛时间 北京时间
				2023 年 12 月 2 日 9:00 开始，2023 年 12 月 3 日 17:00 结束。
				比赛地点 FIT 楼 1-212（注意是 2 楼一区）
			</v-sheet>
		</div>
	</div>
</template>

<script setup lang="ts">
const gameCoverUrl =
	"http://mao.ctf.homes/assets/345e07bc931e95eb94b15ff7951c84a5df16ed9fc6987344445f8b5108307e92/poster";
const gameCoverCss = `url(${gameCoverUrl})`;
</script>

<style lang="scss">
.game-cover-1 {
	box-shadow: 5px 5px 5px 0 rgba(0, 0, 0, 0.3);
	display: block;
	width: 27rem;
	height: auto;
	border-radius: 10px;
	background: v-bind(gameCoverCss) center center no-repeat;
	background-size: cover;
}
</style>
