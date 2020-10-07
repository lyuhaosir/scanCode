import {Http} from '../utils/request'

class index extends Http{
  async getProduct(qcode){
    return await this.request({
      url:'/getProduct',
      data:{
        qcode
      }
    })
  }
}

export {index}