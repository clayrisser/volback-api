import { getService } from '@loopback/service-proxy';
import { inject, Provider } from '@loopback/core';
import { BivacDataSource } from '../datasources';

export interface BivacService {
  help(): Promise<string>;

  getVolumes(): Promise<string[]>;

  backupVolume(volumeId: string): Promise<string>;
}

export class BivacServiceProvider implements Provider<BivacService> {
  constructor(
    @inject('datasources.bivac')
    protected dataSource: BivacDataSource = new BivacDataSource()
  ) {}

  async value(): Promise<BivacService> {
    return getService(this.dataSource);
  }
}
