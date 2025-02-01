// src\presentation\pubSub\pubSubHandler.ts
import { Injectable } from '@nestjs/common';

import inversify from '@src/inversify/investify';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IPubSubHandler {
  publish(eventName: string, payload: any): Promise<void>;
  asyncIterator(eventName: string): AsyncIterator<unknown, any, undefined>;
}

@Injectable()
export class PubSubHandler implements IPubSubHandler {

  async publish(eventName: string, payload: any): Promise<void> {
    await inversify.pubSub.publish(eventName, payload);
    return;
  }

  asyncIterator(eventName: string): AsyncIterator<unknown, any, undefined> {
    return inversify.pubSub.asyncIterableIterator(eventName);
  }
}