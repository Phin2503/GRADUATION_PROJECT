import { Body, Controller, Post } from '@nestjs/common';
import { GroqaiService } from './groqai.service';
import { SendMes } from './dtos/sendMes.dto';

@Controller('ai')
export class GroqaiController {
  constructor(private readonly groqService: GroqaiService) {}

  @Post('/chat')
  async sendMessage(@Body() requestBody: SendMes) {
    return this.groqService.processMessage(requestBody.mess);
  }
}
