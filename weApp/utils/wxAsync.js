//调起客户端扫码界面进行扫码
export const scanCode = () => {
  return new Promise((resolve, reject) => {
    wx.scanCode({
      onlyFromCamera: false,
      scanType: ['barCode', 'qrCode'],
      success: (result) => {
        // console.log(result);
        resolve(result)
      },
      fail: (error) => {
        reject(error)
      },
      complete: (res) => {},
    })
  })
}

//显示模态对话框
export const showModal=(str)=>{
  return new Promise((resolve,reject)=>{
    wx.showModal({
      title: '提示',
      content: str,
      success (res) {
        resolve(res)
      }
    })
  })
}

//消息提示框
export const showToast = (str,icon)=>{
    wx.showToast({
      title: str,
      icon
    })
}