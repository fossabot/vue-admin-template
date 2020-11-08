<template>
	<el-dropdown>
		<div class="user-center">
			<el-avatar :size="30" src="https://avatars3.githubusercontent.com/u/22541178?s=60&v=4" />
			<span class="name">三余无梦生</span>
		</div>
		<el-dropdown-menu slot="dropdown">
			<el-dropdown-item icon="el-icon-plus">不动城</el-dropdown-item>
			<el-dropdown-item icon="el-icon-setting">设置</el-dropdown-item>
			<el-dropdown-item icon="el-icon-circle-check">退出登录</el-dropdown-item>
		</el-dropdown-menu>
	</el-dropdown>
</template>

<script>
export default {
	name: 'UserCenter',
};
</script>

<style lang="less" scoped>
.user-center {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 60px;
	padding: 0 10px;
	cursor: pointer;
	transition: all 0.3s;
	.name {
		margin-left: 4px;
	}
	&:hover {
		background: #f7f7f7;
	}
}
</style>
