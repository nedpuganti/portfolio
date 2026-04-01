import { Injectable, inject, signal } from '@angular/core';
import { EMPTY, catchError, finalize, take } from 'rxjs';

import { ChatMessage, ContextPanelState, PromptIntent, RecentConversation } from '../models';
import { buildMessageId, extractChatAnswer, formatChatTimestamp } from '../utils/portfolio-map.util';
import { normalizeQuery } from '../utils/portfolio-filter.util';
import { ChatApiService } from './chat-api.service';
import { PortfolioDataService } from './portfolio-data.service';

@Injectable({
  providedIn: 'root'
})
export class ChatStateService {
  private readonly portfolioData = inject(PortfolioDataService);
  private readonly chatApi = inject(ChatApiService);

  readonly messages = signal<ChatMessage[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly promptSuggestions = signal(this.portfolioData.promptSuggestions());
  readonly recentConversations = signal<RecentConversation[]>(this.portfolioData.recentConversations());
  readonly contextPanelState = signal<ContextPanelState>(this.portfolioData.createDefaultContextPanelState());

  addUserMessage(text: string): void {
    this.messages.update((messages) => [
      ...messages,
      {
        id: buildMessageId('user'),
        role: 'user',
        text,
        createdAt: formatChatTimestamp(new Date()),
        status: 'sent'
      }
    ]);
  }

  addAssistantMessage(text: string, status: ChatMessage['status'] = 'sent'): void {
    this.messages.update((messages) => [
      ...messages,
      {
        id: buildMessageId('assistant'),
        role: 'assistant',
        text,
        createdAt: formatChatTimestamp(new Date()),
        status,
        actions: status === 'error' ? [] : this.portfolioData.primaryActions
      }
    ]);
  }

  addSystemMessage(text: string): void {
    this.messages.update((messages) => [
      ...messages,
      {
        id: buildMessageId('system'),
        role: 'system',
        text,
        createdAt: formatChatTimestamp(new Date()),
        status: 'error'
      }
    ]);
  }

  setLoading(isLoading: boolean): void {
    this.loading.set(isLoading);
  }

  setError(message: string | null): void {
    this.error.set(message);
  }

  resetConversation(): void {
    this.messages.set([]);
    this.setLoading(false);
    this.setError(null);
    this.contextPanelState.set(this.portfolioData.createDefaultContextPanelState());
  }

  sendPrompt(prompt: string): void {
    const trimmedPrompt = prompt.trim();

    if (!trimmedPrompt || this.loading()) {
      return;
    }

    this.addUserMessage(trimmedPrompt);
    this.setLoading(true);
    this.setError(null);
    this.contextPanelState.set(this.resolveContextPanelState(trimmedPrompt));

    this.chatApi
      .sendPrompt(trimmedPrompt)
      .pipe(
        take(1),
        catchError(() => {
          const errorMessage = 'Sorry, I could not reach the assistant. Please try again.';
          this.setError(errorMessage);
          this.addSystemMessage(errorMessage);
          return EMPTY;
        }),
        finalize(() => {
          this.setLoading(false);
          this.promoteConversation(trimmedPrompt);
        })
      )
      .subscribe((response) => {
        const parsed = extractChatAnswer(response);

        if (!parsed.answer) {
          const unreadableMessage = 'Sorry, I could not read the response.';
          this.setError(unreadableMessage);
          this.addAssistantMessage(unreadableMessage, 'error');
          return;
        }

        this.addAssistantMessage(parsed.answer, 'sent');
      });
  }

  openRecentConversation(prompt: string): void {
    this.sendPrompt(prompt);
  }

  setContextPanelState(state: ContextPanelState): void {
    this.contextPanelState.set(state);
  }

  restoreHomeContext(): void {
    if (this.messages().length === 0) {
      this.contextPanelState.set(this.portfolioData.createDefaultContextPanelState());
    }
  }

  private promoteConversation(prompt: string): void {
    const label = prompt.length > 32 ? `${prompt.slice(0, 32)}...` : prompt;
    const nextConversation: RecentConversation = {
      id: buildMessageId('recent'),
      label,
      prompt
    };

    this.recentConversations.update((conversations) => [
      nextConversation,
      ...conversations.filter((conversation) => conversation.prompt !== prompt).slice(0, 4)
    ]);
  }

  private resolveContextPanelState(prompt: string): ContextPanelState {
    const intent = this.matchIntent(prompt);

    switch (intent) {
      case 'featured-projects': {
        const projects = this.portfolioData.getFeaturedProjects(4);

        return this.portfolioData.createProjectsContextPanelState(
          'Showing Featured Work',
          'These projects balance UI polish, product thinking, and operational usefulness.',
          projects
        );
      }
      case 'mobile-projects': {
        const projects = this.portfolioData.getProjectsByTag('mobile');

        return this.portfolioData.createProjectsContextPanelState(
          'Mobile product work',
          'A closer look at cross-platform mobile experiences and launch-ready flows.',
          projects
        );
      }
      case 'dashboards-portals': {
        const projects = this.portfolioData
          .getProjectsByTag('dashboard')
          .concat(this.portfolioData.getProjectsByTag('portal'))
          .filter((project, index, list) => list.findIndex((candidate) => candidate.id === project.id) === index)
          .slice(0, 5);

        return this.portfolioData.createProjectsContextPanelState(
          'Dashboard systems',
          'These examples show control surfaces, reporting, and operations-focused UX.',
          projects
        );
      }
      case 'platform-engineering':
      case 'experience-summary':
        return this.portfolioData.createExperienceContextPanelState();
      case 'skills-overview':
        return this.portfolioData.createSkillsContextPanelState();
      case 'education':
        return this.portfolioData.createEducationContextPanelState();
      case 'contact':
        return this.portfolioData.createContactContextPanelState();
      case 'about':
      default:
        return this.portfolioData.createAboutContextPanelState();
    }
  }

  private matchIntent(prompt: string): PromptIntent {
    const query = normalizeQuery(prompt);

    if (query.includes('dashboard') || query.includes('portal') || query.includes('admin')) {
      return 'dashboards-portals';
    }

    if (
      query.includes('platform') ||
      query.includes('ci/cd') ||
      query.includes('cicd') ||
      query.includes('release') ||
      query.includes('jenkins') ||
      query.includes('kubernetes') ||
      query.includes('docker') ||
      query.includes('devops') ||
      query.includes('nginx') ||
      query.includes('argocd') ||
      query.includes('certmanager') ||
      query.includes('observability') ||
      query.includes('monitor') ||
      query.includes('grafana') ||
      query.includes('logging')
    ) {
      return 'platform-engineering';
    }

    if (
      query.includes('mobile') ||
      query.includes('ionic') ||
      query.includes('flutter') ||
      query.includes('react native')
    ) {
      return 'mobile-projects';
    }

    if (
      query.includes('featured') ||
      query.includes('project') ||
      query.includes('portfolio chatbot') ||
      query.includes('e-commerce') ||
      query.includes('open source')
    ) {
      return 'featured-projects';
    }

    if (
      query.includes('technolog') ||
      query.includes('skill') ||
      query.includes('stack') ||
      query.includes('frontend') ||
      query.includes('backend') ||
      query.includes('database') ||
      query.includes('typescript') ||
      query.includes('react') ||
      query.includes('angular') ||
      query.includes('node') ||
      query.includes('api') ||
      query.includes('redis') ||
      query.includes('kafka') ||
      query.includes('rabbitmq') ||
      query.includes('aws') ||
      query.includes('css') ||
      query.includes('test')
    ) {
      return 'skills-overview';
    }

    if (
      query.includes('experience') ||
      query.includes('summary') ||
      query.includes('summarize') ||
      query.includes('30 seconds') ||
      query.includes('work history') ||
      query.includes('companies') ||
      query.includes('job title') ||
      query.includes('responsibilities') ||
      query.includes('industries') ||
      query.includes('employment') ||
      query.includes('years')
    ) {
      return 'experience-summary';
    }

    if (
      query.includes('education') ||
      query.includes('degree') ||
      query.includes('school') ||
      query.includes('university') ||
      query.includes('certification')
    ) {
      return 'education';
    }

    if (
      query.includes('contact') ||
      query.includes('email') ||
      query.includes('reach out') ||
      query.includes('phone') ||
      query.includes('hire') ||
      query.includes('freelance') ||
      query.includes('website') ||
      query.includes('available') ||
      query.includes('remote') ||
      query.includes('rate')
    ) {
      return 'contact';
    }

    if (query.includes('about') || query.includes('who is') || query.includes('naren')) {
      return 'about';
    }

    return 'about';
  }
}
