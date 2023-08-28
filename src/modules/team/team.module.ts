import { Module } from '@nestjs/common';
import { TeamController } from './team.controller';
import { TeamService } from './Team.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entity/team.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Team])],
    controllers: [TeamController],
    providers: [TeamService],
    exports: [TeamService],
})
export class TeamModule { }
