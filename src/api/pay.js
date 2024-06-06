import request from '@/utils/request.js'
/**
 * 获取 VIP 支付数据
 */
export const getVipPayList = () => {
  return request({
    url: '/user/vip/pay/list'
  })
}
