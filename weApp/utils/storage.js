export const storage = {
  //设置本地存储数据
  set(key,data){
    wx.setStorageSync(key, data)
  },
  //获取本地存储数据
  get(key){
    return wx.getStorageSync(key)
  },
  //删除本地存储的数据
  remove(key){
    wx.removeStorageSync(key)
  },
  //清除本地存储的数据
  clear(){
    wx.clearStorageSync()
  }
}