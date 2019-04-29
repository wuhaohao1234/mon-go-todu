import Mongo from './API'
new Mongo().linkMongo()
    .then((res) => {
        return res.aggregate('abumongo', 'mytest')
    }).then(res => {
        return res.insertData({
            data: {
                name: '阿布'
            }
        })
    }).then(res => {
        let obj = [
            { name: 'Google', url: 'https://www.google.com', type: 'en' },
            { name: 'Facebook', url: 'https://www.google.com', type: 'cn' }
        ]
        return res.insertManyData({
            data: obj
        })
    }).then(res => {
        return res.findData('abumongo', 'mytest', {
            name: '阿布'
        })
    }).then(res => {
        let { result, _this } = res
        // console.log(result)
        return _this
    }).then((res: Mongo) => {
        console.log(res)
        return res.insertData({
            data: {
                name: '测试数据'
            }
        })
    }).then(res => {
        return res.findData()
    }).then(res => {
        let { result, _this } = res
        return _this
    }).then((res: Mongo) => {
        return res.updataOne({
            name: '阿布'
        }, {
                $set: { "url": "1232" }
            })
    }).then(res => {
        let { _this, result } = res
        // console.log(result)
        return _this
    }).then(res => {
        return res.findData('abumongo', 'mytest', {
            name: '阿布'
        })
    }).then(res => {
        let { result, _this } = res
        console.log(result)
        return _this
    }).then(res => {
        return res.deleteMany('abumongo', 'mytest', {
            name: '阿布'
        })
    }).then(res => {
        return res.findData()
    }).then(res => {
        let { result, _this } = res
        console.log(result)
    })