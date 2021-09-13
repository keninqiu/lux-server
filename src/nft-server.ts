import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as controllers from './controllers';
import * as mongoose from 'mongoose';
import { Server } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { Secret } from './config/secret';
const path = require("path");

class NFTServer extends Server {

    private readonly SERVER_STARTED = 'Example server started on port: ';

    constructor() {
        super(true);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            parameterLimit: 100000,
            limit: '50mb',
            extended: true}));
        //this.app.use(bodyParser({limit: '50mb'}));
        this.app.use(cors());
     
        this.setupDatabase();
        this.setupControllers();
    }

    private setupControllers(): void {
        const ctlrInstances = [];
        for (const name in controllers) {
            if (controllers.hasOwnProperty(name)) {
                const controller = (controllers as any)[name];
                ctlrInstances.push(new controller());
            }
        }
        super.addControllers(ctlrInstances);
    }

    private setupDatabase(): void {

        const connString = Secret.db_conn;
        mongoose.connect(connString, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true,
        });        
    }

    public start(port: number): void {
        this.app.get('*', (req, res) => {
            res.send(this.SERVER_STARTED + port + 'haha');
        });
        this.app.listen(port, () => {
            Logger.Imp(this.SERVER_STARTED + port);
        });
    }
}

export default NFTServer;