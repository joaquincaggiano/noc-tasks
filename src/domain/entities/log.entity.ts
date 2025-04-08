export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export class LogEntity {
  public level: LogSeverityLevel;
  public message: string;
  public createdAt: Date;

  constructor(message: string, level: LogSeverityLevel) {
    this.message = message;
    this.level = level;
    this.createdAt = new Date();
  }

  static fromJson = (json: string): LogEntity => {
    const { level, message, createdAt } = JSON.parse(json);

    if (!message) throw new Error("Message is required");
    if (!level) throw new Error("Level is required");
    if (
      level !== LogSeverityLevel.low &&
      level !== LogSeverityLevel.medium &&
      level !== LogSeverityLevel.high
    ) {
      throw new Error("Level is invalid");
    }

    const log = new LogEntity(message, level);
    log.createdAt = new Date(createdAt);

    return log;
  };
}
