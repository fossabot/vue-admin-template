<template>
	<el-row :gutter="10">
		<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
			<el-card class="card" shadow="never">
				<div slot="header">
					<span>更新日志</span>
				</div>
				<el-timeline>
					<el-timeline-item
						v-for="(activity, index) in activities"
						:key="index"
						:icon="activity.icon"
						:type="activity.type"
						:color="activity.color"
						:size="activity.size"
						:timestamp="activity.timestamp"
					>
						{{ activity.content }}
					</el-timeline-item>
				</el-timeline>
			</el-card>
		</el-col>
		<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
			<el-card class="card" shadow="never">
				<div slot="header">
					<span>关于</span>
				</div>
				<p>一个简单的 Vue 后台系统开发模板。</p>
			</el-card>
		</el-col>
		<el-button type="primary" @click="onLogin">登陆</el-button>
	</el-row>
</template>

<script>
import { onLogin } from '@/apis';

export default {
	name: 'Dashboard',
	props: {},
	data() {
		return {
			tabPosition: 'right',
			activities: [
				{
					size: 'large',
					color: '#ff6700',
					icon: 'el-icon-loading',
					timestamp: '2020-11-01',
					content: '@todo',
				},
				{
					size: 'large',
					type: 'primary',
					icon: 'el-icon-bicycle',
					timestamp: '2020-11-01',
					content: '一个基本算是能用的模板。',
				},
				{
					size: 'large',
					icon: 'el-icon-more',
					timestamp: '2020-10-30',
					content: '周六，准备个简单的项目模板吧。',
				},
			],
		};
	},
	created() {},
	mounted() {},
	methods: {
		onLogin() {
			onLogin({
				UserName: 'Admin',
				Password: 1,
			}).then(() => this.$message.success('登陆成功'));
		},
	},
};
</script>

<style lang="less" scoped></style>
