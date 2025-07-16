export interface taskSummary {
// expanded: any;
      taskId: number,
      taskName: string,
      description: string,
      monthYear: string,
      expectedCount: number,
      actualCount: number,
      status: string,
      assignedEmployee: string
}

export interface taskSummaryResponse {
  summaries : taskSummary[],
  totalCount: number,
  isSuccess: boolean,
  errors: string[],
}