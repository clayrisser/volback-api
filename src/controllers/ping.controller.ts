import {
  Request,
  RestBindings,
  get,
  ResponseObject,
  param
} from '@loopback/rest';
import { inject } from '@loopback/context';
import { BivacService } from '../services';

/**
 * OpenAPI response for ping()
 */
const PING_RESPONSE: ResponseObject = {
  description: 'Ping Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          greeting: { type: 'string' },
          date: { type: 'string' },
          url: { type: 'string' },
          headers: {
            type: 'object',
            properties: {
              'Content-Type': { type: 'string' }
            },
            additionalProperties: true
          }
        }
      }
    }
  }
};

/**
 * A simple controller to bounce back http requests
 */
export class PingController {
  constructor(
    @inject(RestBindings.Http.REQUEST) private req: Request,
    @inject('services.BivacService') protected bivacService: BivacService
  ) {}

  // Map to `GET /ping`
  @get('/ping', {
    responses: {
      '200': PING_RESPONSE
    }
  })
  async ping(): Promise<object> {
    // Reply with a greeting, the current time, the url, and request headers
    return {
      greeting: 'Hello from LoopBack',
      date: new Date(),
      url: this.req.url,
      headers: Object.assign({}, this.req.headers)
    };
  }

  @get('/help')
  async help(): Promise<object> {
    return {
      manpage: await this.bivacService.help()
    };
  }

  @get('/volumes')
  async getVolumes(): Promise<object> {
    return await this.bivacService.getVolumes();
  }

  @get('/backup/{volumeId}')
  async backupVolume(
    @param.path.string('volumeId') volumeId: string
  ): Promise<object> {
    return { message: await this.bivacService.backupVolume(volumeId) };
  }
}
