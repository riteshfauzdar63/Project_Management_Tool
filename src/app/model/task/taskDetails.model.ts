export interface TaskDetail {
    taskId: number,
    taskName: string,
    description: string,
    isRecurring: boolean,
    frequencyPerMonth: number,
    createdDate: string,
    createdByName: string,
    assignedToEmployeeId: number,
    assignedToEmployeeName: string,
    startDate: string,
    completedAt: string | null,
    remarks: string | null,
    completionStatus: string | null,
    taskStatus: string
}

export interface TaskDetailsResponse {
    error : string,
    isSuccess: boolean,
    taskDetail : TaskDetail,
}

// taskDetail: {
//     taskId: 1,
//     taskName: create ui,
//     description: create ui for intern,
//     isRecurring: false,
//     frequencyPerMonth: 1,
//     createdDate: 2025-07-09T00:00:00,
//     createdByName: Aarav Mehta,
//     assignedToEmployeeId: 2,
//     assignedToEmployeeName: Diya Sharma,
//     startDate: 2025-07-09T00:00:00,
//     completedAt: null,
//     remarks: null,
//     completionStatus: null,
//     taskStatus: Active