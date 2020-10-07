//引入wx消息框和扫码框
import {
  scanCode,
  showToast
} from './wxAsync'
//引入Api模块
import {
  index
} from '../models/index'
const request = new index
//引入本地储存
import {
  storage
} from './storage'


export const addCart = async () => {
  //获取扫码商品的id
  let resCode = await scanCode()
  //如果存在
  // console.log(resCode.result);
  //获取对应的商品数据
  let resRequest = await request.getProduct(resCode.result)

  if (resRequest.data.result.length != 0) {
    // console.log(resRequest.data.result[0]);
    let goods = resRequest.data.result[0]

    //获取购物车的商品
    let cart = storage.get('scanCode_cart') || []

    //判断是否存在
    let index = cart.findIndex(v => v._id == goods._id)
    // console.log(index);
    if (index == -1) {
      //如果不存在
      goods.num = 1
      cart.push(goods)
    } else {
      //如果存在
      cart[index].num++
    }

    //存入本地存储
    storage.set('scanCode_cart', cart)

    //getCurrentPages：获取当前页面栈。数组中第一个元素为首页，最后一个元素为当前页面。
    let pages = getCurrentPages();
    let currPage = null;
    // console.log(pages) 的到一个数组

    if (pages.length) {

      // 获取当前页面的对象（上边所获得的数组中最后一项就是当前页面的对象）
      currPage = pages[pages.length - 1];
    }

    // 获取当前页面的路由
    // console.log(currPage);
    let route = currPage.route
    // console.log(route)
    //判断当前是否是购物车页面
    if (route != 'pages/cart/cart') {
      //跳转至购物车页面
      wx.navigateTo({
        url: '/pages/cart/cart',
      })
    }

    //提示加入购物车成功
    showToast('加入购物车成功', 'success')
  } else {
    showToast('请重新扫描', 'none')
  }
}