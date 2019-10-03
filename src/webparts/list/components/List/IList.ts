export default interface IList {
    id: number,
    fullname: string,
    date?: string,
    avatar: string,
    summary: string,
    isAccept: boolean,
    comments: {id : number , name: string , comment: string}[]
}

export default interface TestList {
    Id: number,
    Title: string,
    Income: number
}