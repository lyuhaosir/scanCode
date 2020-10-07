// pages/cart/cart.js
//引入封装的本地存储
import {
  storage
} from '../../utils/storage'
import {
  showModal
} from '../../utils/wxAsync.js'
import {
 addCart
} from '../../utils/cart.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [],
    AllNum: 0,
    AllPrice: 0
  },
  //总价 总数量
  setCart(cart) {
    //总价
    let AllPrice = 0;
    cart.forEach(v => AllPrice += v.num * v.price)
    
    //绑定数据
    this.setData({
      goodsList: cart,
      AllNum: cart.length,
      AllPrice: AllPrice.toFixed(2)
    });
   //将数据存入本地
   storage.set('scanCode_cart', cart)
  },
  //编辑数量
  async itemNum(e) {
    // console.log(e.target.dataset);
    //本地商品数据
    let cart = storage.get('scanCode_cart')
    //当前id
    let id = e.target.dataset.id
    //当前 + || -
    let num = e.target.dataset.num
    //当前商品下标
    let index = cart.findIndex(v => v._id == id)

    if (cart[index].num == 1 && num == -1) {
      let res = await showModal('是否删除该商品')
      if (res.confirm) {
        cart.splice(index, 1)
      }
    } else {
      cart[index].num += num
    }
    // cart[index].num += num
    //重新计算总价，总数量
    this.setCart(cart)
  },
  //继续添加
  cartAdd() {
    addCart()
    let cart = storage.get('scanCode_cart');
    console.log(cart)
    this.setCart(cart)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let goodsList = storage.get('scanCode_cart') || []
    this.setData({
      goodsList
    })
    this.setCart(goodsList)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})