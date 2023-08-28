import { HttpModule } from '@nestjs/axios';
import { Module, Global } from '@nestjs/common';

@Global()
@Module({
  providers: [],
  imports: [HttpModule],
  exports: [HttpModule],
})
export class SharedModule {}
