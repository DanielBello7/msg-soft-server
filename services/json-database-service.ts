import { v4 as uuid } from 'uuid';
import utilities from 'util';
import fs_module from 'fs';

interface DocumentType { _id: string; createdAt: string }

const write_file = utilities.promisify(fs_module.writeFile);
const read_file = utilities.promisify(fs_module.readFile);

class JSONFileServiceAPI<T> {
    private database_folder: string;
    private database_name: string;
    public db_path: string;

    constructor(db_folder_path: string, db_name: string) {
        this.database_name = db_name;
        this.database_folder = db_folder_path;
        this.db_path = `${this.database_folder}/${this.database_name}.json`;
    }

    protected WriteIntoFile = async (document: any) => {
        await write_file(this.db_path, JSON.stringify(document, null, 3));
        return document;
    }

    protected CheckDatabaseFile = async (): Promise<Boolean> => {
        const confirm = fs_module.existsSync(this.db_path);
        if (confirm) return true;
        return false;
    }

    public GetDocuments = async (): Promise<(T & DocumentType)[]> => {
        const results = await read_file(this.db_path, "utf8");
        if (!results) return []
        return JSON.parse(results);
    }

    public AddDocument = async (doc: T): Promise<(T & DocumentType)> => {
        if (typeof doc !== "object") throw new Error('object required');
        const data = await this.GetDocuments();
        const new_document = { _id: uuid(), ...doc, createdAt: new Date().toDateString() }
        await this.WriteIntoFile([...data, new_document]);
        return new_document
    }

    public DeleteDocument = async (doc: Partial<T>): Promise<Boolean> => {
        if (typeof doc !== "object") throw new Error('object required');
        const data = await this.GetDocuments();
        const file = data.filter(item => {
            const confirmation = Object.keys(doc).every(obj1 => {
                return doc[obj1 as keyof typeof doc] === item[obj1 as keyof typeof item]
            });
            if (!confirmation) return item;
        });
        await this.WriteIntoFile(file);
        return true;
    }

    public FindDocument = async (doc: Partial<T>): Promise<(T & DocumentType) | null> => {
        if (typeof doc !== "object") throw new Error('object required')
        const data = await this.GetDocuments();
        const file = data.find(item => {
            const confirmation = Object.keys(doc).every(obj1 => {
                return doc[obj1 as keyof typeof doc] === item[obj1 as keyof typeof item]
            });
            if (confirmation) return item;
        });
        if (!file) return null;
        return file;
    }

    public FindDocuments = async (doc: Partial<T>): Promise<(T & DocumentType)[]> => {
        if (typeof doc !== "object") throw new Error('object required')
        const data = await this.GetDocuments();
        const file = data.filter(item => {
            const confirmation = Object.keys(doc).every(obj1 => {
                return doc[obj1 as keyof typeof doc] === item[obj1 as keyof typeof item]
            });
            if (confirmation) return item;
        });
        return file;
    }
}

class JSONFileServiceHandler<T> extends JSONFileServiceAPI<T> {
    constructor(database_name: string, folder_path: string) {
        super(folder_path, database_name);
    }

    _init_ = async () => {
        const result = await this.CheckDatabaseFile();
        if (result) return
        await write_file(this.db_path, JSON.stringify([], null, 3));
    }
}

export default JSONFileServiceHandler;
