<template>
	<section>

		<!--查询-->
		<el-row>
			<el-col :span="8" :offset="4" class="toolbar">

				<el-form  label-width="80px" :model="version" ref="ruleForm" width="50%" >
					<el-form-item label="最小版本" prop="roleName">
						<el-input v-model="version.minVersion"></el-input>
					</el-form-item>
					<el-form-item label="最新版本" prop="roleTag">
						<el-input v-model="version.newestVersion"></el-input>
					</el-form-item>

					<el-form-item label="版本描述"  prop="roleComment">
						<el-input type="textarea" v-model="version.versionDesc"></el-input>
						<el-form-item>
							<el-button class="btn" type="primary" @click="onSubmit">确定提交</el-button>
						</el-form-item>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>

	</section>
</template>

<script>
    import {getVersion} from '../../api/api'
    export default {
        data() {
            return {
                version:{
                    minVersion:'',
                    newestVersion:'',
                    versionDesc:''
                }
            }
        },
        methods:{
            onSubmit(){
                let para = {
                    minVersion:this.version.minVersion,
                    newestVersion:this.version.newestVersion,
                    versionDesc:this.version.versionDesc
                };
                getVersion(para).then((res) => {
                    console.log(res)
                })
            }

        },
        mounted(){
        }
    }
</script>
<style>
	.btn{
		margin:20px 0 0 210px;

	}
</style>