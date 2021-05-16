export interface IResponse {
    success: boolean,
    token: string
}

export interface ISendMessage {
    token: string,
    message: string
}