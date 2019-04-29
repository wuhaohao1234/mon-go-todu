"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
class Mongo {
    constructor() {
        this.stateCode = 0;
        this.database = '';
        this.surface = '';
        this.url = 'mongodb://localhost:27017/runoob';
    }
    linkMongo() {
        let _this = this;
        return new Promise((resolve, reject) => {
            mongodb_1.MongoClient.connect(_this.url, { useNewUrlParser: true }, function (err, db) {
                if (err) {
                    console.log('数据库无法连接');
                    reject(err);
                }
                _this.stateCode = 100;
                _this.db = db;
                console.log("数据库已链接!");
                resolve(_this);
            });
        });
    }
    aggregate(database, surface) {
        const _this = this;
        return new Promise((resolve, reject) => {
            if (_this.stateCode === 0) {
                reject(null);
            }
            else {
                let dbase = _this.db.db(database);
                dbase.createCollection(surface, (err, res) => {
                    if (err) {
                        console.log(`${database} 数据库 与 ${surface}表 无法创建`);
                        reject(err);
                    }
                    _this.database = database;
                    _this.surface = surface;
                    this.stateCode = 200;
                    console.log(`${database} 数据库 与 ${surface}表 创建成功`);
                    resolve(_this);
                });
            }
        });
    }
    insertData(options) {
        let _this = this;
        return new Promise((resolve, reject) => {
            if (!options.database && !options.surface) {
                if (this.stateCode === 200 || this.stateCode === 300) {
                    let dbase = _this.db.db(_this.database);
                    dbase.collection(_this.surface).insertOne(options.data, (err, res) => {
                        if (err) {
                            console.log(`${_this.database} 数据库 与 ${_this.surface}表存在，但是插入数据失败`);
                            reject(err);
                        }
                        console.log(`${_this.database} 数据库 与 ${_this.surface}表存在，但是插入数据成功`);
                        _this.stateCode = 300;
                        resolve(_this);
                    });
                }
                else {
                    console.log('无法知道你想插入哪一条数据库中');
                    reject(null);
                }
            }
            if (options.database && options.surface) {
                if (this.stateCode === 200) {
                    let dbase = _this.db.bd(options.database);
                    dbase.collection(options.surface).insertOne(options.data, (err, res) => {
                        if (err) {
                            console.log(`${_this.database} 数据库 与 ${_this.surface}表不存在，但是插入数据失败`);
                            reject(err);
                        }
                        console.log(`${_this.database} 数据库 与 ${_this.surface}表刚建立，但是插入数据成功`);
                        _this.stateCode = 300;
                        resolve(_this);
                    });
                }
                else {
                    console.log('无法知道你想插入哪一条数据库中');
                    reject(null);
                }
            }
        });
    }
    insertManyData(options) {
        let _this = this;
        return new Promise((resolve, reject) => {
            if (!options.database && !options.surface) {
                let dbase = _this.db.db(_this.database);
                dbase.collection(_this.surface).insertMany(options.data, (err, res) => {
                    if (err) {
                        console.log(`${_this.database} 数据库 与 ${_this.surface}表存在，但是插入数据失败`);
                        reject(err);
                    }
                    console.log(`${_this.database} 数据库 与 ${_this.surface}表存在，但是插入数据成功`);
                    _this.stateCode = 300;
                    resolve(_this);
                });
            }
        });
    }
    findData(database, surface, whereStr) {
        let _this = this;
        return new Promise((resolve, reject) => {
            let dbase = _this.db.db(database || _this.database);
            dbase.collection(surface || this.surface).find(whereStr || {}).toArray((err, result) => {
                if (err) {
                    reject(err);
                }
                console.log(result);
                resolve({
                    result,
                    _this
                });
            });
        });
    }
    updataOne(whereStr, updata, database, surface) {
        let _this = this;
        return new Promise((resolve, reject) => {
            let dbase = _this.db.db(database || _this.database);
            dbase.collection(surface || this.surface).updateOne(whereStr, updata, (err, result) => {
                if (err) {
                    reject(err);
                }
                console.log(`${updata}成功`);
                resolve({
                    _this,
                    updata
                });
            });
        });
    }
    updataMany(whereStr, updata, database, surface) {
        let _this = this;
        return new Promise((resolve, reject) => {
            let dbase = _this.db.db(database || _this.database);
            dbase.collection(surface || this.surface).updateMany(whereStr, updata, (err, result) => {
                if (err) {
                    reject(err);
                }
                console.log(`${updata}成功`);
                console.log(_this);
                resolve({
                    _this,
                    result
                });
            });
        });
    }
    deleteMany(database, surface, whereStr) {
        let _this = this;
        return new Promise((resolve, reject) => {
            let dbase = _this.db.db(database || _this.database);
            dbase.collection(surface || this.surface).deleteMany(whereStr, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(_this);
            });
        });
    }
    deldrop(database, surface) {
        let _this = this;
        return new Promise((resolve, reject) => {
            let dbase = _this.db.db(database || _this.database);
            dbase.collection(surface || _this.surface).drop((err, delok) => {
                if (err) {
                    reject(err);
                }
                resolve({
                    _this,
                    delok
                });
            });
        });
    }
}
exports.default = Mongo;
//# sourceMappingURL=index.js.map