import { SupabaseDocumentRepository } from './document.repository';
import { SupabaseFaqRepository } from './faq.repository';
import { SupabaseGymnaseRepository } from './gymnase.repository';
import { SupabaseInscriptionRepository } from './inscription.repository';
import { SupabaseMatchRepository } from './match.repository';
import { SupabaseMemberRepository } from './member.repository';
import { SupabaseSessionRepository } from './session.repository';
import { SupabaseTarifRepository } from './tarif.repository';
import { SupabaseTaskRepository } from './task.repository';
import { SupabaseTeamRepository } from './team.repository';
import { SupabaseUserRepository } from './user.repository';
import { DocumentRepository } from '../../../domain/repositories/document.repository';
import { FaqRepository } from '../../../domain/repositories/faq.repository';
import { GymnaseRepository } from '../../../domain/repositories/gymnase.repository';
import { InscriptionRepository } from '../../../domain/repositories/inscription.repository';
import { MatchRepository } from '../../../domain/repositories/match.repository';
import { MemberRepository } from '../../../domain/repositories/member.repository';
import { SessionRepository } from '../../../domain/repositories/session.repository';
import { TarifRepository } from '../../../domain/repositories/tarif.repository';
import { TaskRepository } from '../../../domain/repositories/task.repository';
import { TeamRepository } from '../../../domain/repositories/team.repository';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { createClient as createBrowserClient } from '../clients/client';
import { createClient as createServerClient } from '../clients/server';

type ClientType = 'browser' | 'server' | 'auto';

export class RepositoryFactory {
  private static documentRepositoryBrowser: DocumentRepository;
  private static documentRepositoryServer: DocumentRepository;
  private static inscriptionRepositoryBrowser: InscriptionRepository;
  private static inscriptionRepositoryServer: InscriptionRepository;
  private static matchRepositoryBrowser: MatchRepository;
  private static matchRepositoryServer: MatchRepository;
  private static memberRepositoryBrowser: MemberRepository;
  private static memberRepositoryServer: MemberRepository;
  private static teamRepositoryBrowser: TeamRepository;
  private static teamRepositoryServer: TeamRepository;
  private static sessionRepositoryBrowser: SessionRepository;
  private static sessionRepositoryServer: SessionRepository;
  private static userRepository: UserRepository;
  private static faqRepositoryBrowser: FaqRepository;
  private static faqRepositoryServer: FaqRepository;
  private static taskRepositoryBrowser: TaskRepository;
  private static taskRepositoryServer: TaskRepository;
  private static tarifRepositoryBrowser: TarifRepository;
  private static tarifRepositoryServer: TarifRepository;
  private static gymnaseRepositoryBrowser: GymnaseRepository;
  private static gymnaseRepositoryServer: GymnaseRepository;
  private static readonly browserClient = createBrowserClient;
  private static readonly serverClient = createServerClient;

  private static isServer() {
    return typeof window === 'undefined';
  }

  private static getClient(clientType: ClientType) {
    switch (clientType) {
      case 'browser':
        return this.browserClient();
      case 'server':
        return this.serverClient();
      case 'auto':
      default:
        return this.isServer() ? this.serverClient() : this.browserClient();
    }
  }

  static getInscriptionRepository(clientType: ClientType = 'auto'): InscriptionRepository {
    if (clientType === 'browser' || (clientType === 'auto' && !this.isServer())) {
      if (!this.inscriptionRepositoryBrowser) {
        this.inscriptionRepositoryBrowser = new SupabaseInscriptionRepository(this.browserClient());
      }
      return this.inscriptionRepositoryBrowser;
    } else {
      if (!this.inscriptionRepositoryServer) {
        this.inscriptionRepositoryServer = new SupabaseInscriptionRepository(this.serverClient());
      }
      return this.inscriptionRepositoryServer;
    }
  }

  static getDocumentRepository(clientType: ClientType = 'auto'): DocumentRepository {
    if (clientType === 'browser' || (clientType === 'auto' && !this.isServer())) {
      if (!this.documentRepositoryBrowser) {
        this.documentRepositoryBrowser = new SupabaseDocumentRepository(this.browserClient());
      }
      return this.documentRepositoryBrowser;
    } else {
      if (!this.documentRepositoryServer) {
        this.documentRepositoryServer = new SupabaseDocumentRepository(this.serverClient());
      }
      return this.documentRepositoryServer;
    }
  }

  static getTaskRepository(clientType: ClientType = 'auto'): TaskRepository {
    if (clientType === 'browser' || (clientType === 'auto' && !this.isServer())) {
      if (!this.taskRepositoryBrowser) {
        this.taskRepositoryBrowser = new SupabaseTaskRepository(this.browserClient());
      }
      return this.taskRepositoryBrowser;
    } else {
      if (!this.taskRepositoryServer) {
        this.taskRepositoryServer = new SupabaseTaskRepository(this.serverClient());
      }
      return this.taskRepositoryServer;
    }
  }

  static getGymnaseRepository(clientType: ClientType = 'auto'): GymnaseRepository {
    if (clientType === 'browser' || (clientType === 'auto' && !this.isServer())) {
      if (!this.gymnaseRepositoryBrowser) {
        this.gymnaseRepositoryBrowser = new SupabaseGymnaseRepository(this.browserClient());
      }
      return this.gymnaseRepositoryBrowser;
    } else {
      if (!this.gymnaseRepositoryServer) {
        this.gymnaseRepositoryServer = new SupabaseGymnaseRepository(this.serverClient());
      }
      return this.gymnaseRepositoryServer;
    }
  }

  static getMatchRepository(clientType: ClientType = 'auto'): MatchRepository {
    if (clientType === 'browser' || (clientType === 'auto' && !this.isServer())) {
      if (!this.matchRepositoryBrowser) {
        this.matchRepositoryBrowser = new SupabaseMatchRepository(this.browserClient());
      }
      return this.matchRepositoryBrowser;
    } else {
      if (!this.matchRepositoryServer) {
        this.matchRepositoryServer = new SupabaseMatchRepository(this.serverClient());
      }
      return this.matchRepositoryServer;
    }
  }

  static getMemberRepository(clientType: ClientType = 'auto'): MemberRepository {
    if (clientType === 'browser' || (clientType === 'auto' && !this.isServer())) {
      if (!this.memberRepositoryBrowser) {
        this.memberRepositoryBrowser = new SupabaseMemberRepository(this.browserClient());
      }
      return this.memberRepositoryBrowser;
    } else {
      if (!this.memberRepositoryServer) {
        this.memberRepositoryServer = new SupabaseMemberRepository(this.serverClient());
      }
      return this.memberRepositoryServer;
    }
  }

  static getTeamRepository(clientType: ClientType = 'auto'): TeamRepository {
    if (clientType === 'browser' || (clientType === 'auto' && !this.isServer())) {
      if (!this.teamRepositoryBrowser) {
        this.teamRepositoryBrowser = new SupabaseTeamRepository(
          this.browserClient(),
          this.getSessionRepository(clientType),
        );
      }
      return this.teamRepositoryBrowser;
    } else {
      if (!this.teamRepositoryServer) {
        this.teamRepositoryServer = new SupabaseTeamRepository(
          this.serverClient(),
          this.getSessionRepository(clientType),
        );
      }
      return this.teamRepositoryServer;
    }
  }

  static getSessionRepository(clientType: ClientType = 'auto'): SessionRepository {
    if (clientType === 'browser' || (clientType === 'auto' && !this.isServer())) {
      if (!this.sessionRepositoryBrowser) {
        this.sessionRepositoryBrowser = new SupabaseSessionRepository(this.browserClient());
      }
      return this.sessionRepositoryBrowser;
    } else {
      if (!this.sessionRepositoryServer) {
        this.sessionRepositoryServer = new SupabaseSessionRepository(this.serverClient());
      }
      return this.sessionRepositoryServer;
    }
  }

  static getUserRepository(): UserRepository {
    if (!this.userRepository) {
      this.userRepository = new SupabaseUserRepository();
    }
    return this.userRepository;
  }

  static getFaqRepository(clientType: ClientType = 'auto'): FaqRepository {
    if (clientType === 'browser' || (clientType === 'auto' && !this.isServer())) {
      if (!this.faqRepositoryBrowser) {
        this.faqRepositoryBrowser = new SupabaseFaqRepository(this.browserClient());
      }
      return this.faqRepositoryBrowser;
    } else {
      if (!this.faqRepositoryServer) {
        this.faqRepositoryServer = new SupabaseFaqRepository(this.serverClient());
      }
      return this.faqRepositoryServer;
    }
  }

  static getTarifRepository(clientType: ClientType = 'auto'): TarifRepository {
    if (clientType === 'browser' || (clientType === 'auto' && !this.isServer())) {
      if (!this.tarifRepositoryBrowser) {
        this.tarifRepositoryBrowser = new SupabaseTarifRepository(this.browserClient());
      }
      return this.tarifRepositoryBrowser;
    } else {
      if (!this.tarifRepositoryServer) {
        this.tarifRepositoryServer = new SupabaseTarifRepository(this.serverClient());
      }
      return this.tarifRepositoryServer;
    }
  }
}
