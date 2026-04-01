export interface ChatApiResponse {
  answer: string;
}

export type ChatApiRawResponse = ChatApiResponse | Record<string, unknown> | string;

export interface ChatApiParsedResponse {
  answer: string;
}
