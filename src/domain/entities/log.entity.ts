export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export interface LogEntityOptions {
  level: LogSeverityLevel;
  message: string;
  origin: string;
  createdAt?: Date;
}

export class LogEntity {
  public level: LogSeverityLevel;
  public message: string;
  public createdAt: Date;
  public origin: string;

  constructor({
    message,
    level,
    origin,
    createdAt = new Date(),
  }: LogEntityOptions) {
    this.message = message;
    this.level = level;
    this.createdAt = createdAt;
    this.origin = origin;
  }

  static fromJson = (json: string): LogEntity => {
    const { level, message, createdAt, origin } = JSON.parse(json);

    if (!message) throw new Error("Message is required");
    if (!level) throw new Error("Level is required");
    if (
      level !== LogSeverityLevel.low &&
      level !== LogSeverityLevel.medium &&
      level !== LogSeverityLevel.high
    ) {
      throw new Error("Level is invalid");
    }

    const log = new LogEntity({ message, level, origin, createdAt });

    return log;
  };
}
