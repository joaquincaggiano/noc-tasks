import { envs } from "./envs.plugin";

describe("envs.plugin.ts", () => {
  test("should return envs options", () => {
    expect(envs).toEqual({
      PORT: 3000,
      MAILER_SERVICE: "gmail",
      MAILER_EMAIL: "joaquincaggiano@gmail.com",
      MAILER_SECRET_KEY: "apfjxcgqbndnyfkb",
      PROD: false,
      MONGO_URL: "mongodb://joaquincaggiano:123456@localhost:27017/",
      MONGO_USER: "joaquincaggiano",
      MONGO_PASS: "123456",
      MONGO_DB_NAME: "NOC-TEST",
    });
  });

  test("should return error if not found env", async () => {
    jest.resetModules();
    process.env.PORT = "ABC";

    try {
      await import("./envs.plugin");
      expect(true).toBe(false);
    } catch (error) {
      expect(`${error}`).toContain('"PORT" should be a valid integer');
    }
  });
});
