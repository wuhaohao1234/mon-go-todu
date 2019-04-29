interface IOptions {
    database?: string;
    surface?: string;
    data: {
        [index: string]: any;
    };
}
interface IOptionsArr {
    database?: string;
    surface?: string;
    data: Array<{
        [index: string]: any;
    }>;
}
export default class Mongo {
    private db;
    private stateCode;
    private database;
    private surface;
    url: string;
    linkMongo(): Promise<Mongo>;
    aggregate(database: string, surface: string): Promise<Mongo>;
    insertData(options: IOptions): Promise<Mongo>;
    insertManyData(options: IOptionsArr): Promise<Mongo>;
    findData(database?: string, surface?: string, whereStr?: any): Promise<any>;
    updataOne(whereStr: any, updata: any, database?: string, surface?: string): Promise<any>;
    updataMany(whereStr: any, updata: any, database?: string, surface?: string): Promise<any>;
    deleteMany(database?: string, surface?: string, whereStr?: any): Promise<{}>;
    deldrop(database?: string, surface?: string): Promise<{}>;
}
export {};
