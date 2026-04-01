import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { ChatApiResponse } from '../models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatApiService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = environment.chatApiUrl;

  sendPrompt(prompt: string): Observable<ChatApiResponse> {
    return this.http.post<ChatApiResponse>(this.endpoint, {
      prompt
    });
  }
}
