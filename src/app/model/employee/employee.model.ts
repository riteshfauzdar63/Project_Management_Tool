export interface GetEmployee {
   employeeId : number,
   fullName : string,
   email: string,
   role: string
}

export interface GetEmployeeResponse {
    error : string,
    isSuccess: boolean,
    employees : GetEmployee[]
}