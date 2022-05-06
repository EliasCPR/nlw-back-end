import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedbackUseCase = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe("submit feedback", () => {

  it("should be able to submit feedback", async () => {
    await expect(
      submitFeedbackUseCase.execute({
        type: "BUG",
        comment: "example This is a bug",
        screenshot: "data:image/png;base64,screenshot.png",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it("should not able to submit feedback withot type", async () => {
    await expect(
      submitFeedbackUseCase.execute({
        type: "",
        comment: "example This is a bug",
        screenshot: "data:image/png;base64,screenshot.png",
      })
    ).rejects.toThrow();
  });

  it("should not able to submit feedback withot comment", async () => {
    await expect(
      submitFeedbackUseCase.execute({
        type: "BUG",
        comment: "",
        screenshot: "data:image/png;base64,screenshot.png",
      })
    ).rejects.toThrow();
  });

  it("should not able to submit feedback with an invalid screenshot", async () => {
    await expect(
      submitFeedbackUseCase.execute({
        type: "BUG",
        comment: "this a comment",
        screenshot: "screenshot.png",
      })
    ).rejects.toThrow();
  });
});
