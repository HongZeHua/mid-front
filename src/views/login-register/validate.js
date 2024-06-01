/**
 * 用户名的表达校验
 * @param {*} val  输入的内容
 * @returns true 表示表单校验通过；String  表示表单校验为通过；Sting 为提示信息
 */
export const validateUsername = (val) => {
  if (!val) {
    return '用户名为必填的'
  }
  if (val.length < 3 || val.length > 12) {
    return '用户名应该在 3-12 位之间'
  }
  return true
}
/**
 * 密码的表单检验
 * @param {*} val  输入的内容
 * @returns true 表示表单校验通过；String  表示表单校验为通过；Sting 为提示信息
 */
export const validatePassword = (val) => {
  if (!val) {
    return '密码为必填的'
  }
  if (val.length < 6 || val.length > 12) {
    return '密码应该在 6-12 位之间'
  }
  return true
}
