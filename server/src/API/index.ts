import { MongoClient, Db } from 'mongodb'
import { promises } from 'fs';
interface IOptions {
    database?: string
    surface?: string
    data: {
        [index: string]: any
    }
}
interface IOptionsArr {
    database?: string
    surface?: string
    data: Array<{
        [index: string]: any
    }>
}

export default class Mongo {
    private db: any
    private stateCode: number = 0
    private database: string = ''
    private surface: string = ''
    /**
     * linkMongo 链接数据库
     */
    public url: string = 'mongodb://localhost:27017/runoob'
    public linkMongo(): Promise<Mongo> {
        let _this = this
        return new Promise((resolve, reject) => {
            MongoClient.connect(_this.url, { useNewUrlParser: true }, function (err, db) {
                if (err) {
                    console.log('数据库无法连接')
                    reject(err)
                }
                _this.stateCode = 100
                _this.db = db
                console.log("数据库已链接!");
                resolve(_this)
            });
        })
    }
    /**
     * aggregate 创建数据库database与表surface
     * @param database 数据库名称
     * @param surface 表名称
     */
    public aggregate(database: string, surface: string): Promise<Mongo> {
        const _this = this
        return new Promise((resolve, reject) => {
            if (_this.stateCode === 0) {
                reject(null)
            } else {
                let dbase: Db = _this.db.db(database)
                dbase.createCollection(surface, (err, res) => {
                    if (err) {
                        console.log(`${database} 数据库 与 ${surface}表 无法创建`)
                        reject(err)
                    }
                    _this.database = database
                    _this.surface = surface
                    this.stateCode = 200
                    console.log(`${database} 数据库 与 ${surface}表 创建成功`)
                    resolve(_this)
                })
            }
        })
    }
    /**
     * insertData 插入数据
     * @param options
     */
    public insertData(options: IOptions): Promise<Mongo> {
        let _this = this
        return new Promise((resolve, reject) => {
            if (!options.database && !options.surface) {
                if (this.stateCode === 200 || this.stateCode === 300) {
                    let dbase: Db = _this.db.db(_this.database)
                    dbase.collection(_this.surface).insertOne(options.data, (err, res) => {
                        if (err) {
                            console.log(`${_this.database} 数据库 与 ${_this.surface}表存在，但是插入数据失败`)
                            reject(err)
                        }
                        console.log(`${_this.database} 数据库 与 ${_this.surface}表存在，但是插入数据成功`)
                        _this.stateCode = 300
                        resolve(_this)
                    })
                } else {
                    console.log('无法知道你想插入哪一条数据库中')
                    reject(null)
                }
            }
            if (options.database && options.surface) {
                if (this.stateCode === 200) {
                    let dbase: Db = _this.db.bd(options.database)
                    dbase.collection(options.surface).insertOne(options.data, (err, res) => {
                        if (err) {
                            console.log(`${_this.database} 数据库 与 ${_this.surface}表不存在，但是插入数据失败`)
                            reject(err)
                        }
                        console.log(`${_this.database} 数据库 与 ${_this.surface}表刚建立，但是插入数据成功`)
                        _this.stateCode = 300
                        resolve(_this)
                    })
                } else {
                    console.log('无法知道你想插入哪一条数据库中')
                    reject(null)
                }
            }
        })
    }
    /**
     * insertManyData 插入多数据
     * @param options
     */
    public insertManyData(options: IOptionsArr): Promise<Mongo> {
        let _this = this
        return new Promise((resolve, reject) => {
            if (!options.database && !options.surface) {
                let dbase: Db = _this.db.db(_this.database)
                dbase.collection(_this.surface).insertMany(options.data, (err, res) => {
                    if (err) {
                        console.log(`${_this.database} 数据库 与 ${_this.surface}表存在，但是插入数据失败`)
                        reject(err)
                    }
                    console.log(`${_this.database} 数据库 与 ${_this.surface}表存在，但是插入数据成功`)
                    _this.stateCode = 300
                    resolve(_this)
                })
            }
        })
    }
    /**
     * findData 查询数据
     * @param database 数据库名称:可选
     * @param surface 表名称: 可选
     * @param whereStr 查询条件: 可选
     */
    public findData(database?: string, surface?: string, whereStr?: any): Promise<any> {
        let _this = this
        return new Promise((resolve, reject) => {
            let dbase: Db = _this.db.db(database || _this.database)
            dbase.collection(surface || this.surface).find(whereStr || {}).toArray((err, result) => {
                if (err) {
                    reject(err)
                }
                console.log(result)
                resolve({
                    result,
                    _this
                })
            })
        })
    }
    /**
     * updata 更新数据
     */
    public updataOne(whereStr: any, updata: any, database?: string, surface?: string): Promise<any> {
        let _this = this
        return new Promise((resolve, reject) => {
            let dbase: Db = _this.db.db(database || _this.database)
            dbase.collection(surface || this.surface).updateOne(whereStr, updata, (err, result) => {
                if (err) {
                    reject(err)
                }
                console.log(`${updata}成功`)
                resolve({
                    _this,
                    updata
                })
            })
        })
    }
    /**
     * updataMany 更新多条数据  
     */
    public updataMany(whereStr: any, updata: any, database?: string, surface?: string): Promise<any> {
        let _this = this
        return new Promise((resolve, reject) => {
            let dbase: Db = _this.db.db(database || _this.database)
            dbase.collection(surface || this.surface).updateMany(whereStr, updata, (err, result) => {
                if (err) {
                    reject(err)
                }
                console.log(`${updata}成功`)
                console.log(_this)
                resolve({
                    _this,
                    result
                })
            })
        })
    }
    /**
     * deleteMany
     */
    public deleteMany(database?: string, surface?: string, whereStr?: any) {
        let _this = this
        return new Promise((resolve, reject) => {
            let dbase: Db = _this.db.db(database || _this.database)
            dbase.collection(surface || this.surface).deleteMany(whereStr, (err, result) => {
                if (err) {
                    reject(err)
                }
                resolve(_this)
            })
        })
    }
    /**
     * deldrop 删除集合
     */
    public deldrop(database?: string, surface?: string) {
        let _this = this
        return new Promise((resolve, reject) => {
            let dbase: Db = _this.db.db(database || _this.database)
            dbase.collection(surface || _this.surface).drop((err, delok) => {
                if (err) {
                    reject(err)
                }
                resolve({
                    _this,
                    delok
                })
            })
        })
    }
}