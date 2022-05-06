import { MailAdapter } from "../adpters/mail-adpter";
import { PrismaFeedbacksRepository } from "../repository/prisma/prisma-feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbackRepository: PrismaFeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}
  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    if(!type){
      throw new Error("Type is required");
    }
    if(!comment){
      throw new Error("Comment is required");
    }
    if(screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('invalid screenshot format');
    }
    await this.feedbackRepository.create({ type, comment, screenshot });

    await this.mailAdapter.sendMail({
      subject: "novo feedback",
      body: [
        `<div styles="font-family: sans-serif; font-size: 16px; color: #111">`,
        `<h1>tipo do feedback: ${type}</h1>`,
        `<h1>comentario: ${comment}</h1>`,
        `</div>`,
      ].join("\n"),
    });
  }
}
