import { ELogger } from "@/enums/logger";

class Logger {
  private colorReset = "\x1b[0m";
  private canViewDebug: boolean;

  constructor() {
    this.canViewDebug = ["development"].includes(process.env.NODE_ENV || "");
  }

  private formatMessage(type: ELogger, message: string): string {
    return `${type}${message}${this.colorReset}`;
  }

  private stringifyContent(content: any): string {
    return content ? JSON.stringify(content, null, 2) : "";
  }

  private use(type: ELogger, message: string, content?: any) {
    const formattedMessage = this.formatMessage(
      type,
      `${message} ${this.stringifyContent(content)}`,
    );
    console.log(formattedMessage);
  }

  public debug(message: string, content?: any) {
    if (this.canViewDebug) {
      this.use(ELogger.DEBUG, message, content);
    }
  }

  public info(message: string) {
    if (this.canViewDebug) {
      this.use(ELogger.INFO, message);
    } else {
      console.info(message);
    }
  }

  public warn(message: string) {
    if (this.canViewDebug) {
      this.use(ELogger.WARNING, message);
    } else {
      console.warn(message);
    }
  }

  public error(...messages: Array<any>) {
    const fullMessage = messages.map(this.stringifyContent).join(" ");
    if (this.canViewDebug) {
      this.use(ELogger.ERROR, fullMessage);
    } else {
      console.error(fullMessage);
    }
  }
}

const logger = new Logger();

export default logger;
