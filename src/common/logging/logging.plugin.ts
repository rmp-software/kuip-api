import { Plugin } from '@nestjs/graphql';
import { createLogger, format, transports } from 'winston';
import type { Logger } from 'winston';
import {
  ApolloServerPlugin,
  GraphQLRequestListener,
  GraphQLRequestContext,
} from 'apollo-server-plugin-base';

function formatParams(info) {
  const { timestamp, level, message, ...args } = info;
  const ts = timestamp.slice(0, 19).replace('T', ' ');

  return `${ts} ${level}: ${message} ${
    Object.keys(args).length ? JSON.stringify(args, null, '') : ''
  }`;
}

const developmentFormat = format.combine(
  format.colorize(),
  format.timestamp(),
  format.align(),
  format.printf(formatParams),
);

const productionFormat = format.combine(
  format.timestamp(),
  format.align(),
  format.printf(formatParams),
);

@Plugin()
export class LoggingPlugin implements ApolloServerPlugin {
  logger: Logger;

  constructor() {
    const level = process.env.LOG_LEVEL || 'debug';
    const dev = process.env.NODE_ENV === 'development';

    const [date] = new Date().toISOString().split('T');
    this.logger = createLogger({
      level: level,
      format: dev ? developmentFormat : productionFormat,
      transports: dev
        ? [new transports.Console()]
        : [
            new transports.Console(),
            new transports.File({
              filename: `${date}.error.log`,
              level: 'error',
            }),
            new transports.File({ filename: `${date}.log` }),
          ],
    });
  }

  async requestDidStart(
    requestContext: GraphQLRequestContext,
  ): Promise<GraphQLRequestListener> {
    this.logger.info(
      `Request started! Query: ${requestContext.request.operationName}`,
    );

    return {};
  }
}
