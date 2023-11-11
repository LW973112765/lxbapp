<template>
	<view>
		<view class="uni-container">
			<uni-table ref="table" border stripe emptyText="暂无更多数据">
				<uni-tr>
					<uni-th width="150" align="center">用户名</uni-th>
					<uni-th width="150" align="center">头像</uni-th>
					<uni-th align="center">邮箱</uni-th>
					<uni-th width="204" align="center">内容</uni-th>
					<uni-th width="204" align="center">评论时间</uni-th>
					<uni-th width="104" align="center">状态</uni-th>
					<uni-th width="254" align="center">操作</uni-th>

				</uni-tr>
				<uni-tr v-for="(item, index) in commentData" :key="index">
					<uni-td align="center">{{ item.username }}</uni-td>
					<uni-td align="center">
						<image :src="item.avatar" mode=""></image>
					</uni-td>
					<uni-td align="center">{{ item.email }}</uni-td>
					<uni-td align="center">{{ item.content}}</uni-td>
					<uni-td align="center">{{ item.created_at}}</uni-td>
					<uni-td align="center" :style="`color: ${
                item.status > 0 && item.status < 2 ? 'green' : 'red'
              }`">{{ filterSatatus(item.status)}}</uni-td>
					<uni-td>
						<view class="uni-group">
							<button size="mini" type="warn" @click="handleDelete(item.index, item)">删除</button>

							<button v-if="item.status === 0" @click="isDel(1, item)" type="info"
								size="mini">审核通过</button>
							<button v-if="item.status === 1" type="primary" size="mini">已通过</button>
							<button v-if="item.status === 0" size="mini" type="warn"
								@click="isDel(2, item)">拒绝</button><button v-if="item.status === 2" size="mini"
								type="primary">已拒绝</button>
						</view>
					</uni-td>
				</uni-tr>
			</uni-table>
			<view class="uni-pagination-box">
				<wyb-pagination :total-items="total" :current="currentPage" :page-items="pageSize"
					@change="changePage" />
			</view>
		</view>
		<view>
			<!-- 提示信息弹窗 -->
			<uni-popup ref="message" type="message">
				<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
			</uni-popup>
		</view>
	</view>
</template>


<script>
	import moment from "moment";
	import wybPagination from '@/components/wyb-pagination/wyb-pagination.vue'
	export default {
		name: "Comments",
		components: {
			wybPagination
		},
		data() {
			return {
				val: "",
				commentData: [],
				total: 0,
				pageSize: 8,
				currentPage: 1,
				type: 'center',
				msgType: 'success',
				messageText: '这是一条成功提示',
			};
		},
		methods: {
			dialogToggle(type) {
				this.msgType = type
				this.$refs.alertDialog.open()
			},
			messageToggle(type, zxl) {
				this.msgType = type
				this.messageText = zxl
				this.$refs.message.open()
			},

			// 1 通过 2 拒绝  3 待审核  '' 全部
			filterSatatus(type) {
				if (type == 1) {
					return "通过";
				} else if (type == 2) {
					return "拒绝";
				} else if (type == 0) {
					return "待审核";
				} else {
					return "未知";
				}
			},

			onInput() {
				this.$forceUpdate();
			},
			// 删除评论
			async handleDelete(index, row) {
				let res = await this.$zxl('/deletecomment', {
					id: row.id,
				})
				if (res.data.status === 200) {
					console.log(res.data)
					this.messageToggle('success', '删除成功')
					let totalPage = Math.ceil((this.total - 1) / this.pageSize);
					let currentPage =
						this.currentPage > totalPage ? totalPage : this.currentPage;
					this.currentPage = currentPage < 1 ? 1 : currentPage;
					this.http(this.currentPage);
				}

			},
			//审核评论
			async isDel(is_del, item) {
				console.log('；；；')
				await this.$zxl('/editcomment', {
					id: item.id,
					status: is_del
				}, 'POST');
				this.messageToggle('success', `已${is_del > 0 && is_del < 2 ? "通过" : "拒绝"}!`)
				this.http(1);
			},
			// 分页
			changePage(num) {
				console.log(num, '收到')
				this.http(num.current);
			},
			// 获取评论列表
			async http(page) {
				// console.log("收到了", page);
				let res = await this.$zxl('/getallcomment', {
					page
				})
				this.currentPage = page;
				if (res.data.status === 200) {
					console.log(res.data.data, '数据')
					res.data.data.forEach((data) => {
						data.created_at = moment(data.created_at).format(
							"YYYY-MM-DD HH:mm:ss"
						);
						data.content = this.$emojitwo(data.content)
					});
					this.commentData = res.data.data;
					this.total = res.data.total;
					this.pageSize = res.data.pageSize;
				}

			},
		},
		created() {
			this.http(1);
		},
	};
</script>

<style lang="scss" scoped>
	image {
		width: 100rpx;
		height: 100rpx;
	}

	.uni-group {
		// display:flex;
		// flex-wrap: wrap;
		// flex-direction: column;
	}

	.uni-group {
		display: flex;
		align-items: center;
	}

	.uni-td {
		display: flex;
		justify-content: center;
		background-color: red;
	}

	.uni-pagination-box {
		height: 100rpx;
		margin-top: 20rpx;
	}
</style>