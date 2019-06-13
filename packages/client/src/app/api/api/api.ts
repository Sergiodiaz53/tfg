export * from './accessToken.service';
import { AccessTokenService } from './accessToken.service';
export * from './history.service';
import { HistoryService } from './history.service';
export * from './question.service';
import { QuestionService } from './question.service';
export * from './user.service';
import { UserService } from './user.service';
export const APIS = [AccessTokenService, HistoryService, QuestionService, UserService];
