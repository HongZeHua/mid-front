import OSS from 'ali-oss'
import { getSts } from '@/api/sys'
import { REGION, BUCKET } from '@/constants'
export const getOSSClient = async () => {
  const res = await getSts()
  return new OSS({
    //Bucket所在地域
    region: REGION,
    //从STS服务获取临时访问密钥（AccessKeyId和AccessKeySecret）
    accessKeyId: res.Credentials.AccessKeyId,
    accessKeySecret: res.Credentials.AccessKeySecret,
    //从STS服务获取安全令牌(SecurityToken)
    stsToken: res.Credentials.SecurityToken,
    //填写Bucket名称
    bucket: BUCKET,
    //刷新 token，在token过期后自动调用
    refreshSTSToken: async () => {
      const res = await getSts()
      return {
        accessKeyId: res.Credentials.AccessKeyId,
        accessKeySecret: res.Credentials.AccessKeySecret,
        stsToken: res.Credentials.SecurityToken
      }
    },
    //刷新临时访问凭证的时间间隔，单位为毫秒
    refreshSTSTokenInterval: 5 * 1000
  })
}
