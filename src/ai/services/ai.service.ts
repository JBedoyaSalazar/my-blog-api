import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenAI } from '@google/genai';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

import { Env } from '../../config/env.model';

@Injectable()
export class AiService implements OnModuleInit {
  private genAI: GoogleGenAI;

  constructor(
    private readonly configService: ConfigService<Env>,
    private readonly httpService: HttpService,
  ) {}

  onModuleInit() {
    this.genAI = new GoogleGenAI({
      apiKey: this.configService.getOrThrow<string>('GEMINI_KEY', {
        infer: true,
      }),
    });
  }

  async generateSummary(content: string) {
    const response = await this.genAI.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: content,
      config: {
        systemInstruction: 'Generate a concise summary of the following content with a limit of 255 characters',
      },
    });
    return response.text;
  }

  generateImageUrl(prompt: string): string {
    return `https://gen.pollinations.ai/image/${encodeURIComponent(prompt)}?model=flux&width=1024&height=1024`;
  }
}
