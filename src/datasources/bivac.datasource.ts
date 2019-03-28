import { inject } from '@loopback/core';
import { juggler } from '@loopback/repository';
import * as bivacConfig from './bivac.datasource.json';
import operations from './bivac.operations';

const config = {
  ...bivacConfig,
  operations
};

export class BivacDataSource extends juggler.DataSource {
  static dataSourceName = 'bivac';

  constructor(
    @inject('datasources.config.bivac', { optional: true })
    dsConfig: object = config
  ) {
    super(dsConfig);
  }
}
