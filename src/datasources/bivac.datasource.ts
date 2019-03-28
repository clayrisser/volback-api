import { inject } from '@loopback/core';
import { juggler } from '@loopback/repository';
import * as config from './bivac.datasource.json';

export class BivacDataSource extends juggler.DataSource {
  static dataSourceName = 'bivac';

  constructor(
    @inject('datasources.config.bivac', { optional: true })
    dsConfig: object = config
  ) {
    super(dsConfig);
  }
}
