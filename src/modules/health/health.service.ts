import {
  DiskHealthIndicator,
  MemoryHealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus';
import axios from 'axios';
import { Kafka } from 'kafkajs';
import { Redis } from 'ioredis';
import { Injectable } from '@nestjs/common';
import { HealthCheckService, HealthCheck } from '@nestjs/terminus';

@Injectable()
export class HealthService {
  private redisClient: Redis;
  private kafka: Kafka;

  constructor(
    private disk: DiskHealthIndicator,
    private health: HealthCheckService,
    private memory: MemoryHealthIndicator,
  ) {
    this.redisClient = new Redis(6379);
    this.kafka = new Kafka({
      clientId: 'health-check',
      brokers: ['localhost:9093'],
    });
  }

  // 😊 Check if the service is live
  @HealthCheck()
  checkLive() {
    return {
      status: 'up',
      message: '🟢 Service is live and healthy',
    };
  }

  // 🚦 Check if the service is ready
  @HealthCheck()
  checkReady() {
    return this.health.check([
      async () => this.isApiHealthy(),
      async () => this.isDiskHealthy(),
      async () => this.isRedisHealthy(),
      async () => this.isKafkaHealthy(),
      async () => this.isMemoryRssHealthy(),
      async () => this.isMemoryHeapHealthy(),
    ]);
  }

  // 💾 Check disk health
  async isDiskHealthy(): Promise<HealthIndicatorResult> {
    try {
      const result = await this.disk.checkStorage('disk', {
        threshold: 0.75,
        path: '/',
      });

      if (result.disk.status === 'up') {
        return {
          disk: {
            status: 'up',
            message: '🟢 Disk storage is healthy',
          },
        };
      } else {
        return {
          disk: {
            status: 'down',
            message:
              '🔴 Disk storage health check failed: Used disk storage exceeded the threshold',
          },
        };
      }
    } catch (error) {
      console.error('🔴 Disk health check failed:', error);
      return {
        disk: {
          status: 'down',
          message: '🔴 Disk health check failed',
        },
      };
    }
  }

  // 🧠 Check memory heap health
  async isMemoryHeapHealthy(): Promise<HealthIndicatorResult> {
    try {
      const result = await this.memory.checkHeap(
        'memory_heap',
        150 * 1024 * 1024,
      );
      return {
        memory_heap: {
          status: result ? 'up' : 'down',
          message: '🟢 Memory heap is healthy',
        },
      };
    } catch (error) {
      return {
        memory_heap: {
          status: 'down',
          message: '🔴 Memory heap health check failed' + error,
        },
      };
    }
  }

  // 📈 Check memory RSS health
  async isMemoryRssHealthy(): Promise<HealthIndicatorResult> {
    try {
      const result = await this.memory.checkRSS(
        'memory_rss',
        300 * 1024 * 1024,
      );
      return {
        memory_rss: {
          status: result ? 'up' : 'down',
          message: '🟢 Memory RSS is healthy',
        },
      };
    } catch (error) {
      return {
        memory_rss: {
          status: 'down',
          message: '🔴 Memory RSS health check failed' + error,
        },
      };
    }
  }

  // 🔄 Check Redis health
  async isRedisHealthy(): Promise<HealthIndicatorResult> {
    try {
      const result = await this.redisClient.ping();
      return {
        redis: {
          status: result ? 'up' : 'down',
          message: '🟢 Redis is healthy and ready',
        },
      };
    } catch (error) {
      return {
        redis: {
          status: 'down',
          message: '🔴 Failed to connect to Redis' + error,
        },
      };
    }
  }

  // 🌐 Check Kafka health
  async isKafkaHealthy(): Promise<HealthIndicatorResult> {
    try {
      await this.kafka.admin().connect();
      const result = await this.kafka.admin().listTopics();
      return {
        kafka: {
          status: result ? 'up' : 'down',
          message: '🟢 Kafka is healthy and ready',
        },
      };
    } catch (error) {
      return {
        kafka: {
          status: 'down',
          message: '🔴 Failed to connect to Kafka' + error,
        },
      };
    } finally {
      await this.kafka.admin().disconnect();
    }
  }

  // 🌐 Check API health
  async isApiHealthy(): Promise<HealthIndicatorResult> {
    try {
      const result = await axios.get('http://127.0.0.1:8056/api');
      return {
        local_api: {
          status: result ? 'up' : 'down',
          message: '🟢 API endpoints are healthy',
        },
      };
    } catch (error) {
      return {
        local_api: {
          status: 'down',
          message: '🔴 Failed to access API endpoints' + error,
        },
      };
    }
  }
}
