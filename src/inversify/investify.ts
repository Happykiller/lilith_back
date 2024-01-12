import { SessionRepository } from '../repository/session.repositoy';

export class Inversify {

  sessionRepository: SessionRepository;

  constructor() {
    this.sessionRepository = new SessionRepository();
  }

}

const inversify = new Inversify();

export default inversify;