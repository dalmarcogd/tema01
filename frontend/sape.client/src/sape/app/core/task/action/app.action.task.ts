export enum AppActionType {
              INITIALIZING = 0,
              READING = 1,
              UPDATING = 2,
              CREATING = 3,
              DELETING = 4,
              REDIRECTING = 5
            };

export class AppActionTask {
  private type: AppActionType;
  private before: AppAction;
  private execute: AppAction;
  private after: AppAction;

  constructor(type: AppActionType) {
    this.type = type;
  }

  getType() : AppActionType {
    return this.type;
  }

  _before(action: AppAction) : AppActionTask {
    this.before = action;
    return this;
  }

  _execute(action: AppAction) : AppActionTask {
    this.execute = action;
    return this;
  }

  _after(action: AppAction) : AppActionTask {
    this.after = action;
    return this;
  }

  makeBefore() : void {
    if (!!this.before) {
        this.before();
    }
  }

  async makeExecute() : Promise<any> {
    if (!!this.execute) {
      let returnExecute: Promise<any> = await this.execute();
      return Promise.all([returnExecute]);
    }
  }

  makeAfter(v?: any) : void {
    if (!!this.after) {
        this.after(v);
    }
  }
}

export interface AppAction {
  (v?: any): Promise<any> | any | void;
}
