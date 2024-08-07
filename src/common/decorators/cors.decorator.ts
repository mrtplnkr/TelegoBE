/* eslint-disable prettier/prettier */
import { SetMetadata } from '@nestjs/common';

export const CORS = (...args: string[]) => SetMetadata('cors', args);
