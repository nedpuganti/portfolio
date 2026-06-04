import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ChatApiResponse } from '../models';

@Service()
export class ChatApiService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = environment.chatApiUrl;

  sendPrompt(prompt: string): Observable<ChatApiResponse> {
    return this.http.post<ChatApiResponse>(this.endpoint, {
      prompt
    });
  }
}
