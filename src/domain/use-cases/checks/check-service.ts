interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

export class CheckService implements CheckServiceUseCase {
  async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);

      if (!req.ok) {
        throw new Error(`Error on check service ${url}`);
      }

      console.log(`Service ${url} is running`);
      return true;
    } catch (error) {
      console.log(`${error}`);
      return false;
    }
  }
}
