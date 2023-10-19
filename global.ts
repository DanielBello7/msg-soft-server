import { Request, Response, NextFunction } from 'express';

export interface __NextFunction extends NextFunction {
}

export interface __Request extends Request {
    session?: any
    user?: any
    secret?: any
}

export interface __Response extends Response {
}

export interface ParticipantsDataType {
    _id: string
    fullname: string
    password: string
}
