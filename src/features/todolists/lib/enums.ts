export enum TaskStatus {
  New = 0,
  InProgress,
  Completed = 2,
  Draft = 3,
}

export enum TaskPriority {
  Low = 0,
  Medium,
  Hi,
  Urgent,
  Later,
}

export enum ResultCode {
  Success = 0,
  Error = 1,
  CaptchaError = 10,
}
